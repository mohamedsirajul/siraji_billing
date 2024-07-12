import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';




@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'position', 'name', 'weight', 'symbol', 'test', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  datas: any[] = [];


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(){
    this.datas = [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', test: 'test', test1: 'test1', test2: 'text2', test3: 'text3', test4: 'text4', test5: 'text5', test6: 'text6', test7: 'text7', test8: 'text8' },

    ]
    // this.dataSource = this.datas
    this.dataSource.data = this.datas;

  }

}
