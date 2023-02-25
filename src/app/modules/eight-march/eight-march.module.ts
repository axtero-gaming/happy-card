import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FortawesomeModule } from '@shared/fortawesome.module';
import { SharedModule } from '@shared/shared.module';

// Components
import { EightMarchPageComponent } from './components/eight-march-page';
import { FlowerSummerComponent } from './components/flower-summer';
import { FlowerWinterComponent } from './components/flower-winter';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FortawesomeModule,
    SharedModule,
  ],
  declarations: [
    // Components
    EightMarchPageComponent,
    FlowerSummerComponent,
    FlowerWinterComponent,
  ],
  exports: [
    // Components
    EightMarchPageComponent,
  ],
})
export class EightMarchModule { }
