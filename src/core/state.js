import { storageService } from '../services/storage.service';

export const globalState = {
  data: {
    transactions: [],
    receivables: [],
    categories: []
  },
  settings: {
    themeDark: false
  },
  presentationMode: false,
  
  init() {
    const loaded = storageService.load();
    if (loaded) {
      this.data.transactions = loaded.state.transactions;
      this.data.receivables = loaded.state.receivables;
      this.data.categories = loaded.state.categories;
      this.settings = loaded.settings || this.settings;
    } else {
      const seeded = storageService.seedRealData();
      this.data = seeded;
      this.save();
    }
  },

  save() {
    storageService.save(this.data, this.settings);
  },

  getTransactions() {
    return this.data.transactions;
  },

  addTransaction(tx) {
    this.data.transactions.push(tx);
    this.save();
  },

  removeTransaction(id) {
    this.data.transactions = this.data.transactions.filter(t => t.id !== id);
    this.save();
  },

  addCategory(category) {
    this.data.categories.push(category);
    this.save();
  },

  removeReceivable(id) {
    this.data.receivables = this.data.receivables.filter(r => r.id !== id);
    this.save();
  }
};
