import { TestBed } from '@angular/core/testing';
import { Home } from './home';
describe('Institucional Nexo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Home] }).compileComponents();
  });
  it('oferece uma hierarquia principal e destinos válidos para todas as âncoras', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('h1')).toHaveLength(1);
    expect(page.querySelector('main')).not.toBeNull();
    expect(page.querySelector('footer')?.textContent).toContain('Nexo');
    for (const anchor of page.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
      expect(page.querySelector(anchor.getAttribute('href') ?? '#inicio')).not.toBeNull();
  });
  it('abre e fecha navegação, incluindo Escape e retorno de foco', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const toggle = page.querySelector<HTMLButtonElement>('header button');
    toggle?.click();
    await fixture.whenStable();
    expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
    toggle?.click();
    await fixture.whenStable();
    page.querySelector<HTMLAnchorElement>('header nav a')?.click();
    await fixture.whenStable();
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
  });
  it('explora uma especialidade e transporta o interesse até o briefing', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const button = [...page.querySelectorAll<HTMLButtonElement>('nexo-catalog button')].find(
      (item) => item.textContent?.includes('Inteligência artificial'),
    );
    button?.click();
    await fixture.whenStable();
    expect(button?.getAttribute('aria-pressed')).toBe('true');
    expect(page.querySelector('#service-detail h3')?.textContent).toContain('Aplique inteligência');
    page.querySelector<HTMLAnchorElement>('#service-detail a')?.click();
    await fixture.whenStable();
    expect(page.querySelector<HTMLSelectElement>('#brief-service')?.value).toBe('ia');
  });
  it('o índice do hero abre o conteúdo correto do catálogo', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    page.querySelectorAll<HTMLAnchorElement>('.solution-index>a')[2].click();
    await fixture.whenStable();
    expect(page.querySelector('#service-detail .detail-top span')?.textContent).toContain(
      'Dados e analytics',
    );
  });
});
