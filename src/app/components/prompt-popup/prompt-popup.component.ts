import { Component, Inject } from '@angular/core';

export interface PromptPopupArgs {
  prompt: string
  affirmativeResponse: string
  negativeResponse: string
}

@Component({
  selector: 'app-prompt-popup',
  standalone: true,
  imports: [],
  templateUrl: './prompt-popup.component.html',
  styleUrl: './prompt-popup.component.scss'
})
export class PromptPopupComponent {
  constructor(
    @Inject('popupRef') public popupRef: any,
    @Inject('data') public promptPopupArgs: PromptPopupArgs) {
    
    this.promptPopupArgs.affirmativeResponse = this.promptPopupArgs.affirmativeResponse ?? 'Yes'
    this.promptPopupArgs.negativeResponse = this.promptPopupArgs.negativeResponse ?? 'No'
    this.promptPopupArgs.prompt = this.promptPopupArgs.prompt ?? 'Are you sure you want to proceed?'
  }

  clickAffirmative() {
    this.popupRef.close(true)
  }

  clickNegative() {
    this.popupRef.close()
  }
}
