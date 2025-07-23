import { v4 as uuidv4 } from "uuid";
import type {
  Concept,
  Domain,
  Id,
  IssueComment,
  IssueThread,
  NodeDef,
  NodeDefMap,
  NodeIO,
  NodeIOMap,
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
  ioNodes: NodeIOMap = {}
): TimePoint {
  return {
    id,
    operatorNode,
    ioNodes,
  };
}

export function createNodeIO(
  input?: NodeInst,
  outputs: NodeInst[] = []
): NodeIO {
  return { input, outputs };
}

export function createNodeIOMap(ioNodeList: NodeIO[]): NodeIOMap {
  const ioMap: NodeIOMap = {};

  // There will be no input Id when doing Event Storming because events come first
  // Group all outputs under the same generated Id
  const noInputId = uuidv4();

  ioNodeList.forEach((ioNodes) => {
    const key: Id = ioNodes.input?.nodeId ?? noInputId;
    ioMap[key] = ioNodes;
  });

  return ioMap;
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
    comment, // comment specific to this node instance (an addition to node definitions comment)
    issueThreadIds, // this array allows resolved threads to be hidden but still persist
  };
}
