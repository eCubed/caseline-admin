import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateAssertionPopupArgs } from '../create-assertion-popup/create-assertion-popup.component';
import { AssertionsService } from '../../services/assertions.service';
import { UpdateAssertionModel } from '../../models/caseline';
import { OverlayerDirective } from '../../directives/overlayer.directive';
import { CommonModule } from '@angular/common';

export interface UpdateAssertionPopupArgs {
  id: number,
  assertion: UpdateAssertionModel
}

@Component({
  selector: 'app-update-assertion-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayerDirective
  ],
  templateUrl: './update-assertion-popup.component.html',
  styleUrl: './update-assertion-popup.component.scss'
})
export class UpdateAssertionPopupComponent {
  assertionFormGroup!: FormGroup
  isApiCalling: boolean = false

  constructor(
    @Inject('popupRef') public popupRef: any,
    @Inject('data') private updateAssertionPopupArgs: UpdateAssertionPopupArgs,
    private fb: FormBuilder,
    private assertionsService: AssertionsService
  ) {
    this.assertionFormGroup = this.fb.group({
      name: [this.updateAssertionPopupArgs.assertion.name, Validators.required],
      body: [this.updateAssertionPopupArgs.assertion.body, Validators.required]
    })
  }

  cancel() {
    this.popupRef.close()
  }

  async save() {
    try {
      this.isApiCalling = true
      const id = await this.assertionsService.updateAssertion(this.updateAssertionPopupArgs.id, this.assertionFormGroup.value)
      this.popupRef.close(this.assertionFormGroup.value)
    } catch {

    } finally {
      this.isApiCalling = false
    }
  }
}
