import './App.css';
import SignIn from './components/SignIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
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
      <SignIn />    
    </ThemeProvider>
  );
}

export default App;
