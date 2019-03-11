import {Component, ContentChild, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'app-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent {
  @ContentChild('header')
  header: any;

  @Input() index: number;
  @Input() activeIndex: number;

  get active() {
    return this.index === this.activeIndex && this.index >= 0;
  }

  get rtl() {
    return this.index > this.activeIndex;
  }

  get ltr() {
    return this.index < this.activeIndex;
  }

  get Tab() {
    return this.header;
  }

  update(index, activeIndex) {
    this.index = index;
    this.activeIndex = activeIndex;
  }

}
