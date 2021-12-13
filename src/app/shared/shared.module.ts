import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule],
    exports: [FooterComponent]
})

export class SharedModule {}