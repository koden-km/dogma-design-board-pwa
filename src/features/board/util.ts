import { v4 as uuidv4 } from "uuid";
import type {
  Concept,
  Domain,
  Id,
  IssueComment,
  IssueThread,
  NodeDef,
  NodeDefMap,
  NodeIOGroup,
  NodeInst,
  NodeType,
  TimePoint,
  Timeline,
} from "./types.ts";

export function createDomain(
  id: Id,
  name: string,
  nodesDefinitions: NodeDefMap = {}
): Domain {
  return {
    id,
    name,
    comment: "",
    issueThreads: {},
    timelines: [createTimeline()], // create a default timeline
    nodesDefinitions,
  };
}

export function createIssueThread(
  id: Id,
  comments: IssueComment[],
  startedTimestamp: number,
  resolvedTimestamp?: number
): IssueThread {
  return {
    id,
    startedTimestamp,
    resolvedTimestamp,
    comments,
  };
}

export function createIssueComment(
  id: Id,
  author: string,
  comment: string,
  timestamp: number = 0
): IssueComment {
  return {
    id,
    author,
    comment,
    timestamp,
  };
}

// a list of concepts in one linear timeline
export function createTimeline(
  id: Id = uuidv4(),
  concepts: Concept[] = []
): Timeline {
  if (concepts.length === 0) {
    concepts.push(createConcept(uuidv4(), ""));
  }

  return {
    id,
    concepts,
  };
}

// a grouping system for a bunch of time points on a timeline
export function createConcept(
  id: Id,
  name: string,
  comment: string = "",
  timePoints: TimePoint[] = []
): Concept {
  return {
    id,
    name,
    comment,
    timePoints,
  };
}

// messages that can occur during a time point and the operator that consumes or produces those messages at that time point
export function createTimePoint(
  id: Id = uuidv4(),
  operatorNode?: NodeInst,
  ioNodeGroups: NodeIOGroup[] = []
): TimePoint {
  return {
    id,
    operatorNode,
    ioNodeGroups,
  };
}

export function createNodeIOGroup(
  input?: NodeInst,
  outputs: NodeInst[] = []
): NodeIOGroup {
  return { id: uuidv4(), input, outputs };
}

// node definition
export function createNodeDef(
  domainId: Id,
  id: Id,
  type: NodeType,
  name: string
): NodeDef {
  return {
    domainId,
    id,
    name,
    type,
  };
}

// node instance (an instance of a node def)
export function createNodeInst(
  domainId: Id,
  nodeId: Id,
  id: Id,
  comment: string = "",
  issueThreadIds: Id[] = []
): NodeInst {
  return {
    domainId,
    nodeId, // node definition id
    id,
    comment, // comment specific to this node instance
    issueThreadIds, // this array allows resolved threads to be hidden but still persist
  };
}
