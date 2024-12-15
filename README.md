# React Native Product Manager

## Descrição do Projeto

Este é um aplicativo mobile de gerenciamento de produtos desenvolvido em **React Native**. O projeto permite listar, adicionar, editar e excluir produtos, com suporte a upload de imagens para cada produto. Ele está integrado com um back-end em Node.js, utilizando Prisma como ORM para gerenciamento do banco de dados MongoDB Atlas.

## Funcionalidades

- **Listagem de Produtos:** Visualize produtos cadastrados, com nome, descrição, quantidade e imagem.
- **Adicionar Produto:** Cadastre novos produtos com nome, descrição, quantidade e imagem.
- **Editar Produto:** Atualize informações e imagem de produtos existentes.
- **Excluir Produto:** Remova produtos com confirmação de exclusão.

## Tecnologias Utilizadas

### Front-End
- **React Native**
- **Expo** (para testes rápidos e acesso a bibliotecas como Image Picker)
- **Axios** (para comunicação com o back-end)

### Back-End
- **Node.js**
- **Express** (para criação de rotas RESTful)
- **Prisma ORM** (para interação com o banco de dados SQLite)
- **Multer** (para upload de imagens)

## Requisitos para Executar o Projeto

Certifique-se de ter os seguintes itens instalados:

- **Node.js** (v16 ou superior)
- **Expo CLI**
- **Yarn** ou **npm**
- **SQLite** (integrado automaticamente pelo Prisma)

## Instruções de Execução

### 1. Configurar o Back-End

1. Clone o repositório:
   ```bash
   git clone (https://github.com/FlaviaPaloma/API-DE-AMAZENAMENTO-DE-IMAGEM.git)
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados SQLite:
   - Verifique o arquivo `prisma/schema.prisma`.
   - Rode as migrações do Prisma:
     ```bash
     npx prisma migrate dev
     ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

O servidor estará rodando em: `http://localhost:3000`

### 2. Configurar o Front-End

1. Navegue até a pasta do front-end:
   ```bash
   cd ../frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto com o Expo:
   ```bash
   expo start
   ```

4. Digitalize o código QR no terminal com o **Expo Go** no seu dispositivo móvel (ou utilize um emulador).

## Estrutura do Projeto

### Backend
- **`server.js`**: Configurações do servidor Express e rotas principais.
- **`prisma/`**: Diretório contendo o schema do Prisma para modelagem de banco de dados.
- **`uploads/`**: Armazena imagens de produtos carregadas pelo Multer.

### Frontend
- **`App.js`**: Arquivo principal do React Native que configura as rotas de navegação.
- **`screens/`**: Contém telas do aplicativo:
  - `HomeScreen.js`: Lista produtos cadastrados e permite excluir ou editar.
  - `AddProductScreen.js`: Formulário para adicionar produtos.
  - `EditProductScreen.js`: Formulário para editar produtos existentes.

## Rotas da API

- **GET /produtos**: Retorna a lista de produtos.
- **POST /produtos**: Cria um novo produto.
  - Parâmetros esperados (form-data):
    - `nome`: string
    - `descricao`: string
    - `quantidade`: number
    - `foto`: file (imagem)
- **PUT /produtos/:id**: Atualiza um produto existente.
  - Parâmetros esperados (form-data):
    - `nome`: string
    - `descricao`: string
    - `quantidade`: number
    - `foto`: file (imagem, opcional)
- **DELETE /produtos/:id**: Exclui um produto.

## Melhorias Futuras

- Implementar paginação na listagem de produtos.
- Adicionar autenticação para controle de acesso.
- Criar suporte para outras bases de dados como PostgreSQL ou MySQL.
- Melhorar o design 
