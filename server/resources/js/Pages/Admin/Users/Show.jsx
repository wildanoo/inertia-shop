import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import MediaLibrary from "@/Components/molecules/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { openMediaLibraryModal } from "@/utils";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

export default function Show({ user }) {
  const { data, setData, processing, put, errors } = useForm({
    profile_picture:
      user?.detail?.profile_picture ??
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    billing_name: user?.detail?.billing_name ?? "",
    billing_phone: user?.detail?.billing_phone ?? "",
    billing_email: user?.detail?.billing_email ?? "",
    billing_province_id: user?.detail?.billing_province_id ?? "",
    billing_city_id: user?.detail?.billing_city_id ?? "",
    billing_subdistrict_name: user?.detail?.billing_subdistrict_name ?? "",
    billing_address: user?.detail?.billing_address ?? "",
  });
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const handleClickUpload = () => {
    openMediaLibraryModal();
  };

  const handleSelectImage = (selectedImage) => {
    setData("profile_picture", selectedImage?.url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    put(route("dashboard.users.detail.update", user.id));
  };

  const getProvinces = async () => {
    const response = await axios.get("/api/rajaongkir/provinces");
    setProvinces(
      response.data.data.map((val) => ({
        value: val.id,
        label: val.province,
      }))
    );
    if (!data.billing_province_id) {
      setData("billing_province_id", response.data.data[0].id);
    }
  };

  const getCities = async () => {
    const response = await axios.get(
      `/api/rajaongkir/city/${data.billing_province_id}`
    );

    setCities(
      response.data.data.map((val) => ({
        value: val.id,
        label: val.name,
      }))
    );
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (data.billing_province_id) {
      getCities();
    }
  }, [data.billing_province_id]);

  return (
    <DashboardLayout>
      <PageTitle
        title="Detail User"
        links={[
          { title: "Users", active: false, url: "/dashboard/users" },
          { title: "Detail User", active: true, url: "#" },
        ]}
      />
      <PageSection title="Billing Information">
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="" className="text-sm font-bold">
              Profile Picture
            </label>
            <div className="mb-2 overflow-hidden rounded-xl">
              <img
                className="w-32 h-32 rounded-full object-cover object-center"
                src={data.profile_picture}
                alt="Profile Picture"
              />
            </div>
            <button
              onClick={handleClickUpload}
              type="button"
              className="btn btn-primary btn-outline btn-sm"
            >
              <MdOutlineFileUpload className="w-5 h-5" />
              Upload Media
            </button>
          </div>
          <FormInput
            label="Billing Name"
            value={data.billing_name}
            error={errors.billing_name}
            onChange={(e) => setData("billing_name", e.target.value)}
          />
          <FormInput
            label="Billing Phone"
            value={data.billing_phone}
            error={errors.billing_phone}
            onChange={(e) => setData("billing_phone", e.target.value)}
          />
          <FormInput
            label="Billing Email"
            value={data.billing_email}
            error={errors.billing_email}
            onChange={(e) => setData("billing_email", e.target.value)}
            onBlur={() => setData("billing_email", data.billing_email)}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormSelect
              label="Billing Province"
              options={provinces}
              value={data.billing_province_id}
              error={errors?.billing_province_id}
              onChange={(e) => setData("billing_province_id", e.target.value)}
            />
            <FormSelect
              label="Billing City"
              options={cities}
              value={data.billing_city_id}
              error={errors?.billing_city_id}
              onChange={(e) => setData("billing_city_id", e.target.value)}
            />
            <FormInput
              label="Billing Subdistrict"
              value={data.billing_subdistrict_name}
              error={errors.billing_subdistrict_name}
              onChange={(e) =>
                setData("billing_subdistrict_name", e.target.value)
              }
            />
            <FormInput
              label="Billing Address"
              type="textarea"
              value={data.billing_address}
              error={errors.billing_address}
              onChange={(e) => setData("billing_address", e.target.value)}
            />
          </div>

          <div className="text-right mt-3">
            <button className="btn btn-success">Save</button>
          </div>
        </form>
      </PageSection>
      <MediaLibrary onConfirm={handleSelectImage} />
    </DashboardLayout>
  );
}
