
# 🗂️ Sessions API - Módulo do Projeto Study Content

Esta é uma **API Secundária 02** ao projeto [Study Content](https://github.com/BeatrizTavare-s/MVP4-backend), desenvolvida em **Node.js + Express**, com banco de dados **PostgreSQL**. Essa API é responsável por **gerenciar sessões de estudo**.

> 🔗 Esta API é consumida pelo frontend e faz parte da arquitetura completa do projeto.

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- PostgreSQL
- Swagger (`swagger-ui-express`)
- Docker (opcional para ambiente completo)

---

## 📌 Funcionalidades da Sessions API

- `POST /sessions` → Cria uma nova sessão de estudo
- `PUT /sessions` → Edita uma sessão de estudo
- `GET /sessions/:id` → Retorna as sessões vinculadas a um estudo
- `DELETE /sessions/:id` → Remove uma sessão de estudo

---

## ⚙️ Como rodar o projeto localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o arquivo `.env`:
   ```
   PORT=3001
   DATABASE_URL=postgres://usuario:senha@localhost:5432/study_sessions
   POSTGRES_USER=value
   POSTGRES_PASSWORD=value
   POSTGRES_DB=value
   ```

3. Execute em ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Para build de produção:
   ```bash
   npm run start
   ```

---

## 🐳 Como rodar com Docker

1. Configure o arquivo `.env`:
   ```
   PORT=3001
   DATABASE_URL=postgres://usuario:senha@localhost:5432/study_sessions
   POSTGRES_USER=value
   POSTGRES_PASSWORD=value
   POSTGRES_DB=value
   ```

2. Acesse a pasta com backend principal:
[Study Content](https://github.com/BeatrizTavare-s/MVP4-backend)

3. Execute o comando para build:
```bash
docker compose up --build
```

---

## 🔗 Integração

Essa API é utilizada junto da API principal (Flask ou Node) e do frontend para permitir o registro de **sessões de estudo**, com dados como duração, título.

---

## 🎥 Demonstração do Projeto

Vídeo de apresentação disponível em:  
🔗 [https://www.youtube.com/watch?v=ZLq17Gpz654&ab_channel=BeatrizTavares](https://www.youtube.com/watch?v=ZLq17Gpz654&ab_channel=BeatrizTavares)

## 🧭 Arquitetura do Projeto

A Sessions API (Node.js) é um dos componentes da arquitetura geral do projeto **Study Content**, conforme o diagrama abaixo:

![Fluxograma da Arquitetura](https://github.com/BeatrizTavare-s/MVP4-backend/blob/main/img-readme/Fluxograma-explicado.PNG)

Ela é responsável por gerenciar e armazenar as sessões de estudo em um banco PostgreSQL e se comunica com o frontend e a API principal (Python).

---

## 🎥 Demonstração do Projeto

Vídeo de apresentação disponível em:  
🔗 [https://www.youtube.com/watch?v=ZLq17Gpz654&ab_channel=BeatrizTavares](https://www.youtube.com/watch?v=ZLq17Gpz654&ab_channel=BeatrizTavares)


## 📌 Projeto completo

✅ Comunicação com múltiplas APIs:
- 📘 **API Principal (Python)**: gerencia cards de estudo, categorias e cronogramas
🔗 [Ver repositório](https://github.com/BeatrizTavare-s/MVP4-backend)
- 🌐 **Frontend (HTML/CSS/JS)**: interface web para interação com estudos, sessões e geração de PDFs  
  🔗 [Ver repositório](https://github.com/BeatrizTavare-s/MVP4-frontend)
- 🧩 **API de Sessões (NodeJS)**: adiciona e lista sessões de estudo por assunto
🔗 [Ver repositório](https://github.com/BeatrizTavare-s/MVP4-API-SESSIONS)
- 🤖 **API OpenAI (NodeJS)**: gera cronogramas semanais com ajuda da IA
🔗 [Ver repositório](https://github.com/BeatrizTavare-s/MVP4-API-CHAT)

📄 Geração de PDFs:
- PDF com **cronograma de estudo** retornado pela OpenAI
- PDF com **lista de livros sugeridos** retornados pela Google Books API

🎨 Interface amigável:
- Cards coloridos por categoria
- Botões para ações: concluir, excluir, gerar cronograma e buscar livros
- Tabela de sessões de estudo por duração