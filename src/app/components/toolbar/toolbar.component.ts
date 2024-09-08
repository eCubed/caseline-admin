import { AfterViewInit, Component, effect, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { faBars, faBookOpen, faCircleInfo, faHome, faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements AfterViewInit, OnDestroy {

  isShowingMenu = false

  faHome = faHome
  faCircleInfo = faCircleInfo
  faBookOpen = faBookOpen
  faBars = faBars
  faTimes = faTimes
  faRightToBracket = faRightToBracket
  faRightFromBracket = faRightFromBracket

  private overlay!: HTMLDivElement
  //private appRootElement?: Element | null

  private intersectionObserver!: IntersectionObserver

  constructor(public authService: AuthService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document,
              private elementRef: ElementRef
            ){
    this.overlay = document.createElement('div')
    this.overlay.classList.add('overlay')
  }

  ngAfterViewInit(): void {
    this.intersectionObserver = new IntersectionObserver((entries: any) => {
      
      const isIntersecting = (entry: IntersectionObserverEntry) => {
        return entry.isIntersecting //|| entry.intersectionRatio > 0;
      }

      entries.forEach((entry: any) => {
        if (!isIntersecting(entry))
          this.elementRef.nativeElement.classList.add('is-pinned')
        else
          this.elementRef.nativeElement.classList.remove('is-pinned')
      })
      }, { 
          rootMargin: '0px',
          threshold: 1
      })

    this.intersectionObserver.observe(this.document.querySelector("#scroll-trigger")!)
  }

  ngOnDestroy(): void {
    this.intersectionObserver.disconnect()
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/home'])
  }

  toggleShowMenu() {
    this.isShowingMenu = !this.isShowingMenu;
    if (this.isShowingMenu) {
      
      this.document.body.appendChild(this.overlay)
      setTimeout(() => {
        this.overlay.classList.add('is-showing')
      }, 100)

    } else {
      this.overlay.classList.remove('is-showing')
      setTimeout(() => {        
        this.document.body.removeChild(this.overlay)
      }, 500)
    }
  }
  
}
