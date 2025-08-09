import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TT_POINTER, type ToolType } from "@/features/toolbar/types.ts";
import {
  NIS_INPUT,
  NIS_OPERATOR,
  NT_AGGREGATE,
  NT_COMMAND,
  NT_EVENT,
  NT_PROCESS,
  NT_TIMEOUT,
  NT_VIEW,
  type Concept,
  type Domain,
  type DragNodeInstPayload,
  type DropNodeInstPayload,
  type Id,
  type NodeInst,
  type IOGroup,
  type IOGroupPath,
  type OperatorGroup,
  type Timeline,
  type TimePoint,
  type DragIOGroupPayload,
  type DropIOGroupPayload,
  type OperatorGroupPath,
  type DragOperatorGroupPayload,
  type DropOperatorGroupPayload,
  type TimePointPath,
  type DragTimePointPayload,
  type DropTimePointPayload,
  type ConceptPath,
  type TimelinePath,
  type DragConceptPayload,
  type DropConceptPayload,
  type DragTimelinePayload,
  type DropTimelinePayload,
  type ObjectIdMap,
} from "./types.ts";
import {
  createConcept,
  createDomain,
  createNodeDef,
  createNodeInst,
  createIOGroup,
  createOperatorGroup,
  createTimeline,
  createTimePoint,
  removeWithId,
  insertAfterId,
} from "./util.ts";

export interface BoardState {
  currentDomainId: Id;
  currentTool: ToolType;
  domains: ObjectIdMap<Domain>;
  selectedId: Id;
}

const defaultDomain = createDomain(uuidv4(), "New Domain");

//////////////////
// DEBUG ONLY: fill out some domain data

