import './Home.css';
import { initParticles } from '../../utils/particles';

export const Home = {
  render() {
    const div = document.createElement('div');
    div.id = 'homePage';
    div.className = 'home-page';
    div.innerHTML = `
      <canvas id="particlesCanvas" class="particles-bg" aria-hidden="true"></canvas>
      <nav class="home-nav" aria-label="Navegação principal">
        <div class="home-brand">
          <div class="brand-mark" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 3C14 3 5 8 5 15C5 20.5 9 25 14 25C19 25 23 20.5 23 15C23 8 14 3 14 3Z" fill="url(#bloomGrad)"/>
              <path d="M14 10C14 10 10 12.5 10 16C10 18.8 11.8 21 14 21C16.2 21 18 18.8 18 16C18 12.5 14 10 14 10Z" fill="white" fill-opacity="0.9"/>
              <defs>
                <linearGradient id="bloomGrad" x1="5" y1="3" x2="23" y2="25" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#7C6AFF"/>
                  <stop offset="1" stop-color="#B06EFF"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span class="brand-name">Bloom Finance</span>
        </div>
        <div class="home-nav-links">
          <a href="#why" class="nav-link">Por que Bloom?</a>
          <a href="#features" class="nav-link">Funcionalidades</a>
          <button class="btn-nav-cta" id="btnEnterFromNav">Entrar no Workspace →</button>
        </div>
      </nav>

      <section class="hero" id="hero" aria-labelledby="heroTitle">
        <div class="hero-glow glow-1" aria-hidden="true"></div>
        <div class="hero-glow glow-2" aria-hidden="true"></div>

        <div class="hero-3d" aria-hidden="true" id="hero3D">
          <div class="float-card float-card-1">
            <div class="fc-icon">📊</div>
            <div class="fc-text">
              <div class="fc-label">Almoço</div>
              <div class="fc-val">R$ 416,39</div>
            </div>
          </div>
          <div class="float-card float-card-2">
            <div class="fc-icon">🤖</div>
            <div class="fc-text">
              <div class="fc-label">IA Detectou</div>
              <div class="fc-val">+R$ 22,50</div>
            </div>
            <div class="fc-badge">Novo</div>
          </div>
          <div class="float-card float-card-3">
            <div class="fc-icon">📈</div>
            <div class="fc-text">
              <div class="fc-label">Maior Gasto</div>
              <div class="fc-val">Almoço</div>
            </div>
          </div>
          <div class="central-orb">
            <div class="orb-inner">
              <svg width="40" height="40" viewBox="0 0 28 28" fill="none">
                <path d="M14 3C14 3 5 8 5 15C5 20.5 9 25 14 25C19 25 23 20.5 23 15C23 8 14 3 14 3Z" fill="url(#bloomGrad2)"/>
                <path d="M14 10C14 10 10 12.5 10 16C10 18.8 11.8 21 14 21C16.2 21 18 18.8 18 16C18 12.5 14 10 14 10Z" fill="white" fill-opacity="0.9"/>
                <defs>
                  <linearGradient id="bloomGrad2" x1="5" y1="3" x2="23" y2="25" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#A78BFA"/>
                    <stop offset="1" stop-color="#C084FC"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div class="hero-copy" id="heroCopy">
          <div class="hero-badge" role="note">✦ IA Integrada com Voz</div>
          <h1 id="heroTitle" class="hero-title">
            Entenda seus<br/>
            <span class="hero-gradient">gastos em segundos.</span>
          </h1>
          <p class="hero-sub">
            Bloom Finance transforma registros financeiros em inteligência real.<br/>
            Fale, escreva ou clique — a planilha se atualiza instantaneamente.
          </p>
          <div class="hero-actions">
            <button class="btn-enter" id="btnEnterMain">
              <span>Entrar no Workspace</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button class="btn-ghost" id="btnDemoHome">Ver demonstração</button>
          </div>
          <div class="hero-social-proof">
            <div class="proof-item"><span class="proof-icon">⚡</span> <span>Planilha em tempo real</span></div>
            <div class="proof-item"><span class="proof-icon">🎙️</span> <span>Entrada por voz</span></div>
            <div class="proof-item"><span class="proof-icon">🔒</span> <span>100% no seu navegador</span></div>
          </div>
        </div>
      </section>

      <section class="why-section" id="why" aria-labelledby="whyTitle">
        <div class="why-inner">
          <div class="section-label">Por que o Bloom existe?</div>
          <h2 id="whyTitle" class="why-title">Não é mais um app financeiro.</h2>
          <p class="why-body">
            O Bloom Finance nasceu de uma necessidade real. Em vez de criar mais um aplicativo financeiro, o objetivo foi desenvolver uma ferramenta focada em entender <strong>padrões de consumo</strong>, simplificar o registro de despesas com IA e transformar uma planilha tradicional em uma experiência inteligente, intuitiva e agradável de usar.
          </p>
          <div class="why-grid">
            <div class="why-card">
              <div class="why-icon" aria-hidden="true">🔍</div>
              <h3>Clareza total</h3>
              <p>Visualize exatamente onde seu dinheiro vai, por categoria, sem tabelas confusas ou gráficos abstratos.</p>
            </div>
            <div class="why-card">
              <div class="why-icon" aria-hidden="true">🤖</div>
              <h3>IA que entende você</h3>
              <p>Fale naturalmente. "Gastei 22 reais com almoço." A IA captura e registra, sem formulários.</p>
            </div>
            <div class="why-card">
              <div class="why-icon" aria-hidden="true">⚡</div>
              <h3>Velocidade acima de tudo</h3>
              <p>Nenhuma fricção. Cada interação foi pensada para ser mais rápida e prazerosa do que qualquer alternativa.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section" id="features" aria-labelledby="featuresTitle">
        <div class="features-inner">
          <div class="section-label">Funcionalidades</div>
          <h2 id="featuresTitle" class="features-title">Tudo que você precisa.</h2>
          <div class="features-list">
            <div class="feature-row">
              <div class="feature-icon" aria-hidden="true">📋</div>
              <div class="feature-text">
                <h3>Planilha Inteligente</h3>
                <p>Colunas por categoria, totais automáticos, rolagem horizontal fluida. Inspirado em Notion e Airtable, mas pensado exclusivamente para finanças pessoais.</p>
              </div>
            </div>
            <div class="feature-row">
              <div class="feature-icon" aria-hidden="true">🧠</div>
              <div class="feature-text">
                <h3>IA na Lateral</h3>
                <p>Um assistente sempre visível que analisa seus padrões, responde perguntas e registra despesas por texto ou voz com processamento em linguagem natural.</p>
              </div>
            </div>
            <div class="feature-row">
              <div class="feature-icon" aria-hidden="true">💰</div>
              <div class="feature-text">
                <h3>Valores a Receber</h3>
                <p>Controle quem precisa te pagar. Marque como recebido com um clique. Os valores somem da lista automaticamente.</p>
              </div>
            </div>
            <div class="feature-row">
              <div class="feature-icon" aria-hidden="true">📄</div>
              <div class="feature-text">
                <h3>Relatórios Instantâneos</h3>
                <p>Exporte em PDF, CSV ou JSON com um clique. Dados reais, formatados profissionalmente.</p>
              </div>
            </div>
          </div>
          <button class="btn-enter" id="btnEnterBottom" style="margin-top:40px; display:inline-flex;">
            <span>Entrar no Workspace</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      <footer class="home-footer">
        <div class="brand-name" style="font-size:0.9rem; opacity:0.5;">Bloom Finance</div>
        <div style="font-size:0.78rem; opacity:0.3; margin-top:4px;">Desenvolvido com foco em experiência do usuário.</div>
      </footer>
    `;

    return div;
  },

  init() {
    const enterWorkspace = () => {
      if (window.navigateToApp) window.navigateToApp();
    };

    document.getElementById('btnEnterFromNav')?.addEventListener('click', enterWorkspace);
    document.getElementById('btnEnterMain')?.addEventListener('click', enterWorkspace);
    document.getElementById('btnEnterBottom')?.addEventListener('click', enterWorkspace);
    
    document.getElementById('btnDemoHome')?.addEventListener('click', () => {
      enterWorkspace();
      setTimeout(() => {
        const demoBtn = document.getElementById('btnDemoAI');
        if (demoBtn) demoBtn.click();
      }, 800);
    });

    // 3D Tilt effect
    const hero3D = document.getElementById('hero3D');
    const heroCopy = document.getElementById('heroCopy');
    
    this.mouseMoveHandler = (e) => {
      if (!hero3D) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = ((e.clientY - cy) / cy) * -10;
      const ry = ((e.clientX - cx) / cx) * 10;
      hero3D.style.transform  = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (heroCopy) heroCopy.style.transform = `translateX(${ry * 0.3}px) translateY(${rx * 0.3}px)`;
    };

    document.addEventListener('mousemove', this.mouseMoveHandler);
    this.cleanupParticles = initParticles('particlesCanvas');
  },

  destroy() {
    if (this.cleanupParticles) this.cleanupParticles();
    if (this.mouseMoveHandler) {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
    }
  }
};
