import axios from 'axios';

export class AppService {

    public async getUsers(): Promise<any> {
        console.log("services", `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_ROUTE}?since`)
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_ROUTE}?since`);
        if(response && response.data && response.data.success){
            return response.data.users;
        }else{
            console.log("ERR")
            return [];
        }
    }

    public async getUser(username: string) {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_ROUTE}:${username}/details?username=${username}`);
        if(response && response.data && response.data.success){
            return response.data.user_details;
        }else{
            return "";
        }
    }

    public async getRepositories(username: string) {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_ROUTE}${username}/repos`);
        if(response && response.data && response.data.success){
            return response.data.user_repos;
        }else{
            return [];
        }
    }
}