const debugFooDomain = createDomain(uuidv4(), "Foo"); // DEBUG ONLY
const debugBarDomain = createDomain(uuidv4(), "Bar"); // DEBUG ONLY
debugFooDomain.comment = "An example of a domain comment.";
debugBarDomain.comment = "Another example of a domain comment.";
const someAggregate1 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_AGGREGATE,
  "Some Aggregate 1"
);
const someProcess1 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_PROCESS,
  "Some Process 1"
);
const someProcess2 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_PROCESS,
  "Some Process 2"
);
const someView1 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_VIEW,
  "Some View 1"
);
const someCommand1 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_COMMAND,
  "Do Something"
);
const someCommand2 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_COMMAND,
  "Do Something Else"
);
const someCommand3 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_COMMAND,
  "Do Another Thing"
);
const someCommand4 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_COMMAND,
  "Cancel Some Thing"
);
const someEvent1 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_EVENT,
  "Some Event 1"
);
const someEvent2 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_EVENT,
  "Some Event 2"
);
const someEvent3 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_EVENT,
  "Some Event 3"
);
const someEvent4 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_EVENT,
  "Some Event 4"
);
const someEvent5 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_EVENT,
  "Some Event 5"
);
const someTimeout1 = createNodeDef(
  defaultDomain.id,
  uuidv4(),
  NT_TIMEOUT,
  "Some Timeout 1"
);
defaultDomain.nodeDefinitions[someAggregate1.id] = someAggregate1;
defaultDomain.nodeDefinitions[someProcess1.id] = someProcess1;
defaultDomain.nodeDefinitions[someProcess2.id] = someProcess2;
defaultDomain.nodeDefinitions[someView1.id] = someView1;
defaultDomain.nodeDefinitions[someCommand1.id] = someCommand1;
defaultDomain.nodeDefinitions[someCommand2.id] = someCommand2;
defaultDomain.nodeDefinitions[someCommand3.id] = someCommand3;
defaultDomain.nodeDefinitions[someCommand4.id] = someCommand4;
defaultDomain.nodeDefinitions[someEvent1.id] = someEvent1;
defaultDomain.nodeDefinitions[someEvent2.id] = someEvent2;
defaultDomain.nodeDefinitions[someEvent3.id] = someEvent3;
defaultDomain.nodeDefinitions[someEvent4.id] = someEvent4;
defaultDomain.nodeDefinitions[someEvent5.id] = someEvent5;
defaultDomain.nodeDefinitions[someTimeout1.id] = someTimeout1;
// defaultDomain.timelines = []; // clear the initial placeholder?
defaultDomain.timelines.push(
  createTimeline(uuidv4(), [
    createConcept(
      uuidv4(),
      "Some example concept",
      "Some concept comment thing if needed",
      [
        // aggregate example 1 time point
        createTimePoint(uuidv4(), [
          createOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someAggregate1.id,
              uuidv4(),
              "Custom instance comment"
            ),
            [
              createIOGroup(
                uuidv4(),
                createNodeInst(defaultDomain.id, someCommand1.id, uuidv4()),
                [
                  createNodeInst(
                    defaultDomain.id,
                    someEvent1.id,
                    uuidv4(),
                    "When something specific happens"
                  ),
                  createNodeInst(
                    defaultDomain.id,
                    someEvent2.id,
                    uuidv4(),
                    "This is another node inst"
                  ),
                  createNodeInst(
                    defaultDomain.id,
                    someEvent3.id,
                    uuidv4(),
                    "node instances all the way down"
                  ),
                ]
              ),
              createIOGroup(
                uuidv4(),
                createNodeInst(defaultDomain.id, someCommand2.id, uuidv4()),
                [
                  createNodeInst(
                    defaultDomain.id,
                    someEvent4.id,
                    uuidv4(),
                    "This is another node inst"
                  ),
                  createNodeInst(
                    defaultDomain.id,
                    someEvent5.id,
                    uuidv4(),
                    "node instances all the way down"
                  ),
                ]
              ),
            ]
          ),
        ]),

        // process example 1 time point
        createTimePoint(uuidv4(), [
          // operator group 1
          createOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someProcess1.id,
              uuidv4(),
              "Custom instance comment"
            ),
            [
              createIOGroup(
                uuidv4(),
                createNodeInst(
                  defaultDomain.id,
                  someEvent1.id,
                  uuidv4(),
                  "Another node instance comment"
                ),
                [
                  createNodeInst(
                    defaultDomain.id,
                    someTimeout1.id,
                    uuidv4(),
                    "Scheduled"
                  ),
                ]
              ),
            ]
          ),

          // operator group 2
          createOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someProcess2.id,
              uuidv4(),
              "Some other process will handle a different event at this time point"
            ),
            [
              createIOGroup(
                uuidv4(),
                createNodeInst(defaultDomain.id, someEvent4.id, uuidv4()),
                [createNodeInst(defaultDomain.id, someCommand4.id, uuidv4())]
              ),
            ]
          ),
        ]),

        // view example 1 time point
        createTimePoint(uuidv4(), [
          createOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someView1.id,
              uuidv4(),
              "Some user action here"
            ),
            [
              createIOGroup(uuidv4(), undefined, [
                createNodeInst(
                  defaultDomain.id,
                  someCommand3.id,
                  uuidv4(),
                  "User wants to do something"
                ),
              ]),
            ]
          ),
        ]),

        // process example 2 time point
        createTimePoint(uuidv4(), [
          createOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someProcess1.id,
              uuidv4(),
              "Custom instance comment"
            ),
            [
              createIOGroup(
                uuidv4(),
                createNodeInst(
                  defaultDomain.id,
                  someTimeout1.id,
                  uuidv4(),
                  "Occurred"
                ),
                [createNodeInst(defaultDomain.id, someCommand4.id, uuidv4())]
              ),
            ]
          ),
        ]),

        // aggregate example 2 time point
        createTimePoint(uuidv4(), [
          createOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someAggregate1.id,
              uuidv4(),
              "Custom instance comment"
            ),
            [
              // the user command
              createIOGroup(
                uuidv4(),
                createNodeInst(defaultDomain.id, someCommand3.id, uuidv4()),
                [createNodeInst(defaultDomain.id, someEvent1.id, uuidv4())]
              ),

              // the timeout cancel command
              createIOGroup(
                uuidv4(),
                createNodeInst(defaultDomain.id, someCommand4.id, uuidv4()),
                [
                  createNodeInst(defaultDomain.id, someEvent2.id, uuidv4()),
                  createNodeInst(defaultDomain.id, someEvent3.id, uuidv4()),
                ]
              ),
            ]
          ),
        ]),

        // end examples
      ]
    ),
  ])
);

