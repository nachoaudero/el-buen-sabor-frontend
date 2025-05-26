import {
  MaterialReactTable,
  useMaterialReactTable,
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
  title?: string;
};

export const GenericTable = <T extends object>({
  data,
  columns,
  enableGlobalFilter = true,
  enableColumnFilters = true,
  enableSorting = true,
  enablePagination = true,
  title,
}: GenericTableProps<T>) => {
  const table = useMaterialReactTable<T>({
    columns,
    data,
    enableGlobalFilter,
    enableColumnFilters,
    enableSorting,
    enablePagination,
  } as MRT_TableOptions<T>);

  return (
    <>
      {title && <h2>{title}</h2>}
      <MaterialReactTable table={table} />
    </>
  );
};
