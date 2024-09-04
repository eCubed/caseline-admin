import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Injector, Input, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { PopupSettings } from '../popupsettings';
@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void <=> *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class PopupComponent implements AfterViewInit {
  @Input() data: any;
  @Input() popupSettings?: PopupSettings | null | undefined
  @ViewChild('container', { read: ViewContainerRef, static: false }) container!: ViewContainerRef;
  visible = true;
  onClose = new EventEmitter<any>();

  constructor(
    private injector: Injector,
    private renderer: Renderer2,
    private element: ElementRef
  ) {
  }

  ngAfterViewInit(): void {
    const component = this.data.component;
    const injector = Injector.create({
      providers: [
        { provide: 'data', useValue: this.data.data },
        { provide: 'popupRef', useValue: { close: (data: any) => this.close(data) } }
      ],
      parent: this.injector
    });

    this.container.createComponent(component, { injector });    

    const popupWindow = this.element.nativeElement.querySelector('.popup-window');
    
    this.renderer.setStyle(popupWindow, 'min-width', this.popupSettings?.minWidth ?? "50vw")
    this.renderer.setStyle(popupWindow, 'max-width', this.popupSettings?.maxWidth ?? "95vw")
    this.renderer.setStyle(popupWindow, 'min-height', this.popupSettings?.minHeight ?? "50vh")
    this.renderer.setStyle(popupWindow, 'max-height', this.popupSettings?.maxHeight ?? "90vh")
    
  }

  clickOverlay() {
    this.close();
  }

  close(data?: any) {
    this.visible = false;
    setTimeout(() => {
      this.onClose.emit(data);
    }, 500); // Match the duration of the animation
  }
}
