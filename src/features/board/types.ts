export type Id = string;

// a key-value object map, map<Id,NodeDef>
export type NodeDefMap = {
  [key: Id]: NodeDef;
};

export type Domain = {
  id: Id;
  name: string;
  comment: string;
  issueThreads: { [key: Id]: IssueThread };

  // think vertical list of timelines to represent different things occurring at similar but unrelated time points
  timelines: Timeline[];

  aggregateNodes: NodeDefMap;
  commandNodes: NodeDefMap;
  eventNodes: NodeDefMap;
  integrationNodes: NodeDefMap;
  issueNodes: NodeDefMap;
  processNodes: NodeDefMap;
  projectionNodes: NodeDefMap;
  timeoutNodes: NodeDefMap;
  viewNodes: NodeDefMap;
};

export type IssueThread = {
  id: Id;
  startedTimestamp: number;
  resolvedTimestamp: number; // non-zero if resolved (consider using optional?)
  comments: IssueComment[];
};

export type IssueComment = {
  id: Id;
  timestamp: number;
  author: string;
  comment: string;
};

// a list of concepts in one linear timeline
export type Timeline = {
  concepts: Concept[];
};

// a grouping system for a bunch of time points on a timeline
export type Concept = {
  id: Id;
  name: string;
  comment: string;
  timePoints: TimePoint[];
};

// messages that can occur during a time point and the operator that consumes or produces those messages at that time point
export type TimePoint = {
  messageNodes: NodeInst[]; // message nodes (command, event, timeout) in this time point (think vertical time slice)
  operatorNode: null; // operator nodes (aggregate, process, integration, projection, view)
};

// node definition
export type NodeDef = {
  domainId: Id;
  id: Id;
  name: string;
  comment: string; // comment for all instances of this node
  type: NodeType;
};

// node instance (an instance of a node def)
export type NodeInst = {
  nodeId: Id; // node definition id
  comment: string; // comment specific to this node instance (an addition to node definitions comment)
  issueThreadIds: Id[]; // this array allows resolved threads to be hidden but still persist
};

// node types
export const NT_AGGREGATE = "aggregate" as const;
export const NT_COMMAND = "command" as const;
export const NT_EVENT = "event" as const;
export const NT_INTEGRATION = "integration" as const;
export const NT_ISSUE = "issue" as const;
export const NT_PROCESS = "process" as const;
export const NT_PROJECTION = "projection" as const;
export const NT_TIMEOUT = "timeout" as const;
export const NT_VIEW = "view" as const;

export type NodeType =
  | typeof NT_AGGREGATE
  | typeof NT_COMMAND
  | typeof NT_EVENT
  | typeof NT_INTEGRATION
  | typeof NT_ISSUE
  | typeof NT_PROCESS
  | typeof NT_PROJECTION
  | typeof NT_TIMEOUT
  | typeof NT_VIEW;

export type MessageType =
  | typeof NT_COMMAND
  | typeof NT_EVENT
  | typeof NT_TIMEOUT;

export type OperatorType =
  | typeof NT_AGGREGATE
  | typeof NT_INTEGRATION
  | typeof NT_PROCESS
  | typeof NT_PROJECTION
  | typeof NT_VIEW;
