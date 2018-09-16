import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';
import {
  Observable,
  Subject
} from 'rxjs';
import {
  startWith,
  map,
  tap,
  takeUntil,
  filter
} from 'rxjs/operators';
import {
  KeyValueItem, ItemChange
} from './../../util/generic';

@Component({
  selector: 'app-key-value-list-item',
  templateUrl: './key-value-list-item.component.html',
  styleUrls: ['./key-value-list-item.component.scss']
})
export class KeyValueListItemComponent implements OnInit, OnDestroy {
  private $onDestroy = new Subject();

  @Input() item: KeyValueItem = {
    active: true,
    key: '',
    value: ''
  };

  @Output() itemChange: EventEmitter<ItemChange> = new EventEmitter();
  @Output() itemRemove: EventEmitter<ItemChange> = new EventEmitter();

  @Input() autocomplete: boolean = false;
  @Input() index: number = -1;
  @Input() removeable: boolean = true;

  @Input() suggestions: {[key: string]: string[]} = {};

  optionsKey: Observable <string[]>;
  optionsValue: Observable <string[]>;

  keyValueForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    const activeFormControl = new FormControl(this.item.active);
    const keyFormControl = new FormControl(this.item.key);
    const valueFormControl = new FormControl(this.item.value);

    this.keyValueForm = this.formBuilder.group({
      active: activeFormControl,
      key: keyFormControl,
      value: valueFormControl
    });

    activeFormControl.valueChanges
      .pipe(tap(value => this.item.active = value), takeUntil(this.$onDestroy))
      .subscribe(this.onItemPropertyUpdated.bind(this));
    

    const $onKeyChanges = keyFormControl.valueChanges
      .pipe(tap(value => this.item.key = value), takeUntil(this.$onDestroy))

    $onKeyChanges.subscribe(this.onItemPropertyUpdated.bind(this));


    const $onValueChanges = valueFormControl.valueChanges
      .pipe(tap(value => this.item.value = value), takeUntil(this.$onDestroy));
    
    $onValueChanges.subscribe(this.onItemPropertyUpdated.bind(this));

    const availableKeys = Object.keys(this.suggestions);

    this.optionsKey = $onKeyChanges.pipe(
      startWith(''),
      filter(value => availableKeys && availableKeys.length > 0 && value.length > 1),
      map(value => {
        const filterValue = value.toLowerCase();

        // TODO: reset options value when changing key for autosuggestion
        return availableKeys.filter(option => option.toLowerCase().includes(filterValue));
      })
    );

    this.optionsValue = $onValueChanges.pipe(
      startWith(''),
      filter(value => availableKeys && availableKeys.length > 0 && availableKeys.includes(this.item.key) && value.length > 1),
      map(value => {
        const filterValue = value.toLowerCase();

        const list = this.suggestions[this.item.key] || [];

        return list.filter(option => option.toLowerCase().includes(filterValue));
      })
    );
  }

  ngOnDestroy(): void {
    this.$onDestroy.next();
  }

  onItemPropertyUpdated() {
    this.itemChange.emit({
      index: this.index,
      item: this.item
    });

    if (this.index < 0) {
      this.reset(); 
    }
  }

  onRemove() {
    this.itemRemove.emit({
      index: this.index,
      item: this.item
    });
  }

  reset() {
    this.item = {
      active: true,
      key: '',
      value: ''
    };

    this.keyValueForm.patchValue(this.item, {
      emitEvent: false
    });
  }
}
