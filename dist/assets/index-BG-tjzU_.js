var e=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=e((()=>{})),r=e((()=>{})),i=e((()=>{})),a,o,s,c=e((()=>{a=[{name:`Metrô`,emoji:`🚇`},{name:`Ônibus`,emoji:`🚌`},{name:`Lanche Faculdade`,emoji:`🥐`},{name:`Almoço`,emoji:`🍽️`},{name:`Lanche`,emoji:`🥪`},{name:`Lanche com amigas`,emoji:`👯‍♀️`},{name:`Lanche pessoal`,emoji:`🍟`},{name:`Coca-Cola`,emoji:`🥤`},{name:`Sorvete`,emoji:`🍦`},{name:`Padaria`,emoji:`🥖`},{name:`Gastos pessoais`,emoji:`💸`},{name:`Cabelo`,emoji:`💇`},{name:`Riachuelo`,emoji:`👗`},{name:`Uber`,emoji:`🚗`},{name:`Janta`,emoji:`🌙`},{name:`Desconhecido`,emoji:`❓`}],o=[{name:`Alimentação`,emoji:`🍽️`},{name:`Transporte`,emoji:`🚇`},{name:`Lazer`,emoji:`🎮`},{name:`Compras`,emoji:`🛍️`}],s={transactions:[{id:`d1`,category:`Alimentação`,amount:85.5,date:new Date().toISOString().slice(0,10)},{id:`d2`,category:`Alimentação`,amount:42,date:new Date().toISOString().slice(0,10)},{id:`d3`,category:`Transporte`,amount:25,date:new Date().toISOString().slice(0,10)},{id:`d4`,category:`Transporte`,amount:18.5,date:new Date().toISOString().slice(0,10)},{id:`d5`,category:`Lazer`,amount:120,date:new Date().toISOString().slice(0,10)},{id:`d6`,category:`Compras`,amount:89.9,date:new Date().toISOString().slice(0,10)}],receivables:[{id:`r1`,person:`Pessoa A`,description:`Jantar`,amount:45},{id:`r2`,person:`Pessoa B`,description:`Transporte`,amount:22}]}}));function l(){return`_`+Math.random().toString(36).slice(2,9)}function u(){return new Date().toISOString().slice(0,10)}function d(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function f(e,t,n){let r=document.createElement(`a`);r.href=URL.createObjectURL(new Blob([t],{type:n})),r.download=e,r.click()}var p=e((()=>{})),m,h=e((()=>{c(),p(),m={STORAGE_KEY:`bloom_v3`,load(){try{let e=JSON.parse(localStorage.getItem(this.STORAGE_KEY));if(e)return e}catch(e){console.error(`Error loading data from localStorage`,e)}return null},save(e,t){localStorage.setItem(this.STORAGE_KEY,JSON.stringify({state:e,settings:t}))},seedRealData(){let e=[],t=[],n=(t,n)=>n.forEach(n=>e.push({id:l(),category:t,amount:n,date:u()}));return n(`Metrô`,[5.8,5.8,5.8,5.8,11.6,11.6,11.8,11.6,11.6,6]),n(`Ônibus`,[94.8,39]),n(`Lanche Faculdade`,[10.5,11.5,10.5,22.6,11.9,10.5,6.3,2.2,9.1,8.3,6.1,20,4,3.6,10.5,10.5,2.2]),n(`Almoço`,[9.99,22.5,15.99,48.5,12.7,15.75,40,15.3,26.99,47,21,60,8.98,10.99,58,2.7]),n(`Lanche com amigas`,[86]),n(`Lanche pessoal`,[17.99,54]),n(`Gastos pessoais`,[44,22,55,35]),n(`Desconhecido`,[69.8,13.9,29,54,45]),n(`Janta`,[37]),n(`Cabelo`,[270]),n(`Riachuelo`,[40]),n(`Uber`,[21.94]),n(`Sorvete`,[19.5]),n(`Padaria`,[13.5]),n(`Coca-Cola`,[21.47,23]),t.push({id:l(),person:`Pai`,description:`Sorvete`,amount:19.5},{id:l(),person:`Pai`,description:`Padaria`,amount:13.5},{id:l(),person:`Mãe`,description:`Coca-Cola`,amount:21.47},{id:l(),person:`Mãe`,description:`Uber`,amount:21.94},{id:l(),person:`Mãe`,description:`Cabelo`,amount:270},{id:l(),person:`Mãe`,description:`Riachuelo`,amount:40},{id:l(),person:`Mãe`,description:`Coca-Cola`,amount:23}),{transactions:e,receivables:t,categories:[...a]}},wipeData(){localStorage.removeItem(this.STORAGE_KEY),window.location.reload()}}})),g,_=e((()=>{h(),g={data:{transactions:[],receivables:[],categories:[]},settings:{themeDark:!1},presentationMode:!1,init(){let e=m.load();if(e)this.data.transactions=e.state.transactions,this.data.receivables=e.state.receivables,this.data.categories=e.state.categories,this.settings=e.settings||this.settings;else{let e=m.seedRealData();this.data=e,this.save()}},save(){m.save(this.data,this.settings)},getTransactions(){return this.data.transactions},addTransaction(e){this.data.transactions.push(e),this.save()},removeTransaction(e){this.data.transactions=this.data.transactions.filter(t=>t.id!==e),this.save()},addCategory(e){this.data.categories.push(e),this.save()},removeReceivable(e){this.data.receivables=this.data.receivables.filter(t=>t.id!==e),this.save()}}})),v=e((()=>{})),y,b=e((()=>{v(),y={render(){let e=document.createElement(`div`);return e.id=`homePage`,e.className=`home-page`,e.innerHTML=`
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
    `,e},init(){let e=()=>{window.navigateToApp&&window.navigateToApp()};document.getElementById(`btnEnterFromNav`)?.addEventListener(`click`,e),document.getElementById(`btnEnterMain`)?.addEventListener(`click`,e),document.getElementById(`btnEnterBottom`)?.addEventListener(`click`,e),document.getElementById(`btnDemoHome`)?.addEventListener(`click`,()=>{e(),setTimeout(()=>{let e=document.getElementById(`btnDemoAI`);e&&e.click()},800)});let t=document.getElementById(`hero3D`),n=document.getElementById(`heroCopy`);this.mouseMoveHandler=e=>{if(!t)return;let r=window.innerWidth/2,i=window.innerHeight/2,a=(e.clientY-i)/i*-10,o=(e.clientX-r)/r*10;t.style.transform=`rotateX(${a}deg) rotateY(${o}deg)`,n&&(n.style.transform=`translateX(${o*.3}px) translateY(${a*.3}px)`)},document.addEventListener(`mousemove`,this.mouseMoveHandler)},destroy(){this.mouseMoveHandler&&document.removeEventListener(`mousemove`,this.mouseMoveHandler)}}})),x=e((()=>{})),S=e((()=>{}));function C(e){return e.toLocaleString(`pt-BR`,{style:`currency`,currency:`BRL`})}function w(e){return e.replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.*?)\*/g,`<em>$1</em>`).replace(/\n/g,`<br>`)}var T=e((()=>{})),E,D=e((()=>{_(),p(),T(),E={processCommand(e){let t=e.toLowerCase().trim(),n=g.getTransactions(),r=t.match(/(?:gastei|paguei|comprei|deu|custou|paguei)\s+(?:r\$\s*)?(\d+(?:[.,]\d{1,2})?)\s+(?:com|de|no|na|em|reais?\s+com)?\s*(.+)/);if(r){let e=parseFloat(r[1].replace(`,`,`.`)),t=r[2].trim(),n=g.data.categories.find(e=>t.includes(e.name.toLowerCase()));if(!n){for(let[e,r]of Object.entries({comida:`Almoço`,uber:`Uber`,metro:`Metrô`,metrô:`Metrô`,onibus:`Ônibus`,ônibus:`Ônibus`,roupa:`Riachuelo`,cabelereiro:`Cabelo`,salão:`Cabelo`,lanche:`Lanche`,cerveja:`Lanche pessoal`,delivery:`Almoço`,ifood:`Almoço`}))if(t.includes(e)){n={name:r};break}}n||={name:`Desconhecido`};let i={id:l(),category:n.name,amount:e,date:u()};return g.addTransaction(i),{action:`added`,category:n.name,message:`✅ Adicionei **${C(e)}** em **${n.name}**! A planilha foi atualizada.`}}if(/resumo|total|quanto gastei/.test(t)){let e=n.reduce((e,t)=>e+t.amount,0),t=this.getTopCat(n);return{action:`query`,message:`📊 Resumo do mês:\n- **Total gasto**: ${C(e)}\n- **Maior categoria**: ${t?`${t.name} (${C(t.total)})`:`N/A`}\n- **Registros**: ${n.length} itens`}}if(/maior gasto/.test(t)){let e=this.getTopCat(n);return{action:`query`,message:e?`🔍 Seu maior gasto é **${e.name}** com **${C(e.total)}**.`:`Sem dados para analisar.`}}if(/economizar|reduzir|cortar/.test(t)){let e=this.getTopCat(n);return{action:`query`,message:e?`💡 Sua principal oportunidade de economia está em **${e.name}** (${C(e.total)}). Reduzir 20% nessa categoria economizaria cerca de **${C(e.total*.2)}** por mês.`:`Adicione mais registros para análise.`}}return{action:`unknown`,message:`🤔 Não entendi completamente. Tente:
- *"Gastei 15 com almoço"*
- *"Qual meu maior gasto?"*
- *"Resumo dos meus gastos"*`}},getTopCat(e){let t={};e.forEach(e=>t[e.category]=(t[e.category]||0)+e.amount);let n=Object.entries(t).sort((e,t)=>t[1]-e[1]);return n.length?{name:n[0][0],total:n[0][1]}:null}}})),O,k=e((()=>{S(),D(),p(),T(),O={render(){let e=document.createElement(`aside`);return e.className=`app-sidebar`,e.setAttribute(`aria-label`,`Assistente IA`),e.innerHTML=`
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
    `,e},init(){this.addBotMessage(`Olá! 👋 Sou a **Bloom AI**. Posso registrar gastos, responder perguntas e analisar seus padrões financeiros.

Tente: *"Gastei 22 com almoço"* ou clique em uma sugestão.`),document.getElementById(`btnAISend`)?.addEventListener(`click`,()=>{let e=document.getElementById(`aiInput`),t=e.value.trim();t&&(this.sendAIMessage(t),e.value=``,e.style.height=`auto`)}),document.getElementById(`aiInput`)?.addEventListener(`keydown`,e=>{if(e.key===`Enter`&&!e.shiftKey){e.preventDefault();let t=e.target,n=t.value.trim();n&&(this.sendAIMessage(n),t.value=``,t.style.height=`auto`)}setTimeout(()=>{let e=document.getElementById(`aiInput`);e&&(e.style.height=`auto`,e.style.height=Math.min(e.scrollHeight,80)+`px`)},0)}),document.querySelectorAll(`.suggestion`).forEach(e=>{e.addEventListener(`click`,()=>this.sendAIMessage(e.dataset.q))}),document.getElementById(`btnClearChat`)?.addEventListener(`click`,()=>{let e=document.getElementById(`aiMessages`);e&&(e.innerHTML=``),this.addBotMessage(`Chat limpo! Como posso ajudar?`)}),this.initVoice(),window.addEventListener(`bloom:demoAI`,async()=>{for(let e of[{delay:500,text:`🎬 Iniciando demonstração…`},{delay:1200,text:`Gastei 35 com almoço`},{delay:2500,text:`Qual meu maior gasto?`},{delay:4e3,text:`Onde posso economizar?`},{delay:5500,text:`Resumo dos meus gastos`}]){if(await new Promise(t=>setTimeout(t,e.delay)),e.text.startsWith(`🎬`)){this.addBotMessage(e.text);continue}let t=document.getElementById(`aiInput`);t&&(t.value=e.text),await new Promise(e=>setTimeout(e,600)),await this.sendAIMessage(e.text),t&&(t.value=``)}})},addBotMessage(e){let t=document.getElementById(`aiMessages`);if(!t)return;let n=document.createElement(`div`);n.className=`ai-msg bot`;let r=new Date().toLocaleTimeString(`pt-BR`,{hour:`2-digit`,minute:`2-digit`});n.innerHTML=`<div class="ai-bubble">${w(e)}</div><div class="ai-ts">${r}</div>`,t.appendChild(n),t.scrollTop=t.scrollHeight},addUserMessage(e){let t=document.getElementById(`aiMessages`);if(!t)return;let n=document.createElement(`div`);n.className=`ai-msg user`;let r=new Date().toLocaleTimeString(`pt-BR`,{hour:`2-digit`,minute:`2-digit`});n.innerHTML=`<div class="ai-bubble">${d(e)}</div><div class="ai-ts">${r}</div>`,t.appendChild(n),t.scrollTop=t.scrollHeight},showTyping(){let e=document.getElementById(`aiMessages`),t=document.createElement(`div`);t.id=`typingIndicator`,t.className=`ai-msg bot ai-typing`,t.innerHTML=`<div class="ai-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`,e?.appendChild(t),e&&(e.scrollTop=e.scrollHeight)},removeTyping(){document.getElementById(`typingIndicator`)?.remove()},async sendAIMessage(e){if(!e.trim())return;this.addUserMessage(e),this.showTyping(),await new Promise(e=>setTimeout(e,700+Math.random()*400)),this.removeTyping();let t=E.processCommand(e);this.addBotMessage(t.message),t.action===`added`&&(window.dispatchEvent(new CustomEvent(`bloom:dataUpdated`)),window.dispatchEvent(new CustomEvent(`bloom:flashColumn`,{detail:t.category})))},initVoice(){let e=document.getElementById(`voiceBtn`),t=null,n=window.SpeechRecognition||window.webkitSpeechRecognition;if(!n){e&&(e.title=`Reconhecimento de voz não suportado`);return}t=new n,t.lang=`pt-BR`,t.continuous=!1,t.interimResults=!1,t.onresult=e=>{let t=e.results[0][0].transcript,n=document.getElementById(`aiInput`);n&&(n.value=t),this.sendAIMessage(t),n&&(n.value=``)},t.onend=()=>e?.classList.remove(`listening`),t.onerror=()=>e?.classList.remove(`listening`),e?.addEventListener(`click`,()=>{if(e.classList.contains(`listening`))t?.stop(),e.classList.remove(`listening`);else try{t?.start(),e.classList.add(`listening`)}catch{}})}}})),A=e((()=>{})),j,M=e((()=>{A(),_(),j={render(){let e=document.createElement(`header`);return e.className=`app-topbar`,e.setAttribute(`role`,`banner`),e.innerHTML=`
      <div class="topbar-left">
        <button class="brand-back" id="btnBackHome" title="Voltar à home" aria-label="Voltar à home">
          <div class="brand-mark-sm" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <path d="M14 3C14 3 5 8 5 15C5 20.5 9 25 14 25C19 25 23 20.5 23 15C23 8 14 3 14 3Z" fill="url(#bgs)"/>
              <path d="M14 10C14 10 10 12.5 10 16C10 18.8 11.8 21 14 21C16.2 21 18 18.8 18 16C18 12.5 14 10 14 10Z" fill="white" fill-opacity="0.9"/>
              <defs><linearGradient id="bgs" x1="5" y1="3" x2="23" y2="25" gradientUnits="userSpaceOnUse"><stop stop-color="#7C6AFF"/><stop offset="1" stop-color="#B06EFF"/></linearGradient></defs>
            </svg>
          </div>
          <span class="brand-name-sm">Bloom</span>
        </button>

        <nav class="app-nav" aria-label="Abas da aplicação">
          <button class="app-tab active" data-page="spreadsheet" id="tab-spreadsheet">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            Planilha
          </button>
          <button class="app-tab" data-page="receivables" id="tab-receivables">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            A Receber
          </button>
          <button class="app-tab" data-page="reports" id="tab-reports">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Relatórios
          </button>
          <button class="app-tab" data-page="settings" id="tab-settings">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            Ajustes
          </button>
        </nav>
      </div>

      <div class="topbar-right">
        <div class="search-box">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="searchInput" class="search-field" placeholder="Buscar..." aria-label="Buscar transações" />
        </div>
        <div class="balance-pill" id="balancePill" title="Saldo disponível">R$ 171,72</div>
        <button class="btn-demo-ai" id="btnDemoAI" title="Ver demonstração da IA">✨ Demonstrar IA</button>
        <button class="topbar-icon-btn" id="btnPresentMode" title="Modo Apresentação">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </button>
      </div>
      
      <!-- Presentation Banner -->
      <div class="present-banner" id="presentBanner" style="display:none;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/></svg>
        Modo Apresentação ativo — dados fictícios visíveis
        <button id="btnExitPresent">Sair</button>
      </div>
    `,e},init(){let e=[`spreadsheet`,`receivables`,`reports`,`settings`];document.getElementById(`btnBackHome`)?.addEventListener(`click`,()=>{window.navigateToHome&&window.navigateToHome()}),document.querySelectorAll(`.app-tab`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.dataset.page;e.forEach(e=>{document.getElementById(`tab-${e}`)?.classList.toggle(`active`,e===n),document.getElementById(`page-${e}`)?.classList.toggle(`active`,e===n)})})}),document.getElementById(`searchInput`)?.addEventListener(`input`,e=>{window.dispatchEvent(new CustomEvent(`bloom:search`,{detail:e.target.value}))}),document.getElementById(`btnDemoAI`)?.addEventListener(`click`,()=>{document.getElementById(`tab-spreadsheet`)?.click(),window.dispatchEvent(new CustomEvent(`bloom:demoAI`))});let t=()=>{g.presentationMode=!g.presentationMode;let e=document.getElementById(`btnPresentMode`),t=document.getElementById(`presentBanner`);e?.classList.toggle(`active`,g.presentationMode),t&&(t.style.display=g.presentationMode?`flex`:`none`),window.dispatchEvent(new CustomEvent(`bloom:presentationToggled`))};document.getElementById(`btnPresentMode`)?.addEventListener(`click`,t),document.getElementById(`btnExitPresent`)?.addEventListener(`click`,()=>{g.presentationMode&&t()})}}})),N=e((()=>{})),P,F=e((()=>{N(),_(),T(),c(),p(),P={searchQuery:``,render(){let e=document.createElement(`div`);return e.className=`spreadsheet-container`,e.innerHTML=`
      <div class="sp-header">
        <h1 class="sp-title">Planilha Inteligente</h1>
        <div class="sp-subtitle" id="spreadsheetSub">Carregando...</div>
      </div>
      <div class="sp-wrapper">
        <div class="sp-grid" id="spreadsheetTable"></div>
        <button class="sp-col-add" id="btnAddCategory" title="Nova Categoria">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
    `,e},init(){this.renderTable(),document.getElementById(`btnAddCategory`)?.addEventListener(`click`,()=>{let e=prompt(`Nome da nova categoria (ex: Academia):`);if(e?.trim()){if(g.data.categories.find(t=>t.name===e.trim())){alert(`Categoria já existe!`);return}g.addCategory({name:e.trim(),emoji:`📦`}),this.renderTable()}}),window.addEventListener(`bloom:search`,e=>{this.searchQuery=e.detail,this.renderTable()}),window.addEventListener(`bloom:dataUpdated`,()=>this.renderTable()),window.addEventListener(`bloom:presentationToggled`,()=>this.renderTable()),window.addEventListener(`bloom:flashColumn`,e=>{let t=e.detail.replace(/[^a-zA-Z0-9]/g,`_`),n=document.getElementById(`col_${t}`);n&&(n.scrollIntoView({behavior:`smooth`,inline:`center`}),n.classList.remove(`flash`),n.offsetWidth,n.classList.add(`flash`))}),window.deleteTx=e=>{g.removeTransaction(e),this.renderTable()},window.openAddForm=e=>{let t=e.replace(/[^a-zA-Z0-9]/g,`_`),n=document.getElementById(`body_${t}`);if(!n)return;document.querySelectorAll(`.inline-add-form`).forEach(e=>e.remove());let r=document.createElement(`div`);r.className=`inline-add-form`,r.innerHTML=`
        <input type="number" step="0.01" min="0.01" class="inline-add-input" id="inlineInput_${t}" placeholder="Ex: 22.50" aria-label="Valor do gasto" />
        <button class="inline-add-btn" onclick="submitAdd('${e}','${t}')">✓</button>
        <button class="inline-cancel-btn" onclick="this.parentElement.remove()">✕</button>
      `,n.parentElement.insertBefore(r,n.nextSibling.nextSibling),document.getElementById(`inlineInput_${t}`)?.focus(),document.getElementById(`inlineInput_${t}`)?.addEventListener(`keydown`,n=>{n.key===`Enter`&&window.submitAdd(e,t),n.key===`Escape`&&r.remove()})},window.submitAdd=(e,t)=>{let n=document.getElementById(`inlineInput_${t}`);if(!n)return;let r=parseFloat(n.value.replace(`,`,`.`));isNaN(r)||r<=0||(g.addTransaction({id:l(),category:e,amount:r,date:u()}),document.querySelector(`.inline-add-form`)?.remove(),this.renderTable(),setTimeout(()=>{let e=document.getElementById(`body_${t}`);e?.lastElementChild&&e.lastElementChild.classList.add(`new-item`)},50))}},getActiveTxs(){return g.presentationMode?s.transactions:g.getTransactions()},getActiveCategories(){return g.presentationMode?o:g.data.categories},getEmoji(e){return([...g.data.categories,...o].find(t=>t.name===e)||{emoji:`📦`}).emoji},renderTable(){let e=document.getElementById(`spreadsheetTable`);if(!e)return;let t=this.getActiveTxs(),n=this.getActiveCategories(),r=this.searchQuery.toLowerCase().trim(),i={};n.forEach(e=>{i[e.name]=[]}),t.forEach(e=>{i[e.category]||(i[e.category]=[]),i[e.category].push(e)});let a=t.reduce((e,t)=>e+t.amount,0),o=document.getElementById(`spreadsheetSub`);o&&(o.textContent=`${t.length} registros · Total: ${C(a)}`);let s=``;Object.keys(i).forEach(e=>{let t=i[e],n=this.getEmoji(e);if(r&&!e.toLowerCase().includes(r)&&(t=t.filter(e=>e.amount.toString().includes(r)),t.length===0&&!e.toLowerCase().includes(r)))return;let a=t.reduce((e,t)=>e+t.amount,0),o=t.map(e=>`
        <div class="sp-row" data-id="${e.id}">
          <span class="sp-row-val">${C(e.amount)}</span>
          <button class="sp-row-del" onclick="deleteTx('${e.id}')" title="Remover" aria-label="Remover">✕</button>
        </div>
      `).join(``),c=e.replace(/[^a-zA-Z0-9]/g,`_`);s+=`
        <div class="sp-col" id="col_${c}">
          <div class="sp-col-header">
            <div class="col-name-wrap">
              <span class="col-emoji" aria-hidden="true">${n}</span>
              <span class="col-name">${e}</span>
            </div>
            <span class="col-count-badge" aria-label="${t.length} itens">${t.length}</span>
          </div>
          <div class="sp-col-body" id="body_${c}">${o}</div>
          <button class="sp-row-add" onclick="openAddForm('${e}')" aria-label="Adicionar em ${e}">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Adicionar
          </button>
          <div class="sp-col-footer">
            <div class="col-total-label">Total</div>
            <div class="col-total-val" id="total_${c}">${C(a)}</div>
          </div>
        </div>
      `}),e.innerHTML=s}}})),I=e((()=>{})),L,R=e((()=>{I(),_(),T(),c(),L={render(){let e=document.createElement(`div`);return e.className=`receivables-container`,e.innerHTML=`
      <div class="rec-header">
        <h1 class="rec-title">Valores a Receber</h1>
        <div class="rec-subtitle">Acompanhe quem precisa te pagar</div>
      </div>
      <div class="rec-grid" id="receivablesGrid"></div>
    `,e},init(){this.renderGrid(),window.markReceived=e=>{g.removeReceivable(e),this.renderGrid()},window.addEventListener(`bloom:presentationToggled`,()=>this.renderGrid())},renderGrid(){let e=document.getElementById(`receivablesGrid`);if(!e)return;let t=g.presentationMode?s.receivables:g.data.receivables;if(!t.length){e.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-3);">🎉 Nenhum valor pendente para receber!</div>`;return}let n={};t.forEach(e=>{n[e.person]||(n[e.person]=[]),n[e.person].push(e)}),e.innerHTML=Object.keys(n).map(e=>{let t=n[e];return`
        <div class="rec-card">
          <div class="rec-card-header">
            <span class="rec-name">${e}</span>
            <span class="rec-total">${C(t.reduce((e,t)=>e+t.amount,0))}</span>
          </div>
          <div class="rec-list">
            ${t.map(e=>`
              <div class="rec-item">
                <div class="rec-item-info">
                  <span class="rec-item-desc">${e.description}</span>
                  <span class="rec-item-val">${C(e.amount)}</span>
                </div>
                <button class="btn-paid" onclick="markReceived('${e.id}')" aria-label="Marcar ${e.description} como recebido">Recebido ✓</button>
              </div>
            `).join(``)}
          </div>
        </div>
      `}).join(``)}}})),z=e((()=>{})),B,V=e((()=>{_(),p(),T(),B={exportCSV(){let e=[[`Categoria`,`Valor (R$)`,`Data`],...g.getTransactions().map(e=>[e.category,e.amount.toFixed(2).replace(`.`,`,`),e.date])].map(e=>e.join(`;`)).join(`
`);f(`bloom-${u()}.csv`,`﻿`+e,`text/csv;charset=utf-8;`)},exportJSON(){f(`bloom-backup-${u()}.json`,JSON.stringify(g.data,null,2),`application/json`)},exportPDF(e){let t=g.getTransactions(),n={};t.forEach(e=>n[e.category]=(n[e.category]||0)+e.amount);let r=t.reduce((e,t)=>e+t.amount,0),i=document.getElementById(e);if(!i)return;let a=i.querySelector(`.pdf-content`);a&&(a.innerHTML=`
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead><tr style="background:#F4F4F6;">
          <th style="padding:10px;text-align:left;border-bottom:1px solid #ddd;">Categoria</th>
          <th style="padding:10px;text-align:right;border-bottom:1px solid #ddd;">Total</th>
          <th style="padding:10px;text-align:right;border-bottom:1px solid #ddd;">% do total</th>
        </tr></thead>
        <tbody>
          ${Object.entries(n).sort((e,t)=>t[1]-e[1]).map(([e,t])=>`
            <tr>
              <td style="padding:9px 10px;border-bottom:1px solid #eee;">${e}</td>
              <td style="padding:9px 10px;border-bottom:1px solid #eee;text-align:right;font-weight:600;">${C(t)}</td>
              <td style="padding:9px 10px;border-bottom:1px solid #eee;text-align:right;color:#666;">${(t/r*100).toFixed(1)}%</td>
            </tr>`).join(``)}
          <tr style="font-weight:800;background:#F4F4F6;">
            <td style="padding:12px 10px;">TOTAL</td>
            <td style="padding:12px 10px;text-align:right;">${C(r)}</td>
            <td style="padding:12px 10px;text-align:right;">100%</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size:11px;color:#999;margin-top:20px;">Gerado por Bloom Finance em ${new Date().toLocaleDateString(`pt-BR`)}.</p>`,i.style.display=`block`,window.html2pdf?.().set({margin:12,filename:`bloom-relatorio-${u()}.pdf`,html2canvas:{scale:2},jsPDF:{unit:`mm`,format:`a4`}}).from(i).save().then(()=>{i.style.display=`none`}))}}})),H,U=e((()=>{z(),V(),H={render(){let e=document.createElement(`div`);return e.className=`reports-container`,e.innerHTML=`
      <div class="rep-header">
        <h1 class="rep-title">Relatórios e Exportação</h1>
        <div class="rep-subtitle">Exporte seus dados com um clique</div>
      </div>
      
      <div class="export-grid">
        <div class="export-card">
          <div class="exp-icon">📄</div>
          <h3>Relatório PDF</h3>
          <p>Gera um documento formatado com totais por categoria.</p>
          <button class="btn-exp" id="btnExportPDF">Exportar PDF</button>
        </div>
        <div class="export-card">
          <div class="exp-icon">📊</div>
          <h3>Exportar CSV</h3>
          <p>Para abrir no Excel, Google Sheets ou Apple Numbers.</p>
          <button class="btn-exp" id="btnExportCSV">Baixar CSV</button>
        </div>
        <div class="export-card">
          <div class="exp-icon">💾</div>
          <h3>Backup JSON</h3>
          <p>Exporta o banco de dados completo (backup).</p>
          <button class="btn-exp" id="btnExportJSON">Baixar JSON</button>
        </div>
      </div>

      <!-- Hidden container for PDF rendering -->
      <div id="pdfReport" style="display:none; padding:40px; font-family:sans-serif; width:800px; background:white; color:black;">
        <h1 style="font-size:24px; margin-bottom:4px; font-weight:800; color:#111;">Bloom Finance</h1>
        <p style="font-size:14px; color:#666; margin-bottom:30px;">Relatório Consolidado de Despesas</p>
        <div class="pdf-content"></div>
      </div>
    `,e},init(){document.getElementById(`btnExportCSV`)?.addEventListener(`click`,()=>B.exportCSV()),document.getElementById(`btnExportJSON`)?.addEventListener(`click`,()=>B.exportJSON()),document.getElementById(`btnExportPDF`)?.addEventListener(`click`,()=>B.exportPDF(`pdfReport`))}}})),W=e((()=>{})),G,K=e((()=>{W(),_(),h(),G={render(){let e=document.createElement(`div`);return e.className=`settings-container`,e.innerHTML=`
      <div class="set-header">
        <h1 class="set-title">Ajustes</h1>
        <div class="set-subtitle">Preferências e controle de dados</div>
      </div>
      
      <div class="set-group">
        <div class="set-item">
          <div class="set-item-text">
            <h3>Modo Escuro (Dark Mode)</h3>
            <p>Altera o tema visual da aplicação.</p>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="themeToggle" ${g.settings.themeDark?`checked`:``} aria-label="Alternar modo escuro" />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="set-group danger-zone">
        <div class="set-item">
          <div class="set-item-text">
            <h3 class="danger-text">Apagar todos os dados</h3>
            <p>Isso apagará permanentemente todos os registros e restaurará os dados de demonstração.</p>
          </div>
          <button class="btn-danger" id="btnWipeData">Restaurar Padrão</button>
        </div>
      </div>
    `,e},init(){document.getElementById(`themeToggle`)?.addEventListener(`change`,e=>{g.settings.themeDark=e.target.checked,g.save(),document.body.classList.toggle(`theme-dark`,g.settings.themeDark)}),document.getElementById(`btnWipeData`)?.addEventListener(`click`,()=>{confirm(`Isso irá apagar todos os dados e restaurar os originais. Continuar?`)&&m.wipeData()})}}})),q,J=e((()=>{x(),k(),M(),F(),R(),U(),K(),q={render(){let e=document.createElement(`div`);return e.id=`appPage`,e.className=`app-page`,e.setAttribute(`aria-label`,`Workspace financeiro`),e.innerHTML=`
      <div id="topbar-slot"></div>
      <div class="app-body" id="appBody">
        <main class="app-content" id="appContent">
          <section class="page active" id="page-spreadsheet"></section>
          <section class="page" id="page-receivables"></section>
          <section class="page" id="page-reports"></section>
          <section class="page" id="page-settings"></section>
        </main>
        <div id="sidebar-slot"></div>
      </div>
    `,e.querySelector(`#topbar-slot`).replaceWith(j.render()),e.querySelector(`#sidebar-slot`).replaceWith(O.render()),e.querySelector(`#page-spreadsheet`).appendChild(P.render()),e.querySelector(`#page-receivables`).appendChild(L.render()),e.querySelector(`#page-reports`).appendChild(H.render()),e.querySelector(`#page-settings`).appendChild(G.render()),e},init(){j.init(),O.init(),P.init(),L.init(),H.init(),G.init()}}}));t((()=>{n(),r(),i(),_(),b(),J(),document.addEventListener(`DOMContentLoaded`,()=>{g.init(),g.settings.themeDark&&document.body.classList.add(`theme-dark`);let e=document.getElementById(`app`);window.navigateToApp=()=>{e.innerHTML=``,e.appendChild(q.render()),q.init()},window.navigateToHome=()=>{e.innerHTML=``,e.appendChild(y.render()),y.init()},window.navigateToHome()})}))();