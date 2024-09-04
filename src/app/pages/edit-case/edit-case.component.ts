import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PopupService } from '../../widgets/popup/popup.service';
import { CasesService } from '../../services/cases.service';
import { AssertionsService } from '../../services/assertions.service';
import { EvidencesService } from '../../services/evidences.service';
import { EditCaseModel } from '../../models/caseline';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-case',
  standalone: true,
  imports: [],
  templateUrl: './edit-case.component.html',
  styleUrl: './edit-case.component.scss'
})
export class EditCaseComponent implements OnInit, OnDestroy {

  fullCase!: EditCaseModel
  
  paramSubscription!: Subscription

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
  }

  
}
