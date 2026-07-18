import axios from "axios";
import { ApiResponse, User } from "@/types";


export async function login(email: string, password: string){
    const response = await axios.post<ApiResponse<User>>(
        "/api/auth/login",
        {
            email,
            password,
        }
    );
    return response.data;
}