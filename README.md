# Sudoku Educativo

Bem-vindo ao **Sudoku Educativo**! Este é um jogo de Sudoku interativo com foco em aprendizado. O projeto tem como objetivo ensinar lógica e raciocínio de uma forma divertida e prática, com um contador de erros que desafia o jogador a melhorar suas habilidades.

## 📚 Descrição

O **Sudoku Educativo** permite que os usuários joguem Sudoku diretamente em um navegador, com uma interface simples e intuitiva. O jogo conta com um contador de erros que limita o número de tentativas incorretas a 3, incentivando o jogador a pensar com mais cuidado antes de preencher uma célula. O projeto pode ser facilmente executado localmente ou em um servidor web.

### Funcionalidades

- **Tabuleiro de Sudoku interativo** com 9x9 células.
- **Lista de números** para o jogador preencher as células do tabuleiro.
- **Contador de erros** que exibe a quantidade de erros cometidos (limite de 3).
- **Botão de reset** para reiniciar o jogo.
- **Design responsivo** para funcionar bem em diferentes dispositivos.

## 🚀 Como Rodar

### Pré-requisitos

1. **Python**: O projeto utiliza Python 3.x para rodar o backend com Flask.
2. **Instalar as dependências**: Antes de rodar o projeto, você precisará instalar as dependências do Python.

### Passos para Rodar

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/username/sudoku-educativo.git
   ```
2. **Instale as dependências**:
   Se você ainda não tiver o Flask instalado, pode fazer isso rodando:
   ```bash
   pip install flask
    ```
3. **Execute o servidor**:
   Navegue até o diretório do projeto e execute o arquivo app.py:
   ```bash
   cd sudoku-educativo
   python app.py
    ```
4. **Acesse o jogo**:
   Abra o navegador e vá para o endereço: http://127.0.0.1:5000/. Você verá a tela inicial do Sudoku Educativo, pronto para jogar!app.py

## 💻 Tecnologias Usadas

- **Frontend**:
  - **HTML**: Estruturação das páginas do jogo.
  - **CSS**: Estilos e responsividade, usando um design moderno e simples.
  - **JavaScript**: Funcionalidade interativa no jogo (como a verificação de erros e controle do tabuleiro).

- **Backend**:
  - **Python**: Linguagem usada para o desenvolvimento do backend.
  - **Flask**: Framework web leve para servir o jogo.

## 🎮 Como Jogar

1. **Jogue Sudoku**: O objetivo do jogo é preencher o tabuleiro de Sudoku corretamente.
2. **Selecione um número**: Escolha um número na lista de números ao lado do tabuleiro.
3. **Preencha a célula**: Clique em uma célula no tabuleiro e digite o número escolhido.
4. **Erros**: Você tem até 3 erros. Se errar 3 vezes, o jogo termina.
5. **Reset**: Quando quiser reiniciar o jogo, clique no botão **RESET**.

## 📝 Como Contribuir

1. Faça o **fork** do projeto.
2. Crie uma nova branch para a sua feature (`git checkout -b feature-nova`).
3. Faça os commits das suas alterações (`git commit -am 'Adicionando nova feature'`).
4. Envie para o seu repositório forkado (`git push origin feature-nova`).
5. Abra um **pull request** para o repositório principal.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

## 📢 Agradecimentos

- Agradecimentos ao projeto [Sudoku](https://www.sudoku.com/) por inspirar a ideia.
- A todos os colaboradores do projeto.

---

**Desenvolvedor**: [carlosvscs]  
**GitHub**: [github.com/carlosvscs](https://github.com/carlosvscs)
