import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "../../containers/Welcome";
import { About } from "../../views/private/About";
import { UserCreate } from "../../views/private/users/UserAdd";
import { UserAdmin } from "../../views/private/users/UserAdmin";
import { UserList } from "../../views/private/users/UserList";
import { UserUpdate } from "../../views/private/users/UserUpdate";
import { AdminCourse } from "../../views/private/courses/AdminCourse";
import { CourseList } from "../../views/private/courses/CourseList";
import { CreateCourse } from "../../views/private/courses/CreateCourse";
import { DetailsCourse } from "../../views/private/courses/DetailsCourse";
import { UpdateCourse } from "../../views/private/courses/UpdateCourse";
import { AdminPerson } from "../../views/private/person/AdminPerson";
import { CreatePerson } from "../../views/private/person/CreatePerson";
import { DetailsPerson } from "../../views/private/person/DetailsPerson";
import { ListPerson } from "../../views/private/person/ListPerson";
import { UpdatePerson } from "../../views/private/person/UpdatePerson";
import { AdminVehicle } from "../../views/private/vehicles/AdminVehicle";
import { CreateVehicle } from "../../views/private/vehicles/CreateVehicle";
import { DetailsVehicle } from "../../views/private/vehicles/DetailsVehicle";
import { UpdateVehicle } from "../../views/private/vehicles/UpdateVehicle";
import { VehicleList } from "../../views/private/vehicles/VehicleList";
import { NotFound } from "../../views/shared/NotFound";
import { CertificatePerson } from "../../views/private/person/CertificatePerson";
import { NoCertificatePerson } from "../../views/private/person/NoCertificatePerson";
import { AdminCertificatePerson } from "../../views/private/person/AdminCertificatePerson";
import { AdminNoCertificatePerson } from "../../views/private/person/AdminNoCertificatePerson";


const LazyWelcome=lazy(()=>import("../../containers/Welcome").then(()=>({default:Welcome})));
const LazyNotFound=lazy(()=>import("../../views/shared/NotFound").then(()=>({default:NotFound})));
const LazyAbout=lazy(()=>import("../../views/private/About").then(()=>({default:About})));
const LazyUserList=lazy(()=>import("../../views/private/users/UserList").then(()=>({default:UserList})));
const LazyUserUpdate = lazy(()=>import("../../views/private/users/UserUpdate").then(()=>({default:UserUpdate})));
const LazyUserAdmin = lazy(()=>import("../../views/private/users/UserAdmin").then(()=>({default:UserAdmin})));
const LazyUserAdd = lazy(()=>import("../../views/private/users/UserAdd").then(()=>({default:UserCreate})));

const LazyVehicleList=lazy(()=>import("../../views/private/vehicles/VehicleList").then(()=>({default:VehicleList})));
const LazyCreateVehicle=lazy(()=>import("../../views/private/vehicles/CreateVehicle").then(()=>({default:CreateVehicle})));
const LazyAdminVehicle=lazy(()=>import("../../views/private/vehicles/AdminVehicle").then(()=>({default:AdminVehicle})));
const LazyDetailsVehicle=lazy(()=>import("../../views/private/vehicles/DetailsVehicle").then(()=>({default:DetailsVehicle})));
const LazyUpdateVehicle=lazy(()=>import("../../views/private/vehicles/UpdateVehicle").then(()=>({default:UpdateVehicle})));

const LazyCourseList=lazy(()=>import("../../views/private/courses/CourseList").then(()=>({default:CourseList})));
const LazyCreateCourse=lazy(()=>import("../../views/private/courses/CreateCourse").then(()=>({default:CreateCourse})));
const LazyAdminCourse=lazy(()=>import("../../views/private/courses/AdminCourse").then(()=>({default:AdminCourse})));
const LazyDetailsCourse=lazy(()=>import("../../views/private/courses/DetailsCourse").then(()=>({default:DetailsCourse})));
const LazyUpdateCourse=lazy(()=>import("../../views/private/courses/UpdateCourse").then(()=>({default:UpdateCourse})));


const LazyCreatePerson=lazy(()=>import("../../views/private/person/CreatePerson").then(()=>({default:CreatePerson})));
const LazyListPerson=lazy(()=>import("../../views/private/person/ListPerson").then(()=>({default:ListPerson})));
const LazyAdminPerson=lazy(()=>import("../../views/private/person/AdminPerson").then(()=>({default:AdminPerson})));
const LazyDetailsPerson=lazy(()=>import("../../views/private/person/DetailsPerson").then(()=>({default:DetailsPerson})));
const LazyUpdatePerson=lazy(()=>import("../../views/private/person/UpdatePerson").then(()=>({default:UpdatePerson})));
const LazyCertificatePerson=lazy(()=>import("../../views/private/person/CertificatePerson").then(()=>({default:CertificatePerson})));
const LazyNoCertificatePerson=lazy(()=>import("../../views/private/person/NoCertificatePerson").then(()=>({default:NoCertificatePerson})));
const LazyAdminCertificatePerson=lazy(()=>import("../../views/private/person/AdminCertificatePerson").then(()=>({default:AdminCertificatePerson})));
const LazyAdminNoCertificatePerson=lazy(()=>import("../../views/private/person/AdminNoCertificatePerson").then(()=>({default:AdminNoCertificatePerson})));


export const InternalRouting=()=>{
    return(
        <Routes>
        //Routes Default    
        <Route path="/" element={<LazyWelcome />} />
        <Route path="/about" element={<LazyAbout />} />

        <Route path="/listusers" element={<LazyUserList />}/>
        <Route path="/adduser" element={<LazyUserAdd />} />
        <Route path="/adminuser" element={<LazyUserAdmin />} /> 
        <Route path="/updateuser/:idUser" element={<LazyUserUpdate />} />


        <Route path="/vehicles/vehicleList" element={<LazyVehicleList />} />
        <Route path="/vehicles/createVehicle" element={<LazyCreateVehicle />} />
        <Route path="/vehicles/adminVehicle" element={<LazyAdminVehicle />} />
        <Route path="/vehicles/detailsVehicle/:idVehicle" element={<LazyDetailsVehicle />} />
        <Route path="/vehicles/updateVehicle/:idVehicle" element={<LazyUpdateVehicle />} />

        <Route path="/courses/courseList" element={<LazyCourseList />} />
        <Route path="/courses/createCourse" element={<LazyCreateCourse />} />
        <Route path="/courses/adminCourse" element={<LazyAdminCourse />} />
        <Route path="/courses/detailsCourse/:idCourse" element={<LazyDetailsCourse />} />
        <Route path="/courses/updateCourse/:idCourse" element={<LazyUpdateCourse />} />
        <Route path="*" element={<LazyNotFound />} />
        //Routes PERSON
        <Route path="/person/create" element={<LazyCreatePerson />} />
        <Route path="/person/view" element={<LazyListPerson />} />
        <Route path="/person/admin" element={<LazyAdminPerson />} />
        <Route path="/person/details/:idPerson" element={<LazyDetailsPerson />} />
        <Route path="/person/update/:idPerson" element={<LazyUpdatePerson />} />
        <Route path="/person/certificate" element={<LazyCertificatePerson />} />
        <Route path="/person/nocertificate" element={<LazyNoCertificatePerson />} />
        <Route path="/person/admin/certificate" element={<LazyAdminCertificatePerson />} />
        <Route path="/person/admin/nocertificate" element={<LazyAdminNoCertificatePerson />} />
        </Routes>
    );

};
