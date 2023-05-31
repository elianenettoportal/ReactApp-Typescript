import { useState, useEffect} from 'react';
import { AppService } from '../services/AppService';
import Table from "./Table";
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
interface IProps{}
interface IState{
    users : any[];
    component : string;
    columnsParam : GridColDef[]; 
}

const UserList:React.FC<IProps>=()=>{
    let [state , setState] = useState<IState>({
        users : [],
        columnsParam:[
            { field: 'id', headerName: 'Id', width: 10 },
            { field: 'login', headerName: 'Login', width: 300 },
            { field: 'profileurl', headerName: 'Profile Url', width: 500 }
        ],
        component:'user'
    });
    useEffect(() => {
        const appService = new AppService();
        console.log("EFFECT")
        const fetchData = async () => {
            const users = await appService.getUsers();
            console.log("EFFECT",users)
            setState({...users})

        }
        fetchData()
          .catch(console.error);
      },[]);

    return(
        <div>
            {!state.users ? 
                <div className="loader"></div>
            :
            <> 
                <Typography variant="h3" component="h2">
                    Users 
                </Typography>
                <Table data={state.users} component={state.component} columnsParam={state.columnsParam}/>
            </>
                   
            }
        </div>
    )
};
export default UserList;
