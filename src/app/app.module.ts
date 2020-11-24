import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule  } from '@ionic/storage';
import { DecimalPipe } from '@angular/common';

import { AuthGuardService} from './_services/auth-guard.service';
import { AuthService} from './_services/auth.service';
import { AuthenticationService} from './_services/authentication.service';
import { InputvalidationService} from './_services/inputvalidation.service';
import { ShortcutsService } from './_services/shortcuts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,],
  providers: [
    StatusBar,
    SplashScreen,
    IonicStorageModule,
    AuthGuardService,
    AuthService,
    AuthenticationService,
    DecimalPipe,
    InputvalidationService,
    ShortcutsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
