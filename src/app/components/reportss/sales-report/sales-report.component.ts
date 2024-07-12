import { Component, OnInit, ViewChild } from '@angular/core';
import { DatapassService } from 'src/app/services/datapass.service';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';

// Define the custom type for the document definition
interface DocumentDefinition {
  content: any[];
  styles: {
    [key: string]: {
      fontSize?: number;
      bold?: boolean;
      alignment?: Alignment;
      margin?: [number, number, number, number];
    };
  };
  defaultStyle?: {
    fontSize?: number;
    bold?: boolean;
    alignment?: Alignment;
    margin?: [number, number, number, number];
    pageOrientation?: string;
  };
  layout?: {
    fillColor?: (rowIndex: number, node: any) => string | null;
    hLineColor?: (rowIndex: number, node: any) => string;
    vLineColor?: (rowIndex: number, node: any) => string;
    hLineWidth?: (rowIndex: number, node: any) => number;
    vLineWidth?: (rowIndex: number, node: any) => number;
    pageSize?: string | [number, number];
  };
}

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css'],
  providers: [DatePipe],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('buttonState', [
      transition('void => *', [
        style({ transform: 'scale(0)' }),
        animate('300ms', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class SalesReportComponent implements OnInit {
  report_arr: any[] = [];
  products_arr: any[] = [];
  data_arr: any[] = [];
  joinedData: any[] = [];
  start_date: any;
  end_date: any;
  tempval: any;
  today: Date;
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  salesdata: any[] = [];
  displayedColumns: string[] = [
    'bill_no',
    'product_id',
    'product_name',
    'product_units',
    'product_price',
    'product_quantity',
    'product_amount',
    'total_amt',
    'date',
    'time',
  ];
  printColumns: string[] = [
    'bill_id',
    'product_id',
    'product_name',
    'product_units',
    'product_price',
    'product_quantity',
    'product_amount',
    'product_total',
    'date',
    'time',
  ];
  head = [
    [
      'bill_id',
      'product_id',
      'product_name',
      'product_units',
      'product_price',
      'product_quantity',
      'product_amount',
      'product_total',
      'date',
      'time',
    ],
  ];
  ex_head = [
    'bill_id',
    'product_id',
    'product_name',
    'product_units',
    'product_price',
    'product_quantity',
    'product_amount',
    'product_total',
    'date',
    'time',
  ];
  row_width = [
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
  ];
  stats = [
    {
      title: 'Total Bill No',
      amount: '0',
      color: 'bg-purple-500',
    },
    {
      title: 'Total Product Sold',
      amount: '0',
      color: 'bg-purple-500',
    },
    {
      title: 'Total Sales Amount(₹)',
      amount: '0',
      color: 'bg-purple-500',
    },

    // {
    //   title: 'Balance (₹)',
    //   amount: '0',
    //   color: 'bg-purple-500',
    // }
  ];
  tot_prod: any;
  toTalamounts: any;

  constructor(
    private detailss: DatapassService,
    private datePipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    private toastr: ToastrService
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.today = new Date();
  }

  ngOnInit(): void {
    this.dataSource.data = [];
  }

  getFormattedDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  getResults() {
    this.salesdata = [];
    if (this.start_date != null && this.end_date != null) {
      const startDate = new Date(this.start_date);
      const endDate = new Date(this.end_date);

      if (startDate > endDate) {
        const toastConfig: Partial<IndividualConfig> = {
          timeOut: 2000,
          closeButton: true,
          progressBar: true,
          progressAnimation: 'decreasing',
        };
        this.toastr.error(
          'Start date cannot be larger than end date.',
          'Error',
          toastConfig
        );
      } else {
        this.dataSource = new MatTableDataSource();

        this.tempval = {
          startDate: this.start_date,
          endDate: this.end_date,
        };

        this.detailss.get_sales_result(this.tempval).subscribe(
          (data: any) => {
            if (data != null) {
              this.joinedData = data;

              for (let i = 0; i < this.joinedData.length; i++) {
                let totalLength = 0;

                for (let i = 0; i < this.joinedData.length; i++) {
                  const productsLength = this.joinedData[i].products.length;
                  totalLength += productsLength;
                  // console.log(productsLength);
                }
                // console.log(totalLength);

                this.tot_prod = totalLength;

                // for (let i = 0; i < this.joinedData.length; i++) {
                //   const totalAmt = this.joinedData[i].total_amount;
                //   console.log(totalAmt);
                // }
                let totalAmount = 0;

                for (let i = 0; i < this.joinedData.length; i++) {
                  const totalAmt = parseInt(this.joinedData[i].total_amount);
                  totalAmount += totalAmt;
                  // console.log(totalAmt);
                }

                // console.log(totalAmount);
                this.toTalamounts = totalAmount;

                const products = this.joinedData[i].products;

                const salesItem = {
                  bill_id: this.joinedData[i].bill_id,
                  product_id: this.getProductprod_id(products),
                  product_name: this.getProductNames(products),
                  product_units: this.getProductunits(products),
                  product_price: this.getProductprice(products),
                  product_quantity: this.getProductquantity(products),
                  product_amount: this.getProductamount(products),
                  product_total: this.joinedData[i].total_amount,
                  date: this.joinedData[i].date,
                  time: this.joinedData[i].time,
                };
                // this.getTotalProdIdsLength(products);

                console.log(this.tot_prod);

                this.salesdata.push(salesItem);
                // this.dataSource.data = this.salesdata;
                this.dataSource.paginator = this.paginator;
              }
              console.log(this.salesdata);
              this.stats[0].amount = this.dataSource.data.length;
              this.stats[1].amount = this.tot_prod;
              this.stats[2].amount = this.toTalamounts;
            }
          },
          (error: any) => {
            console.log(error);
            if (error && error.error && error.error.message) {
              const toastConfig: Partial<IndividualConfig> = {
                timeOut: 1500,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'decreasing',
              };
              this.toastr.error(error.error.message, 'Error', toastConfig);
              console.log('Error message:', error.error.message);
            }
          }
        );
      }
    } else {
      const toastConfig: Partial<IndividualConfig> = {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
      };
      this.toastr.error('Kindly Enter the Date', 'Error', toastConfig);
    }
  }

  getProductprod_id(products: any[]): string {
    return products.map((product) => product.prod_id).join(', ');
  }
  // getTotalProdIdsLength(products: any[]): number {
  //   const prodIds = products.map(product => product.prod_id).join(', ').length;
  //   // const totalLength = prodIds.join('').length;
  //   console.log(prodIds);
  //   return prodIds;
  // }

  getProductNames(products: any[]): string {
    return products.map((product) => product.prod_name).join(', ');
  }

  getProductunits(products: any[]): string {
    return products.map((product) => product.units).join(', ');
  }

  getProductprice(products: any[]): string {
    return products.map((product) => product.price).join(', ');
  }

  getProductquantity(products: any[]): string {
    return products.map((product) => product.quantity).join(', ');
  }

  getProductamount(products: any[]): string {
    return products.map((product) => product.amount).join(', ');
  }

  StartDateEvent(dateval: any) {
    this.start_date = this.datePipe.transform(dateval.value, 'yyyy/MM/dd');
  }

  EndDateEvent(dateval: any) {
    this.end_date = this.datePipe.transform(dateval.value, 'yyyy/MM/dd');
  }

  tablename = '';
  fulltablename = 'Sales Report';

  exportpdf() {
    if (this.salesdata.length !== 0) {
      const data = this.dataSource.data;
      const documentDefinition: DocumentDefinition = {
        content: [
          { text: 'Siraj Hotel', style: 'mainheader' },
          { text: 'Sales Report', style: 'header' },
          {
            text: 'From: ' + this.start_date + ' To: ' + this.end_date,
            style: 'subheader',
          },
          {
            table: {
              headerRows: 1,
              widths: [
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
                'auto',
              ],
              body: [
                this.printColumns.map((column) => column.replace('_', ' ')),
                ...(data as any[]).map((item: any) => [
                  item.bill_id,
                  item.product_id,
                  item.product_name,
                  item.product_units,
                  item.product_price,
                  item.product_quantity,
                  item.product_amount,
                  item.product_total,
                  item.date,
                  item.time,
                ]),
              ],
            },
          },
        ],
        styles: {
          mainheader: {
            fontSize: 18,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10],
          },
          header: {
            fontSize: 16,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10],
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5],
          },
        },
        defaultStyle: {
          fontSize: 12,
          bold: false,
          alignment: 'left',
          margin: [0, 0, 0, 0],
        },
        layout: {
          pageSize: [792, 612],
          fillColor: function (i: number, node: any) {
            return i === 0 ? '#CCCCCC' : null;
          },
          hLineColor: function (i: number, node: any) {
            return i === 0 ? '#000000' : '#DDDDDD';
          },
          vLineColor: function (i: number, node: any) {
            return i === 0 ? '#000000' : '#DDDDDD';
          },
          hLineWidth: function (i: number, node: any) {
            return i === 0 ? 1 : 0.5;
          },
          vLineWidth: function (i: number, node: any) {
            return i === 0 ? 1 : 0.5;
          },
        },
      };

      pdfMake.createPdf(documentDefinition).open();
    } else {
      // alert('No Data');
      const toastConfig: Partial<IndividualConfig> = {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
      };
      this.toastr.error('No Data', 'Error', toastConfig);
    }
  }

  exportcsv() {
    if (this.salesdata.length !== 0) {
      const data = this.dataSource.data;
      const title = 'Siraj Hotel Sales Report';
      const header = this.ex_head;
      const header1 = this.printColumns;
      console.log(header1);

      const arr = [];

      for (let i = 0; i < data.length; i++) {
        const newarr = [];
        for (let j = 0; j < header1.length; j++) {
          newarr.push(data[i][header1[j]]);
        }
        arr.push(newarr);
      }
      console.log(arr);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sales Report');

      const titleRow = worksheet.addRow([title]);
      titleRow.font = {
        name: 'Comic Sans MS',
        family: 4,
        size: 16,
        underline: 'double',
        bold: true,
      };

      worksheet.addRow([]);
      worksheet.mergeCells('A1:D2');
      worksheet.addRow([]);

      const headerRow = worksheet.addRow(header);
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
          bgColor: { argb: '9F4020BF' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      arr.forEach((d) => {
        const row = worksheet.addRow(d);
      });

      worksheet.getColumn(3).width = 30;
      worksheet.getColumn(4).width = 30;
      worksheet.addRow([]);

      const footerRow = worksheet.addRow([
        'This is a Siraj Hotel Sales Report Excel sheet.',
      ]);
      footerRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFCCFFE5' },
      };
      footerRow.getCell(1).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, 'Sales_Report.xlsx');
      });
    } else {
      // alert('No Data');
      const toastConfig: Partial<IndividualConfig> = {
        timeOut: 1500,
        closeButton: true,
        progressBar: true,
        progressAnimation: 'decreasing',
      };
      this.toastr.error('No Data', 'Error', toastConfig);
    }
  }
}
