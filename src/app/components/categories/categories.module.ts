import { SharedModule } from './../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CategoriesComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CategoriesRoutingModule,
        FormsModule,
        NgxSpinnerModule,
        SharedModule
    ],
})

export class CategoriesModule {}