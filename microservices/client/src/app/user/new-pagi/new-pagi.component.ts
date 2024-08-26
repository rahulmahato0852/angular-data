import { Component } from '@angular/core';
import { POSTS } from '../../type/user';
import { Store } from '@ngrx/store';
import { postStateType } from '../../store/reducers/post.reducer';
import { getPosts } from '../../store/actions/post.actions';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-new-pagi',
  templateUrl: './new-pagi.component.html',
  styleUrl: './new-pagi.component.css'
})
export class NewPagiComponent {

  count: number = 0
  page: BehaviorSubject<{ page: number, searchVal: string }> = new BehaviorSubject({ page: 0, searchVal: "" })

  allPosts: POSTS[] = []

  constructor(private store: Store<{ postReducer: postStateType }>) { }


  ngOnInit() {
    this.page.subscribe((data) => {
      this.store.dispatch(getPosts({ page: data.page, searchVal: data.searchVal }))
    })
    this.store.select(state => state.postReducer.allPosts).subscribe((data) => {
      this.allPosts = data
    })
    this.store.select(state => state.postReducer.count).subscribe((data) => {
      this.count = data;
    })
  }


  handlePage(arg: number) {
    this.page.next({ ...this.page.value, page: arg })
  }

  handleChange(arg: string) {
    this.page.next({ ...this.page.value, searchVal: arg })
  }



}
