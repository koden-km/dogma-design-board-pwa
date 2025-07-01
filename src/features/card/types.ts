// Card Types
export const CT_AGGREGATE = "aggregate" as const;
export const CT_COMMAND = "command" as const;
export const CT_EVENT = "event" as const;
export const CT_INTEGRATION = "integration" as const;
export const CT_ISSUE = "issue" as const;
export const CT_PROCESS = "process" as const;
export const CT_PROJECTION = "projection" as const;
export const CT_TIMEOUT = "timeout" as const;
export const CT_VIEW = "view" as const;

export type CardType =
  | typeof CT_AGGREGATE
  | typeof CT_COMMAND
  | typeof CT_EVENT
  | typeof CT_INTEGRATION
  | typeof CT_ISSUE
  | typeof CT_PROCESS
  | typeof CT_PROJECTION
  | typeof CT_TIMEOUT
  | typeof CT_VIEW;
