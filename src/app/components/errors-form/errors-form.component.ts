import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-errors-form',
  templateUrl: './errors-form.component.html',
  styleUrls: ['./errors-form.component.css']
})
export class ErrorsFormComponent implements OnInit {
  @Input() group?: FormGroup;
  @Input() controlLabel?: string;
  @Input() controlName?: string;

  control?: FormControl;

  constructor() {}

  ngOnInit(): void {
    if (this.group && this.controlName) {
      this.control = this.group.controls[this.controlName] as FormControl;
    }
  }
}
