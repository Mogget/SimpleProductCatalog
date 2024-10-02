import { Routes } from "@angular/router";
import { AddProductComponent } from "./add-product/add-product.component";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const routes: Routes = [
    {
        path: '', component: AddProductComponent,
        providers: [
            {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
        ]
     }
]