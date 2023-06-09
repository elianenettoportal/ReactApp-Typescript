import axios from "axios";
import Users from "../types/userInterfaces";
import User from "../types/userInterfaces";

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}${process.env.REACT_APP_BASE_ROUTE}`,
  headers: {
    "Content-type": "application/json",
  },
});

const findAll = async () => {
    console.log('FIND ALL SERVICE')
    const response = await apiClient.get<Users>("/users");
    console.log('FIND ALL SERVICE',response)
    return response.data;
  
}

const findById = async (id: any) => {
  const response = await apiClient.get<Users>(`/users/${id}`);
  return response.data;
}

const findByTitle = async (login: string) => {
  const response = await apiClient.get<Users>(`/users?title=${login}`);
  return response.data;
}

const create = async ({ login, profileurl }: User) => {
  const response = await apiClient.post<any>("/users", { login, profileurl  });
  return response.data;
}

const update = async (id: any, { login, profileurl  }: User) => {
  const response = await apiClient.put<any>(`/users/${id}`, { login, profileurl  });
  return response.data;
}

const deleteById = async (id: any) => {
  const response = await apiClient.delete<any>(`/tutorials/${id}`);
  return response.data;
}

const deleteAll = async () => {
  const response = await apiClient.delete<any>("/tutorials");
  return response.data;
}

const UserService = {
  findAll,
  findById,
  findByTitle,
  create,
  update,
  deleteById,
  deleteAll
}

export default UserService;