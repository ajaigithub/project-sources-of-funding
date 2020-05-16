import http from "../http-common";

class Service {

  create(data) {
    return http.post("/api", data);
  }
}
