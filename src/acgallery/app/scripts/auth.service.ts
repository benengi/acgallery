﻿import { IDServerUrl, ACGalleryCallback, ACGalleryLogoutCallback,
    ACGalleryHost, environment  }   from './app.setting';
import { Injectable }               from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject }          from 'rxjs/BehaviorSubject';
import { Observable }               from 'rxjs/Observable';
import { UserInfo }                 from './user.service';
declare var Oidc: any;


@Injectable()
export class AuthService {
    private _authContent: BehaviorSubject<UserInfo> = new BehaviorSubject(new UserInfo());

    public authContent: Observable<UserInfo> = this._authContent.asObservable();

    private mgr: any;

   constructor() {
       let settings = {
           authority: IDServerUrl,
           client_id: "acgallery.app",
           redirect_uri: ACGalleryCallback,
           response_type: "id_token token",
           scope: "openid profile api.hihapi"
       };

       this.mgr = new Oidc.UserManager(settings);
       var that = this;
       this.mgr.getUser().then(function (u) {
           if (u) {
               that._authContent.value.setContent(u);               
           }
           else {
               that._authContent.value.cleanContent();
           }

           that._authContent.next(that._authContent.value);
       });

       this.mgr.events.addUserUnloaded((e) => {
           if (environment === "Development") {
               console.log("user unloaded");
           }
           that._authContent.value.cleanContent();

           that._authContent.next(that._authContent.value);
       });
    }

   public doLogin() {
       if (environment === "Development") {
           console.log("Start the login...");
       }

       if (this.mgr) {
           this.mgr.signinRedirect().then(function () {
               console.info("redirecting for login...");
           })
            .catch(function (er) {
                console.error("Sign-in error", er);
            });
       }
   }
}