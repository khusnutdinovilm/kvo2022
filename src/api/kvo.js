import { api } from "src/api/helper/ky";
const server = api.create;

// получение истории kvo
export const getKVOList = () => server("hazard-identification-cards").json();

// получение списка с помощью пагинации
export const getKVOListPaginate = (page) =>
  server(`hazard-identification-cards?page=${page}`).json();

// получение карторчки kvo по id
export const getKVOItem = (id) => server(`hazard-identification-cards/${id}`).json();

// создать kvo
export const createKVO = (data) =>
  server.post("hazard-identification-cards", { body: data }).json();
