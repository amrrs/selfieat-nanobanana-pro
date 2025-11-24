import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Generator from './components/Generator';

function App() {
  const [showGenerator, setShowGenerator] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans antialiased">
      {showGenerator ? (
        <Generator onBack={() => setShowGenerator(false)} />
      ) : (
        <LandingPage onStart={() => setShowGenerator(true)} />
      )}
    </div>
  );
}

export default App;
