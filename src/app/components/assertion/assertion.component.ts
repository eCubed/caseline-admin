import { Component, Input } from '@angular/core';
import { EditAssertionModel, UpdateAssertionModel } from '../../models/caseline';
import { AssertionsService } from '../../services/assertions.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
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
  popupSubscription!: Subscription

  faPen = faPen

  constructor(private popupService: PopupService) {
    
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
      }
    })
  }
}
