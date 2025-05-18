'use client';

import React, { ReactNode } from 'react';
import { Grid, Container, SxProps, Theme } from '@mui/material';

interface GridAppProps {
  children: ReactNode;
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number | 'auto';
  sm?: number | 'auto';
  md?: number | 'auto';
  lg?: number | 'auto';
  xl?: number | 'auto';
  containerProps?: {
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
    disableGutters?: boolean;
    sx?: SxProps<Theme>;
  };
  sx?: SxProps<Theme>;
}

const GridApp: React.FC<GridAppProps> = ({
  children,
  container = false,
  item = false,
  spacing = 0,
  xs,
  sm,
  md,
  lg,
  xl,
  containerProps,
  sx,
}) => {
  const gridContent = (
    <Grid
      container={container}
      item={item}
      spacing={spacing}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      sx={sx}
    >
      {children}
    </Grid>
  );

  if (container && containerProps) {
    return (
      <Container
        maxWidth={containerProps.maxWidth}
        disableGutters={containerProps.disableGutters}
        sx={containerProps.sx}
      >
        {gridContent}
      </Container>
    );
  }

  return gridContent;
};

export default GridApp; 