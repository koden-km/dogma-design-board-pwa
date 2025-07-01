// general tool types
export const TT_POINTER = "pointer" as const;
export const TT_HAND = "hand" as const;

// card tool types
export const TT_AGGREGATE = "aggregate" as const;
export const TT_COMMAND = "command" as const;
export const TT_EVENT = "event" as const;
export const TT_INTEGRATION = "integration" as const;
export const TT_ISSUE = "issue" as const;
export const TT_PROCESS = "process" as const;
export const TT_PROJECTION = "projection" as const;
export const TT_TIMEOUT = "timeout" as const;
export const TT_VIEW = "view" as const;

export type ToolType =
  | typeof TT_POINTER
  | typeof TT_HAND
  | typeof TT_AGGREGATE
  | typeof TT_COMMAND
  | typeof TT_EVENT
  | typeof TT_INTEGRATION
  | typeof TT_ISSUE
  | typeof TT_PROCESS
  | typeof TT_PROJECTION
  | typeof TT_TIMEOUT
  | typeof TT_VIEW;
