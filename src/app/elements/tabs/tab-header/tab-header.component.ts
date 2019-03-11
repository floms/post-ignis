import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-tab-header]',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss']
})
export class TabHeaderComponent implements OnInit {

  @Input() index;
  @Output() load = new EventEmitter();

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.load.emit(this.index);
  }

  activate() {
    const element = this.element.nativeElement;

    if (!element) {
      return;
    }

    const offLeft = 40;
    const parent = element.parentElement;
    const leftEdge = element.offsetLeft;
    const rightEdge = leftEdge + element.offsetWidth + offLeft;

    const parentWidth = parent.offsetWidth;
    const parentLeft = parent.scrollLeft;

    const tScroll = (parentLeft + parentWidth);


    if (rightEdge > tScroll) {
      parent.scrollLeft = (parentWidth - rightEdge) * -1;
    } else if (leftEdge < parentLeft) {
      parent.scrollLeft = leftEdge - offLeft;
    }
  }

}
