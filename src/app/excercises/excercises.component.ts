import {Component, Inject, OnInit} from '@angular/core';
import {ExerciseService} from '../services/exercise.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {DataService} from '../services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-excercises',
  templateUrl: './excercises.component.html',
  styleUrls: ['./excercises.component.css']
})
export class ExcercisesComponent implements OnInit {

  constructor(private service: ExerciseService,
              private dialog: MatDialog,
              private dataService: DataService,
              private router:Router) { }
  excercises: any[] = [];
  legs:any[] = [];
  chest: any[] = [];
  back: any[] = [];
  userType: string;
  ngOnInit() {
    this.userType = localStorage.getItem('userType');
    this.service.getExcercises().subscribe(res => {
      this.excercises = res;
      this.legs = this.excercises.filter(item => item.type ==='leg');
      this.chest = this.excercises.filter(item => item.type ==='chest');
      this.back = this.excercises.filter(item => item.type ==='back');
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddExcercise, {
      width:'300px',
      data: {name:'',difficulty:'',type:'',link:''}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result){
        if(result.name && result.difficulty && result.type) this.addExcercise(result);
      }
    });
  }
  chosenRow: any;
  index: number;
  editDialog(index, chosenRow): void {
    this.chosenRow = chosenRow;
    this.index = index;
    const dialogRef = this.dialog.open(EditExcercise, {
      width:'300px',
      data: chosenRow
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result){
        if(result.name && result.difficulty && result.type) this.editExcercise(result);
      }
    });
  }


  addExcercise(data){
    this.service.addExcercises(data).subscribe(res => {
      switch (data.type){
        case "leg":
          this.legs.push(data);
          break;
        case "chest":
          this.chest.push(data);
          break;
        default: this.back.push(data);
      }
    });
  }

  editExcercise(editedRow){
    switch (this.chosenRow.type){
      case "leg":
        this.legs.splice(this.index,1);
        this.legs.push(editedRow);
        break;
      case "chest":
        this.chest.splice(this.index,1);
        this.chest.push(editedRow);
        break;
      default:
        this.back.splice(this.index,1);
        this.back.push(editedRow);
    }
    this.service.editExcercise(editedRow).subscribe(res => console.log(res));
  }

  deleteExcercise(index, ex){
    switch (ex.type){
      case "leg":
        this.legs.splice(index,1);
        break;
      case "chest":
        this.chest.splice(index,1);
        break;
      default:
        this.back.splice(index,1);
    }
    this.service.deleteExcercise(ex._id).subscribe(res=>console.log(res));
  }

  appendToUserExcercise(index, ex){
    let user = localStorage.getItem('id');
    let username = localStorage.getItem('user');
    username = `profile/${username}`;
    this.dataService.postUserExcercise(user,ex._id).subscribe(res => {
      console.log(res);
      this.router.navigate([username]);
    });
  }

}


@Component({
  selector: 'add-excercise',
  templateUrl: 'add-excercise.html',
  styleUrls: ['add-excercise.css']
})
export class AddExcercise {

  constructor(
    public dialogRef: MatDialogRef<AddExcercise>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'edit-excercise',
  templateUrl: 'edit-excercise.html',
  styleUrls: ['add-excercise.css']
})
export class EditExcercise {

  constructor(
    public dialogRef: MatDialogRef<EditExcercise>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
