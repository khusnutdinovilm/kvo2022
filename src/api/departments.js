import { api } from "src/api/helper/ky";
const server = api.create;

// получение списка подразделений
export const getDepartments = () => server("departments").json();

// получение списка аудиторов у подразделения
export const getAuditors = (department_id) => server(`auditors/${department_id}`).json();