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
} from "./util.ts";

export interface BoardState {
  currentDomainId: Id;
  currentTool: ToolType;
  domains: { [key: Id]: Domain };
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
defaultDomain.nodesDefinitions[someAggregate1.id] = someAggregate1;
defaultDomain.nodesDefinitions[someProcess1.id] = someProcess1;
defaultDomain.nodesDefinitions[someProcess2.id] = someProcess2;
defaultDomain.nodesDefinitions[someView1.id] = someView1;
defaultDomain.nodesDefinitions[someCommand1.id] = someCommand1;
defaultDomain.nodesDefinitions[someCommand2.id] = someCommand2;
defaultDomain.nodesDefinitions[someCommand3.id] = someCommand3;
defaultDomain.nodesDefinitions[someCommand4.id] = someCommand4;
defaultDomain.nodesDefinitions[someEvent1.id] = someEvent1;
defaultDomain.nodesDefinitions[someEvent2.id] = someEvent2;
defaultDomain.nodesDefinitions[someEvent3.id] = someEvent3;
defaultDomain.nodesDefinitions[someEvent4.id] = someEvent4;
defaultDomain.nodesDefinitions[someEvent5.id] = someEvent5;
defaultDomain.nodesDefinitions[someTimeout1.id] = someTimeout1;
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
        id?: Id;
        name: string;
      }>
    ) => {
      const { id = uuidv4(), name } = action.payload;
      state.domains[id] = createDomain(id, name);
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
        state.domains = {};
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
      const sp = source.path;
      const tp = target.path;
      const sourceDomain = state.domains[sp.domainId];
      const targetDomain = state.domains[tp.domainId];

      const nodeInstId = source.nodeInstId;
      const nodeInst = getNodeInstFromPath(sourceDomain, sp, nodeInstId);
      if (!nodeInst) {
        console.warn("Node Instance not found in path.");
        return;
      }

      const removeFromSource = () => {
        if (sp.ioGroupId === undefined) {
          const sourceOpGroup = getOperatorGroupFromPath(sourceDomain, sp)!;
          sourceOpGroup.operatorNode = undefined;
        } else {
          const sourceIOGroup = getIOGroupFromPath(sourceDomain, sp)!;
          if (sourceIOGroup.input?.id === nodeInstId) {
            sourceIOGroup.input = undefined;
          } else {
            sourceIOGroup.outputs = sourceIOGroup.outputs.filter(
              ({ id }) => id !== nodeInstId
            );
          }
        }
      };

      // first remove from source (known to exist), then add to target
      if (target.slot === NIS_OPERATOR && tp.ioGroupId === undefined) {
        // its an opt group
        const targetOpGroup = getOperatorGroupFromPath(targetDomain, tp);
        if (!targetOpGroup) {
          console.warn("Target Operator Group not found in path.");
          return;
        }

        removeFromSource();
        targetOpGroup.operatorNode = nodeInst;
      } else {
        // its an io group
        const targetIOGroup = getIOGroupFromPath(targetDomain, tp);
        if (!targetIOGroup) {
          console.warn("Target IO Group not found in path.");
          return;
        }

        removeFromSource();

        if (target.slot === NIS_INPUT) {
          targetIOGroup.input = nodeInst;
        } else {
          const outputs = targetIOGroup.outputs;
          const afterId = target.afterId;
          const afterIndex = outputs.findIndex(({ id }) => id === afterId);
          if (afterIndex === -1) {
            targetIOGroup.outputs.splice(0, 0, nodeInst);
          } else {
            targetIOGroup.outputs.splice(afterIndex + 1, 0, nodeInst);
          }
        }
      }
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

export const { moveNodeInst, selectId, switchDomain, switchTool } =
  slice.actions;
export default slice;

// helpers...

function getNodeInstFromPath(
  domain: Domain,
  path: IOGroupPath,
  nodeInstId: Id
): NodeInst | undefined {
  const opGroup = getOperatorGroupFromPath(domain, path);
  if (!opGroup) return undefined;

  return getNodeInstFromOperatorGroup(opGroup, nodeInstId);
}

function getOperatorGroupFromPath(
  domain: Domain,
  path: IOGroupPath
): OperatorGroup | undefined {
  const { timelineId, conceptId, timePointId, opGroupId } = path;

  const timeline = getTimelineFromDomain(domain, timelineId);
  if (!timeline) return undefined;

  const concept = getConceptFromTimeline(timeline, conceptId);
  if (!concept) return undefined;

  const timePoint = getTimePointFromConcept(concept, timePointId);
  if (!timePoint) return undefined;

  return getOperatorGroupFromTimePoint(timePoint, opGroupId);
}

function getIOGroupFromPath(
  domain: Domain,
  path: IOGroupPath
): IOGroup | undefined {
  const opGroup = getOperatorGroupFromPath(domain, path);
  if (!opGroup) return undefined;

  return getIOGroupFromOperatorGroup(opGroup, path.ioGroupId);
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
