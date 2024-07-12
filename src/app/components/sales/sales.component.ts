import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';


export interface PeriodicElement {
  name: string;
  id: number;
}
@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  toppings = new FormControl('');

  toppingList: string[] = ['Table-1', 'Table-2', 'Table-3', 'Table-4', 'Table-5', 'Table-6'];
  

  waiterFormControl = new FormControl('', [Validators.required,]);
  tableFormControl = new FormControl('', [Validators.required,]);
  seatFormControl = new FormControl('', [Validators.required,]);
  Waiter:any='';
  TableNo: any= [];
  onKey1(event: any) {
    this.Waiter = event.target.value ;
  }
  onKey2(event: any) {
    this.TableNo = event.target.value ;
  }
 
  ELEMENT_DATA: PeriodicElement[] = [
    { id: 1, name: '1- siraj'},
    { id: 2, name: '2-mohamed' },
    { id: 3, name: '3-mohamed siraj' },
    { id: 4 , name: '4-ajey'},
    { id: 5, name: '5-yasin' },
    { id: 6, name: '6-ubaith' },
    { id: 7, name: '7-hassan' },
    { id: 8, name: '8-riyas' }
  ];
  displayedColumns: string[] = [
    'id',
    'name',
  ];

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter((option,opt_1) =>
      option.toLowerCase().includes(filterValue)
      
    );
  }

  constructor() { }

  ngOnInit(): void {

    this.filteredOption = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
   
    this.filtereedOption = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value1) => this._filter(value1))
      
    );

    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      // this.ori_data.push(this.ELEMENT_DATA[i])
      this.options.push(this.ELEMENT_DATA[i].name);

    }

    this.opt_1 = this.ELEMENT_DATA[0].name
    this.myControl.setValue( this.ELEMENT_DATA[0].name);

  }

  actdata = {};
  data: any = [];
  temp_id: any;
  temp_name:any;
  opt_1:any;
  opt_2:any;

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(this.myControl.value);
  }

  AutoCompleteDisplay(): any {

  }
  amount: any ;
  quantity: any ;
  temp_data:any;
  product_name: any;
  options: string[] = [];
  myControl = new FormControl();
  filteredOption: Observable<string[]> | undefined;
  filtereedOption: Observable<string[]> | undefined;

  
  tot_data:any; 
  onSelectionChange(value: any) {
    let temp_id = 0
    let temp_name 
    
    for (let i=0;i<this.ELEMENT_DATA.length;i++) {
      if (this.ELEMENT_DATA[i].name == value) {
        this.actdata = this.ELEMENT_DATA[i];
        this.data.push(this.actdata);
        temp_id = this.ELEMENT_DATA[i].id
        temp_name = this.ELEMENT_DATA[i].name


      }
     
    }
    
  


    console.log(temp_id);
    console.log(temp_name);
    console.log(this.data);

}

}
