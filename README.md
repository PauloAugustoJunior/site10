# Nexo — Catálogo corporativo de capacidades

Site institucional independente em Angular 22.3.0, TypeScript 6.0.3 e SCSS. Hero editorial acompanhado por um índice em três frentes; catálogo com navegação lateral; faixa de arquitetura conectada; apresentação institucional; método em quatro passos; cenários ilustrativos expansíveis; FAQ e briefing local.

## Executar

Node compatível: `^22.22.3`, `^24.15.0` ou `>=26`. A preparação foi validada com Node 24.22.3 e npm 12.0.2; `.nvmrc` registra a versão. Neste ambiente, o runtime está em `/home/codex/.local/bin`.

```sh
npm ci
npm start
```

Abrir `http://localhost:4210`.

```sh
npm run build -- --configuration production
npm test -- --watch=false
```

Saída de produção: `dist/site10/browser`. Não há SSR nem lint configurado. Nenhuma dependência adicional foi instalada na aplicação.

## Organização

- `src/app/home.*`: composição e conexão entre seções.
- `src/app/data/services.ts`: portfólio tipado.
- `src/app/data/contact.config.ts`: canais oficiais, todos pendentes/null.
- `src/app/ui/header.*`: menu, âncoras e Escape com retorno de foco.
- `src/app/ui/briefing.*`: validação, geração, cópia e download local.
- `src/styles.scss`: tokens, tipografia e acessibilidade.
- `public/fonts`: Public Sans e licença OFL; sem recursos essenciais externos.

O briefing não envia informações nem as armazena em servidor/localStorage. Copiar e baixar só usam a versão atual dos campos. Preencher os canais oficiais e um eventual domínio é trabalho futuro; nenhum destino foi inventado.

## Referência e validação

Referência: [https://coplan.srv.br/](https://coplan.srv.br/). Observações e decisões em `DESIGN.md`. Textos, componentes e SVGs são autorais, com serviços e público da Nexo.

A produção e os 9 testes passaram. Os testes cobrem navegação, destinos das âncoras, seleção de capacidades, integração com briefing, campos inválidos, documento local, invalidação após edição e falha de cópia. O coordenador também verificou, sem screenshots, menu/teclado, conteúdo expansível e axe nos estados desktop, mobile, menu aberto e conteúdo aberto. O resultado consolidado e os logs ficam em `../validacao-sites7-13/`.

Cada pasta mantém seu próprio histórico Git. O workflow `.github/workflows/pages.yml` já existia antes desta missão e foi preservado; nenhuma publicação foi configurada ou executada aqui.
