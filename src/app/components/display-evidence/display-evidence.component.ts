import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DisplayEvidenceModel } from '../../models/caseline';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayerDirective } from '../../directives/overlayer.directive';
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PopupService } from '../../widgets/popup/popup.service';
import { EvidencesService } from '../../services/evidences.service';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-display-evidence',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayerDirective,
    MarkdownComponent
  ],
  templateUrl: './display-evidence.component.html',
  styleUrl: './display-evidence.component.scss'
})
export class DisplayEvidenceComponent {
  @Input() evidence!: DisplayEvidenceModel
  @Output() evidenceDeleted: EventEmitter<number> = new EventEmitter<number>()
  popupSubscription!: Subscription
  isApiCalling: boolean = false

  faPen = faPen
  faXmark = faXmark

  constructor() {
    
  }
}
