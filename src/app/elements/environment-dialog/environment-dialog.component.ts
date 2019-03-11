import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {distinctUntilChanged, filter, map, tap} from 'rxjs/operators';
import {Action, select, Store} from '@ngrx/store';
import {
  WorkspaceNewEnvironment,
  WorkspaceRemoveEnvironment,
  WorkspaceStateChange,
  WorkspaceUpdateEnvironment
} from '../../store/workspace.actions';
import {get} from '../../util';
import {WorkspaceState} from '../../store/workspace.reducers';

@Component({
  selector: 'app-environment-dialog',
  templateUrl: './environment-dialog.component.html',
  styleUrls: ['./environment-dialog.component.scss']
})
export class EnvironmentDialogComponent implements OnInit {
  environmentForm: FormGroup;
  environments$: Observable<any>;
  environmentControl: FormControl;
  environmentNameControl: FormControl;
  environmentValueControl: FormControl;

  actions = {
    save: false,
    delete: false
  };

  constructor(
    private dialogRef: MatDialogRef<EnvironmentDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<{ workspace: WorkspaceState }>
  ) {
  }

  get CurrentEnvironment() {
    return this.environmentForm.value.environment;
  }

  ngOnInit() {
    this.environmentControl = new FormControl();
    this.environmentNameControl = new FormControl('', [Validators.required]);
    this.environmentValueControl = new FormControl();

    this.environments$ = this.store.pipe(
      select('workspace'),
      tap(workspace => {
        const environment = workspace.environment.active;

        this.selectEnvironment(environment);
      }),
      map(workspace => workspace.environment.list)
    );

    this.environmentControl.valueChanges.pipe(distinctUntilChanged(), filter(env => env)).subscribe((environment: any) => {
      this.store.dispatch(new WorkspaceStateChange({environment: environment.id}));
    });

    this.environmentForm = this.formBuilder.group({
      environment: this.environmentControl,
      environmentName: this.environmentNameControl,
      environmentConfiguration: this.environmentValueControl,
    });
  }

  selectEnvironment(selection: any) {
    const environment = get(selection);

    this.environmentNameControl.patchValue(environment('name'));
    this.environmentValueControl.patchValue(environment('value'));
    this.environmentControl.patchValue(selection);

    const createNewEnvironment = typeof selection === 'undefined';

    this.toggleEditable(environment('id'), createNewEnvironment);
  }

  toggleEditable(edit: boolean, create: boolean = false) {
    const editable = edit || create;

    this.actions.delete = editable;
    this.actions.save = editable;

    if (create) {
      this.actions.delete = false;
    }

    if (editable) {
      this.environmentNameControl.enable();
      this.environmentValueControl.enable();
    } else {
      this.environmentNameControl.disable();
      this.environmentValueControl.disable();
    }
  }

  onCreateEnvironment() {
    this.environmentControl.setValue({id: null});
    this.environmentControl.disable();

    this.environmentNameControl.patchValue('');
    this.environmentValueControl.patchValue('');


    this.toggleEditable(true);
  }

  onSaveEnvironment() {
    this.environmentControl.disable();
    this.actions.save = false;

    const data: any = {
      ...this.CurrentEnvironment,
      name: this.environmentForm.value.environmentName,
      value: this.environmentForm.value.environmentConfiguration
    };

    // TODO: show error because environment name is required
    if (!data.name) {
      return;
    }

    let action: Action = new WorkspaceNewEnvironment(data);

    if (data.id) {
      action = new WorkspaceUpdateEnvironment(data);
    }

    this.store.dispatch(action);

    this.environmentControl.enable();
    this.toggleEditable(true);
  }

  onDeleteEnvironment() {
    this.store.dispatch(new WorkspaceRemoveEnvironment(this.CurrentEnvironment));
  }
}
