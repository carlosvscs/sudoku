let solution = [];
let errorCount = 0;

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    document.getElementById('error-count').style.display = 'block';
    loadBoard();
}

async function loadBoard() {
    const response = await fetch('/new_game');
    const data = await response.json();
    solution = data.solution;
    renderBoard(data.board);
}

function renderBoard(board) {
    const boardDiv = document.getElementById('sudoku-board');
    boardDiv.innerHTML = '';
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement('input');
            cell.type = 'text';
            cell.id = `cell-${row}-${col}`;
            cell.maxLength = 1;
            cell.value = board[row][col] !== 0 ? board[row][col] : '';
            cell.disabled = board[row][col] !== 0;

            if (!cell.disabled) {
                cell.addEventListener('input', () => checkCell(row, col, cell));
            }

            boardDiv.appendChild(cell);
        }
    }
    updateNumberList();
}

function checkCell(row, col, cell) {
    if (cell.value !== '' && parseInt(cell.value) !== solution[row][col]) {
        cell.classList.add('error');
        errorCount++;
        document.getElementById('error-count').innerText = `${errorCount}/3`;
        alert("Valor incorreto!");

        if (errorCount >= 3) {
            alert("Fim de jogo! Você cometeu 3 erros.");
            lockBoard();
        }
    } else {
        cell.classList.remove('error');
    }

    if (checkVictory()) {
        displayVictoryMessage();
        alert("Parabéns! Você completou o puzzle!");
        lockBoard();
    }

    updateNumberList();
}

function checkVictory() {
    const board = getBoard();
    return board.every((row, rowIndex) => 
        row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
}

function displayVictoryMessage() {
    const randomMessage = computerComponents[Math.floor(Math.random() * computerComponents.length)];

    const messageDiv = document.createElement('div');
    messageDiv.style.backgroundColor = '#f0f8ff';
    messageDiv.style.padding = '20px';
    messageDiv.style.marginTop = '20px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontSize = '1.2rem';
    messageDiv.style.color = '#333';
    messageDiv.innerHTML = `<h2>Você completou o Sudoku!</h2><p>${randomMessage}</p>`;

    document.body.appendChild(messageDiv);
}

function lockBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.getElementById(`cell-${row}-${col}`).disabled = true;
        }
    }
}

function getBoard() {
    const board = [];
    for (let row = 0; row < 9; row++) {
        const rowData = [];
        for (let col = 0; col < 9; col++) {
            const cellValue = document.getElementById(`cell-${row}-${col}`).value;
            rowData.push(cellValue ? parseInt(cellValue) : 0);
        }
        board.push(rowData);
    }
    return board;
}

function updateNumberList() {
    for (let num = 1; num <= 9; num++) {
        const numCount = countNumberInBoard(num);
        const numberElement = document.getElementById(`number-${num}`);
        if (numCount === 9) {
            numberElement.classList.add('hidden');
        } else {
            numberElement.classList.remove('hidden');
        }
    }
}

function countNumberInBoard(num) {
    const board = getBoard();
    let count = 0;
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === num) {
                count++;
            }
        }
    }
    return count;
}

const computerComponents = [
    "O processador (CPU) é o cérebro do computador, responsável por executar as instruções.",
    "A memória RAM armazena temporariamente os dados para facilitar o acesso rápido.",
    "O armazenamento em SSD é mais rápido do que o tradicional HDD, proporcionando uma melhor performance.",
    "O monitor exibe as informações de saída, permitindo que você interaja com o computador.",
    "A placa gráfica (GPU) é essencial para processar imagens e vídeos em alta definição."
];

function resetGame() {
    errorCount = 0;
    document.getElementById('error-count').innerText = '0/3';
    loadBoard();
}
