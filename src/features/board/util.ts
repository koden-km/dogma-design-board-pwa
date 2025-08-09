import { v4 as uuidv4 } from "uuid";
import {
  type Concept,
  type TimelinePath,
  type Domain,
  type DragConceptPayload,
  type DragIOGroupPayload,
  type DragNodeInstPayload,
  type DragOperatorGroupPayload,
  type DragTimePointPayload,
  type DragTimelinePayload,
  type Id,
  type IssueComment,
  type IssueThread,
  type NodeDef,
  type IOGroup,
  type OperatorGroupPath,
  type NodeInst,
  type IOGroupPath,
  type OperatorGroup,
  type TimePointPath,
  type NodeType,
  type TimePoint,
  type ConceptPath,
  type Timeline,
  type DomainPath,
  type ObjectIdMap,
} from "./types.ts";

export function insertAfterId<T extends { id: Id }>(
  items: T[],
  afterId: Id | undefined,
  item: T
) {
  const afterIndex = items.findIndex(({ id }) => id === afterId);
  if (afterIndex === -1) {
    items.splice(0, 0, item);
  } else {
    items.splice(afterIndex + 1, 0, item);
  }
}

export function removeWithId<T extends { id: Id }>(
  items: T[],
  removeId: Id
): T[] {
  return items.filter(({ id }) => id !== removeId);
}

export function createDomain(
  id: Id,
  name: string,
  nodeDefinitions: ObjectIdMap<NodeDef> = {}
): Domain {
  return {
    id,
    name,
    comment: "",
    issueThreads: {},
    timelines: [createTimeline()], // create a default timeline
    nodeDefinitions,
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
        "Start by adding the business domain events to the board in a rough time order. They can be moved around as needed."
      )
    );
  }

  return { id, concepts };
}

// a grouping system for a bunch of time points on a timeline
export function createConcept(
  id: Id,
  name: string,
  comment: string = "",
  timePoints: TimePoint[] = []
): Concept {
  if (timePoints.length === 0) {
    timePoints.push(createTimePoint(uuidv4()));
  }
  return { id, name, comment, timePoints };
}

// messages that can occur during a time point and the operator that consumes or produces those messages at that time point
export function createTimePoint(
  id: Id = uuidv4(),
  operatorGroups: OperatorGroup[] = []
): TimePoint {
  if (operatorGroups.length === 0) {
    operatorGroups.push(createOperatorGroup(uuidv4()));
  }

  return { id, operatorGroups };
}

export function createOperatorGroup(
  id: Id = uuidv4(),
  operatorNode?: NodeInst,
  ioGroups: IOGroup[] = []
): OperatorGroup {
  if (ioGroups.length === 0) {
    ioGroups.push(createIOGroup(uuidv4()));
  }

  return { id, operatorNode, ioGroups };
}

export function createIOGroup(
  id: Id = uuidv4(),
  input?: NodeInst,
  outputs: NodeInst[] = []
): IOGroup {
  return { id, input, outputs };
}

// node definition
export function createNodeDef(
  domainId: Id,
  id: Id,
  type: NodeType,
  name: string
): NodeDef {
  return { domainId, id, name, type };
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
  path: IOGroupPath,
  nodeInstId: Id,
  type: NodeType
): string {
  return JSON.stringify({ path, nodeInstId, type });
}

export function packDnDIOGroup(path: OperatorGroupPath, ioGroupId: Id): string {
  return JSON.stringify({ path, ioGroupId });
}

export function packDnDOperatorGroup(
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

export function unpackDnDOperatorGroup(
  jsonData: string
): DragOperatorGroupPayload {
  return JSON.parse(jsonData);
}

export function unpackDnDIOGroup(jsonData: string): DragIOGroupPayload {
  return JSON.parse(jsonData);
}

export function unpackDnDTimePoint(jsonData: string): DragTimePointPayload {
  return JSON.parse(jsonData);
}

export function unpackDnDConcept(jsonData: string): DragConceptPayload {
  return JSON.parse(jsonData);
}

export function unpackDnDTimeline(jsonData: string): DragTimelinePayload {
  return JSON.parse(jsonData);
}