// END DEBUG ONLY
//////////////////

const initialState: BoardState = {
  currentDomainId: defaultDomain.id,
  currentTool: TT_POINTER,
  domains: {
    [defaultDomain.id]: defaultDomain,
    [debugFooDomain.id]: debugFooDomain, // DEBUG ONLY
    [debugBarDomain.id]: debugBarDomain, // DEBUG ONLY
  },
  selectedId: "",
};

const slice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addDomain: (
      state,
      action: PayloadAction<{
        id: Id;
        name: string;
      }>
    ) => {
      const { id, name } = action.payload;
      state.domains[id] = createDomain(id, name);
    },

    addTimeline: (
      state,
      action: PayloadAction<{
        domainId: Id;
        afterId: Id | undefined;
        id: Id;
      }>
    ) => {
      const { domainId, id, afterId } = action.payload;
      const timeline = createTimeline(id);
      insertAfterId(state.domains[domainId].timelines, afterId, timeline);
    },

    addConcept: (
      state,
      action: PayloadAction<{
        path: TimelinePath;
        afterId: Id | undefined;
        id: Id;
        name: string;
        comment?: string;
      }>
    ) => {
      const { path, afterId, id, name, comment } = action.payload;
      const timeline = getTimelineFromPath(state.domains[path.domainId], path);
      if (!timeline) return;
      const concept = createConcept(id, name, comment);
      insertAfterId(timeline.concepts, afterId, concept);
    },

    addTimePoint: (
      state,
      action: PayloadAction<{
        path: ConceptPath;
        afterId: Id | undefined;
        id: Id;
      }>
    ) => {
      const { path, afterId, id } = action.payload;
      const concept = getConceptFromPath(state.domains[path.domainId], path);
      if (!concept) return;
      const timePoint = createTimePoint(id);
      insertAfterId(concept.timePoints, afterId, timePoint);
    },

    addOperatorGroup: (
      state,
      action: PayloadAction<{
        path: TimePointPath;
        afterId: Id | undefined;
        id: Id;
      }>
    ) => {
      const { path, afterId, id } = action.payload;
      const timePoint = getTimePointFromPath(
        state.domains[path.domainId],
        path
      );
      if (!timePoint) return;
      const opGroup = createOperatorGroup(id);
      insertAfterId(timePoint.operatorGroups, afterId, opGroup);
    },

    addIOGroup: (
      state,
      action: PayloadAction<{
        path: OperatorGroupPath;
        afterId: Id | undefined;
        id: Id;
      }>
    ) => {
      const { path, afterId, id } = action.payload;
      const opGroup = getOperatorGroupFromPath(
        state.domains[path.domainId],
        path
      );
      if (!opGroup) return;
      const ioGroup = createIOGroup(id);
      insertAfterId(opGroup.ioGroups, afterId, ioGroup);
    },

    // import a single domain
    importDomain: (state, action: PayloadAction<{ domain: Domain }>) => {
      const { payload } = action;
      const { domain } = payload;
      state.domains[domain.id] = domain;
    },

    // import multiple domains
    importDomains: (
      state,
      action: PayloadAction<{
        domains: Domain[];
        shouldReset: boolean;
      }>
    ) => {
      const { payload } = action;
      const { domains, shouldReset } = payload;
      if (shouldReset) {
        state.currentDomainId = domains[0]?.id || "";
        state.domains = {};
        state.selectedId = "";
      }
      domains.forEach((domain) => {
        state.domains[domain.id] = domain;
      });
    },

    moveNodeInst: (
      state,
      action: PayloadAction<{
        source: DragNodeInstPayload;
        target: DropNodeInstPayload;
      }>
    ) => {
      const { source, target } = action.payload;

      // already in this place, ignore
      const nodeInstId = source.nodeInstId;
      if (nodeInstId === target.afterId) return;

      const sp = source.path;
      const tp = target.path;
      const sourceDomain = state.domains[sp.domainId];
      const targetDomain = state.domains[tp.domainId];
      if (!sourceDomain || !targetDomain) return;

      const nodeInst = getNodeInstFromPath(sourceDomain, sp, nodeInstId);
      if (!nodeInst) return;

      const removeFromSource = () => {
        if (sp.ioGroupId === undefined) {
          const sourceOpGroup = getOperatorGroupFromPath(sourceDomain, sp)!;
          sourceOpGroup.operatorNode = undefined;
        } else {
          const sourceIOGroup = getIOGroupFromPath(sourceDomain, sp)!;
          if (sourceIOGroup.input?.id === nodeInstId) {
            sourceIOGroup.input = undefined;
          } else {
            sourceIOGroup.outputs = removeWithId(
              sourceIOGroup.outputs,
              nodeInstId
            );
          }
        }
      };

      // first remove from source (known to exist), then add to target
      if (target.slot === NIS_OPERATOR && tp.ioGroupId === undefined) {
        // its an opt group
        const targetOpGroup = getOperatorGroupFromPath(targetDomain, tp);
        if (!targetOpGroup) return;

        removeFromSource();
        targetOpGroup.operatorNode = nodeInst;
      } else {
        // its an io group
        const targetIOGroup = getIOGroupFromPath(targetDomain, tp);
        if (!targetIOGroup) return;

        removeFromSource();

        if (target.slot === NIS_INPUT) {
          targetIOGroup.input = nodeInst;
        } else {
          insertAfterId(targetIOGroup.outputs, target.afterId, nodeInst);
        }
      }
    },

    moveIOGroup: (
      state,
      action: PayloadAction<{
        source: DragIOGroupPayload;
        target: DropIOGroupPayload;
      }>
    ) => {
      const { source, target } = action.payload;

      // already in this place, ignore
      const ioGroupId = source.ioGroupId;
      if (ioGroupId === target.afterId) return;

      const sourceDomain = state.domains[source.path.domainId];
      const targetDomain = state.domains[target.path.domainId];
      if (!sourceDomain || !targetDomain) return;
      const sourceOpGroup = getOperatorGroupFromPath(sourceDomain, source.path);
      if (!sourceOpGroup) return;
      const targetOpGroup = getOperatorGroupFromPath(targetDomain, target.path);
      if (!targetOpGroup) return;
      const ioGroup = getIOGroupFromOperatorGroup(sourceOpGroup, ioGroupId);
      if (!ioGroup) return;

      // first remove from source (known to exist), then add to target
      sourceOpGroup.ioGroups = removeWithId(sourceOpGroup.ioGroups, ioGroupId);
      insertAfterId(targetOpGroup.ioGroups, target.afterId, ioGroup);
    },

    moveOperatorGroup: (
      state,
      action: PayloadAction<{
        source: DragOperatorGroupPayload;
        target: DropOperatorGroupPayload;
      }>
    ) => {
      const { source, target } = action.payload;

      // already in this place, ignore
      const opGroupId = source.opGroupId;
      if (opGroupId === target.afterId) return;

      const sourceDomain = state.domains[source.path.domainId];
      const targetDomain = state.domains[target.path.domainId];
      if (!sourceDomain || !targetDomain) return;
      const sourceTimePoint = getTimePointFromPath(sourceDomain, source.path);
      if (!sourceTimePoint) return;
      const targetTimePoint = getTimePointFromPath(targetDomain, target.path);
      if (!targetTimePoint) return;
      const opGroup = getOperatorGroupFromTimePoint(sourceTimePoint, opGroupId);
      if (!opGroup) return;

      // first remove from source (known to exist), then add to target
      sourceTimePoint.operatorGroups = removeWithId(
        sourceTimePoint.operatorGroups,
        opGroupId
      );
      insertAfterId(targetTimePoint.operatorGroups, target.afterId, opGroup);
    },

    moveTimePoint: (
      state,
      action: PayloadAction<{
        source: DragTimePointPayload;
        target: DropTimePointPayload;
      }>
    ) => {
      const { source, target } = action.payload;

      // already in this place, ignore
      const timePointId = source.timePointId;
      if (timePointId === target.afterId) return;

      const sourceDomain = state.domains[source.path.domainId];
      const targetDomain = state.domains[target.path.domainId];
      if (!sourceDomain || !targetDomain) return;
      const sourceConcept = getConceptFromPath(sourceDomain, source.path);
      if (!sourceConcept) return;
      const targetConcept = getConceptFromPath(targetDomain, target.path);
      if (!targetConcept) return;
      const timePoint = getTimePointFromConcept(sourceConcept, timePointId);
      if (!timePoint) return;

      // first remove from source (known to exist), then add to target
      sourceConcept.timePoints = removeWithId(
        sourceConcept.timePoints,
        timePointId
      );
      insertAfterId(targetConcept.timePoints, target.afterId, timePoint);
    },

    moveConcept: (
      state,
      action: PayloadAction<{
        source: DragConceptPayload;
        target: DropConceptPayload;
      }>
    ) => {
      const { source, target } = action.payload;

      // already in this place, ignore
      const conceptId = source.conceptId;
      if (conceptId === target.afterId) return;

      const sourceDomain = state.domains[source.path.domainId];
      const targetDomain = state.domains[target.path.domainId];
      if (!sourceDomain || !targetDomain) return;
      const sourceTimeline = getTimelineFromPath(sourceDomain, source.path);
      if (!sourceTimeline) return;
      const targetTimeline = getTimelineFromPath(targetDomain, target.path);
      if (!targetTimeline) return;
      const concept = getConceptFromTimeline(sourceTimeline, conceptId);
      if (!concept) return;

      // first remove from source (known to exist), then add to target
      sourceTimeline.concepts = removeWithId(
        sourceTimeline.concepts,
        conceptId
      );
      insertAfterId(targetTimeline.concepts, target.afterId, concept);
    },

    moveTimeline: (
      state,
      action: PayloadAction<{
        source: DragTimelinePayload;
        target: DropTimelinePayload;
      }>
    ) => {
      const { source, target } = action.payload;

      // already in this place, ignore
      const timelineId = source.timelineId;
      if (timelineId === target.afterId) return;

      const sourceDomain = state.domains[source.path.domainId];
      const targetDomain = state.domains[target.path.domainId];
      if (!sourceDomain || !targetDomain) return;
      const timeline = getTimelineFromDomain(sourceDomain, timelineId);
      if (!timeline) return;

      // first remove from source (known to exist), then add to target
      sourceDomain.timelines = removeWithId(sourceDomain.timelines, timelineId);
      insertAfterId(targetDomain.timelines, target.afterId, timeline);
    },

    selectId: (state, action: PayloadAction<{ id: Id }>) => {
      state.selectedId = action.payload.id;
    },

    switchTool: (state, action: PayloadAction<{ tool: ToolType }>) => {
      state.currentTool = action.payload.tool;
    },

    switchDomain: (state, action: PayloadAction<{ domainId: Id }>) => {
      const domainId = action.payload.domainId;
      if (state.domains[domainId]) {
        state.currentDomainId = domainId;
      }
    },
  },
});

