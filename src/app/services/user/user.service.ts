import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import IUser from 'src/app/shared/interfaces/IUser';
import IProfileData from 'src/app/shared/interfaces/IProfileData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  getUsers(): Observable<Array<IUser>> {
    return this.db.list(`USERS`).valueChanges()
      .pipe(
        map((users) => users.map((user) => user as IUser))
      )
  }

  getUserByEmail(email: string): Observable<IUser | undefined> {
    return this.getUsers().pipe(
      take(1),
      map((users: Array<IUser>) => {
        const user = users.find((user: IUser) => user.email === email);
        return user;
      })
    )
  }

  getUserById(id: number): Observable<IUser> {
    return this.db.object(`USERS/${id}`).valueChanges().pipe(
      take(1),
      map((user) => {
        return user as IUser;
      })
    );
  }

  getUsersByUsername(term: string): Observable<IUser[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.getUsers().pipe(
      take(1),
      map((users: Array<IUser>) => {
        const result = users.filter((user: IUser) => {
          const regex = new RegExp(`${term}`, 'gi');
          return user.username.match(regex);
        });
        return result;
      })
    )
  }

  updateProfile(profileData: IProfileData): Promise<boolean> {
    const user: IUser = JSON.parse(sessionStorage.getItem("user")!);

    return this.db.object(`USERS/${user.id}`).update({ username: profileData.username, age: profileData.age }).then(() => {
      user.username = profileData.username;
      user.age = profileData.age;
      sessionStorage.setItem("user", `${JSON.stringify(user)}`);
      return true;
    })
  }

  addFriend(id: number): Promise<boolean> {
    const user: IUser = JSON.parse(sessionStorage.getItem("user")!);
    user.friends.push(id);

    return this.db.object(`USERS/${user.id}`).update({ friends: user.friends }).then(() => {
      sessionStorage.setItem("user", `${JSON.stringify(user)}`);
      return true;
    })
  }

  removeFriend(id: number): Promise<boolean> {
    const user: IUser = JSON.parse(sessionStorage.getItem("user")!);
    user.friends = user.friends.filter(friendId => friendId !== id);

    return this.db.object(`USERS/${user.id}`).update({ friends: user.friends }).then(() => {
      sessionStorage.setItem("user", `${JSON.stringify(user)}`);
      return true;
    })
  }
}
