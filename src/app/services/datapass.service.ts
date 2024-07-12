import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatapassService {

  // constructor(private http:HttpClient) { }

  // baseUrl: string = 'http://localhost/sirajHotel/'
  // getDetails(){
  //   return this.http.get<any>(this.baseUrl+'products.php')
  // }

//   PHP_SERVER = "https://whitelms.com/billing/billingbackend/siraj_hotel";
  	PHP_SERVER = "https://zenanvibe.com/sirraji_billing";

//   PHP_USER_SERVER = "https://whitelms.com/billing/billingbackend/users";

	PHP_USER_SERVER = "https://zenanvibe.com/sirraji_billing/auth_user";

  constructor(private httpClient: HttpClient) {}
  readProducts() {
    // Add a random query parameter to prevent caching
    const randomQueryParam = `?nocache=${Math.random()}`;

    return this.httpClient.get<any>("https://zenanvibe.com/sirraji_billing/getproduct.php" + randomQueryParam)
      .pipe(map(res => {
        return res;
      }));
  }

	createProduct(product: Product): Observable<Product>{

	    console.log(product);
		return this.httpClient.post<Product>(`${this.PHP_SERVER}/create_product.php`, product);
	}

	updateProduct(product: Product){
		console.log(product)
		return this.httpClient.put<Product>(`${this.PHP_SERVER}/update_product.php`, product);
	}
	deleteProduct(id: number){
		console.log(id);
		return this.httpClient.delete<Product>(`${this.PHP_SERVER}/delete_product.php/?id=${id}`);
	}



	store_product_data(products:any){
		// const jsonData = JSON.stringify(products);
		    let params = JSON.stringify(products)
			console.log(params);
					// console.log(jsonData);
		return this.httpClient.post<any>(`${this.PHP_SERVER}/insert_product.php`, params);
	  }
	  get_sales_result(sales_dates:any){
		let salesresult = JSON.stringify(sales_dates)
		console.log(salesresult);
		return this.httpClient.post<any>(`${this.PHP_SERVER}/sales_repots.php`, salesresult);
	}
	get_product_result(prod_dates:any){
		let productresult = JSON.stringify(prod_dates)
		console.log(productresult);
		return this.httpClient.post<any>(`${this.PHP_SERVER}/product_report.php`, productresult);
	}
		store_user_data(users:any){
			let userdata = JSON.stringify(users)
			console.log(userdata);

			return this.httpClient.post<any>(`${this.PHP_USER_SERVER}/user_reg.php`, userdata);
		}

	// authenticate_user_data(loginuser:any){
	// 	let logindata = JSON.stringify(loginuser)
	// 	console.log(logindata);
	// 	return this.httpClient.post<any>(`${this.PHP_USER_SERVER}/auth.php`, logindata);
	// }
}
