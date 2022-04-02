import { Component, ViewChild } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, take, tap, startWith } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import IGame from '../../interfaces/IGame';
import IUser from '../../interfaces/IUser';
import { Router } from '@angular/router';
import ICheckbox from '../../interfaces/ICheckbox';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private searchTerms$$ = new Subject<string>();
  private gameAdded$$ = new Subject<IGame>();
  private filteredByTag$$ = new Subject<ICheckbox>();
  private filteredByPrice$$ = new Subject<Object | number>();
  private pageEvent$$ = new Subject<PageEvent | null>();
  games$: Observable<Array<IGame>> = combineLatest([
    this.searchTerms$$.pipe(startWith(''), debounceTime(300), distinctUntilChanged(), tap(() => {
      this.paginator.firstPage();
    })),
    this.pageEvent$$.pipe(startWith(null)),
    this.filteredByTag$$.pipe(startWith({ indie: true, action: true, adventure: true })),
    this.filteredByPrice$$.pipe(startWith(1000)),
    this.gameAdded$$.pipe(startWith(null))
  ]).pipe(
    switchMap(([searchValue, pageEvent, filteredByTag, filteredByPrice]: [string, PageEvent | null, ICheckbox | any, Object | number, IGame | null]) => this.gameService.getGames().pipe(
      take(1),
      map(array => {
        let user: IUser = JSON.parse(sessionStorage.getItem("user")!);
        let filteredGames;

        if (this.router.url === "/library") {
          filteredGames = array.filter((game: IGame) => user.library.includes(game.id));
        } else {
          filteredGames = array.filter((game: IGame) => !user.library.includes(game.id) && game.name.includes(searchValue || '') && filteredByTag[game.tag] && game.cost <= filteredByPrice);
        }

        this.gamesNumber = filteredGames.length;
        const pageEventUsed = pageEvent || {
          pageIndex: 0,
          pageSize: 15,
          length: filteredGames.length
        };
        const startIndex = pageEventUsed.pageIndex * pageEventUsed.pageSize;
        let endIndex = startIndex + pageEventUsed.pageSize;

        if (endIndex > pageEventUsed.length) {
          endIndex = pageEventUsed.length;
        };
        return filteredGames.slice(startIndex, endIndex);
      })
    ))
  );
  gamesNumber: number = 0;

  constructor(
    private gameService: GameService,
    public router: Router
  ) { }

  OnPageChange(event: PageEvent) {
    this.pageEvent$$.next(event)
  }

  search(term: string): void {
    this.searchTerms$$.next(term);
  }

  addGameToLibrary(game: any) {
    this.gameService.addGameToLibrary(game.id).then(
      () => {
        this.gameAdded$$.next(game);
      }
    )
  }

  filterByTag(changes: ICheckbox) {
    this.filteredByTag$$.next(changes);
  }

  filterPrice(changes: Object | number) {
    this.filteredByPrice$$.next(changes);
  }
}
