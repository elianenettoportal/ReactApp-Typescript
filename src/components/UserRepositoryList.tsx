import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppService } from '../services/AppService';
import Table from "./Table";
import { Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

interface IProps{}
interface IState{
    repos: any[]; 
    component : string;
    columnsParam : GridColDef[];
}

const UserRepositoryList:React.FC<IProps>=()=>{
    let [state , setState] = useState<IState>({
        repos : [],
        component : 'repos',
        columnsParam : [
            { field: 'id', headerName: 'Id', width: 100 },
            { field: 'login', headerName: 'Login', width: 400 },
            { field: 'reposurl', headerName: 'Repos Url', width: 550 }
        ]
    });
    let { username=''} = useParams(); 
    const navigate = useNavigate();  

    useEffect(() => {
        const appService = new AppService();
        const fetchData = async () => {
            const repos = await appService.getRepositories(username);
            setState(repos);
        }
        fetchData()
          .catch(console.error);
      },[username]);

    const handleBack = ()=>{
        navigate("/users");
    }

    return (
        <div>
            {!state.repos ? 
                <div className="loader"></div>
            :
            <>
               <Typography variant="h3" component="h2">
                    Repositories 
                </Typography>
                <Typography variant="h6" component="h2">
                    User Login : {username} 
                </Typography>
                <Table data={state.repos} component={'repos'} columnsParam={state.columnsParam}/>
                <Button  onClick={handleBack}>Back</Button>
            </>
            }
        </div>
    )
};

export default UserRepositoryList;