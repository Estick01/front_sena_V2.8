import { Component } from '@angular/core';
import { CoreService } from 'src/app/shared/services/core.service';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = "";
  modelRef: string = "area";

  constructor(
    private coreService: CoreService,
    private searchBar: SearchBarService
  ) { }


  ngOnInit() {
    this.engine()
  }

  engine(): void {

    if (!this.searchTerm || this.searchTerm == "") {

      this.coreService.get<any[]>("areas").subscribe((response => {
        this.searchBar.searchArrayUpdate(response)
      }))}
    else {
      this.coreService.pass<any>(this.modelRef, this.searchTerm)
        .subscribe((response) => {
          let resultados = response.resultados;
          let keys = Object.keys(resultados);
          let dato = keys.flatMap(key => resultados[Number(key)]);
          console.log(response);
          
          this.searchBar.searchArrayUpdate(dato);
        });

    }
  }
}
