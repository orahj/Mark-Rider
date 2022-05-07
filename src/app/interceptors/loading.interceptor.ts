import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, finalize } from "rxjs/operators";
import { LoadingService } from "../Services/loading/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingservice:LoadingService) {}
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loadingservice.showLoader();
      return next.handle(req).pipe(
          delay(1000),
          finalize(()=>{
              this.loadingservice.closeLoader();
          })
      );
    }
  }