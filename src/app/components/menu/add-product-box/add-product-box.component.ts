import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Product } from 'src/app/product';
import { DatapassService } from 'src/app/services/datapass.service';

@Component({
  selector: 'app-add-product-box',
  templateUrl: './add-product-box.component.html',
  styleUrls: ['./add-product-box.component.css']
})
export class AddProductBoxComponent implements OnInit {

  // proo_name = '';
  // proo_units = '';
  // proo_price = '';
  
  products: Product[] | any;
	selectedProduct: Product = { id : null , proo_name: null, proo_units:null, proo_price: null}
  
  added_price: any;
  added_units: any;
  // myForm = new FormGroup({
  //   product_name: new FormControl('', [Validators.required]),
  //   product_units: new FormControl('', [Validators.required]),
  //   product_price: new FormControl('', [Validators.required]),
  // });
  tempval: any;
  proo_spltd_units: any[] = [];
  proo_spltd_price: any[] = [];
  dbb_added_price: any;
  dbb_added_units: any;
  
  constructor(public dialogRef: MatDialogRef<AddProductBoxComponent>, 
    @Inject(MAT_DIALOG_DATA) public proo_data: any , private detailss:DatapassService) { }

  ngOnInit(): void {
  }
  addOnBlur1 = true;
  addOnBlur2 = true;

  readonly separatorKeysCodes1 = [ENTER, COMMA] as const;
  readonly separatorKeysCodes2 = [ENTER, COMMA] as const;

  add_unit(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value);
    

    // Add our fruit
    if (value) {
      this.proo_spltd_units.push(value);
      console.log(this.proo_spltd_units);
      
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove_unit(unit: any): void {
    const index = this.proo_spltd_units.indexOf(unit);

    if (index >= 0) {
      this.proo_spltd_units.splice(index, 1);
      console.log(this.proo_spltd_units);
      
    }
  }
  drop_units(event: CdkDragDrop<string[], any>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.proo_spltd_units, event.previousIndex, event.currentIndex);
    }
  }

  add_price(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value);
    

    // Add our fruit
    if (value) {
      this.proo_spltd_price.push(value);
      console.log(this.proo_spltd_price);
      
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove_price(price: any): void {
    const index = this.proo_spltd_price.indexOf(price);

    if (index >= 0) {
      this.proo_spltd_price.splice(index, 1);
      console.log(this.proo_spltd_price);
      
    }
  }
  drop_price(event: CdkDragDrop<string[], any>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.proo_spltd_price, event.previousIndex, event.currentIndex);
    }
  }
  
  myEvent(){

    if(this.selectedProduct.proo_name && this.proo_spltd_units && this.proo_spltd_price) {



       this.added_price = this.proo_spltd_price.join(',')
       this.added_units = this.proo_spltd_units.join(',')
       
    this.tempval={name:this.selectedProduct.proo_name, units:this.added_units, price:this.added_price}

    this.dialogRef.close(this.tempval);

    }
   
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill Required Field',
      });
    }
  }
  okey(form:any){
    if(this.selectedProduct.proo_name && this.proo_spltd_price.length == this.proo_spltd_units.length) {

      this.added_price = this.proo_spltd_price.join(',')
      this.added_units = this.proo_spltd_units.join(',')
      
      this.dbb_added_price = this.proo_spltd_price.join('$')
      this.dbb_added_units = this.proo_spltd_units.join('$')
      // console.log(this.dbb_added_price);
      



   this.tempval={name:this.selectedProduct.proo_name, units:this.added_units, price:this.added_price}  

  //  createOrUpdateProduct(form:any){
		
		form.value.id = this.selectedProduct.id;
		form.value.name = this.selectedProduct.proo_name;
		form.value.units = this.dbb_added_units;
		// console.log(form.value.units);
		form.value.price = this.dbb_added_price;
		form.value.quantity = '0.0';
		form.value.amount = '0.0';

		
		if(this.selectedProduct && this.selectedProduct.id){
			this.detailss.updateProduct(form.value).subscribe((product: Product)=>{
			console.log("Product updated" , product);
			this.detailss.readProducts().subscribe((products: Product[])=>{
				this.products = products;
			})
		});
	}
	else{
		console.log(form.value);
		
		this.detailss.createProduct(form.value).subscribe((product: Product)=>{
			console.log("Product created, ", product);
			this.detailss.readProducts().subscribe((products: Product[])=>{
				this.products = products;
        console.log(this.products);
        
			})
		});
	}
// }

this.dialogRef.close(this.tempval);
}
     
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Erroor',
        });
      }
  }
  close(){
    this.dialogRef.close(this.tempval);
  }
}
