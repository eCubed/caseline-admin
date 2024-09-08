import { Component, OnDestroy, OnInit } from '@angular/core';
import { CasesService } from '../../services/cases.service';
import { AdminCaseDisplayModel } from '../../models/caseline';
import { OverlayerDirective } from '../../directives/overlayer.directive';
import { PopupService } from '../../widgets/popup/popup.service';
import { CreateCasePopupComponent } from '../../components/create-case-popup/create-case-popup.component';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PromptPopupComponent } from '../../components/prompt-popup/prompt-popup.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    OverlayerDirective,
    CreateCasePopupComponent,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {

  cases: Array<AdminCaseDisplayModel> = []
  isApiCalling: boolean = false
  popupSubscription!: Subscription

  faXmark = faXmark
  faPen = faPen

  constructor(private casesService: CasesService,
              private popupService: PopupService
  ) {
  }

  async ngOnInit() {
    try {
      this.isApiCalling = true
      this.cases = await this.casesService.getAllCasesForAdminDisplay()
    } catch {

    } finally {
      this.isApiCalling = false
    }
  }

  
  ngOnDestroy(): void {
    this.popupSubscription?.unsubscribe()
  }

  addNewCase() {
    const popupRef = this.popupService.open(CreateCasePopupComponent, null, { title: 'Create Case'})

    this.popupSubscription = popupRef.onClose.subscribe((newCase?: AdminCaseDisplayModel) => {
      if (newCase != null) {
        this.cases.push(newCase)
        this.cases.sort((a, b) => a.name > b.name ? 1 : 0)
      }
    })
  }

 clickDeleteCase(cayse: AdminCaseDisplayModel) {

    const popupRef = this.popupService.open(PromptPopupComponent, {
      prompt: `Are you sure you want to delete ${cayse.name}?`
    }, {
      maxHeight: '300px',
      maxWidth: '350px'
    });

    this.popupSubscription = popupRef.onClose.subscribe(async (response?: boolean) => {
      if(response) {
        try {
          this.isApiCalling = true
          await this.casesService.deleteCase(cayse.id);
    
          const idx = this.cases.findIndex(c => c.id == cayse.id)
          if (idx > -1)
            this.cases.splice(idx, 1)
    
        } catch {
          
        } finally {
          this.isApiCalling = false
        }
      }
    })

    
  }
}
