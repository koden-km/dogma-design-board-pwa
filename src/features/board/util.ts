import { v4 as uuidv4 } from "uuid";
import {
  type Concept,
  type TimelinePath,
  type Domain,
  type DragConceptPayload,
  type DragNodeIOGroupPayload,
  type DragNodeInstPayload,
  type DragNodeOperatorGroupPayload,
  type DragTimePointPayload,
  type DragTimelinePayload,
  type Id,
  type IssueComment,
  type IssueThread,
  type NodeDef,
  type NodeDefMap,
  type NodeIOGroup,
  type NodeOperatorGroupPath,
  type NodeInst,
  type NodeIOGroupPath,
  type NodeOperatorGroup,
  type TimePointPath,
  type NodeType,
  type TimePoint,
  type ConceptPath,
  type Timeline,
  type DomainPath,
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

export function packDnDNodeInst(
  path: NodeIOGroupPath,
  nodeInstId: Id,
  type: NodeType
): string {
  return JSON.stringify({ path, nodeInstId, type });
}

export function packDnDNodeIOGroup(
  path: NodeOperatorGroupPath,
  ioGroupId: Id
): string {
  return JSON.stringify({ path, ioGroupId });
}

export function packDnDNodeOperatorGroup(
  path: TimePointPath,
  opGroupId: Id
): string {
  return JSON.stringify({ path, opGroupId });
}

export function packDnDTimePoint(path: ConceptPath, timePointId: Id): string {
  return JSON.stringify({ path, timePointId });
}

export function packDnDConcept(path: TimelinePath, conceptId: Id): string {
  return JSON.stringify({ path, conceptId });
}

export function packDnDTimeline(path: DomainPath, timelineId: Id): string {
  return JSON.stringify({ path, timelineId });
}

export function unpackDnDNodeInst(jsonData: string): DragNodeInstPayload {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeOperatorGroup(
  jsonData: string
): DragNodeOperatorGroupPayload {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeIOGroup(jsonData: string): DragNodeIOGroupPayload {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeIOTimePoint(
  jsonData: string
): DragTimePointPayload {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeIOConcept(jsonData: string): DragConceptPayload {
  return JSON.parse(jsonData);
}

export function unpackDnDNodeIOTimeline(jsonData: string): DragTimelinePayload {
  return JSON.parse(jsonData);
}
