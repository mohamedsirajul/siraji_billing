import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatapassService } from 'src/app/services/datapass.service';
import Swal from 'sweetalert2';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddProductBoxComponent } from './add-product-box/add-product-box.component';
import { Product } from 'src/app/product';

export interface ProductData {
  s_no:any;
  p_id: any;
  p_name: any;
  units:any;
  quantity:any;
  price:any;
}



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuarr: any;
  static_menuarr: any;
  val_del_elements: any;
  val_edit_elements: any;
  edit_id: any;
  edit_menu_id: any;
  edit_menu_name: any;
  edit_price: any;
  edit_menu_price: any;
  edit_menu_units: any;
  temp_prod_opt__units: any []= [];
  temp_prod_opt_price: any [] = [];
  temp_prod_opts__units: any;
  temp_prod_opts_price: any;
  ress_price: any;
  ress_units: any;
  add_datta: any;
  products: Product[] | any;
	// selectedProduct: Product = { id : null , name: null, units:null, price: null , quantity: null ,amount: null}

  constructor(private detailss:DatapassService , public dialog: MatDialog) { }
  
  PRODUCT_DATA: ProductData[] = []
  displayedColumns: string[] = ['s_no','id', 'name', 'price','units', 'action'];
  dataSource = new MatTableDataSource();

  Editdialog(element: any){

    this.val_edit_elements = element;
    this.edit_menu_id = this.menuarr[this.val_edit_elements].id
    this.edit_menu_name = this.menuarr[this.val_edit_elements].name
    this.edit_menu_units = this.menuarr[this.val_edit_elements].units;
    this.edit_menu_price = this.menuarr[this.val_edit_elements].price;
    // this.edit_quantity = this.menuarr[this.val_edit_elements].quantity;
    // this.edit_amount = this.menuarr[this.val_edit_elements].amount;
    
    console.log(this.edit_menu_units);
    console.log(this.edit_menu_price);
    
    this.temp_prod_opts__units = this.edit_menu_units.split(",")
    this.temp_prod_opts_price = this.edit_menu_price.split(",")

    console.log(this.temp_prod_opts__units);

    this.EditopenDialog(this.edit_menu_id,this.edit_menu_name, this.edit_menu_units,this.edit_menu_price, this.temp_prod_opts__units, this.temp_prod_opts_price )

  }
 

  EditopenDialog( 
    edit_id:any, 
    edit_name:any,
    edit_unit: any, 
    edit_price:any,
    split_unit:any,
    split_price:any,
    // edit_quantity: any,
    // edit_amount:any,
    // ediited_quan_price:any, 
    // sel_units:any,
    // sel_price:any
     ) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      disableClose:true,
      width: 'auto',
      height: 'auto',
      data: {
        editted_id:edit_id,
        name:edit_name,
        edited_units: edit_unit,
        editted_price:edit_price,
        splt_units:split_unit,
        splt_price:split_price
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      
      if (result != null) {
     
      
    for (let i = 0; i < this.menuarr.length; i++) {
      if (this.menuarr[i].name == this.edit_menu_name) {
        
        this.menuarr[this.val_edit_elements].id = result.id
        this.menuarr[this.val_edit_elements].name = result.name
        this.ress_price = result.price.join(',')
        this.ress_units = result.units.join(',')
        // console.log(this.ress_price);
        this.menuarr[this.val_edit_elements].price = this.ress_price
        this.menuarr[this.val_edit_elements].units = this.ress_units

      }
    }
    console.log(this.menuarr);
    
  }
})}

  Deletedialog(id:any){
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
        this.val_del_elements = id;
        console.log(this.val_del_elements);

      

        // deleteProduct(id:any){
          // console.log(id);
          
          // this.detailss.deleteProduct(element).subscribe((product: Product)=>{
          //   console.log("Product deleted, ", product);
                     
          //   this.detailss.readProducts().subscribe((products: Product[])=>{
          //     this.products = products;
          //     console.log(this.products);
              
          //   })
          // });
        	console.log(id);
	
          this.detailss.deleteProduct(id).subscribe((product: Product)=>{
            console.log("Product deleted, ", product);
            this.detailss.readProducts().subscribe((products: Product[])=>{
              this.products = products;
              this.menuarr = products
              console.log(this.menuarr);
              
              // console.log(this.products);
              
            })
          });


        
        console.log(this.menuarr);
        
        Swal.fire('Deleted!', 'It has been deleted.', 'success');
      } else {
        Swal.fire('Cancelled', 'It has been Cancelled', 'error');
      }
    });
  }
  showdata(element: any){

    
  }
  // Add_dialog(){
    // this.val_edit_elements = element;
    // this.edit_menu_id = this.menuarr[this.val_edit_elements].id
    // this.edit_menu_name = this.menuarr[this.val_edit_elements].name
    // this.edit_menu_units = this.menuarr[this.val_edit_elements].units;
    // this.edit_menu_price = this.menuarr[this.val_edit_elements].price;
    // this.edit_quantity = this.menuarr[this.val_edit_elements].quantity;
    // this.edit_amount = this.menuarr[this.val_edit_elements].amount;
    
    // console.log(this.edit_menu_units);
    // console.log(this.edit_menu_price);
    
    // this.temp_prod_opts__units = this.edit_menu_units.split(",")
    // this.temp_prod_opts_price = this.edit_menu_price.split(",")

    // console.log(this.temp_prod_opts__units);
    


    // this.Add_openDialog()

  // }

  Add_openDialog() {
    const dialogRef = this.dialog.open(AddProductBoxComponent, {
      disableClose:true,
      width: 'auto',
      height: 'auto',
    });
  
    dialogRef.afterClosed().subscribe((add_pro_result) => {
      console.log(add_pro_result);
  
      if (add_pro_result) {
        this.add_datta = add_pro_result;
  
        this.menuarr.push(this.add_datta);
  
        const lastItem = this.menuarr[this.menuarr.length - 1];
        lastItem.amount = lastItem.amount || "0";
        lastItem.quantity = lastItem.quantity || "0";
        lastItem.id = lastItem.id || String(this.menuarr.length);
  
        console.log(this.menuarr);
      }
    });
  }
  
  


  ngOnInit(): void {

    // .readProducts().subscribe((products: Product[])=>{
    //   this.products = products;
    //   console.log(this.products);
    setInterval(() => {
      window.location.reload();
    }, 60000); // Refresh every 60 seconds (60000 milliseconds)

    this.detailss.readProducts().subscribe((results: any) => {
      this.static_menuarr = results;
    console.log(this.static_menuarr);

    this.menuarr = this.static_menuarr
    console.log(this.menuarr);
    
    for (let i = 0; i < this.menuarr.length; i++) {
      
     this.temp_prod_opt__units.push(this.menuarr[i].units.split("$").join(','))
     this.temp_prod_opt_price.push(this.menuarr[i].price.split("$").join(','))

     this.menuarr[i].price = this.temp_prod_opt_price[i] 
     this.menuarr[i].units = this.temp_prod_opt__units[i] 
    }

    
    

    // console.log(this.temp_prod_opt__units);
    // console.log(this.temp_prod_opt_price);
    
    this.dataSource.data = this.menuarr;
    // this.dataSource.paginator = this.paginator;
    })
  }

}
