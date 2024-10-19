import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnHeader',
  standalone: true,
})
export class ColumnHeaderPipe implements PipeTransform {
  private columnMap: { [key: string]: string } = {
    name: 'Jogador',
    position: '#',
    score: 'Pontos',
    winTimes: 'Vitórias',
  };

  transform(value: string): string {
    return this.columnMap[value] || value;
  }
}
