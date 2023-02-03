import Profile from "./Profile";

class User{
    public idUser: string;
    public fullName: string;
    public emailUser: string;
    public stateUser: number;
    public idProfile: number;
    public passwordUser: string;
    public dateUser: Date;
    


    constructor(idUser: string, full: string, email: string, state: number, password: string, idProfile: number,date: Date, ){
        this.idUser = idUser;
        this.fullName = full;
        this.emailUser = email;
        this.stateUser = state; 
        this.passwordUser = password;
        this.idProfile = idProfile;
        this.dateUser = date;
       
    }

}

export default User;