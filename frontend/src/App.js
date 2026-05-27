import './App.css';
import { PipelineToolbar } from './components/Toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './components/SubmitButton';

function App() {
  return (
    <div className="app">
      <PipelineToolbar />
      <div className="app-main">
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
