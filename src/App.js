import { Box } from '@mui/material';
import Common from './components/Common';
import words from './words.json';

function App() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Common words={words}/>
    </Box>
  );
}

export default App;
