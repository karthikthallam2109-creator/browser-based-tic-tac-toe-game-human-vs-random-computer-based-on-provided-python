import { Button } from '@/components/ui/button';
import { CellValue } from './gameLogic';

interface TicTacToeBoardProps {
  board: CellValue[][];
  onCellClick: (cellNumber: number) => void;
  disabled: boolean;
}

export function TicTacToeBoard({ board, onCellClick, disabled }: TicTacToeBoardProps) {
  const handleCellClick = (row: number, col: number) => {
    if (disabled) return;
    
    const cellValue = board[row][col];
    // Only allow clicks on numbered cells (not O or X)
    if (typeof cellValue === 'number') {
      onCellClick(cellValue);
    }
  };

  const getCellContent = (value: CellValue) => {
    if (value === 'O') return 'O';
    if (value === 'X') return 'X';
    return value.toString();
  };

  const getCellClassName = (value: CellValue) => {
    if (value === 'O') {
      return 'text-4xl font-bold text-primary';
    }
    if (value === 'X') {
      return 'text-4xl font-bold text-destructive';
    }
    return 'text-2xl font-semibold text-muted-foreground';
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-md mx-auto">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isOccupied = cell === 'O' || cell === 'X';
          return (
            <Button
              key={`${rowIndex}-${colIndex}`}
              variant={isOccupied ? 'secondary' : 'outline'}
              size="lg"
              className={`h-24 sm:h-28 ${getCellClassName(cell)} hover:scale-105 transition-transform`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              disabled={disabled || isOccupied}
              aria-label={`Cell ${typeof cell === 'number' ? cell : cell}`}
            >
              {getCellContent(cell)}
            </Button>
          );
        })
      )}
    </div>
  );
}
