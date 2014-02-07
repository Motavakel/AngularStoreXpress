import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([]),
    MatStepperModule,
    FormsModule,

  ],
  exports: [
    ToastrModule,
    RouterModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
