from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

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

def generate_initial_board():
    complete_board = generate_complete_board()
    board = [row[:] for row in complete_board]
    num_cells_to_remove = 40
    positions_to_remove = random.sample(range(81), 81 - num_cells_to_remove)

    for pos in positions_to_remove:
        row, col = divmod(pos, 9)
        board[row][col] = 0

    return board

@app.route('/new_game', methods=['GET'])
def new_game():
    board = generate_initial_board()
    solution = [row[:] for row in board]
    solve_sudoku(solution)
    return jsonify({"board": board, "solution": solution})

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
