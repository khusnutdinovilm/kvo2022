import * as yup from "yup";

export const authSchema = yup.object({
  login: yup.string().required("Поле Логин обзяательно для заполнения").label("Login"),
  password: yup.string().required("Поле Пароль обзятельно для заполнения"),
});

export const creatingLpabSchema = yup.object({
  dateLpab: yup.string().required(),
  place: yup.string().required(),
  departmentId: yup.number().required(),
  auditorId: yup.number().required(),
  staff: yup.number().required(),
  descriptionBd: yup.string().default("Не заполнено").required(),
  measuresBd: yup.string().default("Не заполнено").required(),
  descriptionOd: yup.string().default("Не заполнено").required(),
  measuresOd: yup.string().default("Не заполнено").required(),
});

export const initialLpabValues = creatingLpabSchema.default();

export const creatingKvoSchema = yup.object({
  incidentDate: yup.string().required(),
  departmentId: yup.string().required(),
  locationName: yup.string().required(),
  incidentDescription: yup.string().required(),
  actionsTakenToResolve: yup.string().required(),
});
