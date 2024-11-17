from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

# Função para verificar se um número é válido na posição (row, col)
def is_valid(board, row, col, num):
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:
            return False
    row_start, col_start = 3 * (row // 3), 3 * (col // 3)
    for i in range(row_start, row_start + 3):
        for j in range(col_start, col_start + 3):
            if board[i][j] == num:
                return False
    return True

# Função de backtracking para resolver o Sudoku
def solve_sudoku(board):
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                for num in range(1, 10):
                    if is_valid(board, row, col, num):
                        board[row][col] = num
                        if solve_sudoku(board):
                            return True
                        board[row][col] = 0
                return False
    return True

# Função para gerar um tabuleiro completo e válido
def generate_complete_board():
    board = [[0 for _ in range(9)] for _ in range(9)]

    def fill_board(board):
        for row in range(9):
            for col in range(9):
                if board[row][col] == 0:
                    nums = list(range(1, 10))
                    random.shuffle(nums)
                    for num in nums:
                        if is_valid(board, row, col, num):
                            board[row][col] = num
                            if fill_board(board):
                                return True
                            board[row][col] = 0
                    return False
        return True

    fill_board(board)
    return board

# Função para gerar o tabuleiro inicial com células vazias para o desafio
def generate_initial_board():
    complete_board = generate_complete_board()  # Gerar tabuleiro completo
    board = [row[:] for row in complete_board]  # Copiar o tabuleiro gerado

    # Decide o número de células vazias com base na dificuldade (exemplo: 40 células preenchidas)
    num_cells_to_remove = 40  # Pode ajustar a dificuldade alterando esse número

    # Gerar posições aleatórias para remover as células
    positions_to_remove = random.sample(range(81), 81 - num_cells_to_remove)

    for pos in positions_to_remove:
        row, col = divmod(pos, 9)
        board[row][col] = 0

    return board

@app.route('/new_game', methods=['GET'])
def new_game():
    board = generate_initial_board()
    solution = [row[:] for row in board]
    solve_sudoku(solution)  # Resolver o tabuleiro para obter a solução
    return jsonify({"board": board, "solution": solution})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
