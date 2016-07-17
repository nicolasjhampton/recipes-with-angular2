'use strict';

import { bootstrap }    from '@angular/platform-browser-dynamic';
import { PLATFORM_DIRECTIVES, ExceptionHandler, provide } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';
import { APP_ROUTER_PROVIDERS } from './app/routes/app.routes';
import { AppComponent } from './app/components/app/app.component';

import './styles/main.css';
import './styles/unsemantic-grid-responsive.css';

class MyExceptionHandler implements ExceptionHandler {
    call(error, stackTrace = null, reason = null) {
       alert(error);
    }
 }

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  provide(PLATFORM_DIRECTIVES, { useValue: [ROUTER_DIRECTIVES], multi: true }),
  provide(ExceptionHandler, {useClass: MyExceptionHandler})
]);

// provide(PLATFORM_DIRECTIVES, {useValue: [ROUTER_DIRECTIVES], multi: true})
