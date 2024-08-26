import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { postStateType } from '../../store/reducers/post.reducer';
import { Store } from '@ngrx/store';
import { addPosts, deletePosts, getPosts } from '../../store/actions/post.actions';
import { POSTS } from '../../type/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  postForm: FormGroup = new FormGroup({});
  page: BehaviorSubject<{ page: number, searchVal: string }> = new BehaviorSubject<{ page: number, searchVal: string }>({ page: 0, searchVal: "" });
  count: number = 0
  allPosts: POSTS[] = [];

  constructor(private store: Store<{ postReducer: postStateType }>, private fb: FormBuilder) {
    this.postForm = fb.group({
      title: ["", Validators.required],
      desc: ["", Validators.required],
      rate: ["", Validators.required],
    })

    store.select(state => state.postReducer.allPosts).subscribe((data) => {
      this.allPosts = data;
    })
  }

  ngOnInit() {
    this.page.subscribe(data => {
      this.store.dispatch(getPosts({ page: data.page, searchVal: data.searchVal }));
    })
    this.store.select(state => state.postReducer.count).subscribe((data) => {
      this.count = data
    })
  }


  handleSubmit() {
    if (this.postForm.valid) {
      console.log("form called");
      this.store.dispatch(addPosts({ data: this.postForm.value }))
    }
    console.log(this.postForm.value);
  };


  handleDelete(id: string) {
    this.store.dispatch(deletePosts({ id }))
  }


  handlePage(arg: number) {
    console.log("caled");
    this.page.next({ ...this.page.value, page: arg })
  }




}

;
