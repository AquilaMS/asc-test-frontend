import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css'],
})
export class MainDashboardComponent {
  private signinUrl = 'http://localhost:8090/api/auth/signin';
  private signupUrl = 'http://localhost:8090/api/auth/signup';

  signinForm = new FormGroup({
    Name: new FormControl(''),
    Password: new FormControl(''),
  });

  signupForm = new FormGroup({
    Name: new FormControl(''),
    Email: new FormControl(''),
    Password: new FormControl(''),
  });

  constructor(private http: HttpClient) {}

  saveTokenLocalStorage(token: string): void {
    const data = { token: token };
    const jsonString = JSON.stringify(data);

    localStorage.setItem('asc-auth-token', jsonString);
  }

  getTokenLocalStorage(): string | null {
    const jsonString = localStorage.getItem('asc-auth-token');

    if (jsonString) {
      const data = JSON.parse(jsonString);
      return data.token;
    }

    return null;
  }

  signin() {
    const { Name, Password } = this.signinForm.value;
    const body = { Name, Password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.signinUrl, body, { headers }).subscribe((response:any) => {
      //TODO
      this.saveTokenLocalStorage(response.token)
    });
  }

  signup() {
    const { Name, Email, Password } = this.signupForm.value;
    const body = { Name, Email, Password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(this.signupUrl, body, { headers }).subscribe((response) => {
      //TODO
    });
  }
}
