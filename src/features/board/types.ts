export type Id = string;

export type Domain = {
  id: Id;
  name: string;
  comment: string;
  issueThreads: { [key: Id]: IssueThread };
  timelines: Timeline[]; // a list of concurrent timelines to model things occurring at similar but unrelated time points
  nodesDefinitions: NodeDefMap;
};

// a key-value plain object map, eg. map<Id,NodeDef>
export type NodeDefMap = {
  [key: Id]: NodeDef;
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
  operatorGroups: OperatorGroup[]; // a list of operator node groups to model concurrent operations during this time point
};

// an operator (handler) and all its groups of input->outputs
export type OperatorGroup = {
  id: Id; // unique id for the group
  operatorNode?: NodeInst; // operator nodes (aggregate, process, integration, projection, view)
  ioGroups: IOGroup[]; // a list of inputs (and corresponding outputs) that can happen during this time point
};

// an operator's message input->outputs group
export type IOGroup = {
  id: Id; // unique id for the group
  input?: NodeInst; // message node (command, event, timeout)
  outputs: NodeInst[]; // message nodes (command, event, timeout)
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

// drag and drop path types

export type DomainPath = {
  domainId: Id;
};

export type TimelinePath = {
  domainId: Id;
  timelineId: Id;
};

export type ConceptPath = {
  domainId: Id;
  timelineId: Id;
  conceptId: Id;
};

export type TimePointPath = {
  domainId: Id;
  timelineId: Id;
  conceptId: Id;
  timePointId: Id;
};

export type OperatorGroupPath = {
  domainId: Id;
  timelineId: Id;
  conceptId: Id;
  timePointId: Id;
  opGroupId: Id;
};

export type IOGroupPath = {
  domainId: Id;
  timelineId: Id;
  conceptId: Id;
  timePointId: Id;
  opGroupId: Id;
  ioGroupId: Id;
};

// drag and drop payload types

export type DragNodeInstPayload = {
  path: IOGroupPath;
  nodeInstId: Id;
  // nodeDefId: Id; // don't really need this?
  nodeType: NodeType;
};

export type DragIOGroupPayload = {
  path: OperatorGroupPath;
  ioGroupId: Id;
};

export type DragOperatorGroupPayload = {
  path: TimePointPath;
  opGroupId: Id;
};

export type DragTimePointPayload = {
  path: ConceptPath;
  timePointId: Id;
};

export type DragConceptPayload = {
  path: TimelinePath;
  conceptId: Id;
};

export type DragTimelinePayload = {
  path: DomainPath;
  timelineId: Id;
};

export type DragPayload =
  | DragNodeInstPayload
  | DragOperatorGroupPayload
  | DragIOGroupPayload
  | DragTimePointPayload
  | DragConceptPayload
  | DragTimelinePayload;

// node instance slot types
export const NIS_OPERATOR = "operator";
export const NIS_INPUT = "input";
export const NIS_OUTPUT = "output";

export type DropNodeInstSlotType =
  | typeof NIS_OPERATOR
  | typeof NIS_INPUT
  | typeof NIS_OUTPUT;

export type DropNodeInstPayload = {
  path: IOGroupPath;
  slot: DropNodeInstSlotType;
  afterId: Id | undefined; // the relative sibling Id to place after if applicable
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
