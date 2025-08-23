import FormCheck from "@/Components/atoms/FormCheck";
import FormInput from "@/Components/atoms/FormInput";
import PageSection from "@/Components/atoms/PageSection";
import PageTitle from "@/Components/atoms/PageTitle";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function Manage({ user, roles }) {
  const isEditing = !!user;
  const title = isEditing ? "Edit User" : "Create User";

  const { data, setData, post, put, errors, processing } = useForm({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    password_confirmation: "",
    roles: user?.roles?.map((role) => role.name) ?? [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      put(route("dashboard.users.update", user.id));
    } else {
      post(route("dashboard.users.store"));
    }
  };

  return (
    <DashboardLayout>
      <PageTitle
        title={title}
        links={[
          { title: "Users", active: false, url: "/dashboard/users" },
          { title: title, active: true },
        ]}
      />
      <PageSection title={`Form ${title}`}>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            onBlur={() => setData("name", data.name)}
            error={errors.name}
          />
          <FormInput
            label="Email"
            disabled={isEditing}
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            onBlur={() => setData("email", data.email)}
            error={errors.email}
          />
          <FormInput
            label="Password"
            value={data.password}
            type="password"
            onChange={(e) => setData("password", e.target.value)}
            onBlur={() => setData("password", data.password)}
            error={errors.password}
          />
          <FormInput
            label="Password Confirmation"
            value={data.password_confirmation}
            type="password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
            onBlur={() =>
              setData("password_confirmation", data.password_confirmation)
            }
            error={errors.password_confirmation}
          />
          <FormCheck
            label="Roles"
            value={data.roles}
            error={errors.roles}
            onChange={(e) => {
              if (e.target.checked) {
                setData("roles", [...data.roles, e.target.value]);
              } else {
                setData(
                  "roles",
                  data.roles.filter((role) => role !== e.target.value)
                );
              }
            }}
            options={roles.map((role) => ({
              label: role.display_name,
              value: role.name,
            }))}
          />
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
    </DashboardLayout>
  );
}
