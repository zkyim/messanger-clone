import React from 'react'
import Sidebar from '../_components/sidebar/Sidebar'
import getUsers from '../actions/getUsers'
import UserList from './_components/UserList';

const UsersLayout = async ({
    children,
}: {
    children: React.ReactNode,
}) => {
  const users = await getUsers();
  return (
    <Sidebar>
        <div className='h-full'>
          <UserList items={users} />
        {children}
        </div>
    </Sidebar>
  )
}

export default UsersLayout
