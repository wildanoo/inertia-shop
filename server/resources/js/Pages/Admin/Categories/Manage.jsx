import FormInput from "@/Components/atoms/FormInput";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import MediaLibrary from "@/Components/molecules/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { openMediaLibraryModal } from "@/utils";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import slugify from "slugify";

export default function Manage({ category }) {
  const isEditing = !!category;
  const title = isEditing ? "Edit category" : "Create category";
  const { data, setData, post, put, errors, processing } = useForm({
    title: category?.title || "",
    slug: category?.slug || "",
    media_url:
      category?.media_url ??
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
  });

  console.log("data : ", data);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      put(route("dashboard.categories.update", category.id));
    } else {
      post(route("dashboard.categories.store"));
    }
  };

  const handleSelectImage = (selectedImage) => {
    console.log("selectedImage : ", selectedImage);
    setData("media_url", selectedImage.url);
  };

  const handleUploadMedia = () => {
    openMediaLibraryModal();
  };

  useEffect(() => {
    if (data.title) {
      setData("slug", slugify(data.title, { lower: true }));
    }
  }, [data?.title]);

  return (
    <DashboardLayout>
      <PageTitle
        title={title}
        links={[
          { title: "Categories", active: false, url: "/dashboard/categories" },
          { title: title, active: true },
        ]}
      />
      <PageSection title={`Form ${title}`}>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Title"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
            onBlur={() => setData("title", data.title)}
            error={errors.title}
          />
          <FormInput
            label="Slug"
            value={data.slug}
            onChange={(e) => setData("slug", e.target.value)}
            onBlur={() => setData("slug", data.slug)}
            error={errors.slug}
          />
          <div className="my-4">
            <div className="w-[220px] h-[150px] overflow-hidden rounded-xl mb-4">
              <img src={data.media_url} alt="Category" />
            </div>
            <button
              type="button"
              onClick={handleUploadMedia}
              className="btn btn-outline btn-primary mt-2"
            >
              <MdOutlineFileUpload className="w-5 h-5" />
              Upload Media
            </button>
          </div>
          <div className="mt-3 text-right">
            <button
              type="submit"
              className="btn btn-success"
              disabled={processing}
            >
              {processing ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </PageSection>
      <MediaLibrary onConfirm={handleSelectImage} />
    </DashboardLayout>
  );
}
