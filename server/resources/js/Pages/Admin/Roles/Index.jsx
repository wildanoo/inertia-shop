import PageTitle from '@/Components/atoms/PageTitle';
import DataTable from '@/Components/molecules/DataTable';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, router } from '@inertiajs/react';
import React from 'react';
import { HiTrash } from 'react-icons/hi2';

export default function Index({ roles }) {
  const { data, ...pagination } = roles;

  console.log('roles', roles);
  const handleDelete = id => {
    const confirmed = confirm('Are you sure you want to delete this role?');
    if (!confirmed) return;
    router.delete(route('dashboard.roles.destroy', id));
  };

  const handleSearch = value => {
    router.get(route('dashboard.roles.index'), { search: value });
  };

  return (
    <DashboardLayout>
      <PageTitle
        title='Roles'
        links={[{ title: 'Roles' }]}
        btnTitle='Add New Role'
        btnLink='/dashboard/roles/create'
      />
      <DataTable
        searchable={true}
        handleSearch={handleSearch}
        dataSource={data}
        columns={[
          {
            title: 'No',
            dataIndex: 'no',
            render: (value, index) => pagination.from + index,
          },
          { title: 'Display Name', dataIndex: 'display_name' },
          { title: 'Name', dataIndex: 'name' },
          {
            title: 'Action',
            dataIndex: 'id',
            render: (value, record) => (
              <div className='flex items-center gap-2'>
                <Link
                  href={route('dashboard.roles.edit', value)}
                  className='btn btn-success btn-sm'
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(value)}
                  className='btn btn-error btn-sm'
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
