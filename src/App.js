import SignIn from './components/SignIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Audiences from './components/Audiences';
import Network from './components/Network';
import Content from './components/Content';
import HeaderBody from './components/HeaderBody';

function App() {
  const [isLogged, setIsLogged] = useState(true)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ECAB14',
        contrastText: '#FFFFFF'
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
