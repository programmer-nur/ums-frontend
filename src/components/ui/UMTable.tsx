import { Button, Table } from "antd";
interface ITableProps {
  loading?: boolean;
  columns: any;
  pageSize?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  dataSource: any;
  showPagination?:boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
}


const UMTable = ({
  loading = false,
  columns,
  dataSource,
  pageSize,
  totalPages,
  showPagination=true,
  showSizeChanger= true,
  onPaginationChange,
  onTableChange,
}: ITableProps) => {

  const paginationConfig = showPagination ?{
    pageSize:pageSize,
    total: totalPages,
    pageSizeOptions: [5, 10, 20],
    showSizeChanger,
    onChange: onPaginationChange,
  }: false;

  return (
    <Table
    loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
    />
  );
};
export default UMTable;
