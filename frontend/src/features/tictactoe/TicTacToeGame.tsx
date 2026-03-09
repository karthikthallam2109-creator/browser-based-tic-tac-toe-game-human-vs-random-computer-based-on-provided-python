import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TicTacToeBoard } from './TicTacToeBoard';
import {
  initializeBoard,
  applyHumanMove,
  makeComputerMove,
  getGameStatus,
  isCellFree,
  Board,
  GameStatus,
} from './gameLogic';
import { RotateCcw } from 'lucide-react';

export function TicTacToeGame() {
  const [board, setBoard] = useState<Board>(initializeBoard());
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [isComputerTurn, setIsComputerTurn] = useState(false);

  // Check game status whenever board changes
  useEffect(() => {
    const status = getGameStatus(board);
    setGameStatus(status);
  }, [board]);

  // Handle computer move after human move
  useEffect(() => {
    if (isComputerTurn && gameStatus === 'playing') {
      // Small delay to make computer move visible
      const timer = setTimeout(() => {
        const newBoard = makeComputerMove(board);
        setBoard(newBoard);
        setIsComputerTurn(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComputerTurn, board, gameStatus]);

  const handleCellClick = (cellNumber: number) => {
    if (gameStatus !== 'playing' || isComputerTurn) return;
    
    if (!isCellFree(board, cellNumber)) {
      return;
    }

    // Apply human move
    const newBoard = applyHumanMove(board, cellNumber);
    setBoard(newBoard);
    
    // Trigger computer turn
    setIsComputerTurn(true);
  };

  const handleNewGame = () => {
    setBoard(initializeBoard());
    setGameStatus('playing');
    setIsComputerTurn(false);
  };

  const getStatusMessage = () => {
    if (gameStatus === 'human-won') return 'You won!';
    if (gameStatus === 'computer-won') return 'I won!';
    if (gameStatus === 'tie') return 'Tie!';
    if (isComputerTurn) return "Computer's turn...";
    return 'Your turn';
  };

  const getStatusColor = () => {
    if (gameStatus === 'human-won') return 'text-primary';
    if (gameStatus === 'computer-won') return 'text-destructive';
    if (gameStatus === 'tie') return 'text-muted-foreground';
    return 'text-foreground';
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Tic Tac Toe</CardTitle>
          <p className="text-muted-foreground mt-2">
            You are <span className="font-bold text-primary">O</span>, Computer is{' '}
            <span className="font-bold text-destructive">X</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`text-center text-2xl font-bold ${getStatusColor()}`}>
            {getStatusMessage()}
          </div>

          <TicTacToeBoard
            board={board}
            onCellClick={handleCellClick}
            disabled={gameStatus !== 'playing' || isComputerTurn}
          />

          <div className="flex justify-center">
            <Button
              onClick={handleNewGame}
              size="lg"
              className="gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              New Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
