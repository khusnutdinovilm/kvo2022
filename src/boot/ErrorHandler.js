import { TimeoutError, HTTPError } from "ky";
import { Notify } from "quasar";

async function handler(err, router) {
  if (err instanceof HTTPError) {
    const { message } = await err.response.json();
    // if (err.response.status === 401) {
    //   // return router.push({ name: "auth" });
    // }
      Notify.create({
        type: "negative",
        message,
      });
    
  }

  if (err instanceof TimeoutError) {
    return Notify.create({
      type: "negative",
      message: `Истекло время ожидания запроса попробуйте снова`,
      actions: [
        {
          label: "Перезагрузить страницу",
          color: "white",
          handler: () => {
            location.reload();
          },
        },
      ],
    });
  }
}

window.addEventListener("error", function (e) {
  console.error();
  "global", e;
  return false;
});

window.addEventListener("unhandledrejection", function (e) {
  handler(e.reason);
});

export default ({ app, router, store, Vue }) => {
  app.config.errorHandler = function (err, vm, info) {
    handler(err, router);

    console.error(err);
  };
};
