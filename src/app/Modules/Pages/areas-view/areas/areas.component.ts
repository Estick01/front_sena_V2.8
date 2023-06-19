import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, OnDestroy, inject } from '@angular/core';
import { AreaModel } from 'src/app/shared/models/area.model';
import { AreaService } from 'src/app/shared/services/area.service';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import 'slick-carousel';
import * as $ from 'jquery';
import { ExtendModalComponent } from '../../../Components/extend-modal/extend-modal.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { AreasModalComponent } from '../areas-modal/areas-modal.component';
import { ExtendModalFiller } from 'src/app/shared/models/extend-modal-content';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
import { strings } from '@material/dialog';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit, AfterViewChecked, OnDestroy {


  @ViewChild('slickElement') slickElement!: ElementRef;
  protected cache: Map<number, { areas: AreaModel[] | null }> = new Map<number, { areas: AreaModel[] | null }>();
  protected showFormArea: boolean = false;
  protected formTitle: string = "";
  protected showResultadoBusqueda: boolean = false;
  protected resultadoBusqueda: AreaModel | null = null;
  displayet: AreaModel[] = []
  searchTerm: string = '';
  area: AreaModel | null = null;
  View: AreaModel[] = []
  areas: AreaModel[] = [];
  private subscription: Subscription | undefined;
  filler: ExtendModalFiller[] = [];

  constructor(
    //private dialogRef: MatDialogRef<AreasComponent>,
    //private modalRef: MatDialogRef<ExtendModalComponent>,
    private searchService: SearchBarService,
    private modal: MatDialog,
    private notificationService: NotificationService,
    private _areaService: AreaService,


  ) { }
  ngOnInit() {
    this.iniciarCache();
    this.getAreas();
  }

  iniciarCache() {
    this.cache.set(0, { areas: null });
  }
  getAreas() {
    const cacheAreas = this.cache.get(0)!.areas;
    if (cacheAreas !== null) {
      if (this.areas !== cacheAreas) {
        this.areas = cacheAreas;
      }
    } else {
      this._areaService.traerAreas().subscribe(
        area => {
          this.areas = area;
          this.View = this.areas;
        },
        error => {
          this.notificationService.showNotification({ message: "Error de conexión" });
        }
      );
    }
  }
  deleteArea(event: number) {
    this._areaService.borrarArea(event).subscribe(() => {
      this.getAreas();

    })
  }
  ///////////////////////////////

  dialogConfig = new MatDialogConfig();


  openModalCreate() {
    this.modal.open(AreasModalComponent);
    this.area = {} as AreaModel;
  }

  openModalUpdate(area: AreaModel) {
    let dialogRef = this.modal.open(AreasModalComponent, {
      data: area,
      panelClass: "foo"

    });
  }
  /////////////////////////////////////////////



  actualizarArea(event: AreaModel) {
    this.formTitle = 'Editar área';
    this.area = event;
    this.showFormArea = true;
  }

  crearArea() {
    this.showFormArea = true;
    this.formTitle = 'Añadir área';
  }


  buscarArea(event: AreaModel) {
    this.showResultadoBusqueda = true;
    this.resultadoBusqueda = event;
  }
  closeBusqueda() {
    this.showResultadoBusqueda = false;
    this.resultadoBusqueda = null;
  }
  ngAfterViewChecked(): void {
    this.search();
  }
  search() {
    this.searchService.$searchArrayService.subscribe((res: any) => {
      this.displayet = res;
      this.Data();
    });
  }
  Data(){
      this.View = this.displayet;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
}