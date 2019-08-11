import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheaderComponent } from './cheader/cheader.component';
import { CfooterComponent } from './cfooter/cfooter.component';
import { ClayoutComponent } from './clayout/clayout.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CheaderComponent, CfooterComponent, ClayoutComponent]
})
export class UiModule { }
