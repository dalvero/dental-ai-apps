import axios from "axios";
import { ApiResponse } from "@/types/api";
import { Child, CreateChildRequest, UpdateChildRequest } from "@/types/child";

const BASE_URL = "/api/children";

export async function createChild(data: CreateChildRequest) {
  const response = await axios.post<ApiResponse<Child>>(BASE_URL, data);
  return response.data;
}

export async function getChildren() {
  const response = await axios.get<ApiResponse<Child[]>>(BASE_URL);
  return response.data;
}

export async function getChildById(id: string) {
  const response = await axios.get<ApiResponse<Child>>(`${BASE_URL}/${id}`);
  return response.data;
}

export async function updateChild(id: string, data: UpdateChildRequest) {
  const response = await axios.put<ApiResponse<Child>>(
    `${BASE_URL}/${id}`,
    data
  );
  return response.data;
}

export async function deleteChild(id: string) {
  const response = await axios.delete<ApiResponse>(`${BASE_URL}/${id}`);
  return response.data;
}