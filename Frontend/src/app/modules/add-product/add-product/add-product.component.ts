import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements AfterViewInit {
  @ViewChild("productCodeInput")
  productCodeInput!: ElementRef;
  @ViewChild("productFormEl")
  productForm!: FormGroupDirective;

  ngAfterViewInit() {
    this.productCodeInput.nativeElement.focus();
  }

  form = new FormGroup({
    id: new FormControl(null),
    code: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl(''),
    modifiedDate: new FormControl(null)
  });
  submitProductForm() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const product = this.form.getRawValue();
    setTimeout(() => this.productForm.resetForm(), 200);
  }
}
