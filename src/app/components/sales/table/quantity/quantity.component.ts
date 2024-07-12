import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {
  quantity: any;
  tempval:any;
  splittedunits: any;
  splittedprice: any;
  spltarrunit: any[] = [];
  spltarrprice: any = [];
  units: any;
  finunits: any;
  finn_price: any;
  my_Control_units = new FormControl();
  my_Control_quantity = new FormControl();
  final_price: any;
  final_units: any;
  unit_option: any[] = [];
  price_option: any[] = [];
  currIndex: any;
  unitValue: any;
  quantityValue :any;
  finnx_price: any;
  // isInputEmpty: boolean = false;
   myForm= new FormGroup({
    prod_units: new FormControl('', [Validators.required]),
    product_quantity: new FormControl('', [Validators.required]),
  });
  
  constructor(public dialogRef: MatDialogRef<QuantityComponent>, 
    @Inject(MAT_DIALOG_DATA) public quan_data: any) { }

  ngOnInit(): void {
    

    // console.log(this.quan_data.edited_quantity);
    console.log(this.quan_data['units']);
    
    // console.log(this.quan_data.edited_units);
    this.unitValue = this.quan_data.edited_units;
    // this.my_Control_quantity.setValue(this.quan_data.edited_quantity);

    this.unitValue = this.quan_data.edited_units;
    this.quantityValue = this.quan_data.edited_quantity

    console.log(this.quan_data);
    
    this.unit_option = this.quan_data.units
    this.price_option = this.quan_data.price
    // this.splittedunits = this.data.units.split("$")
    // this.splittedprice = this.data.price.split("$")

    // this.spltarrunit = this.splittedunits;
    // this.spltarrprice = this.splittedprice;
    //  console.log(this.spltarrunit);
    //  console.log(this.spltarrprice);
     
     

  }
     
  // }

  Quantityy(event: Event) {
    this.quantity=Number(
      (<HTMLInputElement>event.target).value
    );
    // console.log(this.quantity);
  }
  onSelectionChange(valuereg: any) {
    // this.isInputEmpty = valuereg.trim() === '';
    this.finunits = valuereg;
    console.log(valuereg);

    console.log(this.unitValue);

    
    // for (let i = 0; i < this.subdetails.length; i++) {
    //   if (
    //     this.subdetails[i].regulations == valuereg &&
    //     this.dept.indexOf(this.subdetails[i].dept) === -1
    //   ) {
    //     this.dept.push(this.subdetails[i].dept);
    //     console.log(this.dept);
    //   }
    // for (let j = 0; j < this.spltarrunit.length; j++) {
      for (var i = 0; i < this.unit_option.length; i++) {
        if(this.unit_option[i] == this.finunits){
          this.finn_price = this.price_option[i]
          this.currIndex=i;
          console.log(this.finn_price);
        }
      }
    // }
    this.final_price = this.finn_price;
    this.final_units = this.finunits;
    // console.log(this.final_price);
    // console.log(this.final_units);
    // console.log(this.quan_data['units']);
    
    

  //   for (let i = 0; i < this.details.length; i++) {
  //     if (this.details[i].StaffID == this.storeid) {
  //       this.temp_name = this.details[i].Name;
  //       console.log(this.temp_name);
  //       this.tempvar_dept = this.details[i].Dept;
  //       console.log(this.tempvar_dept);

  //       this.my_Control_staffs.setValue(this.temp_name);
  //     }
  //   }
  // }
    }
    validateInput(event: KeyboardEvent) {
      const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
      const input = event.key;
    
      if (!/^[0-9]$/.test(input) && !allowedKeys.includes(input)) {
        event.preventDefault();
      }
    }
    
    

  myEvent(){
    console.log(this.quantityValue);
    if(this.quantityValue >0 && this.unitValue ) {
      // console.log(this.quantityValue);
      
      // console.log(this.unitValue);

      for (var i = 0; i < this.quan_data['units'].length; i++) {
        if(this.quan_data['units'][i] == this.unitValue){
          this.finnx_price = this.quan_data['price'][i]
          this.currIndex=i;
          console.log(this.finnx_price);
        }
      // }
      // units:this.data['units'],
      // console.log(this.tempval);
      // console.log(this.quantity);
      // console.log(this.data);

    }
    this.final_price = this.finnx_price;
    this.final_units = this.unitValue;
    
    console.log(this.final_price);
    console.log(this.final_units);
    this.tempval={id:this.quan_data['id'], quantity:this.quantityValue, units:this.final_units, price:this.final_price, totarr_unit:this.quan_data['units'],totarr_price:this.quan_data['price']}

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
  

  okey(){
    if(this.quantityValue >0 && this.unitValue ) {
      // console.log(this.quantityValue)    
      // console.log(this.unitValue);
      for (var i = 0; i < this.quan_data['units'].length; i++) {
        if(this.quan_data['units'][i] == this.unitValue){
          this.finnx_price = this.quan_data['price'][i]
          this.currIndex=i;
          console.log(this.finnx_price);
        }
      // }
      // units:this.data['units'],
      // console.log(this.tempval);
      // console.log(this.quantity);
      // console.log(this.data);

    }
    this.final_price = this.finnx_price;
    this.final_units = this.unitValue;
    
    console.log(this.final_price);
    console.log(this.final_units);
    this.tempval={id:this.quan_data['id'], quantity:this.quantityValue, units:this.final_units, price:this.final_price, totarr_unit:this.quan_data['units'],totarr_price:this.quan_data['price']}

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
      this.dialogRef.close();
  }



}
