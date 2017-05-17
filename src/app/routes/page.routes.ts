import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OverviewComponent} from "../home/overview";
import {WikiPageComponent} from '../home/wikipage';
import {UserComponent} from "../home/user"

const appRoutes: Routes = [
    {
        path: 'overview', component: OverviewComponent
    },
    {
        path: 'wiki', children: [ { path: '**', component: WikiPageComponent } ]
    },
    {
        path: 'login', component: UserComponent
    },
    {
        path: '', redirectTo: '/overview', pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { useHash: true }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}