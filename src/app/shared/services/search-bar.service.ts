import { Injectable } from '@angular/core';
import{ Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class SearchBarService {
  private searchArrayService = new Subject<Array<any>>();
  $searchArrayService = this.searchArrayService.asObservable();
  searchArrayUpdate(data: Array<any>) {
    this.searchArrayService.next(data);
  }
}
