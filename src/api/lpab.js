import { api } from "src/api/helper/ky";
const server = api.create;

// получение истории lpab
export const getLPABList = () => server("lpabs").json();

// получение списка lpab с помощью пагинации
export const getLPABListPaginate = (page) => server(`lpabs?page=${page}`).json();

// получение карточки lpab по id
export const getLPABItem = (id) => server(`lpabs/${id}`).json();

// создание lpab
export const createLPAB = (data) => server.post("lpabs", { body: data });
