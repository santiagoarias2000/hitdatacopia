class AccessUser{
    public fullName: string;
    public emailUser: string;
    public passwordUser: string;

    constructor(name: string, email: string, password: string){
        this.fullName = name;
        this.emailUser = email;
        this.passwordUser = password;
    }

}
export default AccessUser;