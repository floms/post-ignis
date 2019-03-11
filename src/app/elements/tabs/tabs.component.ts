import {
  AfterViewChecked,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {TabViewComponent} from './tab-view/tab-view.component';
import {TabHeaderComponent} from './tab-header/tab-header.component';

interface TabEvent {
  index: number;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnChanges, AfterViewChecked {
  @ContentChildren(TabViewComponent) tabViews: TabViewComponent[];
  @ViewChildren(TabHeaderComponent) tabHeaders: TabHeaderComponent[];

  @Output() closeTab: EventEmitter<TabEvent> = new EventEmitter<TabEvent>();
  @Output() newTab: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changeTab: EventEmitter<TabEvent> = new EventEmitter<TabEvent>();

  @Input() activeIndex;
  private tabCount = 0;

  get NeedToRefocus() {
    if (this.tabHeaders) {
      return this.tabHeaders.length !== this.tabCount;
    }

    return false;
  }

  ngAfterViewChecked() {
    if (this.NeedToRefocus) {
      this.focusOnActiveTab();

      this.tabCount = this.tabHeaders.length;
    }
  }

  focusOnActiveTab() {
    if (this.activeIndex >= 0) {
      this.updateActiveTab(this.activeIndex);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activeIndex) {
      this.focusOnActiveTab();
    }
  }

  ngOnInit(): void {
    this.focusOnActiveTab();
  }

  activateTab(index) {
    this.changeTab.emit({
      index
    });
  }

  updateActiveTab(index) {
    if (index < 0) {
      return;
    }
    if (!this.tabViews) {
      return;
    }

    this.tabViews.forEach((tab: any, i) => {
      tab.update(i, index);
    });

    if (!this.tabHeaders) {
      return;
    }

    this.tabHeaders.forEach((header, i) => {
      if (index === i) {
        header.activate();
      }
    });
  }

  addTab() {
    this.newTab.emit(true);
  }

  onCloseTab(index) {
    this.closeTab.emit({
      index
    });
  }
}
