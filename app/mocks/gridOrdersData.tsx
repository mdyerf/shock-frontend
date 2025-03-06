import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { GridCellParams, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import Link from "next/link";
import { Typography } from "@mui/material";

type SparkLineData = number[];

function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString("en-US", {
    month: "short",
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

function renderSparklineCell(params: GridCellParams<SparkLineData, any>) {
  const data = getDaysInMonth(4, 2024);
  const { value, colDef } = params;

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
      <SparkLineChart
        data={value}
        width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={["hsl(210, 98%, 42%)"]}
        xAxis={{
          scaleType: "band",
          data,
        }}
      />
    </div>
  );
}

function renderStatus(status: "Done" | "Running" | "Not Started") {
  const colors: { [index: string]: "success" | "primary" | "warning" } = {
    Done: "success",
    Running: "primary",
    "Not Started": "warning",
  };

  return <Chip label={status} color={colors[status]} size="small" />;
}

function renderLink({ id, name }: { id: number; name: string }) {
  return <Link href={`/integration/${id}`}>{name}</Link>;
}

function renderList(list: string[], limit = 3) {
  const limited = list.length > limit;
  return (
    <Typography variant="body1">
      {(limited ? list.slice(3) : list).join(", ")}
      {limited && ", ..."}
    </Typography>
  );
}

export function renderAvatar(
  params: GridCellParams<{ name: string; color: string }, any, any>
) {
  if (params.value == null) {
    return "";
  }

  return (
    <Avatar
      sx={{
        backgroundColor: params.value.color,
        width: "24px",
        height: "24px",
        fontSize: "0.85rem",
      }}
    >
      {params.value.name.toUpperCase().substring(0, 1)}
    </Avatar>
  );
}

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Integration Name",
    flex: 1.5,
    minWidth: 200,
    renderCell: (params) => renderLink({ id: params.id as number, name: params.value }),
  },
  {
    field: "status",
    headerName: "Execution",
    flex: 1,
    minWidth: 80,
    renderCell: (params) => renderStatus(params.value as any),
  },
  {
    field: "parent",
    headerName: "Parent",
    flex: 1,
    renderCell: (params) => renderLink(params.value as any),
  },
  {
    field: "children",
    headerName: "Children Count",
    flex: 1,
  },
  {
    field: "groups",
    headerName: "Groups",
    flex: 1,
    minWidth: 100,
    renderCell: (params) => renderList(params.value as any),
  },
];

export const rows: GridRowsProp = [
  {
    id: 1,
    name: "Grouping 5 + 1",
    status: "Done",
    parent: {
      id: 1,
      name: "2016",
    },
    children: 1,
    groups: ["5 + 1"],
  },
  {
    id: 2,
    name: "Grouping All Industries",
    status: "Running",
    parent: {
      id: 1,
      name: "2016",
    },
    children: 1,
    groups: ["AUS", "US", "IRI", "CHN", "GER", "AFG"],
  },
  {
    id: 3,
    name: "First and Third World Countries",
    status: "Not Started",
    parent: {
      id: 1,
      name: "2016",
    },
    children: 1,
    groups: ["First", "Third", "ROW"],
  },
];
