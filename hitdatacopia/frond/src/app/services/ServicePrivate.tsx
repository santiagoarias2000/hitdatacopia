import ApiBack from "../utilities/domains/ApiBack";

class ServicePrivate {
  // Service with bearer to do request GET
  // *******************************************************************
  public static async requestGET(urlService: string) {
    const bearer = "Bearer " + String(localStorage.getItem("tokenHitData"));

    const dataSend = {
      method: "GET",
      headers: { "Content-Type": "application/json; charset=UTF-8",authorization: bearer }
    };

    const url = ApiBack.URL + urlService;
    const respuesta = fetch(url, dataSend)
      .then((respuesta) => respuesta.json())
      .then((datos) => { return datos; })
      .catch((miError) => { return miError; });
    return respuesta;
  }

  // Service with bearer to do request POST
  // *******************************************************************
  public static async requestPOST(urlService: string, miJSON: any) {
    const bearer = "Bearer " + String(localStorage.getItem("tokenHitData"));

    const dataSend = {
      method: "POST",
      body: JSON.stringify(miJSON),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        authorization: bearer
      }
    };

    const url = ApiBack.URL + urlService;
    const respuesta = fetch(url, dataSend)
      .then((respuesta) => respuesta.json())
      .then((datos) => { return datos; })
      .catch((miError) => { return miError; });
    return respuesta;
  }

  // Service with bearer to do request DELETE
  // *******************************************************************
  public static async requestDELETE(urlService: string) {
    const bearer = "Bearer " + String(localStorage.getItem("tokenHitData"));

    const dataSend = { method: "DELETE", headers: { "Content-Type": "application/json; charset=UTF-8", authorization: bearer } };

    const url = ApiBack.URL + urlService;
    const respuesta = fetch(url, dataSend)
      .then((respuesta) => respuesta.json())
      .then((datos) => { return datos; })
      .catch((miError) => { return miError; });
    return respuesta;
  }

  // Service with bearer to do request PUT
  // *******************************************************************
  public static async requestPUT(urlService: string, miJSON: any) {
    const bearer = "Bearer " + String(localStorage.getItem("tokenHitData"));

    const dataSend = {
      method: "PUT",
      body: JSON.stringify(miJSON),
      headers: { "Content-Type": "application/json; charset=UTF-8", authorization: bearer }
    };

    const url = ApiBack.URL + urlService;
    const respuesta = fetch(url, dataSend)
      .then((respuesta) => respuesta.json())
      .then((datos) => { return datos; })
      .catch((miError) => { return miError; });
    return respuesta;
  }
}

export default ServicePrivate;
