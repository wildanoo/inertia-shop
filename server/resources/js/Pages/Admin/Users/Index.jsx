import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { formatDate } from "@/utils";
import { Link, router } from "@inertiajs/react";
import { HiTrash } from "react-icons/hi2";

export default function Index({ users }) {
  const { data, ...pagination } = users;

  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    router.delete(route("dashboard.users.destroy", id));
  };

  const handleSearch = (value) => {
    router.get(route("dashboard.users.index"), { search: value });
  };

  const handleSorterColumns = (column, sortDirection) => {
    router.get(
      route("dashboard.users.index", {
        sortField: column,
        sortDirection: sortDirection,
      })
    );
  };

  return (
    <DashboardLayout>
      <PageTitle
        title="Users"
        links={[{ title: "Users" }]}
        btnTitle="Add New Users"
        btnLink="/dashboard/users/create"
      />
      <DataTable
        searchable={true}
        handleSearch={handleSearch}
        dataSource={data}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            render: (_, index) => pagination.from + index,
          },
          { title: "Name", dataIndex: "name", sorter: true },
          {
            title: "Email",
            dataIndex: "email",
            render: (value, _, record) => {
              return (
                <span>
                  {value}
                  {record.email_verified_at && (
                    <span className="btn btn-success btn-sm ml-3">
                      Verified
                    </span>
                  )}
                </span>
              );
            },
          },
          {
            title: "Role",
            dataIndex: "id",
            render: (_, __, record) => (
              <div className="flex flex-wrap gap-2">
                {record.roles.map((role, index) => {
                  return (
                    <span
                      className="btn btn-sm btn-outline"
                      key={`role-${index}`}
                    >
                      {role.display_name}
                    </span>
                  );
                })}
              </div>
            ),
          },
          {
            title: "Joined Date",
            dataIndex: "created_at",
            render: (value) => formatDate(value),
          },
          {
            title: "Action",
            dataIndex: "id",
            render: (value, record) => (
              <div className="flex items-center gap-2">
                <Link
                  href={route("dashboard.users.show", value)}
                  className="btn btn-sm btn-outline"
                >
                  Detail
                </Link>
                <Link
                  href={route("dashboard.users.edit", value)}
                  className="btn btn-success btn-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(value)}
                  className="btn btn-error btn-sm"
                >
                  <HiTrash />
                </button>
              </div>
            ),
          },
        ]}
        handleSorterColumns={handleSorterColumns}
        pagination={pagination}
      />
    </DashboardLayout>
  );
}
