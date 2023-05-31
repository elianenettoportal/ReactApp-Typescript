import React from 'react';
import { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppService } from '../services/AppService';
import { Link, Button, TextField, Box, Typography} from '@mui/material';

interface IProps{}
interface IState{
    user: {}; 
}
const UserDetails:React.FC<IProps>=()=>{
    let [state , setState] = useState<IState>({
        user : {}
    });
    let { username=''} = useParams<any>();
    const navigate = useNavigate();  

    useEffect(() => {
        const appService = new AppService();
        const fetchData = async () => {
            const user = await appService.getUser(username);
            setState(user);
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
        <React.Fragment>
            <h2>User Details</h2>
            <ul className="list-group">
                <li className="list-group-item">
                    Id : {state.user['id']}
                </li>
                <li className="list-group-item">
                    Login : {state.user['login'] || ''}
                </li>
                <li className="list-group-item">
                    Created at : {state.user['createdat'] || ''}
                </li>
            </ul>
            <Link  onClick={handleClick}>All Repositories</Link>
            <Link target="_blank" href={state.user['profileurl'] || '#'}>{state.user['profileurl'] || ''}</Link>
            <Button onClick={handleBack}>Back</Button>
        </React.Fragment>
        // <div>
        //     {!user ?
        //        <div className="loader"></div>
        //     :
        //     <>
        //         <Typography variant="h3" component="h2">
        //             User Details 
        //         </Typography>
        //         <Box
        //             component="form"
        //             sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
        //             noValidate
        //             autoComplete="off"
        //         >
        //             <div style={{display:"flex", flexDirection: "column"}}>
        //                 <TextField
        //                     disabled
        //                     id="outlined-disabled"
        //                     label="Id"
        //                     defaultValue="Id"
        //                     value={user['id'] || ''}
        //                 />
        //                 <TextField
        //                     disabled
        //                     id="outlined-disabled"
        //                     label="Login"
        //                     defaultValue="Login"
        //                     value={user['login'] || ''}
        //                 />
        //                 <TextField
        //                     disabled
        //                     id="outlined-disabled"
        //                     label="Created"
        //                     defaultValue="Created"
        //                     value={user['createdat'] || ''}
        //                 />
        //                 <Link  onClick={handleClick}>All Repositories</Link>
        //                 <Link target="_blank" href={user['profileurl'] || '#'}>{user['profileurl'] || ''}</Link>
        //             </div>
        //         </Box>
        //         <div>
        //             <Button onClick={handleBack}>Back</Button>
        //         </div>
        //     </>
        //     }
        // </div>
    )
};

export default UserDetails;