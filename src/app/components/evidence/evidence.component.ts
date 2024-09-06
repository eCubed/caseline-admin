import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditEvidenceModel, UpdateEvidenceModel } from '../../models/caseline';
import { Subscription } from 'rxjs';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { PopupService } from '../../widgets/popup/popup.service';
import { UpdateEvidencePopupComponent } from '../update-evidence-popup/update-evidence-popup.component';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { OverlayerDirective } from '../../directives/overlayer.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EvidencesService } from '../../services/evidences.service';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';

@Component({
  selector: 'app-evidence',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
    FontAwesomeModule,
    OverlayerDirective
  ],
  templateUrl: './evidence.component.html',
  styleUrl: './evidence.component.scss'
})
export class EvidenceComponent {
  @Input() evidence!: EditEvidenceModel
  @Output() evidenceDeleted: EventEmitter<number> = new EventEmitter<number>()
  popupSubscription!: Subscription

  faPen = faPen
  faXmark = faXmark

  constructor(private popupService: PopupService,
              private evidencesService: EvidencesService
  ) {
    
  }

  openUpdateEvidence() {
    const popupRef = this.popupService.open(UpdateEvidencePopupComponent, { 
      id: this.evidence.id, 
      evidence: {
        incidentDate: this.evidence.incidentDate,
        body: this.evidence.body,
        weight: this.evidence.weight
      }
    }, { title: 'Update Evidence'})

    this.popupSubscription = popupRef.onClose.subscribe((updatedEvidence: UpdateEvidenceModel) => {
      
      if (updatedEvidence != null) {
        this.evidence.incidentDate = updatedEvidence.incidentDate
        this.evidence.body = updatedEvidence.body        
        this.evidence.weight = updatedEvidence.weight
      }
    })
  }

  async clickDeleteEvidence() {
    try {
      await this.evidencesService.deleteEvidence(this.evidence.id)
      this.evidenceDeleted.emit(this.evidence.id)
    } catch {

    }
  }

  
}
