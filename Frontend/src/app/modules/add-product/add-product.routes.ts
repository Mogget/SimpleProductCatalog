import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router, Routes } from "@angular/router";
import { AddProductComponent } from "./add-product/add-product.component";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Product, ProductService } from "../../api";
import { inject } from "@angular/core";
import { catchError, of } from "rxjs";

const productResolver: ResolveFn<Product> = (route: ActivatedRouteSnapshot) => {
    const router = inject(Router);
    return inject(ProductService)
        .apiProductIdGet(Number(route.paramMap.get('id')) ?? 0)
        .pipe(
            catchError(() =>
                of(
                    new RedirectCommand(router.createUrlTree(['/not-found']), {
                        skipLocationChange: true,
                    }),
                ),
            ),
        );
}
//TODO: Guard na deactivate
export const routes: Routes = [
    {
        path: `:id`,
        component: AddProductComponent,
        resolve: { product: productResolver}
    },
    {
        path: '', component: AddProductComponent,
        providers: [
            {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
        ]
    },
]