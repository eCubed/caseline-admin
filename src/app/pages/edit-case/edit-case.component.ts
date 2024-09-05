import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PopupService } from '../../widgets/popup/popup.service';
import { CasesService } from '../../services/cases.service';
import { AssertionsService } from '../../services/assertions.service';
import { EvidencesService } from '../../services/evidences.service';
import { EditAssertionModel, EditCaseModel, UpdateAssertionModel, UpdateCaseModel } from '../../models/caseline';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateCasePopupComponent } from '../../components/update-case-popup/update-case-popup.component';
import { MarkdownModule } from 'ngx-markdown';
import { FontAwesomeModule,  } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { CreateAssertionPopupComponent } from '../../components/create-assertion-popup/create-assertion-popup.component';
import { AssertionComponent } from '../../components/assertion/assertion.component';

@Component({
  selector: 'app-edit-case',
  standalone: true,
  imports: [
    MarkdownModule,
    FontAwesomeModule,
    AssertionComponent
  ],
  templateUrl: './edit-case.component.html',
  styleUrl: './edit-case.component.scss'
})
export class EditCaseComponent implements OnInit, OnDestroy {

  fullCase!: EditCaseModel
  
  paramSubscription!: Subscription
  popupSubscription!: Subscription

  faPen = faPen 

  route = inject(ActivatedRoute)

  constructor(private popupService: PopupService,
              private casesService: CasesService,
              private assertionsService: AssertionsService,
              private evidencesService: EvidencesService
  ) {
  }

  ngOnInit() {
    this.paramSubscription = this.route.paramMap.subscribe(async (params) => {
      const caseId = parseInt(params.get('caseId') ?? '0', 10)
      this.fullCase = await this.casesService.getCaseForEdit(caseId)
      console.log(JSON.stringify(this.fullCase))
    })
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe()
    this.popupSubscription?.unsubscribe()
  }

  openUpdateCase() {
    const popupRef = this.popupService.open(UpdateCasePopupComponent, 
      { 
        caseId: this.fullCase.id,
        case: { 
          name: this.fullCase.name,
          body: this.fullCase.body
        }
      }, { title: 'Create Case'})

    this.popupSubscription = popupRef.onClose.subscribe((updatedCaseOutput: any) => {
      console.log(JSON.stringify(updatedCaseOutput))
      if (updatedCaseOutput != null) {
        this.fullCase.name = updatedCaseOutput.case.name
        this.fullCase.body = updatedCaseOutput.case.body
      }
    })
  }

  openCreateAssertion() {
    const popupRef = this.popupService.open(CreateAssertionPopupComponent, { caseId: this.fullCase.id }, { title: 'Create Assertion'})

    this.popupSubscription = popupRef.onClose.subscribe((createdAssertionPack: any) => {
      
      if (createdAssertionPack != null) {
        this.fullCase.assertions.push({
          id: createdAssertionPack.id,
          name: createdAssertionPack.assertion.name,
          body: createdAssertionPack.assertion.body,
          evidences: []
        })
      }
    })
  }
}
