import axios, { AxiosResponse } from "@/utils/axios";

// Função para recuperar todos os leeds
export async function getLeeds(): Promise<AxiosResponse<any>> {
  return axios.get("/leed");
}

// Função para criar um novo leed
export async function createLeed(data: any): Promise<AxiosResponse<any>> {
  return axios.post("/leed", data);
}

// Função para atualizar um leed existente
export async function updateLeed(
  id: string,
  data: any
): Promise<AxiosResponse<any>> {
  return axios.put(`/leed`, data, {
    params: { id },
  });
}

// Função para excluir um leed
export async function deleteLeed(id: string): Promise<AxiosResponse<any>> {
  return axios.delete(`/leed?id=${id}`);
}
