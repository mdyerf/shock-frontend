"use client";

import { FC, useCallback, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  gridFilteredSortedRowEntriesSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import { Box, Button, Stack, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IterationRow } from "@/app/types";
import InputModal from "@/app/components/Modal";
import CytoscapeComponent from "react-cytoscapejs";

interface IProps {
  rows: IterationRow[];
}

const NodesGrid: FC<IProps> = ({ rows }) => {
  const apiRef = useGridApiRef();

  const [filterModel, setFilterModel] = useState({ items: [] as any[] });
  const [modalOpen, setModalOpen] = useState(false);
  const [graphElements, setGraphElements] = useState<any[]>([]);

  const handleCellClick: GridEventListener<"cellClick"> = useCallback(
    (params) => {
      if (params.field === "parentId" && params.value != null) {
        setFilterModel({
          items: [
            {
              id: 1,
              field: "shockId",
              operator: "equals",
              value: params.value.toString(),
            },
          ],
        });
      }

      if (params.field === "shockId" && params.value != null) {
        setFilterModel({
          items: [
            {
              id: 2,
              field: "parentId",
              operator: "equals",
              value: params.value.toString(),
            },
          ],
        });
      }
    },
    []
  );

  const handleExport = useCallback(() => {
    const visibleRows = gridFilteredSortedRowEntriesSelector(apiRef);
    const data = visibleRows.map((row) => row.model);

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Nodes");

    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "nodes_export.xlsx");
  }, [apiRef]);

  const buildGraphElements = useCallback(
    (row: IterationRow) => {
      const elements: { data: any }[] = [];
      const addedNodes = new Set<string>();

      const addNodeAndParents = (currentRow: IterationRow) => {
        if (addedNodes.has(currentRow.shockId)) return;

        elements.push({
          data: { id: currentRow.shockId, label: currentRow.shockId },
        });
        addedNodes.add(currentRow.shockId);

        const parentIds: string[] = Array.isArray(currentRow.parentId)
          ? currentRow.parentId
          : currentRow.parentId
            ? [currentRow.parentId]
            : [];

        parentIds.forEach((parentId) => {
          const parentRow = rows.find((r) => r.shockId === parentId);
          if (!parentRow) return;

          elements.push({
            data: {
              source: parentRow.shockId,
              target: currentRow.shockId,
              label: "parent",
            },
          });

          addNodeAndParents(parentRow);
        });
      };

      addNodeAndParents(row);

      setGraphElements(elements);
      setModalOpen(true);
    },
    [rows]
  );

  const columns: GridColDef[] = [
    { field: "Iteration", headerName: "Iteration", flex: 0.75 },
    { field: "id", headerName: "Row Id", flex: 0.75 },
    {
      field: "shockId",
      headerName: "Shock Id",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" gap={1} alignItems="center">
          <Typography>{params.value}</Typography>
          <Button variant="outlined">View Children</Button>
        </Stack>
      ),
    },
    {
      field: "parentId",
      headerName: "Parents Ids",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" gap={1} alignItems="center">
          <Typography>{params.value}</Typography>
          <Button variant="outlined">View Parents</Button>
        </Stack>
      ),
    },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "destination", headerName: "Destination", flex: 1 },
    { field: "shockType", headerName: "Shock Type", flex: 0.75 },
    { field: "value", headerName: "Shock Value", flex: 0.75 },
    { field: "comment", headerName: "Comment", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => buildGraphElements(params.row)}
        >
          View History
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" mb={1}>
        <Button variant="contained" size="small" onClick={handleExport}>
          Export to Excel
        </Button>
      </Stack>

      <Box height={450}>
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          filterModel={filterModel}
          onFilterModelChange={setFilterModel}
          onCellClick={handleCellClick}
        />
      </Box>

      <InputModal
        open={modalOpen}
        text="View Node History"
        onClose={() => setModalOpen(false)}
      >
        <Box sx={{ width: "600px", height: "400px" }}>
          <CytoscapeComponent
            elements={graphElements}
            style={{ width: "100%", height: "100%" }}
            layout={{ name: "breadthfirst" }}
            stylesheet={[
              {
                selector: "node",
                style: { label: "data(label)", "text-valign": "center" },
              },
              {
                selector: "edge",
                style: {
                  label: "data(label)",
                  "curve-style": "bezier",
                  "target-arrow-shape": "triangle",
                },
              },
            ]}
          />
        </Box>
      </InputModal>
    </Box>
  );
};

export default NodesGrid;
