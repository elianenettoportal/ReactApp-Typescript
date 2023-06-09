import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import DataTable from "../DataTable/dataTable";
import Users from '../../types/userInterfaces';
import User from '../../types/userInterfaces';
import UserService from '../../services/userService';

const UserList:React.FC = () =>{
  const [getResult, setGetResult] = useState<User[] | null>(null);
  const { isLoading: isLoadingUsers, refetch: getAllUsers } = useQuery<Users, Error>(
    "query-users",
    async () => {
      return await UserService.findAll();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setGetResult(res.users);
      },
      onError: (err: any) => {
        console.log('ERR****', err)
      },
    }
  );
  useEffect(() => {
  if (isLoadingUsers) setGetResult([]);
  }, [isLoadingUsers]);

  useEffect(() => {
      try {
        getAllUsers();
      } catch (err) {
        console.log('ERR', err)
      }
    },[]);

  const fields = [
      { key: 'id', headerName: 'Id', width: 10 },
      { key: 'login', headerName: 'Login', width: 300 },
      { key: 'profileurl', headerName: 'Profile Url', width: 500 }
  ];

  return (
    <main className="App page">
      <h1>Users</h1>
      <div className="content">
        <DataTable 
          data={ getResult }
          fieldss={ fields }
          title="test"
        />
      </div>
    </main>
  )
};
export default UserList;