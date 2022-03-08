import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from "@swimlane/ngx-datatable";
import { ApiService } from 'app/shared/services/api.service';


@Component({
  selector: 'app-page',
  templateUrl: './corporativo.component.html',
  styleUrls: ['./corporativo.component.scss']
})
export class CorporativoComponent {

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // row data
  public rows
  public ColumnMode = ColumnMode;
  public limitRef = 10;

  // column header
  public columns = [
    { name: "Corporativo" },
    { name: "URL", prop: "S_SystemUrl" },
    { name: "Incorporación", prop: "D_FechaIncorporacion" },
    { name: "Creado el", prop: "created_at" },
    { name: "Asignado a", prop: "asignado" },
    { name: "Status", prop: "S_Activo" },
    { name: "Actions", prop: "Actions" },
  ];

  // private
  private tempData = [];

  constructor(private apiService:ApiService) {


  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.Username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * updateLimit
   *
   * @param limit
   */
  updateLimit(limit) {
    this.limitRef = limit.target.value;
  }

  ngOnInit(): void {
    this.getCorporativos()
  }
  formatDateIncorporation(date){
    return `${new Date(date).toString().split(' ')[2]}-${new Date(date).toString().split(' ')[1]}-${new Date(date).toString().split(' ')[3]}`
  }
  formatDateCreated(date){
    let f_date=new Date(date)
    f_date.setDate(f_date.getDate() + 1)
    return `${f_date.toString().split(' ')[2]}-${f_date.toString().split(' ')[1]}-${f_date.toString().split(' ')[3]}`
  }
  getCorporativos(){
     this.apiService.corporativoAll().subscribe(res=>{
       console.log(res.data)
       this.rows=res.data.map(item=>{
         return {
           ...item,
           S_SystemUrl:'devschoolcloud.com/sa/#/'+item.S_SystemUrl,
           D_FechaIncorporacion:this.formatDateIncorporation(item.D_FechaIncorporacion),
           created_at:this.formatDateCreated(item.created_at.split('T')[0]),
           S_Activo:item.S_Activo == 1 ? 'Activo' : 'Inactiv0'
          }
       })
     })
  }
}
