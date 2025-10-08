import StycoBotMetrics from './components/StycoBotMetrics';
import Title from './components/Title';

const TITLE_INFORMATION = {
  title: 'StycoBot Metrics',
  subtitle: 'Metrics that will come in from StycoBot. These are currently placeholders.'
}

function App() {
  return (
    <div className="App">
      <Title title={TITLE_INFORMATION.title} subtitle={TITLE_INFORMATION.subtitle} />
      <StycoBotMetrics />
    </div>
  );
}

export default App;