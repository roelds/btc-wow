import { ThemeProvider } from './context/ThemeContext';
import WalletViewer from './components/WalletViewer';

function App() {
  return (
    <ThemeProvider>
      <WalletViewer />
    </ThemeProvider>
  );
}

export default App;
