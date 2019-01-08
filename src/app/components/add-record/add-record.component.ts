import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { TraineeService } from 'src/app/shared-service/trainee.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  postTraineeData:FormGroup;
  errorMessage:'';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private traineeService:TraineeService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  get name(){ return this.postTraineeData.get('name');}
  get grade() { return this.postTraineeData.get('grade');}
  get email() { return this.postTraineeData.get('email');}
  get joined_date(){return this.postTraineeData.get('joined_date');}
  get address() { return this.postTraineeData.get('address');}
  get city() { return this.postTraineeData.get('city');}
  get country() { return this.postTraineeData.get('country');}
  get zip() { return this.postTraineeData.get('zip');}
  get subject() { return this.postTraineeData.get('subject');}

  createForm(){
    this.postTraineeData=this.formBuilder.group({
      'name':['',[Validators.required,Validators.minLength(5)]],
      'grade':['',[Validators.required,Validators.minLength(1)]],
      'email':['',[Validators.required,Validators.minLength(5)]],
      'joined_date':['',[Validators.required]],
      'address':['',[Validators.required,Validators.minLength(4)]],
      'city':['',[Validators.required,Validators.minLength(4)]],
      'country':['',[Validators.required,Validators.minLength(4)]],
      'zip':['',[Validators.required,Validators.minLength(4)]],
      'subject':['',[Validators.required,Validators.minLength(3)]],


    });
  }

  onSubmit(){
    console.log(this.postTraineeData.value);
    this.traineeService.createTraineeRecord(this.postTraineeData.value)
                        .subscribe(data=>console.log(data),
                        error=>this.errorMessage=error);
    this.postTraineeData.reset();
  }
}
