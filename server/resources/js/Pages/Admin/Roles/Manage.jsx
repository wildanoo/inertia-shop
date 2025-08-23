import FormInput from '@/Components/atoms/FormInput';
import PageSection from '@/Components/atoms/PageSection';
import PageTitle from '@/Components/atoms/PageTitle';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm } from '@inertiajs/react';
import React from 'react';

export default function Manage({ role }) {
  const isEditing = !!role;
  const title = isEditing ? 'Edit Role' : 'Create Role';
  const { data, setData, post, put, errors, processing } = useForm({
    name: role?.name || '',
    display_name: role?.display_name || '',
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (isEditing) {
      put(route('dashboard.roles.update', role.id));
    } else {
      post(route('dashboard.roles.store'));
    }
  };

  return (
    <DashboardLayout>
      <PageTitle
        title={title}
        links={[
          { title: 'Roles', active: false, url: '/dashboard/roles' },
          { title: title, active: true },
        ]}
      />
      <PageSection title={`Form ${title}`}>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Display Name'
            value={data.display_name}
            onChange={e => setData('display_name', e.target.value)}
            onBlur={() => setData('display_name', data.display_name)}
            error={errors.display_name}
          />
          <FormInput
            label='Name'
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            onBlur={() => setData('name', data.name)}
            error={errors.name}
          />
          <div className='mt-3 text-right'>
            <button
              type='submit'
              className='btn btn-success'
              disabled={processing}
            >
              {processing ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </PageSection>
    </DashboardLayout>
  );
}
