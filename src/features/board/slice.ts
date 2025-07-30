import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TT_POINTER, type ToolType } from "@/features/toolbar/types.ts";
import {
  NT_AGGREGATE,
  NT_COMMAND,
  NT_EVENT,
  NT_PROCESS,
  NT_TIMEOUT,
  NT_VIEW,
  type Domain,
  type Id,
} from "./types.ts";
import {
  createConcept,
  createDomain,
  createNodeDef,
  createNodeInst,
  createNodeIOGroup,
  createNodeOperatorGroup,
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
          createNodeOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someAggregate1.id,
              uuidv4(),
              "Custom instance comment"
            ),
            [
              createNodeIOGroup(
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
              createNodeIOGroup(
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
          createNodeOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someProcess1.id,
              uuidv4(),
              "Custom instance comment"
            ),
            [
              createNodeIOGroup(
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
          createNodeOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someProcess2.id,
              uuidv4(),
              "Some other process will handle a different event at this time point"
            ),
            [
              createNodeIOGroup(
                uuidv4(),
                createNodeInst(defaultDomain.id, someEvent4.id, uuidv4()),
                [createNodeInst(defaultDomain.id, someCommand4.id, uuidv4())]
              ),
            ]
          ),
        ]),

        // view example 1 time point
        createTimePoint(uuidv4(), [
          createNodeOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someView1.id,
              uuidv4(),
              "Some user action here"
            ),
            [
              createNodeIOGroup(uuidv4(), undefined, [
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
          createNodeOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someProcess1.id,
              uuidv4(),
              "Custom instance comment"
            ),
            [
              createNodeIOGroup(
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
          createNodeOperatorGroup(
            uuidv4(),
            createNodeInst(
              defaultDomain.id,
              someAggregate1.id,
              uuidv4(),
              "Custom instance comment"
            ),
            [
              // the user command
              createNodeIOGroup(
                uuidv4(),
                createNodeInst(defaultDomain.id, someCommand3.id, uuidv4()),
                [createNodeInst(defaultDomain.id, someEvent1.id, uuidv4())]
              ),

              // the timeout cancel command
              createNodeIOGroup(
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
    selectId: (state, action: PayloadAction<{ id: Id }>) => {
      const { payload } = action;
      state.selectedId = payload.id;
    },

    switchTool: (state, action: PayloadAction<{ tool: ToolType }>) => {
      const { payload } = action;
      state.currentTool = payload.tool;
    },

    switchDomain: (state, action: PayloadAction<{ domainId: Id }>) => {
      const { payload } = action;
      const domainId = payload.domainId;
      if (state.domains[domainId]) {
        state.currentDomainId = domainId;
      }
    },

    addDomain: (
      state,
      action: PayloadAction<{
        id?: Id;
        name: string;
      }>
    ) => {
      const { payload } = action;
      const { id = uuidv4(), name } = payload;
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
  },
});

export const { selectId, switchDomain, switchTool } = slice.actions;
export default slice;
