// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatToolbarModule,MatSidenavModule,MatRadioModule,
MatNativeDateModule,MatIconModule,MatListModule,MatCardModule,MatInputModule,MatDatepickerModule} from '@angular/material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatGridListModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';

// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { ClayoutComponent } from './ui/clayout/clayout.component';
import { CheaderComponent } from './ui/cheader/cheader.component';
import { CfooterComponent } from './ui/cfooter/cfooter.component';
//routes
import { AppRoutingModule } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { CustomerService } from './shared/customer.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CreateComponent } from './customer/create/create.component';
import { CustomerlistComponent } from './customer/customerlist/customerlist.component';

import { CustomerComponent } from './customer/customer/customer.component';
import { StatusComponent } from './customer/status/status.component';
import { EditComponent } from './customer/edit/edit.component';
import { AgentComponent } from './components/agent/agent.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { AgentlistComponent } from './components/agentlist/agentlist.component';
import { AgenteditComponent } from './components/agentedit/agentedit.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { CsDetailsComponent } from './components/cs-details/cs-details.component';
import { HomeComponent } from './components/home/home.component';
import { RecentCRComponent } from './components/recent-cr/recent-cr.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    CreateComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ClayoutComponent,
    CheaderComponent,
    CfooterComponent,
    CustomerComponent,
    CustomerlistComponent,
    StatusComponent,
    EditComponent,
    AgentComponent,
    LogoutComponent,
    AgentlistComponent,
    AgenteditComponent,
    UserlistComponent,
    CsDetailsComponent,
    HomeComponent,
    RecentCRComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    SlimLoadingBarModule,
    NgxPaginationModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatMenuModule   
    
  ],
  exports: [LayoutComponent,CustomerlistComponent,ClayoutComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService,CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
