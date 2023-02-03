const ApiBack = {
  URL: "http://localhost:3123",
  //USER_LOGIN
  URL_PUBLIC_LOGIN:"/api/public/user/login",

  USERS_LIST: "/api/private/user/list",
  USERS_CREATE: "/api/private/user/create",
  USERS_GIVE_ME_ONE:"/api/private/user/one",
  USERS_UPDATE: "/api/private/user/update",
  USERS_DELETE: "/api/private/user/delete",

  //PRIVATE -- PERSON
  VIEWS_PERSON: "/api/private/person/view",
  CREATE_PERSON: "/api/private/person/create",
  DETAILS_PERSON: "/api/private/person/details",
  FILTER_CERTIFICATE_PERSON: "/api/private/person/filtercertificate",
  FILTER_NOCERTIFICATE_PERSON: "/api/private/person/filternocertificate",
  UPDATE_PERSON: "/api/private/person/update",
  DELETE_PERSON: "/api/private/person/delete",
  EXCEL_PERSON : "/api/private/person/detailsEXCEL",
  EXCEL_CERTIFICATE_PERSON : "/api/private/person/detailsCertificateEXCEL",
  EXCEL_NO_CERTIFICATE_PERSON : "/api/private/person/detailsNoCertificateEXCEL",

  //PRIVATE -- COURSE
  GET_COURSE: "/api/private/course/view",
  CREATE_COURSE: "/api/private/course/create",
  DELETE_COURSE: "/api/private/course/delete",
  DETAIL_COURSE: "/api/private/course/details",
  UPDATE_COURSE: "/api/private/course/update",

  //PRIVATE -- VEHICLE
  GET_VEHICLE: "/api/private/vehicle/view",
  CREATE_VEHICLE: "/api/private/vehicle/create",
  DELETE_VEHICLE: "/api/private/vehicle/delete",
  DETAIL_VEHICLE: "/api/private/vehicle/details",
  UPDATE_VEHICLE: "/api/private/vehicle/update",
};

export default ApiBack;