import {JsonPipe}         from '@angular/common';
import {Component, input} from '@angular/core';
import {AbstractControl}  from '@angular/forms';
import {MatError}         from '@angular/material/form-field';


@Component({
  selector: 'app-control-errors',
  standalone: true,
  imports: [
    MatError,
    JsonPipe,
  ],
  templateUrl: './control-errors.component.html',
  styleUrl: './control-errors.component.scss',
})
export class ControlErrorsComponent {
  public control = input<AbstractControl>()

  get errorsKeys(): string[] {
    return Object.keys(this.control()?.errors || {})
  }
}
