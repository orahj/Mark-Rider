import { Injectable, ReflectiveInjector } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RegistrationDto } from '../_model/registrationDto';
import { Result } from '../_model/result';
import { Observable } from 'rxjs';
import { UserInfoResponseDto } from '../_model/userInfoResponseDto';
import { ChangePasswordDto } from '../_model/changePasswordDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userinfo: UserInfoResponseDto;
userResponse: Result;
decordedToken: any;
  baseUrl = environment.apiUrl + 'account/';
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }
  login(model: any) {
  return this.http.post(this.baseUrl + 'get-token', model)
  .pipe(
    map((Response: any) => {
      debugger;
      const user = Response;
      this.userResponse = Response;
      if (user) {
        localStorage.setItem('token', user.responseData.token );
      }
    })
  );
  }
  logedin() {
    const token = localStorage.getItem('token')
    return true;
    //return !this.jwtHelper.isTokenExpired(token);
  }
  register(registerdto: RegistrationDto): Observable<Result> {
    return this.http.post<Result>(this.baseUrl + 'register', registerdto);
  }
  verifyemail(model: any): Observable<Result> {
    return this.http.patch<Result>(this.baseUrl + 'verify-mail', model);
  }
  changepassword(model: ChangePasswordDto): Observable<Result> {
    return this.http.patch<Result>(this.baseUrl + 'change-password', model);
  }
  getuserinfo(email:string): Observable<Result> {
    return this.http.get<Result>(this.baseUrl + 'get-user-info/'+ email);
  }
//   getClientInfo(userid: string): Observable<Result> {
//     return this.http.get<Result>(this.baseUrl + 'Users/client/' + userid);
// }
getClientInfo(email: string) {
  return this.http.get<Result>(this.baseUrl + 'get-user-info/'+ email)
  .pipe(
    map((Response: Result) => {
      debugger;
      this.userinfo = Response.responseData;
    })
  );
}
}