export const {
  addDomain,
  addTimeline,
  addConcept,
  addTimePoint,
  addOperatorGroup,
  addIOGroup,
  moveConcept,
  moveIOGroup,
  moveNodeInst,
  moveOperatorGroup,
  moveTimePoint,
  moveTimeline,
  selectId,
  switchDomain,
  switchTool,
} = slice.actions;
export default slice;

// state helpers...

function getTimelineFromPath(
  domain: Domain,
  path: TimelinePath
): Timeline | undefined {
  return getTimelineFromDomain(domain, path.timelineId);
}

function getConceptFromPath(
  domain: Domain,
  path: ConceptPath
): Concept | undefined {
  const timeline = getTimelineFromPath(domain, path);
  if (!timeline) return undefined;
  return getConceptFromTimeline(timeline, path.conceptId);
}

function getTimePointFromPath(
  domain: Domain,
  path: TimePointPath
): TimePoint | undefined {
  const concept = getConceptFromPath(domain, path);
  if (!concept) return undefined;
  return getTimePointFromConcept(concept, path.timePointId);
}

function getOperatorGroupFromPath(
  domain: Domain,
  path: OperatorGroupPath
): OperatorGroup | undefined {
  const timePoint = getTimePointFromPath(domain, path);
  if (!timePoint) return undefined;
  return getOperatorGroupFromTimePoint(timePoint, path.opGroupId);
}

