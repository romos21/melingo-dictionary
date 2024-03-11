import { type FC, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Textarea from '../../components/textarea';
import TranslationCard from '../../components/translations-card';

const Translator: FC = () => {
  const [termValue, setTermValue] = useState<string>('');

  return (
    <Grid component="section" container sx={{ maxWidth: '90vw', mb: 8 }} rowSpacing={4} columnSpacing={4}>
      <Grid component="section" item xs={12} sm={12} md={6}>
        <Typography variant="h6">English (UK) &#127468;&#127463;</Typography>
        <Textarea value={termValue} setValue={setTermValue} copyMode pronounceMode clearMode voiceMode />
      </Grid>
      <Grid component="section" item xs={12} sm={12} md={6}>
        <TranslationCard value={termValue} />
      </Grid>
    </Grid>
  );
};

export default Translator;
