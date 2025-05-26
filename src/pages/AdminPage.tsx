import { GenericTable } from "@components/common/GenericTable";
import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";

type ManufacturedItem = {
  id: number;
  name: string;
  description: string;
};

const data: ManufacturedItem[] = [
  { id: 1, name: "Pizza", description: "Con jamón y queso" },
  { id: 2, name: "Empanada", description: "De carne cortada a cuchillo" },
];

export const AdminPage = () => {
  const columns = useMemo<MRT_ColumnDef<ManufacturedItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Nombre",
      },
      {
        accessorKey: "description",
        header: "Descripción",
      },
    ],
    []
  );

  return (
    <GenericTable
      title="Artículos Manufacturados"
      data={data}
      columns={columns}
    />
  );
};
