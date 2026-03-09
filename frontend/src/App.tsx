import { TicTacToeGame } from './features/tictactoe/TicTacToeGame';
import { AppShell } from './features/layout/AppShell';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppShell>
        <TicTacToeGame />
      </AppShell>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
