import type { Domain, Id } from "./types.ts";

export function createDomain(id: Id, name: string): Domain {
  return {
    id,
    name,
    comment: "",
    issueThreads: {},
    timelines: [],
    aggregateNodes: {},
    commandNodes: {},
    eventNodes: {},
    integrationNodes: {},
    issueNodes: {},
    processNodes: {},
    projectionNodes: {},
    timeoutNodes: {},
    viewNodes: {},
  };
}
