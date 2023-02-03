class Course{
    public idCourse: string;
    public typeCourse:string;
    public timeCourse:string;
    public price: number ;
    
    constructor(id:string,typeCourse:string,timeCourse:string,price:number){
        this.idCourse=id;
        this.typeCourse=typeCourse;
        this.timeCourse=timeCourse;
        this.price=price;
    }
}
export default Course;