/**
 * Local patch: never load relay-joining mesh extensions (remote-pi) inside Pi Web.
 *
 * remote-pi keeps PROCESS-GLOBAL singleton state — one relay WebSocket, one
 * message buffer, one room binding. Pi Web hosts many agent sessions in a
 * single Next.js process, so a loaded remote-pi extension mixes every hosted
 * session's events into one relay stream: one workspace's conversation leaks
 * into another workspace's room on the phone app (observed 2026-08-15: a
 * Pi_Coding_Agent session's replies surfaced inside the MEMS tile).
 *
 * Terminal Pi and supervised daemons keep remote-pi; Pi Web has its own UI
 * channel and never needs the phone mesh.
 */
type ExtensionsBase = {
  extensions: Array<{ path?: string }>;
};

export function withoutRelayMeshExtensions<T extends ExtensionsBase>(base: T): T {
  return {
    ...base,
    extensions: base.extensions.filter((ext) => !/remote[-_]pi/i.test(ext.path ?? "")),
  };
}
