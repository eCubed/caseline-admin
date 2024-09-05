import { Component, Inject } from '@angular/core';
import { AssertionsService } from '../../services/assertions.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayerDirective } from '../../directives/overlayer.directive';

export interface CreateAssertionPopupArgs {
  caseId: number
}

@Component({
  selector: 'app-create-assertion-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayerDirective,
  ],
  templateUrl: './create-assertion-popup.component.html',
  styleUrl: './create-assertion-popup.component.scss'
})
export class CreateAssertionPopupComponent {

  assertionFormGroup!: FormGroup
  isApiCalling: boolean = false

  constructor(
    @Inject('popupRef') public popupRef: any,
    @Inject('data') private createAssertionPopupArgs: CreateAssertionPopupArgs,
    private fb: FormBuilder,
    private assertionsService: AssertionsService
  ) {
    this.assertionFormGroup = this.fb.group({
      name: ['', Validators.required],
      body: [''],
      caseId: [this.createAssertionPopupArgs.caseId]
    })
  }

  cancel() {
    this.popupRef.close()
  }

  async save() {
    try {
      this.isApiCalling = true
      const id = await this.assertionsService.createAssertion(this.assertionFormGroup.value)
      this.popupRef.close({ id: id, assertion: this.assertionFormGroup.value })
    } catch {

    } finally {
      this.isApiCalling = false
    }
  }


}
