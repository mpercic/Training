import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {ActivatedRoute} from '@angular/router';
import {ExerciseService} from '../services/exercise.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  expandedView: any[] = [];
  userExcercises: any[] = [];
  userInfo: any;
  addLink: any = 'add/'+this.route.snapshot.params['user'];

  constructor(private service:DataService,
              private excercises: ExerciseService,
              private route:ActivatedRoute,
              private user:LoginService) { }

  ngOnInit() {

      this.service.getUserInfo(this.route.snapshot.params['user']).subscribe(res => {
        console.log(res);
        this.userInfo = res;
      });

      this.service.getUserExcercises().subscribe(res => {
        this.userExcercises = res.data;
        this.excercises.excercises.forEach(obj =>
          this.userExcercises.forEach(o => {
            if(o.idEx === obj._id){
              this.expandedView.push(obj);
            }
          })
        );
      });
  }

  removeItem(obj,index){
    this.expandedView.splice(index,1);
    this.service.removeUserExcercise(obj._id, this.userInfo._id).subscribe(res => res);
  }

  logout(){
    this.user.logout();
  }

}
