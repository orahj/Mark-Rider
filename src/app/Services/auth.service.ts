import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RegistrationDto } from '../_model/registrationDto';
import { Result } from '../_model/result';
import { Observable } from 'rxjs';
import { UserInfoResponseDto } from '../_model/userInfoResponseDto';
import { ChangePasswordDto } from '../_model/changePasswordDto';
import { Router } from '@angular/router';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userinfo: UserInfoResponseDto;
userResponse: Result;
decordedToken: any;
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  constructor(
    private http: HttpClient,
    private router : Router,
    public events: EventService
    ) { }

  login(model: any) {
  return this.http.post(this.baseUrl + 'Account/login', model)
  .pipe(
    map((Response: any) => {
      const user = Response;
      this.userResponse = Response;
      if (Response.isSuccessful === true) {
        localStorage.setItem('refreshappmenu', 'appmenu');
        localStorage.removeItem('refreshappmenu');
        localStorage.setItem('token', JSON.stringify(Response.returnedObject.token) );
        localStorage.setItem('userobj', JSON.stringify(Response.returnedObject));
        let userdata = localStorage.setItem('userobj', JSON.stringify(Response.returnedObject));
        if(Response.returnedObject.userTypes === 4) {
          this.router.navigateByUrl('/dashboard');
        }
        else if(Response.returnedObject.userTypes === 3) {
          this.router.navigateByUrl('/rider-dashboard');
        }
        this.events.publishSomeData({
          userdata
          // userId: this.userIdToLogin
        })
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

  getdeliverybyshipment(shipmentNo : string, email : string){
    return this.http.get(this.baseUrl + 'Delivery/get-delivery-by-shipment/' + shipmentNo  + '/' + email)
  }

  createdelivery(model : any) {
    return this.http.post(this.baseUrl + 'Delivery/create-delivery', model);
  }

  getriderdelivery(email : string){
    return this.http.get(this.baseUrl + `Delivery/get-rider-deliveries?email=${email}`)
  }

  getridersalesrecord(email : string){
    return this.http.get(this.baseUrl + `Delivery/get-rider-sales-record?email=${email}`)
  }

  getcancellationreason(){
    return this.http.get(this.baseUrl + 'Delivery/get-cancellation-reason')
  }

  canceldelivery(model : any){
    return this.http.post(this.baseUrl + 'Delivery/cancel-delivery', model);
  }

  startdelivery(model : any){
    return this.http.post(this.baseUrl + 'Delivery/start-delivery', model);
  }

  getdeliverybyid(id : number){
    return this.http.get(this.baseUrl + 'Delivery/' + id);
  }


  canceldeliverybyuser(model : any){
    return this.http.post(this.baseUrl + 'Delivery/cancel-delivery-by-user', model);
  }

  completedelivery(model : any){
    return this.http.post(this.baseUrl + 'Delivery/completed-delivery', model)
  }

  endelivery(model : any){
     return this.http.post(this.baseUrl + 'Delivery/end-delivery', model)
  }

  getdeliveryitem(id : number){
    return this.http.get(this.baseUrl + 'Delivery/delivery-items-by-delivery-id/' + id)
  }

  disputedelivery(model : any) {
    return this.http.post(this.baseUrl + 'Delivery/disputed-delivery', model )
  }

  getbanks(){
    return this.http.get(this.baseUrl + 'Payment/getbanks');
  }

  bvnlookup(model : any) {
    return this.http.post(this.baseUrl + 'Payment/bvn-look-up', model);
  }

  fileupload(file: any){
    const formData: FormData = new FormData();
    formData.append('file', file);

    // const req = new HttpRequest('POST', `${this.baseUrl}FileManager/Single`, formData);
    // return this.http.request(req);
    return this.http.post(`${this.baseUrl}FileManager/Single`, formData);
  }

  fundwallet(model : any){
    return this.http.post(this.baseUrl + 'Wallet/FundWallet', model);
  }

  walletpayment(model : any){
    return this.http.post(this.baseUrl + 'Wallet/make-payment-with-wallet', model);
  }

  verifytransaction(model : any) {
    return this.http.post(this.baseUrl + 'Payment/verifyTransaction', model);
  }

  getwalletbalance(email : string){
    return this.http.get(this.baseUrl + `Wallet/GetWalletBalance?email=${email}`);
  }

  getwalletransaction(email : string){
    return this.http.get(this.baseUrl + `Wallet/GetUserWalletTransactions?email=${email}`);
  }

  getnotification(email : string) {
    return this.http.get(this.baseUrl + `Notification/all?email=${email}`);
  }

  getnotificationbyid(id : number) {
    return this.http.get(this.baseUrl + 'Notification/' + id);
  }
  readnotificationbyid(id : number) {
    return this.http.patch(this.baseUrl + `Notification/${id}`, id);
  }

  readallnotification(email : string) {
    return this.http.patch(this.baseUrl + `Notification/all?email=${email}`, email);
  }

  deletenotificationbyid(id : number) {
    return this.http.delete(this.baseUrl + 'Notification/' + id);
  }

  deleteallnotification(email : string) {
    return this.http.delete(this.baseUrl + `Notification/all?email=${email}`);
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
