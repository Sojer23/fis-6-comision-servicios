import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  private _idToken: String;
  private _accessToken: String;
  private _expiresAt: Number;

  auth0 = new auth0.WebAuth({
    clientID: 'eFch7yiggVqE4T6Xg7p7B1TC8ZxlREdf',
    domain: 'sos1617-02.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: isDevMode()?'http://localhost:3000':'https://fis2018-06.herokuapp.com/',
    scope: 'openid profile'
  });

  userProfile: any;
  isAdmin: Boolean;

  constructor(public router: Router) {
    this._idToken = sessionStorage.getItem('idToken') || '';
    this._accessToken = sessionStorage.getItem('accessToken') || '';
    this._expiresAt = Number(sessionStorage.getItem('expiresAt')) || 0;
    this.isAdmin = sessionStorage.getItem('isAdmin')==='true' || false;
  }

  get accessToken(): String {
    return this._accessToken;
  }

  get idToken(): String {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
        if (this.userProfile) {
          console.log(this.userProfile);
        } else {
          this.getProfile((err, profile) => {
            if(profile['http://sos1617-02.com/roles'][0] === "admin"){
              this.isAdmin = true;
              sessionStorage.setItem('isAdmin', String(true));
              console.log("El usuario "+ profile.nickname +" ha iniciado sesión como "+ profile['http://sos1617-02.com/roles'][0]);
              console.log("El usuario "+ profile.nickname +" es administrador: "+ this.isAdmin);
              this.router.navigate(['/comisionesAdmin']);
            }else{
              this.isAdmin = false;
              sessionStorage.setItem('isAdmin', String(false));
              console.log("El usuario "+ profile.nickname +" ha iniciado sesión como "+ profile['http://sos1617-02.com/roles'][0]);
              console.log("El usuario "+ profile.nickname +" es administrador: "+ this.isAdmin);
              this.router.navigate(['/comisionesInvestigador']);
            }
          });
        }
        
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

    //PARA OBTENER EL PERFIL DEL USUARIO
    public getProfile(cb): void {
      if (!this._accessToken) {
        throw new Error('Access token must exist to fetch profile');
      }
      const self = this;
      this.auth0.client.userInfo(this._accessToken, (err, profile) => {
        if (profile) {
          self.userProfile = profile;
        }
        cb(err, profile);
      });
    }

    private localLogin(authResult): void {
      
      // Set the time that the access token will expire at
      const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
      this._accessToken = authResult.accessToken;
      this._idToken = authResult.idToken;
      this._expiresAt = expiresAt;

      //  NO Set isLoggedIn flag in sessionStorage
      //sessionStorage.setItem('isLoggedIn', 'true');
      // Mejor controlamos si esta LoggedIn directamente con el método isAuthenticated()
      sessionStorage.setItem('accessToken', authResult.accessToken);
      sessionStorage.setItem('expiresAt', String(expiresAt));
      sessionStorage.setItem('idToken',authResult.idToken)

    }

    public renewTokens(): void {
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.localLogin(authResult);
        } else if (err) {
          alert(`Su sesión ha expirado (${err.error}: ${err.error_description}).`);
          this.logout();
        }
      });
    }

    public logout(): void {
      // Remove tokens and expiry time
      this._idToken = '';
      this._accessToken = '';
      this._expiresAt = 0;
      this.isAdmin = false;

      // Remove isLoggedIn flag from sessionStorage
      // sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('idToken');
      sessionStorage.removeItem('expiresAt');

      // Go back to the home route
      this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
      // Check whether the current time is past the
      // access token's expiry time
      return new Date().getTime() < this._expiresAt;
    }

    public checkAdmin(): Boolean{
      return this.isAdmin;
    }


  }
