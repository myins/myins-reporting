import SignIn from './components/SignIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Header from './components/Header';
import Audiences from './components/Audiences';
import Network from './components/Network';
import Content from './components/Content';
import HeaderBody from './components/HeaderBody';
import { CookiesProvider } from 'react-cookie';
import { PeriodProvider } from './contexts/PeriodContext';
import { useState } from 'react';
import useDataCookie from './contexts/DataCookie';

function App() {
  const { dataCookie } = useDataCookie();
  const [isLogged, setIsLogged] = useState(!!dataCookie.user)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ECAB14',
        contrastText: '#FFFFFF'
      }
    },
  });

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <PeriodProvider>
          <BrowserRouter>
            {isLogged && 
              <>
                <Header setIsLogged={setIsLogged} />
                <HeaderBody />
              </>
            }
            <Routes>
              {isLogged ?
                <>
                  <Route path='/' exact element={<Audiences />} />
                  <Route path='/network' element={<Network />} />
                  <Route path='/content' element={<Content />} />
                </>
                :
                <Route path='/' exact element={<SignIn setIsLogged={setIsLogged} />} />
              }
            </Routes>
          </BrowserRouter>
        </PeriodProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
