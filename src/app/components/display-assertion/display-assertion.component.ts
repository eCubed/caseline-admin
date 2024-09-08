import { Component, Input } from '@angular/core';
import { DisplayAssertionModel } from '../../models/caseline';
import { Subscription } from 'rxjs';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { DisplayEvidenceComponent } from '../display-evidence/display-evidence.component';
import { MarkdownComponent } from 'ngx-markdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-display-assertion',
  standalone: true,
  imports: [
    CommonModule,
    DisplayEvidenceComponent,
    MarkdownComponent,
    FontAwesomeModule
  ],
  templateUrl: './display-assertion.component.html',
  styleUrl: './display-assertion.component.scss'
})
export class DisplayAssertionComponent {
  @Input() assertion!: DisplayAssertionModel
  popupSubscription!: Subscription
  isApiCalling: boolean = false

  faDiamond = faDiamond

  constructor(){

  }
}
