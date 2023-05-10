import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppService } from '../services/AppService';
import { Link, Button, TextField, Box, Typography} from '@mui/material';

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
        <div style={{margin:"5%"}}>
            {!user ?
               <div className="loader"></div>
            :
            <>
                <Typography variant="h3" component="h2" style={{color:"black", textAlign: "left"}}>
                    User Details 
                </Typography>
                <Box
                    component="form"
                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
                    noValidate
                    autoComplete="off"
                >
                    <div style={{display:"flex", flexDirection: "column"}}>
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
                        <Link style={{marginLeft: "14px", cursor: "pointer"}} onClick={handleClick}>All Repositories</Link>
                        <Link style={{margin: "1em"}} target="_blank" href={user['profileurl'] || '#'}>{user['profileurl'] || ''}</Link>
                    </div>
                </Box>
                <div style={{display:"flex", flexDirection: "row"}}>
                    <Button style={{color:"black", transitionDuration: "0.4s", backgroundColor:"rgba(0, 0, 0, 0.54)", width:"7%"}} onClick={handleBack}>Back</Button>
                </div>
            </>
            }
        </div>
    )
};

export default UserDetails;