import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IUser, User} from './service-proxies';
import { Storage } from '@ionic/storage';


@Injectable()
export class AuthenticationService {
    main_id = 0;
    user: IUser;
    users: IUser[] = [];
    public globalUser = new BehaviorSubject<IUser>(new User().clone());

    constructor(private router: Router,private storage: Storage) { }

    getuser(): Promise<IUser[]> {
        this.users = [];
        return new Promise((resolve) => {
            this.storage.get('user').then(usersdata => {
                this.users = usersdata;
                if (this.users) {
                    if (this.users.length > 0) {
                        this.globalUser.next(this.users[0]);
                    }
                }
                resolve(this.users);
            });
        });


    }


    addUser(user) {
        this.users = [];
        this.users.push(user);
        this.storage.set('user', this.users);
    }

    updateuser(user:User) {
        this.users = [];
        this.users.push(user);
        this.storage.set('user', this.users);

    }

    clearusers() {
        this.users = [];
        this.storage.remove('user');
        this.router.navigate(['home'])
    }

}
