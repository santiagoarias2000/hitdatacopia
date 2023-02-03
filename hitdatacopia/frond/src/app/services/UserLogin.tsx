class UserLogIn {
    public static async consumeService(urlApi: string, miObj: any) {
      const information = {
        method: "POST",
        body: JSON.stringify(miObj),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      };
      const resultApi = fetch(urlApi, information)
        .then((reciveInfo) => reciveInfo.json())
        .then((miInfo) => { return miInfo; })
        .catch((miError) => { return miError; });
      return resultApi;
    }
  }
  export default UserLogIn;