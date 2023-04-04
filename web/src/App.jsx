import React from 'react';
import { AuthProvider } from './contexts/auth'
import Routers from './settings/Routers'
import { GlobalOrder } from './contexts/OrderContext';

// import { Container } from './styles';

function App() {
  return(
    <AuthProvider>
        <GlobalOrder>
          <Routers isAuthenticated={true}/>
        </GlobalOrder>

    </AuthProvider>
  );

}

export default App;