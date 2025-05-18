import { Typography } from '@mui/material';
import { IMenuBludata } from '@/interfaces/Menu';
import { ReactElement, cloneElement } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface propsItemSidebar {
  menu: IMenuBludata;
  isOpen: (id?: number) => boolean;
  open: (id: number) => void;
  marginLeft: number;
  corhover: string;
  borderRaidus: string;
  openSidebar: boolean;
  navigate: (path: string) => void;
  corPrimaria: string;
  handleColorItens: (menu: IMenuBludata) => string;
  menuFechadoAberto?: number;
  abrirMenuFechado?: (id: number) => void;
  menuFilhoFechadoAberto?: number;
  abrirMenuFilhoFechado?: (id: number) => void;
  naoEPrimeiroMenu?: boolean;
  itemMenuAtivoBackground: string;
  shadow: string;
  backGroundColorMenuFechado: string;
  corBorda: string;
  naoTemAfter?: boolean;
  corIcone: string;
  border?: string;
  borderBottom?: string;
  setIsDrag?: (isDrag: boolean) => void;
}

interface IconItemMenuProps {
  isOpen: boolean;
  color: string;
  icone?: ReactElement | string;
}

interface TextItemMenuProps {
  cor: string;
  titulo: string;
  maxWidth?: string;
  fontSize?: string;
  fontWeight?: number;
}

export function IconItemMenu({ isOpen, color, icone }: IconItemMenuProps) {
  const renderIcon = () => {
    if (!icone) return null;
    if (typeof icone === 'string') {
      // Se for uma string, assumimos que é um ícone de seta
      return <ChevronRightIcon />;
    }
    // Se for um elemento React, clonamos com a cor apropriada
    return cloneElement(icone, { sx: { color } });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '24px',
        minHeight: '24px',
        color: color,
        transform: isOpen ? 'rotate(180deg)' : undefined,
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      {renderIcon()}
    </div>
  );
}

export function TextItemMenu({
  cor,
  titulo,
  maxWidth = '150px',
  fontSize = '14px',
  fontWeight,
}: TextItemMenuProps) {
  return (
    <Typography
      sx={{
        color: cor,
        fontSize: fontSize,
        fontWeight: fontWeight || 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: maxWidth,
        '&:hover': {
          whiteSpace: 'normal',
          overflow: 'visible',
        },
      }}
    >
      {titulo}
    </Typography>
  );
} 