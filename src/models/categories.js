export const CATEGORIES = [
  { name: 'Metrô',             emoji: '🚇' },
  { name: 'Ônibus',            emoji: '🚌' },
  { name: 'Lanche Faculdade',  emoji: '🥐' },
  { name: 'Almoço',            emoji: '🍽️' },
  { name: 'Lanche',            emoji: '🥪' },
  { name: 'Lanche com amigas', emoji: '👯‍♀️' },
  { name: 'Lanche pessoal',    emoji: '🍟' },
  { name: 'Coca-Cola',         emoji: '🥤' },
  { name: 'Sorvete',           emoji: '🍦' },
  { name: 'Padaria',           emoji: '🥖' },
  { name: 'Gastos pessoais',   emoji: '💸' },
  { name: 'Cabelo',            emoji: '💇' },
  { name: 'Riachuelo',         emoji: '👗' },
  { name: 'Uber',              emoji: '🚗' },
  { name: 'Janta',             emoji: '🌙' },
  { name: 'Desconhecido',      emoji: '❓' },
];

export const DEMO_CATEGORIES = [
  { name: 'Alimentação', emoji: '🍽️' },
  { name: 'Transporte',  emoji: '🚇' },
  { name: 'Lazer',       emoji: '🎮' },
  { name: 'Compras',     emoji: '🛍️' },
];

export const DEMO_DATA = {
  transactions: [
    { id:'d1', category:'Alimentação', amount:85.50, date: new Date().toISOString().slice(0, 10) },
    { id:'d2', category:'Alimentação', amount:42.00, date: new Date().toISOString().slice(0, 10) },
    { id:'d3', category:'Transporte',  amount:25.00, date: new Date().toISOString().slice(0, 10) },
    { id:'d4', category:'Transporte',  amount:18.50, date: new Date().toISOString().slice(0, 10) },
    { id:'d5', category:'Lazer',       amount:120.00, date: new Date().toISOString().slice(0, 10) },
    { id:'d6', category:'Compras',     amount:89.90, date: new Date().toISOString().slice(0, 10) },
  ],
  receivables: [
    { id:'r1', person:'Pessoa A', description:'Jantar',     amount:45.00 },
    { id:'r2', person:'Pessoa B', description:'Transporte', amount:22.00 },
  ],
};
