import PageTitle from '@/Components/atoms/PageTitle';
import DataTable from '@/Components/molecules/DataTable';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, router } from '@inertiajs/react';
import React from 'react';
import { HiTrash } from 'react-icons/hi2';

export default function Index({ users }) {
  const { data, ...pagination } = users;

  const handleDelete = id => {
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;
    router.delete(route('dashboard.users.destroy', id));
  };

  const handleSearch = value => {
    router.get(route('dashboard.users.index'), { search: value });
  };

  return (
    <DashboardLayout>
      <PageTitle
        title='Users'
        links={[{ title: 'Users' }]}
        btnTitle='Add New Users'
        btnLink='/dashboard/users/create'
      />
      <DataTable
        searchable={true}
        handleSearch={handleSearch}
        dataSource={data}
        columns={[
          {
            title: 'No',
            dataIndex: 'name',
            render: (value, index) => pagination.from + index,
          },
          { title: 'Name', dataIndex: 'name' },
          { title: 'Email', dataIndex: 'email' },
          {
            title: 'Role',
            dataIndex: 'role',
            render: (value, record) => (
              <button className='btn btn-sm btn-primary'>Super Admin</button>
            ),
          },
            { title: 'Joined Date', dataIndex: 'created_at' },
          {
            title: 'Action',
            dataIndex: 'id',
            render: (value, record) => (
              <div className='flex items-center gap-2'>
                <Link
                  href={route('dashboard.users.edit', value)}
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
