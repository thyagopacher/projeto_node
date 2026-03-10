const express = require('express');
const router = express.Router();

const dbKnex = require('./data/db_config');

router.get('/', async (req, res) => {
  try {
    const livros = await dbKnex('livros').select('*').orderBy('id', 'desc');
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post('/', async (req, res) => {
  const { titulo, autor, ano_publicacao, preco, foto } = req.body;
  if (!titulo || !autor || !ano_publicacao || !preco || !foto) {
    return res.status(400).json({ msg: 'Preencha todos os campos!' });
  }
  try {
    const novo = await dbKnex('livros').insert({ titulo, autor, ano_publicacao, preco, foto });
    res.status(201).json({ id: novo[0] });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo, autor, ano_publicacao, preco, foto } = req.body;
  if (!titulo || !autor || !ano_publicacao || !preco || !foto) {
    return res.status(400).json({ msg: 'Preencha todos os campos!' });
  }
  try {
    await dbKnex('livros').update({ titulo, autor, ano_publicacao, preco, foto }).where({ id });
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await dbKnex('livros').del().where({ id });
    res.status(200).json({ id });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get('/filtro/:palavra', async (req, res) => {
  const palavra = req.params.palavra;
  try {
    const livros = await dbKnex('livros')
      .where('titulo', 'like', `%${palavra}%`)
      .orWhere('autor', 'like', `%${palavra}%`)
      .select('*');
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get('/dados/resumo', async (req, res) => {
  try {
    const consulta = await dbKnex('livros')
      .count({ num: '*' })
      .sum({ soma: 'preco' })
      .max({ maior: 'preco' })
      .avg({ media: 'preco' });

    const { num, soma, maior, media } = consulta[0];

    res.status(200).json({
      num,
      soma,
      maior,
      media: Number(media.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.get('/dados/grafico', async (req, res) => {
  try {
    const totalPorAno = await dbKnex('livros')
      .select('ano_publicacao')
      .sum({ total: 'preco' })
      .groupBy('ano_publicacao');

    res.status(200).json(totalPorAno);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}); 

module.exports = router;