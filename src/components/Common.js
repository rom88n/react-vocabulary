import React, { useState } from 'react';
import { Paper, Button } from '@mui/material';
import Tasks from './Tasks';

const Common = ({ words }) => {
  const [started, setStarted] = useState(false);
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '1rem',
        minWidth: {
          xs: '100vw',
          sm: '60rem',
        },
        minHeight: '30rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {started ? (
        <Tasks words={words}/>
      ) : (
        <Button
          variant="outlined"
          sx={{
            maxWidth: '16rem',
          }}
          onClick={() => setStarted(true)}
        >
          Начать тест
        </Button>
      )}
    </Paper>
  );
};

export default Common;
