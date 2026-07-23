import { globalState } from '../core/state';
import { generateId, getTodayDate } from '../utils/helpers';
import { formatCurrency } from '../utils/formatters';

export const aiService = {
  processCommand(input) {
    const lower = input.toLowerCase().trim();
    const txs = globalState.getTransactions();

    const addPattern = lower.match(/(?:gastei|paguei|comprei|deu|custou|paguei)\s+(?:r\$\s*)?(\d+(?:[.,]\d{1,2})?)\s+(?:com|de|no|na|em|reais?\s+com)?\s*(.+)/);
    if (addPattern) {
      const amount = parseFloat(addPattern[1].replace(',', '.'));
      const keywords = addPattern[2].trim();

      let cat = globalState.data.categories.find(c => keywords.includes(c.name.toLowerCase()));
      
      if (!cat) {
        const map = { 'comida':'Almoço', 'uber':'Uber', 'metro':'Metrô', 'metrô':'Metrô', 'onibus':'Ônibus', 'ônibus':'Ônibus', 'roupa':'Riachuelo', 'cabelereiro':'Cabelo', 'salão':'Cabelo', 'lanche':'Lanche', 'cerveja':'Lanche pessoal', 'delivery':'Almoço', 'ifood':'Almoço' };
        for (const [k, v] of Object.entries(map)) { 
          if (keywords.includes(k)) { cat = { name: v }; break; } 
        }
      }
      if (!cat) cat = { name: 'Desconhecido' };

      const tx = { id: generateId(), category: cat.name, amount, date: getTodayDate() };
      globalState.addTransaction(tx);
      
      return {
        action: 'added',
        category: cat.name,
        message: `✅ Adicionei **${formatCurrency(amount)}** em **${cat.name}**! A planilha foi atualizada.`
      };
    }

    if (/resumo|total|quanto gastei/.test(lower)) {
      const total = txs.reduce((s, t) => s + t.amount, 0);
      const top = this.getTopCat(txs);
      return { action: 'query', message: `📊 Resumo do mês:\n- **Total gasto**: ${formatCurrency(total)}\n- **Maior categoria**: ${top ? `${top.name} (${formatCurrency(top.total)})` : 'N/A'}\n- **Registros**: ${txs.length} itens` };
    }
    
    if (/maior gasto/.test(lower)) {
      const top = this.getTopCat(txs);
      return { action: 'query', message: top ? `🔍 Seu maior gasto é **${top.name}** com **${formatCurrency(top.total)}**.` : 'Sem dados para analisar.' };
    }

    if (/economizar|reduzir|cortar/.test(lower)) {
      const top = this.getTopCat(txs);
      return { action: 'query', message: top ? `💡 Sua principal oportunidade de economia está em **${top.name}** (${formatCurrency(top.total)}). Reduzir 20% nessa categoria economizaria cerca de **${formatCurrency(top.total * 0.2)}** por mês.` : 'Adicione mais registros para análise.' };
    }

    return { action: 'unknown', message: `🤔 Não entendi completamente. Tente:\n- *"Gastei 15 com almoço"*\n- *"Qual meu maior gasto?"*\n- *"Resumo dos meus gastos"*` };
  },

  getTopCat(txs) {
    const grouped = {};
    txs.forEach(t => grouped[t.category] = (grouped[t.category] || 0) + t.amount);
    const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
    if (!sorted.length) return null;
    return { name: sorted[0][0], total: sorted[0][1] };
  }
};
