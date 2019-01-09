import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TraineeService } from 'src/app/shared-service/trainee.service';
import { Trainee } from 'src/app/classes/trainee';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  listTrainee: any = [];
  errorMessage = '';
  rowSelected: boolean = false;
  objectId = '';
  traineeObject: any = [];

  public searchString:string;

   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];

  constructor(
    private router: Router,
    private traineeService: TraineeService,
  ) { }

  ngOnInit() {
    this.showTraineeRecords();
  
  }

  showTraineeRecords() {
    this.traineeService.getTrainees()
      .subscribe(data =>{ 
        this.listTrainee = data;
        this.setPage(1);}
        ,
        error => this.errorMessage = error);

  }

  setPage(page: number) {
    console.log('set page clicked');
    // get pager object from service
    this.pager = this.traineeService.getPager(this.listTrainee.length, page);

    // get current page of items
    this.pagedItems = this.listTrainee.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  displayFormRegister() {
    this.router.navigate(['/addrecord']);
  }

  rowSelect(trainee) {
    this.rowSelected = true;
    this.objectId = trainee._id;
    console.log(this.objectId);
    this.traineeService.getTraineeById(this.objectId)
      .subscribe(data => this.traineeObject = data,
        error => this.errorMessage = error);

  }

  deleteTraineeData: any;
  deleteTrainee(traineeObject) {
    this.objectId = traineeObject._id;
    this.deleteTraineeData = traineeObject;
    this.traineeService.deleteTrainee(this.objectId)
      .subscribe((data) => {
        this.listTrainee.splice(this.listTrainee.indexOf(this.traineeObject), 1);
      },
        (error) => {
          console.log(error);
        });
  }
}
