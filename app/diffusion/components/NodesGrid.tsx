"use client";

import { FC, useCallback, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  gridFilteredSortedRowEntriesSelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  Box,
  Button,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { IterationRow } from "@/app/types";
import InputModal from "@/app/components/Modal";

interface IProps {
  rows: IterationRow[];
}

const NodesGrid: FC<IProps> = ({ rows }) => {
  const apiRef = useGridApiRef();

  const [filterModel, setFilterModel] = useState({ items: [] as any[] });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IterationRow | null>(null);

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

  const renderAccordion = (row: IterationRow) => {
    if (!row) return null;

    const parentIds: string[] = Array.isArray(row.parentId)
      ? row.parentId
      : row.parentId
      ? [row.parentId]
      : [];

    const parentRows = parentIds
      .map((pid) => rows.find((r) => r.shockId === pid))
      .filter(Boolean) as IterationRow[];

    return (
      <Accordion key={row.id} disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Typography variant="body2">Row ID: {row.id}</Typography>
            <Typography variant="body2">Source: {row.source}</Typography>
            <Typography variant="body2">Destination: {row.destination}</Typography>
            <Typography variant="body2">Value: {row.value}</Typography>
            <Typography variant="body2">Type: {row.shockType}</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>Parents:</Typography>
          {parentRows.length > 0 ? (
            parentRows.map((p) => renderAccordion(p))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No Parents
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    );
  };

  const handleViewHistory = (row: IterationRow) => {
    setSelectedRow(row);
    setModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "Iteration", headerName: "Iteration", flex: 0.75 },
    { field: "id", headerName: "Row Id", flex: 0.75 },
    {
      field: "shockId",
      headerName: "Shock Id",
      flex: 1.25,
      renderCell: (params) => (
        <Stack direction="row" gap={1} alignItems="center" flexWrap="nowrap">
          <Typography>{params.value}</Typography>
          <Button size="small" variant="outlined">Children</Button>
        </Stack>
      ),
    },
    {
      field: "parentId",
      headerName: "Parents Ids",
      flex: 1.25,
      renderCell: (params) => (
        <Stack direction="row" gap={1} alignItems="center" flexWrap="nowrap">
          <Typography>{params.value}</Typography>
          <Button variant="outlined" size="small">Parents</Button>
        </Stack>
      ),
    },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "destination", headerName: "Destination", flex: 1 },
    { field: "shockType", headerName: "Type", flex: 0.75 },
    { field: "value", headerName: "Value", flex: 0.75 },
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
          onClick={() => handleViewHistory(params.row)}
        >
          History
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

      <Box height={450} sx={{ overflowX: 'auto' }}>
        <DataGrid
          style={{ minWidth: "1000px" }}
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
        <Box sx={{ width: "600px", maxHeight: "400px", overflowY: "auto" }}>
          {selectedRow && renderAccordion(selectedRow)}
        </Box>
      </InputModal>
    </Box>
  );
};

export default NodesGrid;
