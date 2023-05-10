import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppService } from '../services/AppService';
import Table from "./Table";
import { Button, Typography } from '@mui/material';

const UserRepositoryList =()=>{
    let { username=''} = useParams(); 
    const navigate = useNavigate();  
    const [repos, setRepos] = useState<any[]>([])
    
    const columnsRepos= [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'login', headerName: 'Login', width: 400 },
        { field: 'reposurl', headerName: 'Repos Url', width: 550 }
    ]

    useEffect(() => {
        const appService = new AppService();
        const fetchData = async () => {
            const response = await appService.getRepositories(username);
            setRepos(response);
        }
        fetchData()
          .catch(console.error);
      },[username]);

    const handleBack = ()=>{
        navigate("/users");
    }

    return (
        <div>
            {!repos ? 
                <div className="loader"></div>
            :
            <>
               <Typography variant="h3" component="h2" style={{color:"black", textAlign: "left"}}>
                    Repositories 
                </Typography>
                <Typography variant="h6" component="h2" style={{color:"grey", textAlign: "left"}}>
                    User Login : {username} 
                </Typography>
                <Table data={repos} component={'repos'} columnsParam={columnsRepos}/>
                <div style={{display:"flex", flexDirection: "row"}}>
                    <Button style={{color:"black", transitionDuration: "0.4s", backgroundColor:"rgba(0, 0, 0, 0.54)", width:"7%"}} onClick={handleBack}>Back</Button>
                </div>
            </>
            }
        </div>
    )
};

export default UserRepositoryList;