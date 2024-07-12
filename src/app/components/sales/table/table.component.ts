import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
// import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
// import { SalesComponent } from '../sales.component';
// import { ClockComponent } from '../clock/clock.component';
import { QuantityComponent } from './quantity/quantity.component';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { DatapassService } from 'src/app/services/datapass.service';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';



export interface PeriodicElement {
  name: string;
  id: number;
  amount: number;
  quantity: number;
  price: number;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('buttonState', [
      transition('void => *', [
        style({ transform: 'scale(0)' }),
        animate('300ms', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class TableComponent implements OnInit {

  item = '';
  table = '';


  today: Date = new Date();
  pipe = new DatePipe('en-US');
  dateTime: any;
  Time: any;

  // element_array: PeriodicElement[] = [
  //   { id: 1, name: 'Parotta', price: 10.0, quantity: 0, amount: 0.0 },
  //   { id: 2, name: 'Chicken Biriyani', price: 90.0, quantity: 0, amount: 0.0 },
  //   { id: 3,name: 'Chicken Fried Rice',price: 90.0,quantity: 0,amount: 0.0},
  //   { id: 4, name: 'Chicken Noodles ', price: 70.0, quantity: 0, amount: 0.0 },
  //   { id: 5, name: 'Chappathi', price: 10.0, quantity: 0, amount: 0.0 },
  //   { id: 6, name: 'Chicken Parotta', price: 35.0, quantity: 0, amount: 0.0 },
  //   { id: 7, name: 'Egg Biriyani', price: 70.0, quantity: 0, amount: 0.0 },
  //   { id: 8, name: 'Egg Fried Rice', price: 70.0, quantity: 0, amount: 0.0 },
  //   { id: 9, name: 'Egg Noodles', price: 70.0, quantity: 0, amount: 0.0 },
  //   { id: 10, name: 'Chicken Naan', price: 50.0, quantity: 0, amount: 0.0 },
  //   { id: 11, name: 'Egg Parotta', price: 20.0, quantity: 0, amount: 0.0 },
  //   { id: 12, name: 'Beef Biriyani', price: 90.0, quantity: 0, amount: 0.0 },
  //   { id: 13, name: 'Beef Fried Rice', price: 90.0, quantity: 0, amount: 0.0 },
  //   { id: 14, name: 'Beef Noodles', price: 90, quantity: 0, amount: 0 },
  //   { id: 15, name: 'Butter Naan', price: 30, quantity: 0, amount: 0 },
  //   { id: 16, name: 'Butter Parotta', price: 20, quantity: 0, amount: 0 },
  //   { id: 17,name: 'Chicken Thandoori Full',price: 300,quantity: 0,amount: 0 },
  //   { id: 18,name: 'Chicken Thandoori half',price: 150,quantity: 0,amount: 0 },
  //   { id: 19,name: 'Chicken Thandoori Quarter',price: 75,quantity: 0,amount: 0 },
  //   { id: 20, name: 'Chicken Grill Full', price: 300, quantity: 0, amount: 0 },
  //   { id: 21,name: 'Chicken Kothu Parotta',price: 90,quantity: 0,amount: 0 },
  //   { id: 22, name: 'Egg Kothu Parotta', price: 70, quantity: 0, amount: 0 },
  //   { id: 22, name: 'Veg Kothu Parotta', price: 70, quantity: 0, amount: 0 },
  //   { id: 24, name: 'Veg Noodles ', price: 70, quantity: 0, amount: 0 },
  //   { id: 25, name: 'Veg Biriyani', price: 70, quantity: 0, amount: 0 },
  //   { id: 26, name: 'Veg Parotta', price: 25, quantity: 0, amount: 0 },
  //   { id: 27, name: 'veg Naan', price: 35, quantity: 0, amount: 0 },
  //   { id: 28, name: 'veg Fried Rice', price: 70, quantity: 0, amount: 0 },
  //   { id: 29,name: 'Chicken Cylon Parotta',price: 40,quantity: 0,amount: 0 },
  //   { id: 30,name: 'Thalappakatti Biriyani',price: 120,quantity: 0,amount: 0 },
  //   { id: 31, name: 'Coin Parotta', price: 30, quantity: 0, amount: 0 },
  //   { id: 32, name: 'Veech Parotta', price: 40, quantity: 0, amount: 0 },
  //   { id: 33, name: ' Chilli Parotta', price: 40, quantity: 0, amount: 0 },
  //   { id: 34, name: 'Bun Parotta', price: 30, quantity: 0, amount: 0 },
  //   { id: 35, name: 'Malabar Biriyani', price: 150, quantity: 0, amount: 0 },
  //   { id: 36, name: 'Mughlai Biriyani', price: 150, quantity: 0, amount: 0 },
  //   { id: 37, name: 'Keema Biriyani', price: 150, quantity: 0, amount: 0 },
  //   { id: 38, name: 'Panner Biriyani', price: 150, quantity: 0, amount: 0 },
  //   { id: 39, name: 'Chettinad Biriyani', price: 175, quantity: 0, amount: 0 },
  //   { id: 40, name: 'Malabar Biriyani', price: 300, quantity: 0, amount: 0 },
  //   { id: 41, name: 'Chicken Grill half', price: 150, quantity: 0, amount: 0 },
  //   { id: 42,name: 'Chicken Grill Quarter',price: 75,quantity: 0,amount: 0 },
  //   { id: 43, name: 'Wheat Parotta', price: 18, quantity: 0, amount: 0 },
  //   { id: 44, name: 'Parotta Fry ', price: 15, quantity: 0, amount: 0 },
  //   { id: 45, name: 'Mutton Cylon Parotta', price: 70, quantity: 0, amount: 0 },
  //   { id: 46, name: 'Mutton Biriyani', price: 135, quantity: 0, amount: 0 },
  //   { id: 47,name: 'Chicken Idiyappa Kothu',price: 120,quantity: 0,amount: 0 },
  //   { id: 48,name: 'Mutton Idiyappa Kothu',price: 140, quantity: 0,amount: 0 },
  //   { id: 49, name: 'Kal Dosa', price: 13, quantity: 0, amount: 0 },
  //   { id: 50, name: 'Spl Dosa', price: 20, quantity: 0, amount: 0 },
  //   { id: 51, name: 'Egg Dosa', price: 25, quantity: 0, amount: 0 },
  //   { id: 52, name: 'Chicken Curry Dosa', price: 40, quantity: 0, amount: 0 },
  //   { id: 53, name: 'Mutton Curry Dosa', price: 60, quantity: 0, amount: 0 },
  //   { id: 54, name: 'Rotti', price: 15, quantity: 0, amount: 0 },
  //   { id: 55, name: 'Dragon Chicken', price: 140, quantity: 0, amount: 0 },
  //   { id: 56, name: 'Prawn Thokku', price: 110, quantity: 0, amount: 0 },
  //   { id: 57, name: 'Panner Buttor Masala', price: 110, quantity: 0, amount: 0 },
  //   { id: 58, name: 'Honey Chicken', price: 130, quantity: 0, amount: 0 },
  //   { id: 59, name: 'Chicken Nuggets', price: 100, quantity: 0, amount: 0 },
  //   { id: 60, name: 'Singapure Fride Rice', price: 150, quantity: 0, amount: 0 },
  // ];



  displayedColumns: string[] = [
    'id',
    'name',
    'units',
    'quantity',
    'price',
    'amount',
    'action',
  ];
  dataSource = new MatTableDataSource([]);
  actualdata = {};
  arr_data: any = [];
  clientProductForm: any;
  dataToDisplay: any;
  temp_id: any;
  temp_name: any;
  name: any;
  tot_amt: any;
  product_array: any;
  decription: any;
  gst: any;
  GST: any;
  new_gst: any;
  rupees: any;
  tot_pro: any;
  opt_1: any;
  tot_qnt: any;
  tot_product: any;
  tot_quantity: any;
  optionss: any;
  lastdata: any[] = [];
  totamount: any;
  productdetails: any;
  element_array: any[] = [];

  data_arrray:any[]=[];
  showunits: any;
  val_elements: any;
  tempcurr_units: any;
  tempcurr_price: any;
  val_edit_element: any;
  var_temp_id: any;
  var_temp_name: any;
  var_val_price: any;
  var_temp_units: any;
  selection_val: any;
  edit_unit: any;
  edit_quantity: any;
  edit_price: any;
  edit_amount: any;
  finn_tab_price: any;
  edit_id: any;
  edit_name: any;
  temp_opt_units: any;
  temp_opt_price: any;
  report_arr: any [] = [];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // console.log(this.myControl.value);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  amount: any;
  quantity: any;
  temp_data: any;
  product_name: any;
  options: any[] = [];
  myControl = new FormControl();
  filteredOption: Observable<string[]> | undefined;
  tot_data: any;



   constructor(public dialog: MatDialog,private http: HttpClient,private detailss:DatapassService, private toastr: ToastrService) { }
  
   getTotalAmount() {
    let tot_val = 0;
    for (let i = 0; i < this.arr_data.length; i++) {
      tot_val = tot_val + this.arr_data[i]['amount'];
    }
    this.tot_amt = tot_val;
    // console.log(this.tot_amt);
    
    return tot_val;
  }
  getTotalProdut() {
    let tot_pro = 0;
    for (let i = 0; i < this.arr_data.length; i++) {
      tot_pro = this.arr_data.length;
    }
    this.tot_product = tot_pro;
    return tot_pro;
  }
  getTotalQuantity() {
    let tot_qnt = 0;
    for (let i = 0; i < this.arr_data.length; i++) {
      tot_qnt = tot_qnt + this.arr_data[i]['quantity'];
    }
    this.tot_quantity = tot_qnt;
    return tot_qnt;
  }

print_bill() {

for (let i = 0; i < this.arr_data.length; i++) {
  this.lastdata[i] = {
    name: this.arr_data[i].name,
    id: this.arr_data[i].id,
    units: this.arr_data[i].units,
    price: this.arr_data[i].price,
    quantity: this.arr_data[i].quantity,
    amount: this.arr_data[i].amount,
    date: this.dateTime,
    time: this.Time,
  };
  // Insert the order data into the database
}

// After inserting into the database, you can generate a new order ID for the next order
// orderId = generateOrderId();

console.log(this.lastdata);



    // let params = JSON.stringify(this.lastdata)
    // let test=JSON.parse(params)
    // console.log(params);
    // console.log(test);
    // console.log(this.lastdata);
    

  
    this.detailss.store_product_data(this.lastdata).subscribe((response) => {
      console.log("Product data stored: ", response);
      this.generatte_bill()
    }, (error) => {
      {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: 'No Products',
        // });
        const toastConfig: Partial<IndividualConfig> = {
          timeOut: 1500,
          closeButton: true,         
           progressBar: true,
          progressAnimation: 'decreasing'
        };
        this.toastr.error('No Products', 'Error', toastConfig);

      }
      // console.error("Failed to store product data: ", error);
    });

  }


generatte_bill() {
  let waiter: any = this.item;
  let table: any = this.table;
  let totalamount: any = this.tot_amt;
  let totalproduct: any = this.tot_pro;
  let totalquantity: any = this.tot_qnt;

  let print: any = this.arr_data;
  console.log(this.table);
  this.rupees = '₹';
  this.GST = '5.00';
  this.new_gst = this.GST / 2;

  this.gst = (this.tot_amt * 5) / 100;
  console.log(this.gst);

  let printContents,
    popupWin: Window | any,
    name_string,
    name,
    quantity_string,
    quantity,
    unitts,
    price_string,
    price,
    amount_string,
    amount;
  this.product_array = this.arr_data;
  if (this.product_array.length > 0) {
    let temp_name = [];
    for (let i = 0; i < this.product_array.length; i++) {
      this.product_array[i]['name'] = this.product_array[i]['name'];
    }

    for (let i = 0; i < this.product_array.length; i++) {
      temp_name.push(this.product_array[i]['name']);
    }

    name_string = temp_name.toString();
    console.log(name_string);
    name = name_string.replaceAll(',', '<br>');

    let temp_pri_units = [];
    for (let i = 0; i < this.product_array.length; i++) {
      this.product_array[i]['units'] = this.product_array[i]['units'];
    }

    for (let i = 0; i < this.product_array.length; i++) {
      temp_pri_units.push(this.product_array[i]['units']);
    }

    quantity_string = temp_pri_units.toString();
    console.log(quantity_string);
    unitts = quantity_string.replaceAll(',', '<br>');

    let temp_quantity = [];
    for (let i = 0; i < this.product_array.length; i++) {
      this.product_array[i]['quantity'] = this.product_array[i]['quantity'];
    }

    for (let i = 0; i < this.product_array.length; i++) {
      temp_quantity.push(this.product_array[i]['quantity']);
    }

    quantity_string = temp_quantity.toString();
    console.log(quantity_string);
    quantity = quantity_string.replaceAll(',', '<br>');

    let temp_price = [];
    for (let i = 0; i < this.product_array.length; i++) {
      this.product_array[i]['price'] = this.product_array[i]['price'];
    }

    for (let i = 0; i < this.product_array.length; i++) {
      temp_price.push(this.product_array[i]['price']);
    }

    price_string = temp_price.toString();
    console.log(price_string);
    price = price_string.replaceAll(',', '<br>');

    let temp_amount = [];
    for (let i = 0; i < this.product_array.length; i++) {
      this.product_array[i]['amount'] = this.product_array[i]['amount'];
    }

    for (let i = 0; i < this.product_array.length; i++) {
      temp_amount.push(this.product_array[i]['amount']);
    }

    amount_string = temp_amount.toString();
    console.log(amount_string);
    amount = amount_string.replaceAll(',', '<br>');

    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
  
          <style>
            @page { size: 72mm 120mm }
            body.receipt .sheet { width: 120mm; height: 100mm }
            @media print {
              body.receipt {
                width: 120mm
              } 
            }
  
            .tab {
              margin-bottom: -20px;
            }
            .header {
              margin-right: 170px;
            }
            .hotel {
              font-size: 25px;
              text-align: center;
              margin-bottom: -16px;
            }
            .place {
              font-size: 15px;
              font-weight: 23px;
              margin-bottom: -16px;
              text-align: center;
            }
            .phone {
              font-weight: 23px;
              font-size: 15px;
              text-align: center;
            }
            .waiter {
              font-size: 15px;
            }
            .table {
              font-size: 12px;
              margin-left: 114px;
            }
            .date {
              font-size: 15px;
              margin-top: -33px;
            }
            .time {
              font-size: 15px;
              margin-left: 185px;
            }
            hr {
              border: none;
              border-top: 1px dashed;
              width: 100%;
            }
            .pro {
              font-size: 17px;
              text-align: center;
              margin-left: 5px;
            }
            .total {
              font-size: 20px;
              font-weight: bolder;
              margin-left: 125px;
              height: 20px;
            }
            .quantity {
              margin-left: 10px;
            }
            .amount {
              margin-left: 10px;
            }
            .price {
              margin-right: 20px;
              font-size: 20px;
            }
            .name {
              margin-right: 12px;
              font-size: 12px;
            }
            .namess {
              font-size: 8px;
            }
            td {
              font-size: 10px;
              text-align: center;
            }
            .gst {
              font-size: 12px;
              margin-left: 15px;
            }
            .tabl {
              font-size: 12px;
              margin-left: 14px;
            }
          </style>
        </head>
        <body class="receipt" onload="window.print();">
          <div class="header">
            <p class="hotel">HOTEL</p>
            <p class="place">NO3,SOUTH STREET,PATEMANAGARAM</p>
            <p class="phone">8056457791 ; 9976040756</p>
            <table class="tab">
              <tr>
                <td><p class="waiter">WAITER: ${this.item}</p></td>
                <td><p class="table">TABLENO: ${this.table}</p></td>
              </tr>
            </table>
            <table>
              <tr>
                <td><p class="date">${this.dateTime}</p></td>
                <p class="time">${this.Time}</p>
              </tr>
            </table>
            <hr>
            <table class="pro">
              <tr>
                <td><p class="name">Name</p><hr></td>
                <td><p class="tabl">Units</p><hr></td>
                <td><p class="tabl">Quantity</p><hr></td>
                <td><p class="tabl">Price</p><hr></td>
                <td><p class="tabl">Amount</p><hr></td>
              </tr>
              <tr>
                <td><p class:"namess">${name}</p></td>
                <td><p class:"units">${unitts}</p></td>
                <td><p class:"quantity">${quantity}</p></td>
                <td><p class:"price">${price}</p></td>
                <td><p class:"amount">${amount}</p></td>
              </tr>
              <tr>
                <td><hr>${this.tot_product}</td>
                <td></td>
                <td><hr>${this.tot_quantity}</td>
                <td></td>
                <td class:"amt"><hr>${this.rupees}${this.tot_amt}.00</td>
              </tr>
            </table>
  
            <hr>
            <table class="tab">
              <tr>
                <td><p class="gst">GST%</p></td>
                <td><p class="gst">CGST%</p></td>
                <td><p class="gst">CGST</p></td>
                <td><p class="gst">SGST%</p></td>
                <td><p class="gst">SGST</p></td>
              </tr>
              <tr>
                <td><p class="gst">${this.GST}</p></td>
                <td><p class="gst">${this.new_gst}</p></td>
                <td><p class="gst">${this.gst}</p></td>
                <td><p class="gst">${this.new_gst}</p></td>
                <td><p class="gst">${this.gst}</p></td>
              </tr>
            </table>
            <br>
            <hr>
            <p class="total">${this.rupees}${this.tot_amt}</p>
          </div>
        </body>
      </html>`);
  
    popupWin.document.close();
    // window.location.reload(); 
  }
}


  kot_bill() {
    // window.print();
    let waiter: any = this.item;

    let table: any = this.table;
    let totalamount: any = this.tot_amt;
    let print: any = this.arr_data;

    let printContents, popupWin: Window | any, pro_string, pro, pro_new;
    this.product_array = this.arr_data;
   
    if (this.product_array.length > 0) {
      let temp_array = [];
      // console.log(this.product_array)
      for (let i = 0; i < this.product_array.length; i++) {
        this.product_array[i]['description'] = 
          this.product_array[i]['quantity'] +
          ' x ' +
          this.product_array[i]['name'] +
          '=' +
          this.product_array[i]['amount'];
      }

      for (let i = 0; i < this.product_array.length; i++) {
        temp_array.push(this.product_array[i]['description']);
      }

      // console.log(this.product_array)
      pro_string = temp_array.toString();
      console.log(pro_string);
      pro = pro_string.replaceAll(',', '<br>');
      // pro.replaceAll(' aj ', '<br>');
      // pro_new=pro.replaceAll('aj','<br>')
      popupWin = window.open(
        '',
        '_blank',
        'top=0,left=0,height=auto,width=auto'
      );
      popupWin.document.open();
      popupWin.document.write(`
        <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      
      <style>
      @page { size: 72mm 120mm }
      body.receipt .sheet { width: 120mm; height: 100mm }
      @media print {
        body.receipt {
           width: 120mm
        } 
      } 
      .hotel{
        font-size: 25px;
        text-align:center;
        margin-bottom: -16px;
      }
      .place{
        font-size: 15px;
        font-weight: 23px;
        margin-bottom: -16px;
    
        text-align:center;        
      }
      
      .phone{
        font-weight: 23px;
        font-size: 15px;
              text-align:center;        
    
      }
        .header{
          margin-right:170px;
        }
       
        
        
       
        .waiter{
          font-size: 15px;
  
        }
        .table{
          font-size: 15px;
  
  margin-left:120px;      
        }
        .tabl{
          margin-bottom: -18px;

        }
        .date{
          font-size: 15px;
        }
        .time{
          font-size: 15px;
          margin-left:140px; 
        }
     
        
        hr{
            border: none;
            border-top: 1px dashed;
            width: 100%;
        }
        .pro{
          font-size:20px;
        }
        .total{
          font-size:20px;
          font-weight: bolder;
          margin-left:85px;
          hight:20px;
        }
      
      </style>
      </head>
      <body class="receipt"  onload="window.print();window.close()">
      <div class="header">
      <p class="hotel">HOTEL</p>
      <P class="place">NO3,SOUTH STREET,PATEMANAGARAM</P>
      <p class="phone">8056457791  ;  9976040756</p>
      <table class="tabl">
          <tr>
              <td>
      <p class="waiter">WAITER:${this.item}</p></td>
      <td>
      <p class="table">TABLENO:${this.table}</p></td>
      </tr>
      </table>
      <table>
      <tr>
      <td >
      <p class="date">
      ${this.dateTime}</td>
      </p>
      <td >
      <p class="time">
      ${this.Time}
      </p>
      </td>

      </tr>
      </table>

      <hr>
      <table class="pro">
      ${pro}
  </table>
  
  <hr>
  
  
  
  
  <p class="total">RS:${this.tot_amt}.00</p></td>

      </body>
      </html>`);

      popupWin.document.close();
    } else{
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'No Products',
      // });
      const toastConfig: Partial<IndividualConfig> = {
        timeOut: 1500,
        closeButton: true,         
         progressBar: true,
        progressAnimation: 'decreasing'
      };
      this.toastr.error('No Products', 'Error', toastConfig);

    }
  }


  deleteProduct(element: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.val_elements = element;
        console.log(this.val_elements);

      
        this.arr_data.splice(this.val_elements, 1);

        
        console.log(this.arr_data);
        
        Swal.fire('Deleted!', 'It has been deleted.', 'success');
      } else {
        Swal.fire('Cancelled', 'It has been Cancelled', 'error');
      }
    });
  }
  EditopenDialog(edit_name:any, edit_id:any, edit_unit: any, edit_quantity: any,edit_price:any,edit_amount:any,ediited_quan_price:any, sel_units:any ,sel_price:any ) {
    const dialogRef = this.dialog.open(QuantityComponent, {
      disableClose:true,
      width: 'auto',
      height: 'auto',
      data: {name:edit_name,id:edit_id, edited_units: edit_unit, edited_quantity: edit_quantity,editted_price:edit_price, editted_amount:edit_amount, edited_quan_price:ediited_quan_price, units: sel_units,price: sel_price},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      
      if (result != null) {
     

    for (let i = 0; i < this.data_arrray.length; i++) {
      if (this.data_arrray[i].name == this.edit_name) {
        
        this.arr_data[this.val_edit_element].id = this.data_arrray[i].id
        this.arr_data[this.val_edit_element].name = this.data_arrray[i].name
        this.arr_data[this.val_edit_element].quantity = result.quantity
        this.arr_data[this.val_edit_element].units = result.units
        this.arr_data[this.val_edit_element].price = result.price
        this.arr_data[this.val_edit_element].amount = result.quantity * result.price,

        this.actualdata={id:this.data_arrray[i].id,
          name:this.data_arrray[i].name, 
          quantity:result.quantity, 
          units:result.units, 
          price:result.price,
          amount:result.quantity * result.price,
          tot_opt_unit:result.totarr_price,
          tot_opt_price:result.totarr_unit
        }
  

        // this.arr_data.push(this.actualdata);

      }
      
    }
    console.log(this.arr_data);

    this.myControl.setValue("");
    // console.log(this.element_array)

    //removes duplicate
    // this.arr_data = this.arr_data.reduce((a: any[], b: { name: any }) => {
    //   if (!a.find((data) => data.name === b.name)) {
    //     a.push(b);
    //   }
    //   return a;
    // }, []);
    // this.arr_data = this.arr_data.reduce((a: { name: any }[], b: { name: any }): { name: any }[] => {
    //   const index = a.findIndex((data) =>  data.name === value.name && data.units === value.units);
    //   if (index !== -1) {
    //     a.splice(index, 1);
    //   }
    //   a.push(b);
    //   return a;
    // }, []);
    
    this.arr_data = this.arr_data.reduce((a: { name: any, units: any }[], b: { name: any, units: any }): { name: any, units: any }[] => {
      const index = a.findIndex((data) => data.name === b.name && data.units === b.units);
      if (index !== -1) {
        a.splice(index, 1);
      }
      a.push(b);
      return a;
    }, []);
    
    console.log(this.arr_data);
    // console.log(this.element_array)
    
  
    // this.dataSource = new MatTableDataSource(this.arr_data);
    // for (let i = 0; i < this.arr_data.length; i++) {
    //   if (this.arr_data[i].id == result.id) {
    //     this.arr_data[i].quantity = result.quantity;
    //     // this.arr_data[i].price = result.price
    //     // this.arr_data[i].units = result.units 
    //     // this.showunits = this.element_array[i].units
    //     this.arr_data[i].amount = this.arr_data[i].quantity * this.arr_data[i].price ;
    //   }
    // }
    // console.log(this.element_array)

    // console.log(this.arr_data);
    // console.log(this.showunits);
    
    
    // for (let i = 0; i < this.arr_data.length; i++) {
    //   this.lastdata[i] = {id:this.arr_data[i].id,name:this.arr_data[i].name,prize:this.arr_data[i].price,quantity:this.arr_data[i].quantity,amount:this.arr_data[i].amount,date:this.dateTime,time:this.Time}
    // }
    // console.log(this.lastdata);
    // console.log(this.arr_data);


    
    

  }

  else{
    this.myControl.setValue('');
  }

      // console.log(result);
    });
  }
  EditDetails(elements: any) {
  
    
    this.val_edit_element = elements;

    this.edit_id = this.arr_data[this.val_edit_element].id
    this.edit_name = this.arr_data[this.val_edit_element].name
    this.edit_unit = this.arr_data[this.val_edit_element].units;
    console.log(this.edit_unit);
    this.edit_quantity = this.arr_data[this.val_edit_element].quantity;
    console.log(this.edit_quantity);
    this.edit_price = this.arr_data[this.val_edit_element].price;
    this.edit_amount = this.arr_data[this.val_edit_element].amount;
    this.temp_opt_units = this.arr_data[this.val_edit_element].tot_opt_unit;
    this.temp_opt_price = this.arr_data[this.val_edit_element].tot_opt_price;
    

    for (var i = 0; i < this.tempcurr_units.length; i++) {
      if(this.tempcurr_units[i] == this.edit_unit){
        this.finn_tab_price = this.tempcurr_price[i]
        // this.currIndex=i;
        console.log(this.finn_tab_price);
      }
    }
    // this.openDialog(this.var_temp_id, this.var_temp_name,this.selection_val,this.tempcurr_units,this.tempcurr_price);
    this.EditopenDialog(this.edit_name,this.edit_id, this.edit_unit,this.edit_quantity,this.edit_price,this.edit_amount, this.finn_tab_price, this.temp_opt_units,this.temp_opt_price )

    // this.my_Control_staffs.disable();
    // this.my_Control_id.disable();
    // this.my_Control_period.disable();
    // this.my_Control_credit.disable();

    // this.my_Control_id.setValue(this.submits[this.val_element].id);
    // this.my_Control_staffs.setValue(this.submits[this.val_element].staffssname);
    // this.my_Control_reg.setValue(this.submits[this.val_element].regulation);
    // this.my_Control_dept.setValue(this.submits[this.val_element].deptname);
    // this.my_Control_yearr.setValue(this.submits[this.val_element].year);
    // this.my_Control_sem.setValue(this.submits[this.val_element].semester);
    // this.my_Control_sub.setValue(this.submits[this.val_element].subject);
    // this.my_Control_period.setValue(this.submits[this.val_element].period);
    // this.my_Control_credit.setValue(this.submits[this.val_element].credit);

    // this.delarr = this.submits[elements].position;
    // console.log(this.delarr);

    // this.storeyear = valueyear;
    // console.log(this.storeyear);

    // this.sem = [];
    // for (let i = 0; i < this.subdetails.length; i++) {
    //   if (
    //     this.subdetails[i].year == this.submits[this.val_element].year &&
    //     this.sem.indexOf(this.subdetails[i].semester) === -1
    //   ) {
    //     this.sem.push(this.subdetails[i].semester);
    //     console.log(this.sem);
    //   }
    // }

    // this.filteredOption_sem = this.my_Control_sem.valueChanges.pipe(
    //   startWith(''),
    //   map((valueyear) => this._filter_sem(valueyear))
    // );

    // this.sub = [];
    // for (let i = 0; i < this.subdetails.length; i++) {
    //   if (
    //     this.subdetails[i].regulations ==
    //       this.submits[this.val_element].regulation &&
    //     this.subdetails[i].dept == this.submits[this.val_element].deptname &&
    //     this.subdetails[i].year == this.submits[this.val_element].year &&
    //     this.subdetails[i].semester ==
    //       this.submits[this.val_element].semester &&
    //     this.sub.indexOf(this.subdetails[i].subject) === -1
    //   ) {
    //     this.sub.push(this.subdetails[i].subject);
    //     console.log(this.sub);
    //   }
    // }
    // this.filteredOption_sub = this.my_Control_sub.valueChanges.pipe(
    //   startWith(''),
    //   map((valuesem) => this._filter_sub(valuesem))
    // );

  }

  onSelectionChange(value: any) {
    // console.log(value);
    
    this.selection_val = value
    let temp_id = 0;
    let temp_name;
    let temp_units;
    let val_price;
    this.data_arrray = this.element_array


    // console.log(this.data_arrray);
    
    for (let i = 0; i < this.data_arrray.length; i++) {
      if (this.data_arrray[i].name == value) {
        this.var_temp_id = this.data_arrray[i].id;
        this.var_temp_name = this.data_arrray[i].name;
        this.var_temp_units = this.data_arrray[i].units
        this.var_val_price = this.data_arrray[i].price

        i = this.data_arrray.length
      }
      // console.log(temp_units);
      
    }
     this.tempcurr_units = this.var_temp_units.split("$")
     this.tempcurr_price = this.var_val_price.split("$")

     console.log(this.tempcurr_units);
     console.log(this.tempcurr_price);
     
     

    console.log(this.element_array)
    this.openDialog(this.var_temp_id, this.var_temp_name,this.selection_val,this.tempcurr_units,this.tempcurr_price);
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
  openDialog(newVal: any, temp_name: any,value:any, temp_units:any, val_price:any) {
    const dialogRef = this.dialog.open(QuantityComponent, {
      disableClose:true,
      width: 'auto',
      height: 'auto',
      data: { name: temp_name, id: newVal , units : temp_units , price:val_price},
      // disableClose:true
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      
      if (result != null) {
     
        console.log(this.element_array)

    for (let i = 0; i < this.data_arrray.length; i++) {
      if (this.data_arrray[i].name == value) {
        //this.actualdata = this.data_arrray[i];
        this.actualdata={id:this.data_arrray[i].id,
          name:this.data_arrray[i].name, 
          quantity:result.quantity, 
          units:result.units, 
          price:result.price,
          amount:result.quantity * result.price,
          tot_opt_unit:result.totarr_unit,
          tot_opt_price:result.totarr_price

        }
  
        this.arr_data.push(this.actualdata);

      }
    }
    this.myControl.setValue("");
    // console.log(this.element_array)

    //removes duplicate
    // this.arr_data = this.arr_data.reduce((a: any[], b: { name: any }) => {
    //   if (!a.find((data) => data.name === b.name)) {
    //     a.push(b);
    //   }
    //   return a;
    // }, []);
    // this.arr_data = this.arr_data.reduce((a: { name: any }[], b: { name: any }): { name: any }[] => {
    //   const index = a.findIndex((data) =>  data.name === value.name && data.units === value.units);
    //   if (index !== -1) {
    //     a.splice(index, 1);
    //   }
    //   a.push(b);
    //   return a;
    // }, []);
    
    // this.arr_data = this.arr_data.reduce((a: { name: any, units: any }[], b: { name: any, units: any }): { name: any, units: any }[] => {
    //   const index = a.findIndex((data) => data.name === b.name && data.units === b.units);
    //   if (index !== -1) {
    //     a.splice(index, 1);
    //   }ffilter
    //   a.push(b);
    //   return a;
    // }, []);
    
//     this.arr_data = this.arr_data.reduce((accumulator: { name: any, units: any, quantity: any }[], current: { name: any, units: any, quantity: any }): { name: any, units: any, quantity: any }[] => {
//   const index = accumulator.findIndex((data) => data.name === current.name && data.units === current.units);
//   if (index !== -1) {
//     // If a match is found, add the quantity to the existing element
//     accumulator[index].quantity += current.quantity;
//   } else {
//     // If no match is found, add the current element to the accumulator
//     accumulator.push(current);
//   }
//   return accumulator;
// }, []);

this.arr_data = this.arr_data.reduce((accumulator: { name: any, units: any, quantity: any }[], current: { name: any, units: any, quantity: any }): { name: any, units: any, quantity: any }[] => {
  const index = accumulator.findIndex((data) => data.name === current.name && data.units === current.units);
  if (index !== -1) {
    // If a match is found, ask whether to add the quantity or not using Swal.fire
    Swal.fire({
      title: `A match for '${current.name}' and '${current.units}' already exists.`,
      text: 'Do you want to add the quantity?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Add',
      cancelButtonText: 'Not Now'
    }).then((result) => {
      if (result.isConfirmed) {
        accumulator[index].quantity += current.quantity;
      }
    });
  } else {
    // If no match is found, add the current element to the accumulator
    accumulator.push(current);
  }
  return accumulator;
}, []);

    console.log(this.arr_data);
    // console.log(this.element_array)
    
  
    // this.dataSource = new MatTableDataSource(this.arr_data);
    // for (let i = 0; i < this.arr_data.length; i++) {
    //   if (this.arr_data[i].id == result.id) {
    //     this.arr_data[i].quantity = result.quantity;
    //     // this.arr_data[i].price = result.price
    //     // this.arr_data[i].units = result.units 
    //     // this.showunits = this.element_array[i].units
    //     this.arr_data[i].amount = this.arr_data[i].quantity * this.arr_data[i].price ;
    //   }
    // }
    // console.log(this.element_array)

    // console.log(this.arr_data);
    // console.log(this.showunits);
    
    



    // console.log(this.arr_data);


    
    

  }

  else{
    this.myControl.setValue('');
  }

      // console.log(result);
    });
  }

  // printDialog(): void {
  //   const dialogRef = this.dialog.open(PrintComponent, {

  //     data:{
  //       waiter:this.item,
  //       table:this.table,
  //      totalamount: this.tot_amt,
  //       print:this.dataSource.data },

  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //   });
  // }

  ngOnInit(): void {


    // element_array: PeriodicElement[] =[this.element_array]
    // this.detailss.read_repots_detail().subscribe((getreport: any) => {
    //   this.report_arr = getreport;
    //   console.log(this.report_arr);
    //  });
    // this.detailss.read_repots_detail()
    

    this.detailss.readProducts().subscribe((getdata: any) => {
      // console.log(getdata);
      
      this.element_array = getdata;
      console.log(this.element_array);
      
      // console.log(this.element_array);
 


      for (let i = 0; i < this.element_array.length; i++) {
        this.options.push(this.element_array[i].name);
   
        // console.log(this.options);
        
        this.dateTime = this.pipe.transform(Date.now(), 'yyyy-M-d');
        // console.log(this.dateTime);
    
        this.Time = this.pipe.transform(Date.now(), 'h:mm:ss');
        // console.log(this.Time);


    this.filteredOption = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
      }
    }); 
  }
}
