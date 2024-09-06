import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditAssertionModel, UpdateAssertionModel } from '../../models/caseline';
import { AssertionsService } from '../../services/assertions.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { MarkdownComponent } from 'ngx-markdown';
import { PopupService } from '../../widgets/popup/popup.service';
import { UpdateAssertionPopupComponent } from '../update-assertion-popup/update-assertion-popup.component';
import { Subscription } from 'rxjs';
import { CreateEvidencePopupComponent } from '../create-evidence-popup/create-evidence-popup.component';
import { EvidenceComponent } from '../evidence/evidence.component';

@Component({
  selector: 'app-assertion',
  standalone: true,
  imports: [
    FontAwesomeModule,
    MarkdownComponent,
    UpdateAssertionPopupComponent,
    EvidenceComponent
  ],
  templateUrl: './assertion.component.html',
  styleUrl: './assertion.component.scss'
})
export class AssertionComponent {

  @Input() assertion!: EditAssertionModel
  @Output() assertionDeleted: EventEmitter<number> = new EventEmitter<number>()
  popupSubscription!: Subscription

  faPen = faPen
  faXmark = faXmark

  constructor(private popupService: PopupService,
              private assertionsService: AssertionsService
  ) {
    
  }

  openUpdateAssertion() {
    const popupRef = this.popupService.open(UpdateAssertionPopupComponent, { 
      id: this.assertion.id, 
      assertion: {
        name: this.assertion.name,
        body: this.assertion.body
      }
    }, { title: 'Update Assertion'})

    this.popupSubscription = popupRef.onClose.subscribe((updatedAssertion: UpdateAssertionModel) => {
      
      if (updatedAssertion != null) {
        this.assertion.name = updatedAssertion.name
        this.assertion.body = updatedAssertion.body
      }
    })
  }

  openCreateEvidence() {
    const popupRef = this.popupService.open(CreateEvidencePopupComponent, { assertionId: this.assertion.id }, { title: 'Create Evidence'})

    this.popupSubscription = popupRef.onClose.subscribe((createdEvidencePack: any) => {
      
      if (createdEvidencePack != null) {
        this.assertion.evidences.push({
          id: createdEvidencePack.id,
          incidentDate: createdEvidencePack.evidence.incidentDate,
          body: createdEvidencePack.evidence.body,
          weight: createdEvidencePack.evidence.weight
        })

        this.assertion.evidences = this.assertion.evidences.sort((a, b) => b.weight - a.weight)
      }
    })
  }

  onEvidenceDeleted(id: number) {
    const idx = this.assertion.evidences.findIndex(e => e.id == id)
    if (idx > -1)
      this.assertion.evidences.splice(idx, 1)
  }

  async clickDeleteAssertion() {
    try {
      await this.assertionsService.deleteAssertion(this.assertion.id)
      this.assertionDeleted.emit(this.assertion.id)
    } catch {

    }
  }
}
