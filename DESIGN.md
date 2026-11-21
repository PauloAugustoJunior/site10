# Nexo — Catálogo corporativo de capacidades

Proposta institucional da mesma empresa brasileira Nexo. Público: empresas e profissionais de diferentes segmentos, com atendimento remoto em todo o Brasil. Objetivo: compreender a solução, explorar o escopo e preparar um briefing.

## Referência inspecionada

[https://coplan.srv.br/](https://coplan.srv.br/), acessada por web e HTML/CSS durante esta execução. A Coplan usa Exo 2, marinho e verde, menu amplo de soluções, hero com vídeo, seções alternadas e catálogo em seletor. A Nexo interpreta a organização do portfólio com índice corporativo e catálogo de sete especialidades, sem serviços de gestão pública, vídeo ou provas sociais copiados.

## Sistema implementado

Hero editorial acompanhado por um índice em três frentes; catálogo com navegação lateral; faixa de arquitetura conectada; apresentação institucional; método em quatro passos; cenários ilustrativos expansíveis; FAQ e briefing local.

Paleta: branco, petróleo #10383d, verde #1c6c4d e amarelo mineral #f3d967. Fonte Public Sans hospedada em `public/fonts`, com licença OFL. Corpo de texto de pelo menos 16px; títulos fluidos; medidas de texto limitadas; foco visível; seleção temática; movimento reduzido respeitado. Os SVGs são geometria autoral.

## Estrutura e comportamento

Componentes Angular standalone, rota inicial lazy, signals para seleção e navegação, `input`/`output` para comunicação e Signal Forms para o briefing. Sem SSR e sem dependências adicionais. O documento gerado depende de um snapshot do formulário; qualquer edição invalida o texto e impede copiar ou baixar uma versão antiga. Uma nova solicitação do mesmo serviço reaplica a seleção no formulário.

## Limites e verdade do conteúdo

Os cenários são ilustrativos e estão identificados. Nenhum cliente, resultado, telefone, endereço, ano de mercado ou certificação foi inventado. Cada serviço pode ser contratado separadamente e a evolução é opcional. Os canais oficiais permanecem `null` em `src/app/data/contact.config.ts`.

O agente designado iniciou a análise, mas foi interrompido por limite de uso da ferramenta; o coordenador concluiu a implementação respeitando esta direção. Não foram feitas screenshots, comparações visuais, deploy ou push.
