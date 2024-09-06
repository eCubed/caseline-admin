import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EvidencesService } from '../../services/evidences.service';
import { OverlayerDirective } from '../../directives/overlayer.directive';
import { CommonModule } from '@angular/common';

export interface CreateEvidencePopupArgs {
  assertionId: number
}

@Component({
  selector: 'app-create-evidence-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayerDirective
  ],
  templateUrl: './create-evidence-popup.component.html',
  styleUrl: './create-evidence-popup.component.scss'
})
export class CreateEvidencePopupComponent {
  evidenceFormGroup!: FormGroup
  isApiCalling: boolean = false

  constructor(
    @Inject('popupRef') public popupRef: any,
    @Inject('data') private createEvidencePopupArgs: CreateEvidencePopupArgs,
    private fb: FormBuilder,
    private evidencesService: EvidencesService
  ) {
    this.evidenceFormGroup = this.fb.group({
      body: ['', Validators.required],
      weight: [1, Validators.required],
      incidentDate: [null],
      assertionId: [this.createEvidencePopupArgs.assertionId]
    })
  }

  cancel() {
    this.popupRef.close()
  }

  async save() {
    try {
      this.isApiCalling = true
      const response = await this.evidencesService.createEvidence(this.evidenceFormGroup.value)
      this.popupRef.close({ id: response.id, evidence: this.evidenceFormGroup.value })
    } catch {

    } finally {
      this.isApiCalling = false
    }
  }
}
