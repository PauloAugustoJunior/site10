import { Component, signal, viewChild } from '@angular/core';
import { Header } from './ui/header';
import { Briefing, ServiceRequest } from './ui/briefing';
import { Catalog } from './catalog';
import { Approach } from './approach';
import { SERVICES, ServiceId } from './data/services';
@Component({
  selector: 'nexo-home',
  imports: [Header, Catalog, Approach, Briefing],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly navigation = [
    { label: 'Soluções', href: '#solucoes' },
    { label: 'A Nexo', href: '#empresa' },
    { label: 'Nossa abordagem', href: '#metodo' },
  ];
  readonly services = SERVICES;
  readonly request = signal<ServiceRequest | null>(null);
  private readonly catalog = viewChild(Catalog);
  private sequence = 0;
  explore(id: ServiceId): void {
    this.catalog()?.select(id);
  }
  plan(id: ServiceId): void {
    this.request.set({ service: id, token: ++this.sequence });
  }
}
