import PageTitle from "@/Components/atoms/PageTitle";
import DataTable from "@/Components/molecules/DataTable";
import MediaLibrary from "@/Components/molecules/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router } from "@inertiajs/react";
import { HiTrash } from "react-icons/hi2";

export default function Index({ media }) {
  const { data, ...pagination } = media;
  const handleDelete = (id) => {
    const confirmed = confirm("Are you sure you want to delete this media?");
    if (!confirmed) return;
    router.delete(route("dashboard.media.destroy", id));
  };

  const handleAddNewMedia = () => {
    document.getElementById("media-library-opener").click();
  };

  const handleConfirmAddNewMedia = (image) => {
    console.log("image", image);
  };

  return (
    <DashboardLayout>
      <PageTitle
        title="Media"
        links={[{ title: "Media", active: false, url: "/dashboard/media" }]}
        btnTitle="Add New Media"
        btnLink="#"
        btnHandler={handleAddNewMedia}
      />
      <DataTable
        dataSource={data}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            render: (_, index) => pagination.from + index,
          },
          {
            title: "Image",
            dataIndex: "url",
            render: (value) => (
              <img src={value} alt="media" className="w-20 h-20 object-cover" />
            ),
          },
          { title: "Filename", dataIndex: "filename" },
          { title: "Type", dataIndex: "type" },
          {
            title: "Action",
            dataIndex: "id",
            render: (value, record) => (
              <div className="flex items-center gap-2">
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
      <MediaLibrary onConfirm={handleConfirmAddNewMedia} />
    </DashboardLayout>
  );
}
