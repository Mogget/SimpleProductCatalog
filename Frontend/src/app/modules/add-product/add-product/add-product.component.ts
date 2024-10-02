import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ApiModule, Product, ProductService } from '../../../api';
import { HttpClientModule } from '@angular/common/http';
import { first, map, retry } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  styleUrl: './add-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent implements AfterViewInit {
  private readonly router = inject(Router);

  @ViewChild("productCodeInput")
  productCodeInput!: ElementRef;
  @ViewChild("productFormEl")
  productForm!: FormGroupDirective;
  private isEditMode = false;
  private product?: Product;

  // TODO: zamiast resolvera można użyć stora korzystając np z biblioteki @ngrx/signals
  readonly product$ = inject(ActivatedRoute).data.pipe(
    map(data => data['product'])
  )

  public form = new FormGroup({
    id: new FormControl(null),
    code: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl(''),
    modified: new FormControl(null)
  });

  constructor(private api: ProductService) {
    this.product$.subscribe(x => {
      this.isEditMode = x?.id !== null;
      this.product = x;
      this.form.patchValue(x);
    })
  }

  ngAfterViewInit() {
    this.productCodeInput.nativeElement.focus();
  }

  submitProductForm() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const pr = this.form.getRawValue();
    const product = {
      id: pr.id ?? 0,
      code: pr.code,
      name: pr.name,
      price: pr.price,
      description: pr.description
    } as Product;

    if (this.isEditMode) {
      //TODO: Obsługa błędów
      //TODO: Przeniesienie do efektów
      this.api.apiProductPost({...product, modified: this.product?.modified }).pipe(retry(1)).subscribe();
      this.router.navigate(['list']);
      return;
    }
    this.api.apiProductPut(product).pipe(retry(1)).subscribe();
    setTimeout(() => this.productForm.resetForm(), 200);
    this.productCodeInput.nativeElement.focus();
  }
}
