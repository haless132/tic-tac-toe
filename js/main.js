const CELL_VALUE = {
  CROSS: 'X',
  CIRCLE: 'O',
  WIN: 'win',
};

const GAME_STATUS = {
  PLAYING: 'PLAYING',
  ENDED: 'END',
  X_WIN: 'X',
  O_WIN: 'O',
};

const TURN = {
  CROSS: 'cross',
  CIRCLE: 'circle',
};

let currentTurn = 'cross';
let isGameEnded = false;
let cellValues = Array.from(new Array(9).keys()).map(() => '');
const cellElementList = document.querySelectorAll('#cellList > li');

const checkGameStatus = (cellValues) => {
  const checkSets = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const winPositions = checkSets.find((set) => {
    const first = cellValues[set[0]];
    const second = cellValues[set[1]];
    const third = cellValues[set[2]];

    return first === second && second === third && first !== '';
  });

  if (Array.isArray(winPositions)) {
    const isXWin = cellValues[winPositions[0]] === CELL_VALUE.CROSS;

    return {
      status: isXWin ? GAME_STATUS.X_WIN : GAME_STATUS.O_WIN,
      winPositions,
    };
  }

  const hasEmptyValue = cellValues.includes('');
  if (!hasEmptyValue) {
    return {
      status: GAME_STATUS.ENDED,
      winPositions: [],
    };
  }

  return {
    status: GAME_STATUS.PLAYING,
    winPositions: [],
  };
};

const toggleCurrentTurn = () => {
  currentTurn = currentTurn === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS;

  const currentTurnElement = document.querySelector('#currentTurn');
  if (currentTurnElement) {
    currentTurnElement.classList.remove(TURN.CROSS, TURN.CIRCLE);
    currentTurnElement.classList.add(currentTurn);
  }
};

const handleCellClick = (e, idx) => {
  const element = e.target;
  console.log(element, idx);

  if (element.classList.length > 0) return;

  element.classList.add(currentTurn);

  cellValues[idx] = currentTurn === TURN.CROSS ? CELL_VALUE.CROSS : CELL_VALUE.CIRCLE;

  toggleCurrentTurn();

  const result = checkGameStatus(cellValues);
  console.log(result);

  if ([GAME_STATUS.X_WIN, GAME_STATUS.O_WIN].includes(result.status)) {
    result.winPositions.forEach((idx) => {
      cellElementList[idx].classList.add(CELL_VALUE.WIN);
    });
  }
};

cellElementList.forEach((element, idx) => {
  element.addEventListener('click', (e) => handleCellClick(e, idx));
});
