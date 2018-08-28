import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../services/register.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  control: FormGroup;
  status: string = '';
  register: any = {
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    gender:'',
    age:'',
    height:'',
    weight:'',
    role:''
  };
  constructor(
    private fb:FormBuilder,
    private service:RegisterService,
    private router:Router) {
      this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.control = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      gender:['',Validators.required],
      age:['',Validators.required],
      height:['',Validators.required],
      weight:['',Validators.required],
    })
  }

  attemptRegistration(){
    this.register.username = this.control.get('username').value;
    this.register.password = this.control.get('password').value;
    this.register.firstname = this.control.get('firstname').value;
    this.register.lastname = this.control.get('lastname').value;
    this.register.age = this.control.get('age').value;
    this.register.height = this.control.get('height').value;
    this.register.weight = this.control.get('weight').value;
    this.register.gender = this.control.get('gender').value;
    this.register.role = "regular";
    this.service.attemptRegistration(this.register).subscribe(res =>
    {
      this.status = res.status;
    });
    setTimeout(()=>{
      this.createForm();
      this.router.navigate(['login']);
    },2500);
  }
}
