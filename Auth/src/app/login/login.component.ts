import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
invalidLogin:boolean;
  constructor(private router:Router, private http:HttpClient) { }

  login(form:NgForm){
    const credentials = {
      'username': form.value.username,
      'password': form.value.password,
    }

    this.http.post("https://localhost:7071/api/auth/login", credentials).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/home"]);

    },err => {
      this.invalidLogin = true;
    })


  }
}
