# Specification

## Summary
**Goal:** Replace the current countdown dashboard with a browser-playable Tic-Tac-Toe game (human vs random computer) that follows the provided Python console logic.

**Planned changes:**
- Swap the main screen content from the countdown dashboard to a Tic-Tac-Toe game view (remove countdown-specific UI from main content).
- Build a 3x3 clickable board that displays numbers (1–9) for empty cells and uses 'O' for the human and 'X' for the computer.
- Implement game flow: start with 'X' in the center, human plays 'O', computer responds with a random valid 'X', alternating turns until win or tie.
- Add win/tie detection for rows/columns/diagonals and show English status text for turns and outcomes ("You won!", "I won!", "Tie!"); prevent moves after game end.
- Add a "New Game" control to reset to the initial board state (numbers 1–9 with 'X' in the center) and clear end-of-game state.
- Update the app header title/subtitle to reference Tic-Tac-Toe and playing in the browser vs the computer, keeping the existing layout structure and ensuring responsive usability.

**User-visible outcome:** Visiting the app shows a Tic-Tac-Toe game where the user clicks to place 'O', the computer places random 'X' moves, the UI shows turn/result messages in English, and the user can restart via "New Game".
