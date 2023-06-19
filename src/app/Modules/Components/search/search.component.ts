import { Component } from '@angular/core';
import { CoreService } from 'src/app/shared/services/core.service';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  resultados: any[] = [];
  Data:any[] = [];
  searchTerm: string = '';
  search: string = 'search';
  constructor(
  private coreService: CoreService,
  private searchBar : SearchBarService
    ) {}

  buscar(ruta: string): void {
    if(this.searchTerm == ''){
      this.coreService.get<any[]>(ruta+'s').subscribe((response=>{
        this.Data = response;
      }))
      this.searchBar.searchArrayUpdate(this.Data)
    }
    else{
      this.coreService.pass<any>(this.search, ruta, this.searchTerm)
      .subscribe((response) => {
        this.resultados = response.resultados;
        let keys = Object.keys(this.resultados);
        let dato = keys.flatMap(key => this.resultados[Number(key)]);
        this.Data = dato
      });
      this.searchBar.searchArrayUpdate(this.Data)
    } 
  }
}
