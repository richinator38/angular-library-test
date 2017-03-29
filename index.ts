import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFeatureModule } from './src/menufeature/menu-feature.module';

export * from './src/menufeature/menu-feature.module';

@NgModule({
  imports: [
    CommonModule,
    MenuFeatureModule
  ],
  declarations: [
  ],
  exports: [
    MenuFeatureModule
  ]
})
export class SideMenuModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SideMenuModule,
      providers: []
    };
  }
}
