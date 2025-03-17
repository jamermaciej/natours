import { Directive, Input, OnInit, Signal, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { authFeature } from '../data-access/auth/store/auth.state';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective{
  #templateRef = inject(TemplateRef<any>);
  #viewContainerRef = inject(ViewContainerRef);
  #store = inject(Store);

  user: Signal<User | null> = toSignal(this.#store.select(authFeature.selectUser), { initialValue: null});

  @Input()
  set appHasRole(role: string[]) {        
    if (!role || role.some(role => role === this.user()?.role)) {
      this.#viewContainerRef.createEmbeddedView(this.#templateRef);
    } else {
      this.#viewContainerRef.clear();
    }
  }
}
