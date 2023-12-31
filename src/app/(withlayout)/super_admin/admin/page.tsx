"use client";
import { EditOutlined, RedoOutlined,EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import ActionBar from "@/components/ui/ActionBar";
import UMBradCrumb from "@/components/ui/UMBredCrumb";
import UMTable from "@/components/ui/UMTable";
import { useAdminsQuery, useDeleteAdminMutation } from "@/redux/api/adminApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";


const ManageAdmin = () => {
  const { role } = getUserInfo() as any;
  const query: Record<string, any> = {};
  const [size, setSize] = useState(5);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const [deleteAdmin] = useDeleteAdminMutation();

  const { data, isLoading } = useAdminsQuery({ ...query });
  
  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      await deleteAdmin(id);
      message.success("Department Deleted successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const reset = () => {
    setSortBy("");
    setSearchTerm("");
    setSortOrder("");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
    },
    {
      title: "Designation",
      dataIndex: "designation",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
          <Button
                style={{ margin: "0 5px" }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EyeOutlined />
              </Button>
            <Link href={`/super_admin/admin/edit/${data?.id}`}>
              <Button
                style={{ margin: "0 5px" }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>

            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  return (
    <div>
      <UMBradCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
        ]}
      />
      <ActionBar title="Admin List">
        <Input
          type="text"
          placeholder="Search..."
          size="large"
          style={{
            width: "30%",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <Link href="/super_admin/admin/create">
            <Button type="primary">Create Admin</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0 5px" }}
              onClick={() => reset()}
              type="primary"
            >
              <RedoOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.admins}
        pageSize={size}
        totalPages={data?.meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};
export default ManageAdmin;
