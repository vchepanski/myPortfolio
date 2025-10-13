export type Project = {
  slug: string;
  title: string;
  stack: string[];
  summary: string;
  type: 'work' | 'personal';
  year: string;
  /** cor opcional do card */
  tone?: 'red' | 'green' | 'violet' | 'amber' | 'cyan';
};

export const projects: Project[] = [
  {
    slug: 'erp-logistico',
    title: 'Desenvolvedor Web (case do trabalho)',
    stack: ['Laravel', 'SQL Server', 'Blade/JS'],
    summary: 'Responsável por corrigir bugs em produção, otimizar queries críticas e entregar novas features. Atuo integrado aos núcleos de Logística e Comercial, acompanhando cada etapa do fluxo.',
    type: 'work',
    year: 'Atual',
    tone: 'red', // card vermelho
  },
  {
    slug: 'infra-analista',
    title: 'Analista de Infraestrutura',
    stack: ['Windows Server', 'Active Directory', 'Suporte'],
    summary: 'Responsável por manter a rede estável, corrigir bugs no banco em produção e acompanhar processos críticos.',
    type: 'work',
    year: '2023',
    tone: 'red', // card vermelho
  },
  {
    slug: 'myportfolio',
    title: 'Meu Portfólio',
    stack: ['Astro', 'Tailwind'],
    summary: 'Site estático focado em SEO e cases técnicos.',
    type: 'personal',
    year: '2025',
    tone: 'green', // card verde
  },
  {
    slug: 'vandeco-financas',
    title: 'Vandeco Finanças',
    stack: ['Laravel API', 'Vue 3'],
    summary: 'Dashboard com categorias, cores dinâmicas e filtro por mês/ano.',
    type: 'personal',
    year: '2024',
    tone: 'green', // card verde
  },
  {
    slug: 'taskflow',
    title: 'TaskFlow',
    stack: ['Laravel', 'Blade', 'Bootstrap', 'JavaScript'],
    summary: 'Aplicação web de gerenciamento de tarefas com notificações em tempo real e colaboração em equipe. Cada atividade fica organizada por usuário e contexto, mantendo o time alinhado.',
    type: 'personal',
    year: '2023',
    tone: 'green', // card verde
  },
];
