import {
  MaterialReactTable,
  useMaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
  type MRT_TableOptions,
} from "material-react-table";

type GenericTableProps<T extends object> = {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  muiTableBodyRowProps?: MaterialReactTableProps<T>["muiTableBodyRowProps"];
};

export const GenericTable = <T extends object>({
  data,
  columns,
  enableGlobalFilter = true,
  enableColumnFilters = true,
  enableSorting = true,
  enablePagination = true,
  muiTableBodyRowProps = {},
}: GenericTableProps<T>) => {
  // Crear la tabla con las columnas, los datos y los filtros
  const table = useMaterialReactTable<T>({
    columns,
    data,
    enableGlobalFilter,
    enableColumnFilters,
    enableSorting,
    enablePagination,
    muiTableBodyRowProps,
  } as MRT_TableOptions<T>);

  return <MaterialReactTable table={table} />;
};
