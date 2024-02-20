import ky from "ky";
import * as Tokens from "./tokens";
const createObj = {
  prefixUrl: "https://kvo.bngf.ru/api/v1/",
  timeout: 1500000,
};
class ServiceApi {
  constructor() {
    this.mainky = this.createMain();
  }
  createMain() {
    return ky.create({
      ...createObj,
    });
  }
}
class ServiceJWT {
  constructor() {
    this.create = this.createMain();
    this.handleRejectionToken = undefined;
  }
  createMain() {
    return ky.create({
      ...createObj,
      hooks: {
        beforeRequest: [
          (request) => {
            const accessToken = Tokens.getAccessToken();
            if (accessToken !== null) {
              this.setTokenToReq(request, accessToken);
            }
          },
        ],
        afterResponse: [
          async (request, options, response) => {
            if (response.status === 401) return this.handleRejectionToken();
          },
        ],
      },
    });
  }
  setTokenToReq(request, accessToken) {
    request.headers.set("Authorization", "Bearer " + accessToken);
  }

  registrHandleRejectionToken(handler) {
    this.handleRejectionToken = handler;
  }
}
const authAPI = new ServiceApi().mainky;

const api = new ServiceJWT();

//проверка
export { authAPI, api };
