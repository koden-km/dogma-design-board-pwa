export type Id = string;

// a key-value plain object map, eg. map<Id,NodeDef>
export type NodeDefMap = {
  [key: Id]: NodeDef;
};

export type NodeIOGroup = {
  id: Id; // unique id for the group
  input?: NodeInst; // message node (command, event, timeout)
  outputs: NodeInst[]; // message nodes (command, event, timeout)
};

export type NodeOperatorGroup = {
  id: Id; // unique id for the group
  operatorNode?: NodeInst; // operator nodes (aggregate, process, integration, projection, view)
  ioNodeGroups: NodeIOGroup[]; // a list of inputs (and corresponding outputs) that can happen during this time point
};

export type Domain = {
  id: Id;
  name: string;
  comment: string;
  issueThreads: { [key: Id]: IssueThread };
  timelines: Timeline[]; // a list of concurrent timelines to model things occurring at similar but unrelated time points
  nodesDefinitions: NodeDefMap;
};

export type IssueThread = {
  id: Id;
  startedTimestamp: number;
  resolvedTimestamp?: number;
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
  id: Id;
  concepts: Concept[]; // linear list of concepts in time
};

// a group of time points in the timeline that represent a single concept
export type Concept = {
  id: Id;
  name: string;
  comment: string;
  timePoints: TimePoint[]; // linear list of points in time
};

// messages that can occur during a time point and the operator that consumes or produces those messages at that time point
export type TimePoint = {
  id: Id;
  operatorGroups: NodeOperatorGroup[]; // a list of operator node groups to model concurrent operations during this time point
};

// node definition
export type NodeDef = {
  domainId: Id;
  id: Id;
  name: string;
  type: NodeType;
};

// node instance (an instance of a node definition that has comments and issues)
export type NodeInst = {
  domainId: Id;
  defId: Id; // node definition id
  id: Id; // node instance id
  comment: string; // comment specific to this node instance
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

// drag and drop types

export type DragAndDropNodeInst = {
  domainId: Id;
  defId: Id;
  instId: Id;
  type: NodeType;
};

export type DragAndDropNodeOperatorGroup = {
  domainId: Id;
  timePointId: Id;
};

export type DragAndDropNodeIOGroup = {
  domainId: Id;
  timePointId: Id;
};

export type DragAndDropTimePoint = {
  domainId: Id;
  timePointId: Id;
};

export type DragAndDropConcept = {
  domainId: Id;
  conceptId: Id;
};

export type DragAndDropTimeline = {
  domainId: Id;
  timelineId: Id;
};

// drag and drop data format types
export const DDF_NODE_X = "application/board-node-x";
export const DDF_OP_GROUP = "application/board-op-group";
export const DDF_IO_GROUP = "application/board-io-group";
export const DDF_TIME_POINT = "application/board-time-point";
export const DDF_CONCEPT = "application/board-concept";
export const DDF_TIMELINE = "application/board-timeline";

export type DragAndDropFormatType =
  | typeof DDF_NODE_X
  | typeof DDF_OP_GROUP
  | typeof DDF_IO_GROUP
  | typeof DDF_TIME_POINT
  | typeof DDF_CONCEPT
  | typeof DDF_TIMELINE;

export type DragAndDropPayload =
  | DragAndDropNodeInst
  | DragAndDropNodeOperatorGroup
  | DragAndDropNodeIOGroup
  | DragAndDropTimePoint
  | DragAndDropConcept
  | DragAndDropTimeline;
