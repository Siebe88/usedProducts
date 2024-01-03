import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

type RootProps = {
  children?: React.ReactNode;
};

export const Component = ({ children }: RootProps) => {
  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        marginTop: 5,
      }}
    >
      {children}
      <Outlet />
    </Container>
  );
};
