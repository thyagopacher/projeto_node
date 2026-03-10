/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('livros').del()
  await knex('livros').insert([
    {id: 1, titulo: 'Web Design Responsivo', autor: 'Mauricio Samy Silva', ano_publicacao: 2014, preco: 73.90, foto: 'https://m.media-amazon.com/images/I/51s+qj8n9lL._SX379_BO1,204,203,200_.jpg'},
    {id: 2, titulo: 'Proteção Moderna de Dados', autor: 'Gustavo Faria', ano_publicacao: 2020, preco: 59.90, foto: 'https://m.media-amazon.com/images/I/41s+qj8n9lL._SX379_BO1,204,203,200_.jpg'},
    {id: 3, titulo: 'SQL em 10 minutos por dia', autor: 'Ben Forta', ano_publicacao: 2019, preco: 49.90, foto: 'https://m.media-amazon.com/images/I/41s+qj8n9lL._SX379_BO1,204,203,200_.jpg'}
  ]);
};
