import { ChangeDetectionStrategy, Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../api/model/product';
import { ProductService } from '../../../api';
import { repeat } from 'rxjs';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatButton, MatIconModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  private productApiService = inject(ProductService);

  products: WritableSignal<Product[]> = signal([]);

  constructor() {
    effect(() => {
      this.productApiService.apiProductGet().pipe(repeat(1)).subscribe((response) => this.products.set(response));
    });
  }

  edit(id: number|undefined) {
    
  }
    
  public remove(id: number | undefined) {
    this.productApiService.apiProductDelete(id).pipe(repeat(1)).subscribe(x => {
      this.products.set(this.products().filter(x => x.id !== id));
    });
    
  }
}
