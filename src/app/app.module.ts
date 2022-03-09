import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponentModule } from '../app/Partials/header/header.component.module';
import { HeaderTwoComponentModule } from '../app/Partials/header-two/header-two.component.module';
import { BarRatingModule } from 'ngx-bar-rating';
import { NgxCleaveDirectiveModule } from 'ngx-cleave-directive';
import { LoadingService } from './Services/loading/loading.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SectionHeaderModule } from './Partials/section-header/section-header.module';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HeaderComponentModule,
    SectionHeaderModule,
    HttpClientModule,
    HeaderTwoComponentModule,
    BarRatingModule,
    NgxCleaveDirectiveModule,
    FormsModule, ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAq84iD_-IGQEzZj5VET55rWthHgh75DSQ',
      libraries: ['places']
    }),
    AgmDirectionModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:44369'],
        blacklistedRoutes: ['localhost:44369/account']
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true  },
    LoadingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
