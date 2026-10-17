/**
 * Desafios, níveis e critérios de avaliação.
 * Fonte: Edital nº 002/2026 (itens 6, 9.3, 9.4 e 9.7).
 */

export type Level = 'basico' | 'intermediario' | 'avancado';
export type Category = 'software' | 'iot';

export interface Challenge {
  /** Número oficial do edital (usado na inscrição, que pede 3 desafios em ordem de preferência). */
  n: number;
  title: string;
  area: string;
  category: Category;
  level: Level;
  /** Resumo de uma linha, tirado das demandas do edital. */
  summary: string;
}

export const levels: Record<Level, { label: string; rank: 1 | 2 | 3 }> = {
  basico: { label: 'Básico', rank: 1 },
  intermediario: { label: 'Intermediário', rank: 2 },
  avancado: { label: 'Avançado', rank: 3 },
};

export const categories: Record<Category, { label: string; note: string }> = {
  software: {
    label: 'Categoria Software',
    note: 'Aplicativos, sistemas web e jogos.',
  },
  iot: {
    label: 'Categoria IoT',
    note: 'Com kit de ESP32 e sensores emprestado pela universidade, devolvido ao fim do evento.',
  },
};

export const challenges: Challenge[] = [
  { n: 1, title: 'Mobilidade Urbana em Maricá', area: 'Cidade, mapas e algoritmos', category: 'software', level: 'intermediario', summary: 'Rotas pela cidade num mapa real, com trânsito simulado e dados demográficos de Maricá.' },
  { n: 2, title: 'Comunicação Segura: Enigma × Criptografia Moderna', area: 'Segurança da informação', category: 'software', level: 'avancado', summary: 'Máquina Enigma virtual que troca mensagens por QR Code, comparada com a criptografia atual.' },
  { n: 3, title: 'Monitoramento Remoto de Pacientes', area: 'IoT · Saúde', category: 'iot', level: 'avancado', summary: 'Sinais vitais, detecção de queda e alertas para a família ou a enfermagem.' },
  { n: 4, title: 'Horta Inteligente', area: 'IoT · Agricultura', category: 'iot', level: 'intermediario', summary: 'Umidade do solo e irrigação automática por regra, com histórico por canteiro.' },
  { n: 5, title: 'Monitoramento Inteligente de Ambientes', area: 'IoT · Segurança', category: 'iot', level: 'intermediario', summary: 'Presença, portas, fumaça e gás, com modo armado pelo app e notificações.' },
  { n: 6, title: 'Monitoramento de Desempenho Esportivo', area: 'IoT · Educação Física', category: 'iot', level: 'intermediario', summary: 'Vestível com frequência cardíaca, zonas de treino e painel da turma em tempo real.' },
  { n: 7, title: 'Cuidado Inteligente de Animais', area: 'IoT · Pet', category: 'iot', level: 'intermediario', summary: 'Alimentador automático por peso, nível de água e alertas para o tutor.' },
  { n: 8, title: 'Qualidade da Água da Lagoa de Maricá', area: 'IoT · Meio ambiente', category: 'iot', level: 'avancado', summary: 'Turbidímetro ou espectrofotômetro de baixo custo, com calibração e mapa dos pontos de coleta.' },
  { n: 9, title: 'Serious Game Educativo', area: 'Jogos digitais', category: 'software', level: 'intermediario', summary: 'Jogo com objetivo educativo, progresso salvo e ranking.' },
  { n: 10, title: 'Economia Local: Vitrine Digital da Moeda Social', area: 'Comércio local e gestão', category: 'software', level: 'basico', summary: 'Vitrine e mapa do comércio que aceita a moeda social, com área do comerciante.' },
  { n: 11, title: 'Acessibilidade Digital', area: 'Inclusão', category: 'software', level: 'intermediario', summary: 'Auditor de acessibilidade de sites ou app de apoio a pessoas com deficiência.' },
];

export const levelNote =
  'A indicação de nível é só uma orientação: equipes com mais estudantes dos períodos iniciais devem priorizar desafios Básico ou Intermediário, mas qualquer equipe pode escolher qualquer desafio.';

/** Critérios da banca: nota de 0 a 10 em cada um, ponderada pelo peso (item 9.3). */
export const criteria: { name: string; weight: number; detail: string }[] = [
  { name: 'Solução do desafio', weight: 20, detail: 'Demandas e entregável mínimo atendidos, com a regra central implementada.' },
  { name: 'Domínio técnico e arquitetura', weight: 20, detail: 'A equipe explica com segurança a arquitetura na arguição técnica.' },
  { name: 'Funcionalidade', weight: 20, detail: 'O protótipo funciona na demonstração ao vivo, sem falhas críticas.' },
  { name: 'Qualidade de engenharia', weight: 15, detail: 'Código organizado, histórico de commits, README, tratamento de erros, segurança e testes.' },
  { name: 'Apresentação e experiência do usuário', weight: 15, detail: 'Clareza do pitch e qualidade da interface.' },
  { name: 'Inovação e impacto', weight: 10, detail: 'Criatividade, diferenciais implementados e potencial de uso real.' },
];

export const tieBreakNote =
  'Em caso de empate, vence a maior nota em domínio técnico e arquitetura, depois em solução do desafio e, por fim, em funcionalidade.';
