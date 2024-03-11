import type { FC } from 'react';
import { Collapse, Card, Divider, LinearProgress, Typography } from '@mui/material';
import type { ITranslationsResponse } from '../../types';
import useGetTranslationsQuery from '../../hooks/useLazyGetTranslationsQuery';
import Textarea from '../textarea';

interface ITranslationsListProps {
  value: string;
}

const TranslationCard: FC<ITranslationsListProps> = ({ value }) => {
  const { isLoading, data } = useGetTranslationsQuery<string, ITranslationsResponse>(value);

  return (
    <Card
      component="section"
      sx={{
        background: 'none',
        backgroundImage: 'none',
        boxShadow: 'none',
        border: 'none',
      }}
    >
      <Typography variant="h6" sx={{ position: 'relative' }}>
        Español &#127466;&#127480;
        {isLoading && <LinearProgress sx={{ position: 'absolute', left: 0, right: 0, bottom: -4 }} />}
      </Typography>
      <Textarea id="translation-textarea" value={data?.translation ?? value} disabled copyMode pronounceMode />
      <Collapse in={!!(value && data?.examples)} sx={{ mt: 1 }}>
        <Typography variant="h6">{data?.name}</Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        {!!data?.examples?.length &&
          data.examples.map((example) => (
            <div
              key={example}
              dangerouslySetInnerHTML={{
                __html: example,
              }}
            />
          ))}
      </Collapse>
    </Card>
  );
};

export default TranslationCard;
