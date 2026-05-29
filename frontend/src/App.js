import './App.css';
import { PipelineToolbar } from './components/Toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './components/SubmitButton';

import { Modal } from './components/Modal';

function App() {
  return (
    <div className="app">
      <PipelineToolbar />
      <div className="app-main">
        <PipelineUI />
        <SubmitButton />
        <Modal />
      </div>
    </div>
  );
}

export default App;
