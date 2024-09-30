import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
              path: '',
              redirectTo: 'add',
              pathMatch: 'full',
            },
            {
                path: 'add',
                loadChildren: () => import('./modules/add-product/add-product.routes').then((routes) => routes.routes),
            },
            {
                path: 'list',
                loadChildren: () => import('./modules/product-list/product-list.routes').then((routes) => routes.routes),
            },
        ]
    }
];
