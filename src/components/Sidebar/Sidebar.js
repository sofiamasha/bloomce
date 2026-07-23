import './Sidebar.css';
import { aiService } from '../../services/ai.service';
import { escapeHtml } from '../../utils/helpers';
import { renderMarkdown } from '../../utils/formatters';

export const Sidebar = {
  render() {
    const aside = document.createElement('aside');
    aside.className = 'app-sidebar';
    aside.setAttribute('aria-label', 'Assistente IA');

    aside.innerHTML = `
      <div class="ai-header">
        <div class="ai-title-wrap">
          <span class="ai-icon">✨</span>
          <h2 class="ai-title">Bloom AI</h2>
          <span class="ai-status"></span>
        </div>
        <div class="ai-desc">Linguagem natural & automação</div>
      </div>
      
      <div class="ai-chat-area" id="aiMessages" aria-live="polite"></div>

      <div class="ai-suggestions" aria-label="Sugestões de perguntas">
        <button class="suggestion" data-q="Gastei 15 com almoço">"Gastei 15 com almoço"</button>
        <button class="suggestion" data-q="Resumo do mês">"Resumo do mês"</button>
        <button class="suggestion" data-q="Maior gasto">"Maior gasto"</button>
      </div>

      <div class="ai-input-wrap">
        <textarea class="ai-input" id="aiInput" placeholder="Ex: Paguei 40 de Uber" rows="1" aria-label="Mensagem para a IA"></textarea>
        <div class="ai-input-actions">
          <button class="ai-action-btn" id="voiceBtn" title="Falar (Requer Chrome)" aria-label="Entrada por voz">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
          </button>
          <button class="ai-action-btn primary" id="btnAISend" title="Enviar" aria-label="Enviar mensagem">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
      <div class="ai-footer">
        <button id="btnClearChat">Limpar chat</button>
      </div>
    `;
    return aside;
  },

  init() {
    this.addBotMessage('Olá! 👋 Sou a **Bloom AI**. Posso registrar gastos, responder perguntas e analisar seus padrões financeiros.\n\nTente: *"Gastei 22 com almoço"* ou clique em uma sugestão.');

    document.getElementById('btnAISend')?.addEventListener('click', () => {
      const input = document.getElementById('aiInput');
      const val = input.value.trim();
      if (val) { this.sendAIMessage(val); input.value = ''; input.style.height = 'auto'; }
    });

    document.getElementById('aiInput')?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const input = e.target;
        const val = input.value.trim();
        if (val) { this.sendAIMessage(val); input.value = ''; input.style.height = 'auto'; }
      }
      setTimeout(() => {
        const ta = document.getElementById('aiInput');
        if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 80) + 'px'; }
      }, 0);
    });

    document.querySelectorAll('.suggestion').forEach(btn => {
      btn.addEventListener('click', () => this.sendAIMessage(btn.dataset.q));
    });

    document.getElementById('btnClearChat')?.addEventListener('click', () => {
      const msgs = document.getElementById('aiMessages');
      if (msgs) msgs.innerHTML = '';
      this.addBotMessage('Chat limpo! Como posso ajudar?');
    });

    this.initVoice();

    window.addEventListener('bloom:demoAI', async () => {
      const demoMessages = [
        { delay: 500,  text: '🎬 Iniciando demonstração…' },
        { delay: 1200, text: 'Gastei 35 com almoço' },
        { delay: 2500, text: 'Qual meu maior gasto?' },
        { delay: 4000, text: 'Onde posso economizar?' },
        { delay: 5500, text: 'Resumo dos meus gastos' },
      ];
    
      for (const msg of demoMessages) {
        await new Promise(r => setTimeout(r, msg.delay));
        if (msg.text.startsWith('🎬')) { this.addBotMessage(msg.text); continue; }
        const input = document.getElementById('aiInput');
        if (input) { input.value = msg.text; }
        await new Promise(r => setTimeout(r, 600));
        await this.sendAIMessage(msg.text);
        if (input) input.value = '';
      }
    });
  },

  addBotMessage(text) {
    const msgs = document.getElementById('aiMessages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'ai-msg bot';
    const ts = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    div.innerHTML = `<div class="ai-bubble">${renderMarkdown(text)}</div><div class="ai-ts">${ts}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  },

  addUserMessage(text) {
    const msgs = document.getElementById('aiMessages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'ai-msg user';
    const ts = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    div.innerHTML = `<div class="ai-bubble">${escapeHtml(text)}</div><div class="ai-ts">${ts}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  },

  showTyping() {
    const msgs = document.getElementById('aiMessages');
    const t = document.createElement('div');
    t.id = 'typingIndicator';
    t.className = 'ai-msg bot ai-typing';
    t.innerHTML = '<div class="ai-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
    msgs?.appendChild(t);
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  },

  removeTyping() { 
    document.getElementById('typingIndicator')?.remove(); 
  },

  async sendAIMessage(text) {
    if (!text.trim()) return;
    this.addUserMessage(text);
    this.showTyping();
    await new Promise(r => setTimeout(r, 700 + Math.random() * 400));
    this.removeTyping();
    const result = aiService.processCommand(text);
    this.addBotMessage(result.message);

    if (result.action === 'added') {
      window.dispatchEvent(new CustomEvent('bloom:dataUpdated'));
      window.dispatchEvent(new CustomEvent('bloom:flashColumn', { detail: result.category }));
    }
  },

  initVoice() {
    const voiceBtn = document.getElementById('voiceBtn');
    let recognition = null;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { 
      if (voiceBtn) voiceBtn.title = 'Reconhecimento de voz não suportado';
      return; 
    }
    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = e => {
      const text = e.results[0][0].transcript;
      const input = document.getElementById('aiInput');
      if (input) input.value = text;
      this.sendAIMessage(text);
      if (input) { input.value = ''; }
    };
    recognition.onend = () => voiceBtn?.classList.remove('listening');
    recognition.onerror = () => voiceBtn?.classList.remove('listening');

    voiceBtn?.addEventListener('click', () => {
      if (voiceBtn.classList.contains('listening')) {
        recognition?.stop();
        voiceBtn.classList.remove('listening');
      } else {
        try { recognition?.start(); voiceBtn.classList.add('listening'); } catch {}
      }
    });
  }
};
