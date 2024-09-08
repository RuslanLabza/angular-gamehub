import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { filter, map, take, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import IUser from 'src/app/shared/interfaces/IUser';
import { Observable, Subscription, Subject, of } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  friends: Array<IUser> = [];
  users$!: Observable<IUser[]>;
  private searchTerms$$ = new Subject<string>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getFriends();
    this.users$ = this.searchTerms$$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.getUsersByUsername(term).pipe(
        map(users => users.filter(user => {
          const friendsIds: Array<number> = JSON.parse(sessionStorage.getItem("user")!).friends;
          return !friendsIds.includes(user.id);
        }))
      ))
    );
  }

  search(term: string): void {
    this.searchTerms$$.next(term);
  }

  getFriends(): void {
    const friendsIds: Array<number> = JSON.parse(sessionStorage.getItem("user")!).friends;

    friendsIds.forEach(friendId => {
      this.userService.getUserById(friendId).subscribe((friend: IUser) => {
        this.friends.push(friend);
      })
    });
  }

  addFriend(user: IUser, event: Event) {
    this.userService.addFriend(user.id).then(() => {
      const button: HTMLElement | any = event.target;
      button.parentElement.parentElement.remove();
      this.friends.push(user);
    })
  }

  removeFriend(friend: IUser, event: Event) {
    this.userService.removeFriend(friend.id).then(() => {
      const button: HTMLElement | any = event.target;
      button.parentElement.parentElement.remove();
    })
  }
}
