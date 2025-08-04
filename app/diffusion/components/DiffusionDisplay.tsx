"use client";

import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GroupsModal from "./GroupsModal";
import FiltersModal from "./FiltersModal";
import cytoscape, { Core } from "cytoscape";
import coseBilkent from "cytoscape-cose-bilkent";
import dagre from "cytoscape-dagre";
import klay from "cytoscape-klay";
import NodesGrid from "./NodesGrid";
import { IterationRow } from "@/app/types";

cytoscape.use(dagre);
cytoscape.use(klay);
cytoscape.use(coseBilkent);

const layoutOptions = {
  name: "klay",
  rankDir: "LR", // 🔁 Left to Right
  nodeSep: 50, // Space between nodes
  edgeSep: 10, // Space between edges
  rankSep: 100, // Space between ranks (depth)
  animate: true,
};

const style = [
  {
    selector: "node",
    style: {
      "background-color": "#00bcd4",
      label: "data(label)",
      color: "#ffffff",
      "text-outline-color": "#00bcd4",
      "text-outline-width": 2,
      "font-size": 14,
    },
  },
  {
    selector: "edge",
    style: {
      width: 2,
      "line-color": "#90caf9",
      "target-arrow-color": "#90caf9",
      "target-arrow-shape": "triangle",
      "curve-style": "bezier",
      label: "data(label)",
      "font-size": 12,
      color: "#ffffff",
      "text-background-color": "#000000",
      "text-background-opacity": 1,
      "text-background-padding": 2,
      "text-margin-y": -5,
    },
  },
  {
    selector: ":selected",
    style: {
      "background-color": "#ffeb3b",
      "line-color": "#ffeb3b",
      "target-arrow-color": "#ffeb3b",
      "source-arrow-color": "#ffeb3b",
    },
  },
];

type DisplayMode = "table" | "graph";

interface IProps {
  graphs: {
    nodes: { id: string }[];
    edges: { source: string; target: string; weight: number }[];
  }[];
  tables: {
    iteration: number;
    rows: IterationRow[];
  }[];
}

const DiffusionDisplay: FC<IProps> = ({ graphs, tables }) => {
  const cyRef = useRef<Core | null>(null);

  const [iteration, setIteration] = useState(0);
  const [showGroupsModal, setShowGroupsModal] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [display, setDisplay] = useState<DisplayMode>("table");

  const elements = useMemo(
    () =>
      graphs?.length
        ? [
            ...graphs[iteration].nodes.map(({ id }) => ({
              data: { id, label: id },
            })),
            ...graphs[iteration].edges.map(({ source, target, weight }) => ({
              data: { source, target, label: `${weight}` },
            })),
          ]
        : [],
    [graphs, iteration]
  );

  const rows = useMemo(
    () => (tables?.length ? tables[iteration].rows : []),
    [tables, iteration]
  );

  useEffect(() => {
    if (cyRef.current) {
      const layout = cyRef.current.layout(layoutOptions);
      layout.run();
    }
  }, [elements]);

  return (
    <>
      <GroupsModal
        open={showGroupsModal}
        onClose={() => setShowGroupsModal(false)}
      />
      <FiltersModal
        open={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
      />
      <Stack width="100%" height="100%" gap={2}>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" gap={1}>
            <Select
              value={display}
              label="Display"
              onChange={(e) => setDisplay(e.target.value as DisplayMode)}
            >
              <MenuItem value="table">Table</MenuItem>
              <MenuItem value="graph">Graph</MenuItem>
            </Select>
            <Button onClick={() => setShowGroupsModal(true)}>Groups</Button>
            <Button onClick={() => setShowFiltersModal(true)}>Filters</Button>
          </Stack>
          <Typography>Diffusion Name</Typography>
          <Button variant="contained" color="primary">
            Refetch
          </Button>
        </Stack>
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton onClick={() => setIteration((it) => Math.max(it - 1, 0))}>
            <ChevronLeftIcon />
          </IconButton>
          <LinearProgress
            variant="determinate"
            value={((iteration + 1) * 100) / graphs.length}
            sx={{ width: "100%" }}
          />
          <IconButton
            onClick={() =>
              setIteration((it) => Math.min(it + 1, graphs.length - 1))
            }
          >
            <ChevronRightIcon />
          </IconButton>
        </Stack>

        <Box flex={1}>
          {display === "graph" && (
            <CytoscapeComponent
              elements={elements}
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid gray",
              }}
              layout={layoutOptions}
              stylesheet={style}
              cy={(cy) => {
                cyRef.current = cy;
              }}
            />
          )}
          {display === "table" && <NodesGrid rows={rows} />}
        </Box>
      </Stack>
    </>
  );
};
export default DiffusionDisplay;
