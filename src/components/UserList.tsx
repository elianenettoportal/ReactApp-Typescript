import { useState, useEffect} from 'react';
import { AppService } from '../services/AppService';
import Table from "./Table";
import { Typography } from '@mui/material';

const UserList =()=>{
    const [users, setUsers] = useState<any[]>();
   
    const columnsUsers= [
        { field: 'id', headerName: 'Id', width: 10 },
        { field: 'login', headerName: 'Login', width: 300 },
        { field: 'profileurl', headerName: 'Profile Url', width: 500 }
    ]
  
    useEffect(() => {
        const appService = new AppService();
        const fetchData = async () => {
            const response = await appService.getUsers();
            setUsers(response);
        }
        fetchData()
          .catch(console.error);
      },[]);

    return(
        <div>
            {!users ? 
                <div className="loader"></div>
            :
            <> 
                <Typography variant="h3" component="h2" style={{color:"black", textAlign: "left"}}>
                    Users 
                </Typography>
                <Table data={users} component={'user'} columnsParam={columnsUsers}/>
            </>
                   
            }
        </div>
    )
};
export default UserList;
