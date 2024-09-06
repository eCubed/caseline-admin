import { Component, Inject } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayerDirective } from '../../directives/overlayer.directive';

@Component({
  selector: 'app-create-case-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayerDirective,
  ],
  templateUrl: './create-case-popup.component.html',
  styleUrl: './create-case-popup.component.scss'
})
export class CreateCasePopupComponent {

  caseFormGroup!: FormGroup
  isApiCalling: boolean = false

  constructor(
    @Inject('popupRef') private popupRef: any,
    private fb: FormBuilder,
    private casesService: CasesService
  ) {
    this.caseFormGroup = this.fb.group({
      name: ['', Validators.required],
      body: ['']
    })
  }

  cancel() {
    this.popupRef.close()
  }

  async save() {
    try {
      this.isApiCalling = true
      const response = await this.casesService.createCase(this.caseFormGroup.value)
      this.popupRef.close({ id: response.id, name: this.caseFormGroup.value.name })
    } catch {

    } finally {
      this.isApiCalling = false
    }
  }


}
