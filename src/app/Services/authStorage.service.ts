import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { switchMap, map, take, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Result } from '../_model/result';
import { decode } from 'punycode';
import { LoggedInUser } from '../_model/loggedInUser';
import { ApiResponse } from '../_model/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  private currentUserSubject: BehaviorSubject<LoggedInUser>;
  authState = new BehaviorSubject(false);
  public currentUser: Observable<LoggedInUser>;
constructor( private router: Router,
  private storage: Storage,
  private platform: Platform,
  public toastController: ToastController,
  private http: HttpClient,
  private alertController: AlertController) { 
     //this.initialRecords();
     this.platform.ready().then(() => {
    });
  }
  initialRecords(){
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
      //  this.currentUserSubject =  new BehaviorSubject<LoggedInUser>(JSON.parse(response));
         // this.currentUserSubject = new BehaviorSubject<LoggedInUser>(response);
    // this.currentUser = this.currentUserSubject.asObservable();
      }
    });
  }
  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        this.authState.next(true);
         // this.currentUserSubject =  new BehaviorSubject<user>(JSON.parse(response));
      }
    });
  }
  otpResend(user: { Username: any; }) {
    return this.http
    .post(`${environment.apiUrl}account/getotp`, user).pipe(
      tap((res: any) => {
        // tslint:disable-next-line: triple-equals
        if(res.responseCode == '00') {
         return res;
      }
      }),
      catchError(this.handleError<any>(``))
    );
  }
  forgotPassword(user) :Observable<ApiResponse<any>>{
    return this.http
    .post(`${environment.apiUrl}/Account/send-password-reset-link?email=${user}`, user ).pipe(
      map((res: ApiResponse<any>) => {
        // tslint:disable-next-line: triple-equals
         return res;
      }),
      catchError(this.handleError<any>(``))
    );
  }
  otpValidation(otp) {
    return this.http
      .post(`${environment.apiUrl}account/useractivation`, otp).pipe(
        tap((res: any) => {
          // tslint:disable-next-line: triple-equals
          if(res.responseCode == '00') {
           return res;
        }
        }),
        catchError(this.handleError<any>(``))
      );
  }
  changePassword(loginDetail) {
    return this.http
      .post(`${environment.apiUrl}account/updatepassword`,loginDetail).pipe(
        tap((res: any) => {
          if(res.responseCode=='00') {
            this.router.navigate(['sign-in']);
          } else {
            this.presentNextError(res.responseMessage);
          }
        }),
        catchError(this.handleError<any>(``))
      );

  }
  getUserData() {
    this.storage.get('USER_INFO').then(res => {
     return JSON.parse(res);
   });
 }
 login(loginCredential) {
   debugger;
   return this.http
     .post(`${environment.apiUrl}Account/get-token`,loginCredential ).pipe(
       tap((res:ApiResponse<LoggedInUser>) => {
         if(res.isSuccessful) {
          // let records=JSON.stringify(res.responseData);
          console.log(res)
           this.storage.set('USER_INFO', res.responseData).then(() => {
             this.authState.next(true);
             this.currentUserSubject =  new BehaviorSubject<LoggedInUser>(res.responseData);
             if(res.responseData.roles[0] =='user')
              {
                window.dispatchEvent(new CustomEvent('user:vendor'));
                this.router.navigateByUrl('/dashboard');
              } else{
                this.presentNextError("Opps!!! user not allowed");
              }
           });
       } else if(res.isSuccessful&&res.message =='Token Validation') {
         this.router.navigate(['pin-verification', {email:loginCredential.Username}]);
       } else {
     // this.presentNextError('Invalid Username or password');
     this.authState.next(false);
         }
      //   _.;
     return res;
     }),
       catchError(this.handleError<any>(``))
     );
 }
 validateUser(loginCredential) {

    return this.http
      .get(`${environment.apiUrl}account/validateUser?username=${loginCredential}`).pipe(
        tap((res: any) => {
          if(res.responseCode=='00') {
            this.storage.set('USER_INFO', res).then(() => {
              this.router.navigate(['dashboard']);
              this.authState.next(true);
            });
        } else if(res.responseCode=='01') {
          this.storage.set('USER_INFO', res).then(() => {
            this.router.navigate(['dashboard']);
            this.authState.next(true);
          });
        } else {
           this.router.navigate(['register']);
             this.authState.next(false);
          }
       //   _.;
        }),
        catchError(this.handleError<any>(``))
      );
  }
 logout() {
   this.storage.remove('USER_INFO').then(() => {
     this.router.navigate(['login']);
     this.authState.next(false);
   });
 }

 isAuthenticated() {
   return this.authState.value;
 }

 private handleError<T> (operation = 'operation', result?: T) {
   debugger;
   return (error: any): Observable<T> => {

     this.log(error.error.message);
     return of(result as T);
   };
 }

 private log(msg:string) {
 //  this.toastController.create(`Login ${message}`);
 this.presentNextError(msg);

 }
 async presentNextError(message = 'Network  Issue') {
   const alert = await this.alertController.create({
     header: 'Notice!!!',
     subHeader: '',
     message: message,
     buttons: ['OK']
   });
   await alert.present();
 }
}
