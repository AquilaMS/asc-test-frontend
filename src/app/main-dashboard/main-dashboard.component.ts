import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent {
  private signinUrl = 'http://localhost:8090/api/auth/signin';
  private signupUrl = 'http://localhost:8090/api/auth/signup';

  signinForm = new FormGroup({
    Name: new FormControl(''),
    Password: new FormControl('')
  });

  signupForm = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl('')
  });

  constructor(private http: HttpClient) {}

  signin() {
    const { Name, Password } = this.signinForm.value;
    const body = { Name, Password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.signinUrl, body, { headers }).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  signup() {
    const { Name, Email, Password } = this.signupForm.value;
    const body = { Name, Email, Password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.signupUrl, body, { headers }).subscribe(
      (response) => {
        console.log(response);
      },
    );
  }
}