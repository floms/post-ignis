import {Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-split-window',
  templateUrl: './split-window.component.html',
  styleUrls: ['./split-window.component.scss']
})
export class SplitWindowComponent implements OnInit, OnChanges {
  @ViewChild('sidebar') sideBar: ElementRef;
  @Input() resize = false;
  @Input() max = -1;
  @Input() min = -1;
  @Input() width;
  @Output() onResize = new EventEmitter();

  private isResizing = false;
  private containerFrame: DOMRect;

  private sidebarStyle = {
    flex: '1',
  };

  constructor(private element: ElementRef) {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change.width && this.width > 0) {
      this.updateWidth();
    }
  }

  updateWidth() {
    if (this.max !== -1 && this.width > this.max) {
      this.width = this.max;
    }

    if (this.min !== -1 && this.width < this.min) {
      this.width = this.min;
    }

    this.sidebarStyle.flex = `0 0 ${this.width}px`;
  }

  ngOnInit() {
    this.containerFrame = this.element.nativeElement.getBoundingClientRect();

    if (this.width) {
      this.updateWidth();
    }
  }

  onMouseDown(event: MouseEvent) {
    this.isResizing = true;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isResizing && this.resize) {
      this.width = event.clientX - this.containerFrame.x;

      this.updateWidth();
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.isResizing) {
      this.onResize.emit(this.width);
    }

    this.isResizing = false;
  }
}
