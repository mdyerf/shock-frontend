"use client";

import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/app/api";
import DataGrid from "@/app/components/DataGrid";
import InputModal from "@/app/components/Modal";
import DiffusionInfo from "./DiffusionInfo";
import { DiffusionRow } from "../../types";
import { getGridColumns } from "../utils/columns";
import { useRouter } from "next/navigation";

function DiffusionGrid() {
  const navigate = useRouter();

  const { data: diffusions } = useQuery<DiffusionRow[]>({
    queryKey: ["diffusions"],
    queryFn: () => api.get("/diffusions").then((res) => res.data),
  });

  const [modalOpen, setModalOpen] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const columns = useMemo(
    () => getGridColumns(setModalOpen, setDeleteId),
    [setModalOpen, setDeleteId]
  );

  const handleDelete = useCallback(async () => {
    await api.delete(`/diffusions/${deleteId}/`);
    setDeleteId(null);
  }, [setDeleteId, deleteId]);

  return (
    <>
      <InputModal
        open={modalOpen !== null}
        text="Diffusion Info"
        submitText="View Graph"
        onSubmit={() => navigate.push(`/diffusion/${modalOpen}`)}
        closeText="Close"
        onClose={() => setModalOpen(null)}
      >
        <DiffusionInfo id={modalOpen as number} />
      </InputModal>
      <InputModal
        open={deleteId !== null}
        text="Are you sure?"
        onSubmit={handleDelete}
        onClose={() => setDeleteId(null)}
      >
        Delete Diffusion {deleteId}
      </InputModal>
      <DataGrid rows={diffusions ?? []} columns={columns} />
    </>
  );
}

export default DiffusionGrid;
