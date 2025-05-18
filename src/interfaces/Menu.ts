import { ReactElement } from 'react';

export interface IMenuBludata {
  id: number;
  nome: string;
  caminho?: string;
  icone?: ReactElement | string;
  readonly?: boolean;
  filhos?: IMenuBludata[];
  isDrag?: boolean;
} 