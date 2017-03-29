import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFeatureModule } from './src/menufeature/menu-feature.module';
import { SidenavComponent } from './src/menufeature/sidenav/sidenav.component';

export * from './src/menufeature/menu-feature.module';

@NgModule({
  imports: [
    CommonModule,
    MenuFeatureModule
  ],
  declarations: [
    SidenavComponent
  ],
  exports: [
    SidenavComponent
  ]
})
export class SampleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SampleModule,
      providers: []
    };
  }
}
