import { Component, OnInit, ViewContainerRef } from "@angular/core";
import {IWikiUser} from "../../../interfaces";
import {WikiUserService} from './user.service';

import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    templateUrl: "user.component.pug",
    styleUrls: ["user.component.scss"]
})

export class UserComponent implements OnInit {
    userForm: FormGroup;
    currentUser: IWikiUser;

    constructor(private wikiUserService: WikiUserService) {
        this.currentUser = <IWikiUser> {};

        this.userForm = new FormGroup({
            userEmail: new FormControl({ value: '', disabled: false }, Validators.required),
            userPassword: new FormControl({ value: '', disabled: false }, Validators.required)
        });
    }

    ngOnInit(): void {

    }

    loginUser() {
        this.wikiUserService.loginUser(this.currentUser)
            .subscribe(
                (userToken: any) => {
                    console.log('user logged in', userToken);
                },
                (err: any) => {
                    console.error(err);
                }
            );

    }

    createUser() {
        this.wikiUserService.createUser(this.currentUser)
            .subscribe(
                (userToken: any) => {
                    console.log('user created', userToken);
                },
                (err: any) => {
                    console.error(err);
                }
            );

    }
};