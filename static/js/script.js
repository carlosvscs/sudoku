let solution = [];
let errorCount = 0;

// Função para iniciar o jogo
function startGame() {
    document.getElementById('start-screen').style.display = 'none';  // Esconde a tela inicial
    document.getElementById('game-container').style.display = 'flex';  // Exibe a tela do jogo
    document.getElementById('error-count').style.display = 'block';  // Exibe o contador de erros
    loadBoard();  // Carrega o tabuleiro do Sudoku
}

// Função para carregar o tabuleiro inicial e a solução do backend
async function loadBoard() {
    const response = await fetch('/new_game');
    const data = await response.json();
    solution = data.solution;
    renderBoard(data.board);
}

// Renderiza o tabuleiro inicial
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

            // Adiciona evento para verificar o valor inserido
            if (!cell.disabled) {
                cell.addEventListener('input', () => checkCell(row, col, cell));
            }

            boardDiv.appendChild(cell);
        }
    }

    // Atualiza a visibilidade dos números na lateral
    updateNumberList();
}

// Função para verificar se o valor inserido está correto
function checkCell(row, col, cell) {
    // Se o valor inserido for incorreto
    if (cell.value !== '' && parseInt(cell.value) !== solution[row][col]) {
        // Marca a célula com erro
        cell.classList.add('error');
        errorCount++;
        document.getElementById('error-count').innerText = `${errorCount}/3`;
        alert("Valor incorreto!");

        if (errorCount >= 3) {
            alert("Fim de jogo! Você cometeu 3 erros.");
            lockBoard();
        }
    } else {
        // Se o valor estiver correto, remove a classe de erro (se houver)
        cell.classList.remove('error');
    }

    // Verifica se o tabuleiro foi completado corretamente
    if (checkVictory()) {
        displayVictoryMessage();
        alert("Parabéns! Você completou o puzzle!");
        lockBoard();  // Bloqueia o tabuleiro
    }

    // Atualiza a visibilidade dos números na lateral
    updateNumberList();
}

// Função para verificar se o tabuleiro foi completado corretamente
function checkVictory() {
    const board = getBoard();
    return board.every((row, rowIndex) => 
        row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
}

// Função para exibir a mensagem de vitória com uma curiosidade sobre os componentes de um computador
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

// Bloqueia o tabuleiro em caso de derrota ou vitória
function lockBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            document.getElementById(`cell-${row}-${col}`).disabled = true;
        }
    }
}

// Função para obter os valores do tabuleiro atual
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

// Atualiza a visibilidade dos números na lateral
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

// Conta quantas vezes um número aparece no tabuleiro
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

// Curiosidades sobre componentes de computador
const computerComponents = [
    "O processador (CPU) é o cérebro do computador, responsável por executar as instruções.",
    "A memória RAM armazena temporariamente os dados para facilitar o acesso rápido.",
    "O armazenamento em SSD é mais rápido do que o tradicional HDD, proporcionando uma melhor performance.",
    "O monitor exibe as informações de saída, permitindo que você interaja com o computador.",
    "A placa gráfica (GPU) é essencial para processar imagens e vídeos em alta definição."
];

// Função para reiniciar o jogo
function resetGame() {
    errorCount = 0;
    document.getElementById('error-count').innerText = '0/3'; // Reseta o contador de erros
    loadBoard(); // Recarrega o tabuleiro com uma nova configuração
}
