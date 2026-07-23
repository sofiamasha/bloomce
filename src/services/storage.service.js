import { CATEGORIES } from '../models/categories';
import { generateId, getTodayDate } from '../utils/helpers';

export const storageService = {
  STORAGE_KEY: 'bloom_v3',

  load() {
    try {
      const data = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
      if (data) return data;
    } catch (e) {
      console.error("Error loading data from localStorage", e);
    }
    return null;
  },

  save(state, settings) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ state, settings }));
  },

  seedRealData() {
    const transactions = [];
    const receivables = [];

    const add = (cat, vals) => vals.forEach(v =>
      transactions.push({ id: generateId(), category: cat, amount: v, date: getTodayDate() })
    );

    add('Metrô',            [5.80,5.80,5.80,5.80,11.60,11.60,11.80,11.60,11.60,6.00]);
    add('Ônibus',           [94.80,39.00]);
    add('Lanche Faculdade', [10.50,11.50,10.50,22.60,11.90,10.50,6.30,2.20,9.10,8.30,6.10,20.00,4.00,3.60,10.50,10.50,2.20]);
    add('Almoço',           [9.99,22.50,15.99,48.50,12.70,15.75,40.00,15.30,26.99,47.00,21.00,60.00,8.98,10.99,58.00,2.70]);
    add('Lanche com amigas',[86.00]);
    add('Lanche pessoal',   [17.99,54.00]);
    add('Gastos pessoais',  [44.00,22.00,55.00,35.00]);
    add('Desconhecido',     [69.80,13.90,29.00,54.00,45.00]);
    add('Janta',            [37.00]);
    add('Cabelo',           [270.00]);
    add('Riachuelo',        [40.00]);
    add('Uber',             [21.94]);
    add('Sorvete',          [19.50]);
    add('Padaria',          [13.50]);
    add('Coca-Cola',        [21.47,23.00]);

    receivables.push(
      { id: generateId(), person: 'Pai', description: 'Sorvete',  amount: 19.50 },
      { id: generateId(), person: 'Pai', description: 'Padaria',  amount: 13.50 },
      { id: generateId(), person: 'Mãe', description: 'Coca-Cola',amount: 21.47 },
      { id: generateId(), person: 'Mãe', description: 'Uber',     amount: 21.94 },
      { id: generateId(), person: 'Mãe', description: 'Cabelo',   amount: 270.00 },
      { id: generateId(), person: 'Mãe', description: 'Riachuelo',amount: 40.00 },
      { id: generateId(), person: 'Mãe', description: 'Coca-Cola',amount: 23.00 }
    );

    return {
      transactions,
      receivables,
      categories: [...CATEGORIES]
    };
  },

  wipeData() {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.reload();
  }
};
