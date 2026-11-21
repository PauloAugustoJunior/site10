import { TestBed } from '@angular/core/testing';
import { Briefing } from './briefing';

describe('Briefing local Nexo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Briefing] }).compileComponents();
  });
  const valid = {
    business: 'Projeto de demonstração',
    service: 'automacao',
    goal: 'Organizar solicitações e integrar as ferramentas da equipe.',
    timing: 'Estou explorando possibilidades',
  };
  it('rejeita conteúdo vazio ou formado apenas por espaços e indica o primeiro campo', async () => {
    const fixture = TestBed.createComponent(Briefing);
    await fixture.whenStable();
    fixture.componentInstance.model.set({ ...valid, business: '  ', goal: '  ' });
    await fixture.whenStable();
    fixture.componentInstance.generate(new Event('submit'));
    await fixture.whenStable();
    expect(fixture.componentInstance.result()).toBe('');
    expect((fixture.nativeElement as HTMLElement).querySelector('#business-error')).not.toBeNull();
    expect(document.activeElement?.id).toBe('brief-business');
  });
  it('prepara um documento sem alegar envio e invalida texto e ações ao editar', async () => {
    const fixture = TestBed.createComponent(Briefing);
    await fixture.whenStable();
    const component = fixture.componentInstance;
    component.model.set(valid);
    await fixture.whenStable();
    component.generate(new Event('submit'));
    await fixture.whenStable();
    expect(component.result()).toContain('Briefing de projeto | Nexo');
    expect(component.result()).toContain('Nenhuma informação foi enviada');
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.result pre')?.textContent,
    ).toContain(valid.goal);
    component.model.update((value) => ({
      ...value,
      goal: 'Outro objetivo com informações diferentes para planejar.',
    }));
    expect(component.result()).toBe('');
    expect(component.feedback()).toBe('');
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('.result')).toBeNull();
  });
  it('reaplica o mesmo serviço quando o visitante o solicita novamente', async () => {
    const fixture = TestBed.createComponent(Briefing);
    fixture.componentRef.setInput('request', { service: 'ia', token: 1 });
    await fixture.whenStable();
    expect(fixture.componentInstance.model().service).toBe('ia');
    fixture.componentInstance.model.update((value) => ({ ...value, service: 'software' }));
    await fixture.whenStable();
    fixture.componentRef.setInput('request', { service: 'ia', token: 2 });
    await fixture.whenStable();
    expect(
      (fixture.nativeElement as HTMLElement).querySelector<HTMLSelectElement>('#brief-service')
        ?.value,
    ).toBe('ia');
  });
  it('mantém os limites de escopo do texto mesmo quando o modelo é preenchido diretamente', async () => {
    const fixture = TestBed.createComponent(Briefing);
    await fixture.whenStable();
    fixture.componentInstance.model.set({ ...valid, business: 'a'.repeat(121) });
    await fixture.whenStable();
    fixture.componentInstance.generate(new Event('submit'));
    await fixture.whenStable();
    expect(fixture.componentInstance.result()).toBe('');
    expect(fixture.componentInstance.fields.business().invalid()).toBe(true);
  });
  it('oferece alternativa real quando a área de transferência falha', async () => {
    const fixture = TestBed.createComponent(Briefing);
    await fixture.whenStable();
    const component = fixture.componentInstance;
    component.model.set(valid);
    await fixture.whenStable();
    component.generate(new Event('submit'));
    await fixture.whenStable();
    const previous = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('Unavailable')) },
    });
    try {
      await component.copy();
      expect(component.feedback()).toContain('Use Baixar briefing');
      expect(component.result()).toContain(valid.goal);
    } finally {
      if (previous) Object.defineProperty(navigator, 'clipboard', previous);
      else Reflect.deleteProperty(navigator, 'clipboard');
    }
  });
});
