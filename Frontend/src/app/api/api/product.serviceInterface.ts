/**
 * ProductCatalog
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { Product } from '../model/models';


import { Configuration }                                     from '../configuration';



export interface ProductServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;

    /**
     * 
     * 
     * @param id 
     */
    apiProductDelete(id?: number, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
     */
    apiProductGet(extraHttpRequestParams?: any): Observable<Array<Product>>;

    /**
     * 
     * 
     * @param product 
     */
    apiProductPost(product?: Product, extraHttpRequestParams?: any): Observable<{}>;

    /**
     * 
     * 
     * @param product 
     */
    apiProductPut(product?: Product, extraHttpRequestParams?: any): Observable<{}>;

}
