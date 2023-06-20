import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterViewChecked, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { AreaModel } from 'src/app/shared/models/area.model';
import { AreaService } from 'src/app/shared/services/area.service';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as $ from 'jquery';
import 'slick-carousel';
import { ExtendModalComponent } from '../../../Components/extend-modal/extend-modal.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { AreasModalComponent } from '../areas-modal/areas-modal.component';
import { ExtendModalFiller } from 'src/app/shared/models/extend-modal-content';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit, OnDestroy {


  @ViewChild('slickElement') slickElement!: ElementRef;
  protected cache: Map<number, { areas: AreaModel[] | null }> = new Map<number, { areas: AreaModel[] | null }>();
  protected showFormArea: boolean = false;
  protected formTitle: string = "";
  protected showResultadoBusqueda: boolean = false;
  protected resultadoBusqueda: AreaModel | null = null;
  displayet: AreaModel[] = []
  searchTerm: string = '';
  area: AreaModel | null = null;
  view: AreaModel[] = []
  areas: AreaModel[] = [];
  private subscription: Subscription | undefined;
  filler: ExtendModalFiller[] = [];

  page_size:number = 6;
  page_number:number = 1;
  page_size_options= [2, 4 ,8 , 12, 16, 32]

  constructor(
    private cdRef: ChangeDetectorRef,
    //private dialogRef: MatDialogRef<AreasComponent>,
    //private modalRef: MatDialogRef<ExtendModalComponent>,
    private searchService: SearchBarService,
    private modal: MatDialog,
    private notificationService: NotificationService,
    private _areaService: AreaService,
  ) { }

  handlePage(e:PageEvent){
    this.page_size = e.pageSize
    this.page_number = e.pageIndex+1
  }

  ngOnInit() {
    this.searchService.$searchArrayService.subscribe((res: any) => {
      this.view = res;
      
    });
  }
  iniciarCache() {
    this.cache.set(0, { areas: null });
  }

  destroySlider() {
    console.log("destroy")
    $(this.slickElement.nativeElement.querySelector('.slider')).slick('unslick')
  }

  getAreas() {


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




  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}