function getIOGroupFromPath(
  domain: Domain,
  path: IOGroupPath
): IOGroup | undefined {
  const opGroup = getOperatorGroupFromPath(domain, path);
  if (!opGroup) return undefined;
  return getIOGroupFromOperatorGroup(opGroup, path.ioGroupId);
}

function getNodeInstFromPath(
  domain: Domain,
  path: IOGroupPath,
  nodeInstId: Id
): NodeInst | undefined {
  const opGroup = getOperatorGroupFromPath(domain, path);
  if (!opGroup) return undefined;
  return getNodeInstFromOperatorGroup(opGroup, nodeInstId);
}

function getTimelineFromDomain(
  domain: Domain,
  timelineId: Id
): Timeline | undefined {
  return domain.timelines.find(({ id }) => id === timelineId) as Timeline;
}

function getConceptFromTimeline(
  timeline: Timeline,
  conceptId: Id
): Concept | undefined {
  return timeline.concepts.find(({ id }) => id === conceptId) as Concept;
}

function getTimePointFromConcept(
  concept: Concept,
  timePointId: Id
): TimePoint | undefined {
  return concept.timePoints.find(({ id }) => id === timePointId) as TimePoint;
}

function getOperatorGroupFromTimePoint(
  timePoint: TimePoint,
  opGroupId: Id
): OperatorGroup | undefined {
  return timePoint.operatorGroups.find(
    ({ id }) => id === opGroupId
  ) as OperatorGroup;
}

