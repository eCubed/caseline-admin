import { ApplicationRef, ComponentRef, createComponent, EmbeddedViewRef, EnvironmentInjector, Injectable, Injector, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { PopupComponent } from './popup/popup.component';
import { PopupSettings } from './popupsettings';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private componentRef!: ComponentRef<any>;
  private onCloseSubject!: Subject<any>;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  open<T>(contentComponent: Type<T>, data: any, popupSettings?: PopupSettings): any {
    this.onCloseSubject = new Subject<any>();

    const popupComponentRef = createComponent(PopupComponent, {
      environmentInjector: this.injector.get(EnvironmentInjector)
    });

    this.appRef.attachView(popupComponentRef.hostView);
    const domElem = (popupComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement
    document.body.appendChild(domElem);

    popupComponentRef.instance.data = { component: contentComponent, data }
    popupComponentRef.instance.popupSettings = popupSettings
    popupComponentRef.instance.onClose.subscribe((returnData: any) => this.close(returnData))

    this.componentRef = popupComponentRef;

    return {
      instance: popupComponentRef.instance,
      close: (returnData: any) => this.close(returnData),
      onClose: this.onCloseSubject.asObservable()
    }
  }

  private close(returnData: any = null) {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.onCloseSubject.next(returnData);
    this.onCloseSubject.complete();
  }
}
