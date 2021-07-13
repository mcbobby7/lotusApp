import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule  } from '@ionic/storage';
import { CurrencyPipe, DecimalPipe } from '@angular/common';

import { Camera } from '@ionic-native/camera/ngx';

import { AuthGuardService} from './_services/auth-guard.service';
import { AuthService} from './_services/auth.service';
import { AuthenticationService} from './_services/authentication.service';
import { InputvalidationService} from './_services/inputvalidation.service';
import { ShortcutsService } from './_services/shortcuts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WithdrawalService } from './_services/withdrawal.service';
import { BankService } from './_services/bank.service';
import { TransferService } from './_services/transfer.service';
import { ApiProvider } from './_services/api.service';
import { HTTP } from '@ionic-native/http/ngx';
// import { IonicFingerPrintReader } from '@ionic-native/ionic-finger-print-reader/ngx';
import { JwtInterceptor } from './_services/jwt.interceptor';
import { AuthServiceProxy } from './_services/service-proxies';
import { GlobalalertservicesService } from './_services/globalalertservices.service';
import { NgIdleService } from './_services/ng-idle.service';
import { LotusServiceProxy } from 'src/app/_services/service-proxies';
import { Printer, PrintOptions } from '@ionic-native/printer/ngx';

import { ComponentsModule} from '../app/components/components.module';
@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    HttpClientModule],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    IonicStorageModule,
    AuthGuardService,
    AuthService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DecimalPipe,
    InputvalidationService,
    ShortcutsService,
    WithdrawalService,
    BankService,
    ShortcutsService,
    CurrencyPipe,
    TransferService,
    Storage,
    ApiProvider,
    HttpClient,
    // IonicFingerPrintReader,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthServiceProxy,
    GlobalalertservicesService,
    LotusServiceProxy,
    Camera,
    NgIdleService,
    Printer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
