import React from 'react';
import { AuthProvider } from './contexts/auth'
import Routers from './settings/Routers'

// import { Container } from './styles';

function App() {

  return(
    <AuthProvider>
      <Routers isAuthenticated={true}/>
    </AuthProvider>
  );

}

export default App;