import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { postStateType } from '../store/reducers/post.reducer';
import { POSTS } from '../type/user';
import { getPosts } from '../store/actions/post.actions';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css'
})
export class PracticeComponent {

  allPosts: POSTS[] = []
  cred: BehaviorSubject<{ page: number, searchVal: string }> = new BehaviorSubject({ page: 0, searchVal: "" })
  count: number = 0
  constructor(private store: Store<{ postReducer: postStateType }>) {
    store.select(state => state.postReducer).subscribe((data) => {
      this.allPosts = data.allPosts;
      this.count = data.count;
    })

    this.cred.subscribe(({ page, searchVal }) => {
      store.dispatch(getPosts({ page, searchVal }));
    })



  }


  handleSearchVal(searchVal: string) {
    this.cred.next({ ...this.cred.value, searchVal });
  }



}
