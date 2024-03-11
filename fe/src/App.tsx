import Translator from './pages/translator';
import Header from './components/header';
import Footer from './components/footer';
import { FlexColumnBetween } from './components/styled/FlexContainer';
import type { FC } from 'react';

const App: FC = () => {
  return (
    <FlexColumnBetween sx={{ minHeight: '100vh' }}>
      <Header />
      <Translator />
      <Footer />
    </FlexColumnBetween>
  );
};

export default App;
