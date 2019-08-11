import { RouterModule,Routes } from '@angular/router';
import { NgModule }              from '@angular/core';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateComponent } from './customer/create/create.component';
import { AgentComponent } from './components/agent/agent.component';
import { EditComponent } from './customer/edit/edit.component';
import { CustomerlistComponent } from './customer/customerlist/customerlist.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './components/user/logout/logout.component';
import { AgenteditComponent } from './components/agentedit/agentedit.component';
import { AgentlistComponent } from './components/agentlist/agentlist.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { CsDetailsComponent } from './components/cs-details/cs-details.component';
import { HomeComponent } from './components/home/home.component';
import { RecentCRComponent } from './components/recent-cr/recent-cr.component';


export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    
    { path: 'create', component: CreateComponent,canActivate:[AuthGuard]
    },
    { path: 'agent', component: AgentComponent,canActivate:[AuthGuard]
    },
    { path: 'logout', component: LogoutComponent,canActivate:[AuthGuard]
    },
    {
        path: 'edit/:id', component: EditComponent,canActivate:[AuthGuard]
    },
    {
        path: 'agentedit/:id', component: AgenteditComponent,canActivate:[AuthGuard]
    },
    {
        path: 'agentList', component: AgentlistComponent,canActivate:[AuthGuard]
    },
    {
        path: 'userList', component: UserlistComponent,canActivate:[AuthGuard]
    },
    {
        path: 'csList', component: CsDetailsComponent,canActivate:[AuthGuard]
    },
    {
        path: 'recentList', component: RecentCRComponent,canActivate:[AuthGuard]
    },
    {
        path: 'customerList', component: CustomerlistComponent,canActivate:[AuthGuard]
    },
    {
        path: 'cshome', component: CustomerComponent
    },
    
    {
        path: '', redirectTo: '/cshome', pathMatch: 'full'
    }
];

@NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
    ],
    exports: [
      RouterModule
    ]
  })
  export class AppRoutingModule {}