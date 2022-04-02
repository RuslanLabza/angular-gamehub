import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IUser from 'src/app/shared/interfaces/IUser';
import IGame from '../../shared/interfaces/IGame'


@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private db: AngularFireDatabase) { }

  getGames(): Observable<Array<IGame>> {
    return this.db.list(`GAMES`).valueChanges()
      .pipe(
        map((games) => games.map((game) => game as IGame))
      )
  }

  addGameToLibrary(id: number): Promise<boolean> {
    const user: IUser = JSON.parse(sessionStorage.getItem("user")!);
    user.library.push(id);

    return this.db.object(`USERS/${user.id}`).update({ library: user.library }).then(() => {
      sessionStorage.setItem("user", `${JSON.stringify(user)}`);
      return true;
    })
  }
}
