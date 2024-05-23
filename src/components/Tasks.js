import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const Tasks = ({ words }) => {
  const [currentWord, setCurrentWord] = useState(null);
  const [randomWords, setRandomWords] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    getRandomWords();
  }, []);

  const getRandomWords = () => {
    const shuffledWords = _.shuffle(words);
    const current = _.sample(shuffledWords);
    setCurrentWord(current);

    const remainingWords = shuffledWords.filter(word => word !== current);
    const randomWordsSelection = _.sampleSize(remainingWords, 4);
    randomWordsSelection.push(current); // Ensure the current word's translation is included
    setRandomWords(_.shuffle(randomWordsSelection));
    setSelectedTranslation('');
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleNext = () => {
    getRandomWords();
  };

  if (!currentWord) {
    return null;
  }

  return (
    <Box
      sx={{
        minWidth: {
          md: '60%',
          sm: 'auto',
        }
      }}
    >
      <Typography variant="h3" mb="1rem">
        {currentWord.word}
      </Typography>
      <Typography variant="h5" mb="2rem">
        Пример: {currentWord.example}
      </Typography>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel id="translation-radio-group-label">Выберите перевод:</FormLabel>
        <RadioGroup
          aria-labelledby="translation-radio-group-label"
          name="translation-radio-group"
          value={selectedTranslation}
          onChange={(e) => setSelectedTranslation(e.target.value)}
        >
          {randomWords.map((word, index) => (
            <FormControlLabel
              key={index}
              value={word.translation}
              control={<Radio/>}
              label={word.translation}
              disabled={isSubmitted}
              sx={{
                '.Mui-disabled': {
                  color: isSubmitted
                    ? word.translation === currentWord.translation
                      ? 'green !important'
                      : selectedTranslation === word.translation
                        ? 'red !important'
                        : 'inherit'
                    : 'inherit',
                },
                '& .MuiRadio-root': {
                  color: isSubmitted
                    ? word.translation === currentWord.translation
                      ? 'green'
                      : selectedTranslation === word.translation
                        ? 'red'
                        : 'default'
                    : 'default',
                },
              }}
            />
          ))}
        </RadioGroup>
        {!isSubmitted && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedTranslation}
            sx={{ marginTop: '2rem', width: '100%' }}
          >
            Проверить
          </Button>
        )}
        {isSubmitted && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{ marginTop: '2rem', width: '100%' }}
          >
            Дальше
          </Button>
        )}
      </FormControl>
    </Box>
  );
};

export default Tasks;
