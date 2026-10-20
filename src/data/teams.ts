/**
 * Equipes formadas para o Hackathon 2026.
 * Fonte: "Hackathon_2026_Equipes_e_Desafios.pdf" da coordenação (abertura do evento, 19/10/2026).
 *
 * `challenge` é o número do desafio no edital (ver challenges.ts).
 * `members[0]` é o líder quando `hasLeader` é true (equipes formadas pelos alunos).
 * `provisional`: equipe montada pela organização, com nome provisório ("Grupo 1" a "Grupo 4");
 * quando a equipe escolher um nome, troque `name` e tire `provisional`.
 */

export interface Team {
  name: string;
  challenge: number;
  members: string[];
  hasLeader: boolean;
  provisional?: boolean;
}

export const teams: Team[] = [
  { name: 'Ctrl z', challenge: 1, hasLeader: true, members: ['Felipe de Assumpção Amaral Ponte', 'Mateus Rossi Farias', 'Anthony Gomes de Abreu', 'Adam Matos Pimenta', 'Kaio da Silva Rocha'] },
  { name: 'Winx', challenge: 1, hasLeader: true, members: ['Lucas Rafael Silva', 'Perroni Mendes Junior', 'João Pedro Aguiar Fabrício', 'João Pedro Pereira Roza'] },
  { name: 'Grupo 1', challenge: 1, hasLeader: false, provisional: true, members: ['Victor Hugo Reis Alves', 'Sérgio Murilo Nogueira', 'Pedro Henrique da Conceição Francisco', 'Gabriel Mario da Cunha Tamburro'] },

  { name: 'Fortinaticos', challenge: 2, hasLeader: true, members: ['Ravi Carlos Diano da Costa e Dias da Fonseca', 'Marcos Gabriel Sales Pires', 'Raphaela Tamara Zille dos Reis', 'Matheus Duarte Louredo da Costa', 'Brenno Fernandes de Aragao'] },
  { name: 'SCV Technologies', challenge: 2, hasLeader: true, members: ['Ana Clara Moledo Neves', 'Daniel Alvarez Gonçalves', 'Victor Bernardo Tatagiba'] },
  { name: 'Grupo 2', challenge: 2, hasLeader: false, provisional: true, members: ['Luiz Otavio Athayde Nogueira', 'Vitor Amparo da Silva', 'Carlos Eduardo Oliveira de Melo', 'Bruno Pepe Babo'] },

  { name: 'Lord of the Strings', challenge: 7, hasLeader: true, members: ['Guilherme Viana Ramos Mello', 'Gabriel Silva Santana', 'Thiago de Mattos Azevedo Chaves', 'José Felipe de Mattos Alves', 'Lucas Oliveira Mendes de Marins'] },

  { name: 'OVERCLOCK', challenge: 8, hasLeader: true, members: ['Sara Gonçalves Pereira', 'Daniel Cardoso da Silva', 'Marlon da Silva Machado', 'Eveli Azevedo de Oliveira Lima'] },

  { name: 'Byte Club', challenge: 9, hasLeader: true, members: ['Gabriel Teixeira de Faria', 'Carolinni Victória Pereira Conceição', 'Davi Rodrigues Salvaya', 'Igor de Oliveira Barata', 'Ana Carolina Mendes de Sousa Silva'] },
  { name: 'Equipe Cão!', challenge: 9, hasLeader: true, members: ['Danilo Lorran da Conceição Nascimento', 'Andreolly de Paulo Duarte', 'Raphaela Corrêa Cavalcanti'] },
  { name: 'Jovens Mentes', challenge: 9, hasLeader: true, members: ['Ana Victória da Silva Neves', 'Jean Pierre Rodrigues Teodoro', 'João Pedro Pereira Bronisio', 'Dayany Sales Pires', 'João Pedro Alves de Souza'] },
  { name: 'Kapitech', challenge: 9, hasLeader: true, members: ['Amanda Nick de Oliveira Caldas', 'Luana de Pinho Zenha', 'Bruno Barral Palmeira da Silva', 'Renan da Silva Monteiro'] },
  { name: 'Grupo 3', challenge: 9, hasLeader: false, provisional: true, members: ['Davi Mello Justino', 'Lorena Thevenard Senra', 'Rafael de Lima dos Santos', 'Pedro Otavio Andrade de Almeida', 'Eduardo Felipe Rocha Agapito'] },

  { name: 'EOF', challenge: 10, hasLeader: true, members: ['Francisco Ramon da Silva Pinto', 'Eduardo Pimenta de Carvalho', 'Vinicius Fioravante Galvão'] },
  { name: 'Triângulo', challenge: 10, hasLeader: true, members: ['Isabela de Jesus Rodrigues', 'Luis Otavio Falleiro Quintanilha', 'Ana Luiza Nascimento Scandian'] },

  { name: 'Grupo 4', challenge: 11, hasLeader: false, provisional: true, members: ['Gabriel Velasco Leonel', 'Paulo Alain de Moura Querette', 'Eduardo Francisco Silveira Passos', 'Daniel Vitor', 'Manuel Duarte'] },
];

/** Como a organização formou as equipes de quem se inscreveu sem grupo (texto do PDF). */
export const formationNote =
  'Quem se inscreveu sem equipe foi agrupado pela opção de desafio: primeiro a 1ª opção de cada aluno, depois a 2ª e, por último, a 3ª. Os nomes "Grupo 1" a "Grupo 4" são provisórios, e cada equipe pode escolher o seu.';
