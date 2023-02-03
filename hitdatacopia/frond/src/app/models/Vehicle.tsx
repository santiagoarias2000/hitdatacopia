class Vehicle{
    public idVehicle: string;
    public typeVehicle:string;
    public licensePlate :string;
    public expirationSoat: string;
    public expirationTecnomechanic: string;

    constructor(id:string,type:string,licensePlate:string,expirationSoat:string,expirationTecnomechanic:string){
        this.idVehicle=id;
        this.typeVehicle=type;
        this.licensePlate=licensePlate;
        this.expirationSoat=expirationSoat;
        this.expirationTecnomechanic=expirationTecnomechanic;
    }
}
export default Vehicle;
