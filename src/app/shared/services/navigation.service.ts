import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  #router = inject(Router);
  #previousUrl = '/';
  #currentUrl = '/';

  constructor() {
    this.#previousUrl = sessionStorage.getItem('previousUrl') ?? '/';
    this.#currentUrl = sessionStorage.getItem('currentUrl') ?? '/';

    this.#router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.#previousUrl = this.#currentUrl;
      this.#currentUrl = e.urlAfterRedirects;

      sessionStorage.setItem('previousUrl', this.#previousUrl);
      sessionStorage.setItem('currentUrl', this.#currentUrl);
    });
  }

  back(fallbackUrl?: string) {
    const url = this.#previousUrl !== '/' 
      ? this.#previousUrl
      : fallbackUrl ?? '/';
    this.#router.navigateByUrl(url);
  }

  getPreviousUrl() {
    return this.#previousUrl;
  }
}
