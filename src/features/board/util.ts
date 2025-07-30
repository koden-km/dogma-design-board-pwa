import { v4 as uuidv4 } from "uuid";
import {
  type Concept,
  type Domain,
  type DragAndDropConcept,
  type DragAndDropNodeIOGroup,
  type DragAndDropNodeInst,
  type DragAndDropNodeOperatorGroup,
  type DragAndDropTimePoint,
  type DragAndDropTimeline,
  type Id,
  type IssueComment,
  type IssueThread,
  type NodeDef,
  type NodeDefMap,
  type NodeIOGroup,
  type NodeInst,
  type NodeOperatorGroup,
  type NodeType,
  type TimePoint,
  type Timeline,
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
    concepts.push(
      createConcept(
        uuidv4(),
        "New Event Storm",
        "Start by adding the business domain events to the board in a rough time order. They can be moved around as needed.",
        [
          createTimePoint(uuidv4(), [
            createNodeOperatorGroup(uuidv4(), undefined, [
              createNodeIOGroup(uuidv4()),
            ]),
          ]),
        ]
      )
    );
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
  operatorGroups: NodeOperatorGroup[] = []
): TimePoint {
  return {
    id,
    operatorGroups,
  };
}

export function createNodeIOGroup(
  id: Id = uuidv4(),
  input?: NodeInst,
  outputs: NodeInst[] = []
): NodeIOGroup {
  return { id, input, outputs };
}

export function createNodeOperatorGroup(
  id: Id = uuidv4(),
  operatorNode?: NodeInst,
  ioNodeGroups: NodeIOGroup[] = []
): NodeOperatorGroup {
  return {
    id,
    operatorNode,
    ioNodeGroups,
  };
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
  defId: Id,
  id: Id,
  comment: string = "",
  issueThreadIds: Id[] = []
): NodeInst {
  return {
    domainId,
    defId, // node definition id
    id,
    comment, // comment specific to this node instance
    issueThreadIds, // this array allows resolved threads to be hidden but still persist
  };
}

// drag and drop

// TODO(KM): Rename these to "packDnDXxxx"?

export function createDnDNodeInst(
  domainId: Id,
  defId: Id,
  instId: Id,
  type: NodeType
): string {
  // return createDnDElement(DDT_NODE, { domainId, defId, instId, type });
  return JSON.stringify({ domainId, defId, instId, type });
}

export function createDnDNodeOperatorGroup(
  domainId: Id,
  timePointId: Id
): string {
  // return createDnDElement(DDT_OP_GROUP, { domainId, timePointId });
  return JSON.stringify({ domainId, timePointId });
}

export function createDnDNodeIOGroup(domainId: Id, timePointId: Id): string {
  // return createDnDElement(DDT_IO_GROUP, { domainId, timePointId });
  return JSON.stringify({ domainId, timePointId });
}

export function createDnDTimePoint(domainId: Id, timePointId: Id): string {
  // return createDnDElement(DDT_TIME_POINT, { domainId, timePointId });
  return JSON.stringify({ domainId, timePointId });
}

export function createDnDConcept(domainId: Id, conceptId: Id): string {
  // return createDnDElement(DDT_CONCEPT, { domainId, conceptId });
  return JSON.stringify({ domainId, conceptId });
}

export function createDnDTimeline(domainId: Id, timelineId: Id): string {
  // return createDnDElement(DDT_TIMELINE, { domainId, timelineId });
  return JSON.stringify({ domainId, timelineId });
}

export function unpackDnDNodeInst(jsonData: string): DragAndDropNodeInst {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeOperatorGroup(
  jsonData: string
): DragAndDropNodeOperatorGroup {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeIOGroup(jsonData: string): DragAndDropNodeIOGroup {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeIOTimePoint(
  jsonData: string
): DragAndDropTimePoint {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeIOConcept(jsonData: string): DragAndDropConcept {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeIOTimeline(jsonData: string): DragAndDropTimeline {
  return JSON.parse(jsonData);
}
