export interface Service {
  readonly id: string;
  readonly title: string;
  readonly promise: string;
  readonly description: string;
  readonly deliverables: readonly string[];
  readonly example: string;
}
export const SERVICES = [
  {
    id: 'presenca',
    title: 'Presença digital',
    promise: 'Apresente seu negócio com clareza.',
    description:
      'Sites institucionais, landing pages, portais, e-commerce e aplicações web que aproximam sua empresa de quem precisa dela.',
    deliverables: ['Sites e landing pages', 'Portais e e-commerce', 'Aplicações web'],
    example: 'Um catálogo digital pode iniciar um pedido e conectá-lo ao atendimento.',
  },
  {
    id: 'software',
    title: 'Software sob medida',
    promise: 'Uma solução que acompanha sua operação.',
    description:
      'Sistemas e plataformas construídos a partir dos seus processos, com integrações e espaço para evoluir.',
    deliverables: [
      'Sistemas personalizados',
      'Plataformas e aplicativos mobile',
      'Modernização de sistemas',
    ],
    example: 'Um sistema pode reunir solicitações, responsáveis e etapas de trabalho.',
  },
  {
    id: 'ia',
    title: 'Inteligência artificial',
    promise: 'Aplique inteligência onde ela faz diferença.',
    description:
      'Agentes, assistentes e chatbots para apoiar tarefas bem definidas, com contexto e supervisão humana quando necessária.',
    deliverables: ['Agentes e assistentes', 'Chatbots com contexto', 'IA aplicada a processos'],
    example: 'Um assistente pode consultar uma base aprovada e apoiar as respostas da equipe.',
  },
  {
    id: 'automacao',
    title: 'Automações e integrações',
    promise: 'Faça a informação seguir o fluxo.',
    description:
      'Conecte ferramentas, reduza tarefas repetitivas e organize a passagem de informações entre pessoas e sistemas.',
    deliverables: [
      'Automação de processos',
      'APIs e integração de sistemas',
      'WhatsApp e ferramentas corporativas',
    ],
    example:
      'Uma solicitação pode atualizar o sistema e encaminhar o próximo passo ao responsável.',
  },
  {
    id: 'analytics',
    title: 'Dados e analytics',
    promise: 'Enxergue o que orienta suas decisões.',
    description:
      'Dashboards, Business Intelligence e análises que transformam informações dispersas em uma visão útil do negócio.',
    deliverables: ['Dashboards e BI', 'Análise de dados', 'Indicadores de desempenho'],
    example: 'Um painel pode reunir informações de vendas e operação em uma visão compartilhada.',
  },
  {
    id: 'engenharia',
    title: 'Engenharia e ciência de dados',
    promise: 'Prepare uma base consistente para avançar.',
    description:
      'Organize fontes e modelos de dados para análises confiáveis e explore previsões quando houver contexto e dados adequados.',
    deliverables: [
      'Pipelines, ETL e ELT',
      'Integração de fontes e modelagem',
      'Análise preditiva e machine learning',
    ],
    example: 'Dados de diferentes ferramentas podem ser preparados para análise em uma base comum.',
  },
  {
    id: 'consultoria',
    title: 'Consultoria tecnológica',
    promise: 'Defina o próximo passo com critério.',
    description:
      'Diagnóstico, arquitetura de soluções e planejamento para priorizar necessidades e conduzir a transformação digital.',
    deliverables: [
      'Diagnóstico de necessidades',
      'Arquitetura de soluções',
      'Planejamento da transformação digital',
    ],
    example:
      'Um diagnóstico pode organizar prioridades, dependências e critérios de uma primeira entrega.',
  },
] as const satisfies readonly Service[];
export type ServiceId = (typeof SERVICES)[number]['id'];
