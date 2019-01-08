import { count } from "rxjs/operators";

export class Trainee {
    public _id: string;
    public name: string;
    public grade: string;
    public email: string;
    public joined_date:string;
    public address:string;
    public city:string;
    public country:string;
    public zip:string;
    public subject:string

    public Trainee(
        id:string,
        name: string,
        grade: string,
        email: string,
        joined_date:string,
        address:string,
        city:string,
        country:string,
        zip:string,
        subject:string
        ){
            this._id=id;
            this.name=name;
            this.grade=grade;
            this.email=email;
            this.joined_date=joined_date;
            this.address=address;
            this.city=city;
            this.country=country;
            this.zip=zip;
            this.subject=subject;

    }
}
