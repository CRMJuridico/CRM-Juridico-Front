import { useEffect } from 'react';
import { IconItemMenu, propsItemSidebar, TextItemMenu } from './IconItemMenu';
import { Box, ButtonBase } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { isActiveMenu } from '@/hooks/UseConfigItensSideBar';

interface propsItemSidebarAberto extends propsItemSidebar {
  menuAberto: boolean;
  setIsDrag: (isDrag: boolean) => void;
}

export function ItemSidebarAberto(props: propsItemSidebarAberto) {
  const temFilhos = props.menu.filhos && props.menu.filhos.length > 0;

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '35px',
        overflowX: 'hidden',
        overflowY: 'hidden',
        position: 'relative',
        backgroundPositionX: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundPositionX: '20px',
        }}
      >
        <ButtonBase
          onClick={() => {
            props.open(props.menu.id);
            if (!props.menu.readonly) {
              props.navigate(props.menu.caminho || '');
            }
          }}
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            position: 'relative',
            borderLeft: !props.openSidebar
              ? undefined
              : props.menuAberto
              ? temFilhos
                ? undefined
                : props.border
              : props.border,
            '&:hover': {
              backgroundColor: props.corhover,
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              gap: '.8rem',
              px: 1,
              background: isActiveMenu(props.menu.caminho)
                ? props.itemMenuAtivoBackground
                : undefined,
              borderRadius: props.borderRaidus,
            }}
          >
            <IconItemMenu
              isOpen={false}
              color={props.handleColorItens(props.menu)}
              icone={props.menu.icone}
            />
            <TextItemMenu
              cor={props.handleColorItens(props.menu)}
              titulo={props.menu.nome}
              fontWeight={isActiveMenu(props.menu.caminho) ? 600 : undefined}
            />
          </Box>
          {props.menu.filhos && props.menu.filhos.length > 0 && (
            <IconItemMenu
              isOpen={props.menuAberto}
              color={props.handleColorItens(props.menu)}
              icone={<ChevronRightIcon />}
            />
          )}
        </ButtonBase>
      </div>
    </li>
  );
} 