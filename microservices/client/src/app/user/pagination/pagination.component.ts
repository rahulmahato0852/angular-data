import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  imports: [CommonModule,],
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  standalone: true
})
export class PaginationComponent {

  @Input() count: number = 0
  @Input() limit: number = 0
  @Input() handlePage!: BehaviorSubject<{ page: number, searchVal: string }>
  @Output() searchval: EventEmitter<string> = new EventEmitter<string>()
  x: any = null

  page = 0
  ngOnInit() {
    this.page = this.handlePage.value.page
  }


  handleChange(event: Event) {
    const { value } = event.target as HTMLInputElement
    clearTimeout(this.x)
    this.x = setTimeout(() => {
      this.searchval.emit(value)
    }, 1000);
  }


  handleNext() {
    const pre = { ...this.handlePage.value }
    pre.page = pre.page + 1
    this.handlePage.next(pre)
  }

  handlePre() {
    const pre = { ...this.handlePage.value }
    pre.page = pre.page - 1
    this.handlePage.next(pre)
  }


}
