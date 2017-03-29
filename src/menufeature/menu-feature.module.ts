import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';

import { MenuService } from './sharedservice/menu.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AccordionModule } from './accordion/accordion.module';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AccordionModule.forRoot(),
    JsonpModule
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent],
  providers: [MenuService]
})
export class MenuFeatureModule { }
