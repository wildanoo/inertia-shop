import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, router } from "@inertiajs/react";
import { HiTrash } from "react-icons/hi2";

export default function Index({ categories }) {
  const { data, ...pagination } = categories;

  console.log("categories", categories);
  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;
    router.delete(route("dashboard.categories.destroy", id));
  };

  const handleSearch = (value) => {
    router.get(route("dashboard.categories.index"), { search: value });
  };

  return (
    <DashboardLayout>
      <PageTitle
        title="Categories"
        links={[{ title: "Categories" }]}
        btnTitle="Add New Category"
        btnLink="/dashboard/categories/create"
      />
      <DataTable
        searchable={true}
        handleSearch={handleSearch}
        dataSource={data}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            render: (value, index) => pagination.from + index,
          },
          {
            title: "Media",
            dataIndex: "media_url",
            render: (value) => (
              <img
                src={value}
                alt="media category"
                className="w-[130px] h-[100px] object-cover object-center"
              />
            ),
          },
          { title: "Title", dataIndex: "title" },
          { title: "Slug", dataIndex: "slug" },
          {
            title: "Action",
            dataIndex: "id",
            render: (value, record) => (
              <div className="flex items-center gap-2">
                <Link
                  href={route("dashboard.categories.edit", value)}
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
        pagination={pagination}
      />
    </DashboardLayout>
  );
}