function getIOGroupFromOperatorGroup(
  opGroup: OperatorGroup,
  ioGroupId: Id
): IOGroup | undefined {
  const ioGroups = opGroup.ioGroups;
  for (let ioGroupIndex = 0; ioGroupIndex < ioGroups.length; ioGroupIndex++) {
    const ioGroup = ioGroups[ioGroupIndex];
    if (ioGroup.id === ioGroupId) {
      return ioGroup;
    }
  }
  return undefined;
}

function getNodeInstFromOperatorGroup(
  opGroup: OperatorGroup,
  nodeInstId: Id
): NodeInst | undefined {
  if (opGroup.operatorNode?.id === nodeInstId) {
    return opGroup.operatorNode;
  }
  return getNodeInstFromIOGroups(opGroup.ioGroups, nodeInstId);
}

function getNodeInstFromIOGroups(
  ioGroups: IOGroup[],
  nodeInstId: Id
): NodeInst | undefined {
  for (let ioGroupIndex = 0; ioGroupIndex < ioGroups.length; ioGroupIndex++) {
    const nodeInst = getNodeInstFromIOGroup(ioGroups[ioGroupIndex], nodeInstId);
    if (nodeInst) return nodeInst;
  }
  return undefined;
}

function getNodeInstFromIOGroup(
  ioGroup: IOGroup,
  nodeInstId: Id
): NodeInst | undefined {
  if (ioGroup.input?.id === nodeInstId) {
    return ioGroup.input;
  }

  const outputs = ioGroup.outputs;
  for (let outputIndex = 0; outputIndex < outputs.length; outputIndex++) {
    const output = outputs[outputIndex];
    if (output.id === nodeInstId) {
      return output;
    }
  }

  return undefined;
}
