export const formatCustomDate = (dateString, isWithTime) => {
  let date = new Date(dateString);
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let year = date.getFullYear().toString().slice(-2);
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return isWithTime ? `${day}.${month}.${year} ${hours}:${minutes}` : `${day}.${month}.${year}`;
};

export const formatDateForBack = (dateString) => dateString.split(".").reverse().join("-");
