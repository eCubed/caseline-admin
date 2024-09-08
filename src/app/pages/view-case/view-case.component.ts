import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CasesService } from '../../services/cases.service';
import { DisplayCaseModel } from '../../models/caseline';
import { CommonModule } from '@angular/common';
import { DisplayAssertionComponent } from '../../components/display-assertion/display-assertion.component';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-view-case',
  standalone: true,
  imports: [
    CommonModule,
    DisplayAssertionComponent,
    MarkdownComponent
  ],
  templateUrl: './view-case.component.html',
  styleUrl: './view-case.component.scss'
})
export class ViewCaseComponent implements OnInit {

  paramSubscription!: Subscription
  fullCase!: DisplayCaseModel

  route = inject(ActivatedRoute)
  casesService = inject(CasesService)

  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe(async (params) => {
      const normalizedName = params.get('normalizedName') ?? ''
      this.fullCase = await this.casesService.getCaseForDisplay(normalizedName)
    })
  }
  

}
