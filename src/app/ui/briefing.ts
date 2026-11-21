import { Component, ElementRef, computed, effect, input, signal, viewChild } from '@angular/core';
import { FormField, form, maxLength, required, validate } from '@angular/forms/signals';
import { SERVICES } from '../data/services';
import { CONTACT_CONFIG } from '../data/contact.config';
export interface ServiceRequest {
  readonly service: string;
  readonly token: number;
}
interface BriefingModel {
  business: string;
  service: string;
  goal: string;
  timing: string;
}
@Component({
  selector: 'nexo-briefing',
  imports: [FormField],
  templateUrl: './briefing.html',
  styleUrl: './briefing.scss',
})
export class Briefing {
  readonly request = input<ServiceRequest | null>(null);
  readonly services = SERVICES;
  readonly contacts = CONTACT_CONFIG;
  readonly model = signal<BriefingModel>({
    business: '',
    service: '',
    goal: '',
    timing: 'Estou explorando possibilidades',
  });
  readonly fields = form(this.model, (path) => {
    required(path.business);
    maxLength(path.business, 120);
    validate(path.business, ({ value }) =>
      value().trim().length < 2
        ? { kind: 'business', message: 'Informe ao menos 2 caracteres.' }
        : undefined,
    );
    required(path.goal);
    maxLength(path.goal, 2400);
    validate(path.goal, ({ value }) =>
      value().trim().length < 20
        ? { kind: 'goal', message: 'Descreva seu objetivo em pelo menos 20 caracteres.' }
        : undefined,
    );
  });
  readonly attempted = signal(false);
  private readonly stored = signal<{ snapshot: string; text: string } | null>(null);
  private readonly notification = signal<{ snapshot: string; text: string } | null>(null);
  readonly result = computed(() =>
    this.stored()?.snapshot === JSON.stringify(this.model()) ? (this.stored()?.text ?? '') : '',
  );
  readonly feedback = computed(() =>
    this.notification()?.snapshot === JSON.stringify(this.model())
      ? (this.notification()?.text ?? '')
      : '',
  );
  private readonly element = viewChild<ElementRef<HTMLFormElement>>('formElement');
  private readonly preview = viewChild<ElementRef<HTMLElement>>('preview');
  constructor() {
    effect(() => {
      const request = this.request();
      if (request && this.services.some((service) => service.id === request.service))
        this.model.update((value) => ({ ...value, service: request.service }));
    });
  }
  generate(event: Event): void {
    event.preventDefault();
    this.attempted.set(true);
    if (this.fields().invalid()) {
      this.stored.set(null);
      this.element()
        ?.nativeElement.querySelector<HTMLElement>(
          this.fields.business().invalid() ? '#brief-business' : '#brief-goal',
        )
        ?.focus();
      return;
    }
    const value = this.model();
    const title =
      this.services.find((service) => service.id === value.service)?.title ??
      'A definir com a Nexo';
    const text = [
      'Briefing de projeto | Nexo',
      '',
      `Negócio ou projeto: ${value.business.trim()}`,
      `Solução de interesse: ${title}`,
      `Momento: ${value.timing}`,
      '',
      'O que precisamos resolver:',
      value.goal.trim(),
      '',
      'Documento preparado localmente. Nenhuma informação foi enviada à Nexo.',
      'Compartilhe por um canal oficial quando ele estiver disponível.',
    ].join('\n');
    this.stored.set({ snapshot: JSON.stringify(value), text });
    this.notify('Briefing preparado. Revise o texto e salve uma cópia.');
    setTimeout(() => this.preview()?.nativeElement.focus());
  }
  private notify(text: string): void {
    this.notification.set({ snapshot: JSON.stringify(this.model()), text });
  }
  download(): void {
    const text = this.result();
    if (!text) return;
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'briefing-nexo.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    this.notify('Download iniciado. O arquivo não foi enviado à Nexo.');
  }
  async copy(): Promise<void> {
    const text = this.result();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      this.notify('Briefing copiado. Compartilhe por um canal oficial quando disponível.');
    } catch {
      this.notify(
        'A cópia automática não está disponível. Use Baixar briefing ou selecione o texto para copiar.',
      );
    }
  }
}
