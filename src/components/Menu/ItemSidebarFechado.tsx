import { Box } from '@mui/material';
import { IconItemMenu, propsItemSidebar, TextItemMenu } from './IconItemMenu';
import { isActiveMenu } from '@/hooks/UseConfigItensSideBar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export function ItemSidebarFechado(props: propsItemSidebar) {
  const ativo = props.menuFechadoAberto === props.menu.id;

  return (
    <>
      <li
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '45px',
          padding: '2px',
          boxSizing: 'content-box',
          overflow: 'hidden',
          background: ativo ? props.itemMenuAtivoBackground : undefined,
          borderRadius: props.borderRaidus,
          position: 'relative',
          flexDirection: 'column',
          marginTop: '5px',
          cursor: 'pointer',
        }}
        onClick={() => {
          if (props.menu.caminho && !props.menu.readonly) {
            props.navigate(props.menu.caminho);
          }
        }}
        onMouseEnter={() => {
          if (props.abrirMenuFechado) {
            props.abrirMenuFechado(props.menu.id);
          }
        }}
      >
        <IconItemMenu
          isOpen={false}
          color={ativo ? props.corPrimaria : props.corIcone}
          icone={props.menu.icone}
        />
        <TextItemMenu
          maxWidth="65px"
          cor={ativo ? props.corPrimaria : props.handleColorItens(props.menu)}
          titulo={props.menu.nome}
          fontSize="10px"
          fontWeight={ativo ? 600 : undefined}
        />
      </li>
      {props.menu.filhos && props.menu.filhos.length > 0 && ativo && (
        <Box
          sx={{
            position: 'absolute',
            left: '70px',
            borderRadius: props.borderRaidus,
            zIndex: 1100,
            backgroundColor: props.backGroundColorMenuFechado,
            boxShadow: props.shadow,
            p: 1,
            minWidth: '200px',
          }}
        >
          {props.menu.filhos.map((filho) => (
            <Box
              key={filho.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: props.borderRaidus,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: props.corhover,
                },
              }}
              onClick={() => {
                if (!filho.readonly) {
                  props.navigate(filho.caminho || '');
                }
              }}
              onMouseEnter={() => {
                if (props.abrirMenuFilhoFechado) {
                  props.abrirMenuFilhoFechado(filho.id);
                }
              }}
            >
              <IconItemMenu
                isOpen={false}
                color={props.handleColorItens(filho)}
                icone={filho.icone}
              />
              <Box sx={{ ml: 1 }}>
                <TextItemMenu
                  cor={props.handleColorItens(filho)}
                  titulo={filho.nome}
                />
              </Box>
              {filho.filhos && filho.filhos.length > 0 && (
                <IconItemMenu
                  isOpen={false}
                  color={props.handleColorItens(filho)}
                  icone={<ChevronRightIcon />}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
} 