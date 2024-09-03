import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appOverlayer]',
  standalone: true
})
export class OverlayerDirective implements OnChanges {
  @Input() appOverlayer: boolean = false;
  @Input() overlayText: string = 'Loading...';

  private overlayElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.createOverlayElement();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appOverlayer']) {
      this.updateOverlayVisibility();
    }
    if (changes['overlayText']) {
      this.updateOverlayText();
    }
  }

  private createOverlayElement(): void {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.overlayElement = this.renderer.createElement('div');
    this.renderer.setStyle(this.overlayElement, 'position', 'absolute');
    this.renderer.setStyle(this.overlayElement, 'top', '0');
    this.renderer.setStyle(this.overlayElement, 'left', '0');
    this.renderer.setStyle(this.overlayElement, 'width', '100%');
    this.renderer.setStyle(this.overlayElement, 'height', '100%');
    this.renderer.setStyle(this.overlayElement, 'background', 'rgba(0, 0, 0, 0.5)');
    this.renderer.setStyle(this.overlayElement, 'display', 'flex');
    this.renderer.setStyle(this.overlayElement, 'align-items', 'center');
    this.renderer.setStyle(this.overlayElement, 'justify-content', 'center');
    this.renderer.setStyle(this.overlayElement, 'color', '#fff');
    this.renderer.setStyle(this.overlayElement, 'z-index', '1000');
    this.renderer.setStyle(this.overlayElement, 'pointer-events', 'none');
    this.renderer.setStyle(this.overlayElement, 'opacity', '0');
    this.renderer.setStyle(this.overlayElement, 'transition', 'opacity 0.5s');

    const textElement = this.renderer.createElement('span');
    this.renderer.setProperty(textElement, 'innerText', this.overlayText);
    this.renderer.appendChild(this.overlayElement, textElement);

    this.renderer.appendChild(this.el.nativeElement, this.overlayElement);
    this.updateOverlayVisibility();
  }

  private updateOverlayVisibility(): void {
    if (this.appOverlayer) {
      //this.renderer.setStyle(this.overlayElement, 'display', 'flex');
      this.renderer.setStyle(this.overlayElement, 'opacity', '1');
    } else {
      this.renderer.setStyle(this.overlayElement, 'opacity', '0');
      //this.renderer.setStyle(this.overlayElement, 'display', 'none');
    }
  }

  private updateOverlayText(): void {
    const textElement = this.overlayElement.querySelector('span');
    if (textElement) {
      this.renderer.setProperty(textElement, 'innerText', this.overlayText);
    }
  }
}
