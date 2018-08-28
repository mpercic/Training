import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  control: FormGroup;
  login: any = {
    username: '',
    password: ''
  };
  status:string = '';
  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router) {
    this.createForm();
  }

  createForm(){
    this.control = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }
  ngOnInit() {
  }

  attemptLogin(){
    this.login.username = this.control.get('username').value;
    this.login.password = this.control.get('password').value;
    this.service.login(this.login).subscribe((res: any) =>
    {
      this.status = res.status;
      if(res.status == 200){
        localStorage.setItem("loggedIn","true");
        localStorage.setItem("userType","regular");
        localStorage.setItem("id",res.id);
        localStorage.setItem("user",res.message);
      }
      setTimeout(()=>{
        this.router.navigate([`profile/${res.message}`])
      },2500);
    });
  }
}
