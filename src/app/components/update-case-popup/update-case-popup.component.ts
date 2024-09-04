import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CasesService } from '../../services/cases.service';
import { CommonModule } from '@angular/common';
import { UpdateCaseModel } from '../../models/caseline';

export interface UpdateCasePopupArgs {
  caseId: number
  case: UpdateCaseModel
}

@Component({
  selector: 'app-update-case-popup',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './update-case-popup.component.html',
  styleUrl: './update-case-popup.component.scss'
})
export class UpdateCasePopupComponent {
  caseFormGroup!: FormGroup
  isApiCalling: boolean = false

  constructor(
    @Inject('data') private updateCasePopupArgs: UpdateCasePopupArgs,
    @Inject('popupRef') private popupRef: any,
    private fb: FormBuilder,
    private casesService: CasesService
  ) {
    this.caseFormGroup = this.fb.group({
      name: [updateCasePopupArgs.case.name, Validators.required],
      body: [updateCasePopupArgs.case.body]
    })
  }

  cancel() {
    this.popupRef.close()
  }

  async save() {
    try {
      this.isApiCalling = true
      const id = await this.casesService.updateCase(this.updateCasePopupArgs.caseId, this.caseFormGroup.value)
      this.popupRef.close({ id: id, name: this.caseFormGroup.value.name })
    } catch {

    } finally {
      this.isApiCalling = false
    }
  }

}
