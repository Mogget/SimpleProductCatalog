import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ApiModule, Product, ProductService } from '../../../api';
import { HttpClientModule } from '@angular/common/http';
import { first, retry } from 'rxjs';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  providers: [],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements AfterViewInit {
  @ViewChild("productCodeInput")
  productCodeInput!: ElementRef;
  @ViewChild("productFormEl")
  productForm!: FormGroupDirective;

  constructor(private api: ProductService) {}

  ngAfterViewInit() {
    this.productCodeInput.nativeElement.focus();
  }

  form = new FormGroup({
    id: new FormControl(null),
    code: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl(''),
    modified: new FormControl(null)
  });
  submitProductForm() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const pr = this.form.getRawValue();
    const product = {
      code: pr.code,
      name: pr.name,
      price: pr.price,
      description: pr.description
    } as Product;

    this.api.apiProductPut(product).pipe(retry(1)).subscribe();
    setTimeout(() => this.productForm.resetForm(), 200);

  }
}
