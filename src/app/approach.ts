import { Component } from '@angular/core';
@Component({
  selector: 'nexo-approach',
  templateUrl: './approach.html',
  styleUrl: './approach.scss',
})
export class Approach {
  readonly steps = [
    {
      title: 'Entender o contexto',
      text: 'Conversamos sobre sua operação, seus objetivos e as ferramentas que você já usa.',
    },
    {
      title: 'Definir o caminho',
      text: 'Alinhamos prioridades, entregáveis, dependências, prazo e investimento antes de construir.',
    },
    {
      title: 'Construir com clareza',
      text: 'Organizamos entregas e validações para que sua equipe acompanhe as decisões do projeto.',
    },
    {
      title: 'Preparar a evolução',
      text: 'Documentamos a solução e avaliamos novos passos quando eles fizerem sentido para o negócio.',
    },
  ];
}
