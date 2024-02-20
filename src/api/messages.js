import { api } from "src/api/helper/ky";
const server = api.create;

// список сообщений
export const getMessages = (isRead) =>
  // server(`hazard-identification-card-notifications?isRead=${isRead}`).json();
  server(`hazard-identification-card-notifications-new?isRead=${isRead}`).json();

// получение списка с помощью пагинации
export const getMessagesPaginate = ({ isRead, page }) =>
  // server(`hazard-identification-card-notifications?isRead=${isRead}&page=${page}`).json();
  server(`hazard-identification-card-notifications-new?isRead=${isRead}&page=${page}`).json();

// количество непрочитанных сообщений
export const totalUnreadMessages = () =>
  server("hazard-identification-card-notifications/total-count?isRead=0").json();

// отметить сообщение кво как прочитанное
export const markKvoMessageAsRead = (message_id) =>
  server.post(`hazard-identification-card-notifications/${message_id}/mark-as-read`);

// отметить сообщение лпаб как прочитанное
export const markLpabMessageAsRead = (message_id) =>
  server.post(`lpabs-notifications/${message_id}/mark-as-read`);
