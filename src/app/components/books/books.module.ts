import { SharedModule } from './../../shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        BooksComponent
    ],
    imports: [
        CommonModule,
        BooksRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule,
        SharedModule
    ],
})

export class BooksModule {}