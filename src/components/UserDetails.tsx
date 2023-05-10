import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppService } from '../services/app';
import { Link, Button, TextField, Box } from '@mui/material';

const UserDetails =()=>{
    let { username=''} = useParams<any>();
    const navigate = useNavigate();  
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        const appService = new AppService();
        const fetchData = async () => {
            const response = await appService.getUser(username);
            setUser(response);
        }
        fetchData()
          .catch(console.error);
      },[username]);

    const handleClick = ()=>{
        navigate(`/users/${username}/repos`);
    }
    const handleBack = ()=>{
        navigate(`/users`);
    }
    return (
        <div>
            {!user ?
               <div className="loader"></div>
            :
            <>
                <Box
                    component="form"
                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Id"
                            defaultValue="Id"
                            value={user['id'] || ''}
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Login"
                            defaultValue="Login"
                            value={user['login'] || ''}
                        />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Created"
                            defaultValue="Created"
                            value={user['createdat'] || ''}
                        />
                        <Button onClick={handleClick}>All Repositories</Button>
                        <Link href={user['profileurl'] || '#'}>{user['profileurl'] || ''}</Link>
                    </div>
                </Box>
                <div style={{display:"flex", flexDirection: "row"}}>
                    <Button style={{color:"black"}} onClick={handleBack}>Back</Button>
                </div>
            </>
            }
        </div>
    )
};

export default UserDetails;