import express from 'express'
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import swaggerSpec from './swagger';
import 'dotenv/config'
const db = require('./db');
const app = express()
const port = Number(process.env.PORT) || 3001;
app.use(cors());

app.use(express.json());

/** 1. Criar nova sessão
 * @openapi
 * /sessions:
 *   post:
 *     summary: Cria uma nova sessão de estudo
 *     tags:
 *       - Sessions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - duration_in_hours
 *             properties:
 *               subject:
 *                 type: string
 *                 example: Matemática
 *               duration_in_hours: 
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Sessão criada com sucesso
 *       500:
 *         description: Erro ao criar sessão
 */

app.post('/sessions', async (req, res) => {
  const { subject, duration_in_hours } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO study_sessions (subject, duration_in_hours) VALUES ($1, $2) RETURNING *',
      [subject, duration_in_hours]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar sessão', err });
  }
});

/** 2. Editar sessão existente
 * @openapi
 * /sessions/{id}:
 *   put:
 *     summary: Edita uma sessão de estudo existente
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da sessão que será atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 example: Português
 *               duration_in_hours:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Sessão atualizada com sucesso
 *       404:
 *         description: Sessão não encontrada
 *       500:
 *         description: Erro ao atualizar sessão
 */
app.put('/sessions/:id', async (req:any, res:any) => {
  const { id } = req.params;
  const { subject, duration_in_hours } = req.body;

  try {
    const result = await db.query(
      `UPDATE study_sessions
       SET subject = COALESCE($1, subject),
           duration_in_hours = COALESCE($2, duration_in_hours)
       WHERE id = $3
       RETURNING *`,
      [subject, duration_in_hours, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Sessão não encontrada' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar sessão', err });
  }
});


// 3. Buscar todas as sessões
/**
 * @openapi
 * /sessions/{id}:
 *   get:
 *     summary: Busca todas sessão 
 *     tags:
 *       - Sessions
 *     responses:
 *       200:
 *         description: Sessão encontrada
 *       404:
 *         description: Sessão não encontrada
 *       500:
 *         description: Erro ao buscar sessão
 */

app.get('/sessions', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM study_sessions ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar sessões', err });
  }
});

// 4. Buscar uma sessão por ID
/**
 * @openapi
 * /sessions/{id}:
 *   get:
 *     summary: Busca uma sessão por ID
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da sessão a ser buscada
 *     responses:
 *       200:
 *         description: Sessão encontrada
 *       404:
 *         description: Sessão não encontrada
 *       500:
 *         description: Erro ao buscar sessão
 */
app.get('/sessions/:id', async (req: any, res: any) => {
  try {
    const result = await db.query('SELECT * FROM study_sessions WHERE id = $1', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sessão não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar sessão', err });
  }
});

// 5. Deletar uma sessão
/**
 * @openapi
 * /sessions/{id}:
 *   delete:
 *     summary: Deleta uma sessão por ID
 *     tags:
 *       - Sessions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da sessão a ser deletada
 *     responses:
 *       200:
 *         description: Sessão removida com sucesso
 *       404:
 *         description: Sessão não encontrada
 *       500:
 *         description: Erro ao deletar sessão
 */
app.delete('/sessions/:id',async (req: any, res: any)=> {
  try {
    const result = await db.query('DELETE FROM study_sessions WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sessão não encontrada' });
    }

    res.json({ message: 'Sessão removida com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar sessão', err });
  }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, '0.0.0.0', () => {
   console.log(process.env.PORT)
  console.log(`API de tempo de estudo rodando na porta: ${port}`)
})