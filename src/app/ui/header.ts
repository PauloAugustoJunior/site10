import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
export interface NavigationLink { readonly label: string; readonly href: string; }
@Component({
  selector: 'nexo-header', templateUrl: './header.html', styleUrl: './header.scss',
  host: { '(document:keydown.escape)': 'close(true)' },
})
export class Header {
  readonly links = input.required<readonly NavigationLink[]>();
  readonly open = signal(false);
  private readonly toggle = viewChild<ElementRef<HTMLButtonElement>>('toggle');
  close(restoreFocus = false): void {
    if (!this.open()) return;
    this.open.set(false);
    if (restoreFocus) this.toggle()?.nativeElement.focus();
  }
}
