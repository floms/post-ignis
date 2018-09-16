import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyValueItem, ItemChange } from 'src/app/util/generic';

@Component({
  selector: 'app-key-value-list',
  templateUrl: './key-value-list.component.html',
  styleUrls: ['./key-value-list.component.scss']
})
export class KeyValueListComponent implements OnInit {
  @Input() items: KeyValueItem[] = [];
  @Input() suggestionKeys: string[] = [];
  @Input() suggestionValues: string[] = [];
  @Input() suggestions: { [key: string]: string[] } = {};

  @Output() change: EventEmitter<KeyValueItem[]>  = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (!this.items) {
      this.items = [];
    }

    // always add one editable item to the end
    this.addEditableItem();
  }

  onItemChanged(change: ItemChange) {
    // add new item if modifying the last one
    if (this.isLastOne(change.index)) {
      this.addEditableItem();
    }

    this.change.emit(this.items);
  }

  onItemRemoved(change: ItemChange) {
    this.items.splice(change.index, 1);
  }

  get lastIndex() {
    return this.items.length - 1;
  }

  isLastOne(index: number) {
    return index === this.lastIndex;
  }

  addEditableItem() {
    if (this.items.length === 0) {
      return this.items.push({
        active: true,
        key: '',
        value: ''
      });
    }

    const lastItem = this.items[this.lastIndex];

    if (lastItem.key || lastItem.value) {
      return this.items.push({
        active: true,
        key: '',
        value: ''
      });
    }
  }
}
