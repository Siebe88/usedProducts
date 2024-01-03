import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/router';
// import { ApolloProvider } from '@apollo/client';
// import { SnackbarProvider } from 'notistack';
// import { client } from './Common/apollo';
// import Theme from './Theme/Theme';
// import { AuthProvider } from './Providers/AuthProvider';
// import { snackbarConfig } from './Components/Notification';

const App = () => (
  // <ApolloProvider client={client}>
  //   <AuthProvider>
  //     <Theme>
  //       <SnackbarProvider {...snackbarConfig}>
  //         <RouterProvider router={router} />
  //       </SnackbarProvider>
  //     </Theme>
  //   </AuthProvider>
  // </ApolloProvider>
  <RouterProvider router={router} />
);

export default App;
