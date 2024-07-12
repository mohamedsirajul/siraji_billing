import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Product } from 'src/app/product';
import { DatapassService } from 'src/app/services/datapass.service';

// export interface Units {
//   name: string;
// }

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  products: Product[] | any;
	selectedProduct: Product = { id : null , proo_name: null, proo_units:null, proo_price: null}
  

  // pro_name  : any;
  // pro_units : any;
  // pro_price : any;
  tempval   :any;

  // myForm = new FormGroup({
  //   product_name: new FormControl('', [Validators.required]),
  //   product_Price: new FormControl('', [Validators.required]),
  //   product_units: new FormControl('', [Validators.required]),
  // });

  addOnBlur1 = true;
  addOnBlur2 = true;

  readonly separatorKeysCodes1 = [ENTER, COMMA] as const;
  readonly separatorKeysCodes2 = [ENTER, COMMA] as const;

  // product_units = new FormControl();
  // product_Price = new FormControl();


  // spltd_units : any 
  // spltd_price : any
  edit_spltd_units: any;
  edit_spltd_price: any;
  dbb_editted_price: any;
  dbb_editted_units: any;


  add_unit(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value);
    

    // Add our fruit
    if (value) {
      this.edit_spltd_units.push(value);
      console.log(this.edit_spltd_units);
      
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove_unit(unit: any): void {
    const index = this.edit_spltd_units.indexOf(unit);

    if (index >= 0) {
      this.edit_spltd_units.splice(index, 1);
      console.log(this.edit_spltd_units);
      
    }
  }
  drop_units(event: CdkDragDrop<string[], any>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.edit_spltd_units, event.previousIndex, event.currentIndex);
    }
  }

  add_price(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(value);
    
    // Add our fruit
    if (value) {
      this.edit_spltd_price.push(value);
      console.log(this.edit_spltd_price);
      
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove_price(price: any): void {
    const index = this.edit_spltd_price.indexOf(price);

    if (index >= 0) {
      this.edit_spltd_price.splice(index, 1);
      console.log(this.edit_spltd_price);
      
    }
  }
  drop_price(event: CdkDragDrop<string[], any>) {
    if (event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.edit_spltd_price, event.previousIndex, event.currentIndex);
    }
  }
  

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>, 
    @Inject(MAT_DIALOG_DATA) public menu_data: any , private detailss:DatapassService) { }

  ngOnInit(): void {
    this.selectedProduct.proo_name = this.menu_data['name']
    // this.pro_price = this.menu_data['editted_price']
    // this.pro_units = this.menu_data['edited_units']
    
    this.edit_spltd_units = this.menu_data['splt_units']
    this.edit_spltd_price = this.menu_data['splt_price']
    console.log(this.menu_data);

  }
  okey(form:any){
    if(this.selectedProduct.proo_name && this.edit_spltd_price.length == this.edit_spltd_units.length) {
      // && this.pro_price && this.pro_units
    this.tempval={id:this.menu_data['editted_id'],name:this.selectedProduct.proo_name, price:this.edit_spltd_price, units:this.edit_spltd_units}

    this.dialogRef.close(this.tempval);

    this.dbb_editted_price = this.edit_spltd_price.join('$')
    this.dbb_editted_units = this.edit_spltd_units.join('$')

    console.log(this.dbb_editted_price);
    this.selectedProduct.id = this.menu_data['editted_id']
    // console.log(this.selectedProduct.id);
    
		form.value.id = this.selectedProduct.id;
		form.value.name = this.selectedProduct.proo_name;
		form.value.units = this.dbb_editted_units;
		console.log(form.value.units);
		form.value.price = this.dbb_editted_price;
		form.value.quantity = '0.0';
		form.value.amount = '0.0';

    console.log(form.value);
    
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

    }
   
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill Required Field',
      });
    }
  }
  myEvent(){
    if(this.selectedProduct.proo_name && this.selectedProduct.proo_price && this.selectedProduct.proo_units ) {

      this.tempval={
        id:this.menu_data['editted_id'],
        name:this.selectedProduct.proo_name,
         price:this.edit_spltd_price, 
         units:this.edit_spltd_units}
  
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
  close(){
    this.dialogRef.close(this.tempval);
  }



}
