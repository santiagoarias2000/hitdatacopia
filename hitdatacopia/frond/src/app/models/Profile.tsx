class Profile{
    public idProfile: number;
    public nameProfile: string;
    public stateProfile: number;

    constructor(idProfile: number, name: string, state: number){
        this.idProfile = idProfile;
        this.nameProfile = name;
        this.stateProfile = state;
    }

}
export default Profile;