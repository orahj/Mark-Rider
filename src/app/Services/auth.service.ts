import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RegistrationDto } from '../_model/registrationDto';
import { Result } from '../_model/result';
import { Observable } from 'rxjs';
import { UserInfoResponseDto } from '../_model/userInfoResponseDto';
import { ChangePasswordDto } from '../_model/changePasswordDto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userinfo: UserInfoResponseDto;
userResponse: Result;
decordedToken: any;
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient, private router : Router) { }
  login(model: any) {
  return this.http.post(this.baseUrl + 'Account/login', model)
  .pipe(
    map((Response: any) => {
      const user = Response;
      this.userResponse = Response;
      console.log('Response',Response);
      if (Response.isSuccessful === true) {
        localStorage.setItem('token', JSON.stringify(Response.returnedObject.token) );
        localStorage.setItem('userobj', JSON.stringify(Response.returnedObject));
        if(Response.returnedObject.userTypes === 4) {
          this.router.navigateByUrl('/dashboard');
        }
        else if(Response.returnedObject.userTypes === 3) {
          this.router.navigateByUrl('/rider-dashboard');
        }
      }
    })
  );
  }


  logedin() {
    const token = localStorage.getItem('token')
    return true;
    //return !this.jwtHelper.isTokenExpired(token);
  }
  register(registerdto: RegistrationDto) {
    return this.http.post(this.baseUrl + 'Account/register', registerdto)
    .pipe(map((Response : any) => {
      this.router.navigateByUrl('/login');
    }));
  }

  resetlink(model : any) {
    return this.http.post(this.baseUrl + 'Account/send-password-resetLink', model);
  }

  resetpassword(model : any){
    return this.http.post(this.baseUrl + 'Account/reset-password', model);
  }

  getstate() {
    return this.http.get(this.baseUrl + 'Account/get-states');
  }

  getcountries() {
    return this.http.get(this.baseUrl + 'Account/get-countries');
  }

  updateuserinfo(model : any) {
    return this.http.put(this.baseUrl + 'Account/update-user-info', model);
  }

  updateriderbankinfo(model : any) {
    return this.http.put(this.baseUrl + 'Account/update-rider-information', model);
  }

  updateriderguarantorinfo(model : any) {
    return this.http.put(this.baseUrl + 'Account/update-guarantor-information', model);
  }

  rideronlinestatus(model : any) {
    return this.http.put(this.baseUrl + 'Account/rider-online-status', model);
  }
  getdelivery(email : string){
    return this.http.get(this.baseUrl + 'Delivery/get-delivery-by-email/' + email)
  }

  getdeliverybyshipment(shipmentNo : string){
    return this.http.get(this.baseUrl + 'Delivery/get-delivery-by-shipment/' + shipmentNo)
  }

  createdelivery(model : any) {
    return this.http.post(this.baseUrl + 'Delivery/create-delivery', model);
  }

  fileupload(file: any){
    return this.http.post(this.baseUrl + 'FileManager/Single', file);
  }

  fundwallet(model : any){
    return this.http.post(this.baseUrl + 'Wallet/FundWallet', model);
  }

  walletpayment(model : any){
    return this.http.post(this.baseUrl + 'Wallet/make-payment-with-wallet', model);
  }

  getbanks(){
    return this.http.get(this.baseUrl + `Payment/getbanks`);
  }

  getwalletbalance(email : string){
    return this.http.get(this.baseUrl + `Wallet/GetWalletBalance?email=${email}`)
  }

  getwalletransaction(email : string){
    return this.http.get(this.baseUrl + `Wallet/GetUserWalletTransactions?email=${email}`)
  }
  
  paywithtransfer(model : any){
    return this.http.post(this.baseUrl + 'Payment/payment-with-transfer', model);
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
