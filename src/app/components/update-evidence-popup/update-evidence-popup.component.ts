import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateEvidenceModel } from '../../models/caseline';
import { EvidencesService } from '../../services/evidences.service';
import { OverlayerDirective } from '../../directives/overlayer.directive';
import { CommonModule } from '@angular/common';

export interface UpdateEvidencePopupArgs {
  id: number,
  evidence: UpdateEvidenceModel
}

@Component({
  selector: 'app-update-evidence-popup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayerDirective
  ],
  templateUrl: './update-evidence-popup.component.html',
  styleUrl: './update-evidence-popup.component.scss'
})
export class UpdateEvidencePopupComponent {
  evidenceFormGroup!: FormGroup
  isApiCalling: boolean = false

  constructor(
    @Inject('popupRef') public popupRef: any,
    @Inject('data') private updateEvidencePopupArgs: UpdateEvidencePopupArgs,
    private fb: FormBuilder,
    private evidencesService: EvidencesService
  ) {
    this.evidenceFormGroup = this.fb.group({
      incidentDate: [this.updateEvidencePopupArgs.evidence.incidentDate],
      body: [this.updateEvidencePopupArgs.evidence.body, Validators.required],
      weight: [this.updateEvidencePopupArgs.evidence.weight, Validators.required]
    })
  }

  cancel() {
    this.popupRef.close()
  }

  async save() {
    try {
      this.isApiCalling = true
      await this.evidencesService.updateEvidence(this.updateEvidencePopupArgs.id, this.evidenceFormGroup.value)
      this.popupRef.close(this.evidenceFormGroup.value)
    } catch {

    } finally {
      this.isApiCalling = false
    }
  }
}
