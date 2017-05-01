import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OverviewComponent} from "../home/overview";
import {WikiPageComponent} from '../home/wikipage';

const appRoutes: Routes = [
    {
        path: '', component: OverviewComponent
    },
    {
        path: 'wiki/:wikipath', component: WikiPageComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}