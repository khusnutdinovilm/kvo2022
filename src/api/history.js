import { api } from "src/api/helper/ky";
const server = api.create;

// получение всех записей историй
export const getAllApplication = () => server("getAll").json();

// получение всех записей историй с помощью пагинации
export const getAllAppplicationPaginate = (page) => server(`getAll?page=${page}`).json();
