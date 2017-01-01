﻿import { Component, OnInit }        from '@angular/core';
import { AuthService }              from './services/auth.service';
import { DebugLogging }             from './app.setting';
import { TranslateService }         from 'ng2-translate';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

@Component({
    selector: 'acgallery-app',
    templateUrl: 'app/views/main.html'
})
export class AppComponent implements OnInit {

    public isLoggedIn: boolean;
    public titleLogin: string;

    constructor(private authService: AuthService,
        private translateService: TranslateService) {
        if (DebugLogging) {
            console.log("Entering constructor of AppComponent");
        }
        this.isLoggedIn = false;
        this.titleLogin = 'Login';

        translateService.addLangs(["en", "zh"]);
        translateService.setDefaultLang('en');

        this.authService.authContent.subscribe(x => {
            this.isLoggedIn = x.isAuthorized;
            if (this.isLoggedIn)
                this.titleLogin = x.getUserName();
            else
                this.titleLogin = "";

            if (!this.titleLogin)
                this.titleLogin = 'Login';
        });
    }

    ngOnInit() {
        if (DebugLogging) {
            console.log("Entering ngOnInit of AppComponent");
        }

        var el = document.querySelector('.sidebar-nav');
        var btnEl = document.querySelector('.header-nav-toggle');
        if (el && btnEl) {
            var nav = new (<any>window).SideNavigation(el, btnEl);
        }
    }

    public onLogin() {
        if (DebugLogging) {
            console.log("Entering onLogin of AppComponent");
        }
        if (this.isLoggedIn) {
            this.doLogout();
        } else {            
            this.doLogin();
        }
    }

    private doLogin() {
        if (DebugLogging) {
            console.log("Entering doLogin of AppComponent");
        }
        this.authService.doLogin();
    }

    private doLogout() {
        if (DebugLogging) {
            console.log("Entering doLogout of AppComponent");
        }
        //this.loginService.Logoff();
        //this.authService.doLogout();
    }
}
