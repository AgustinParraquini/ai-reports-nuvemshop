/**
 * Sistema de Comentarios Universal para Reportes
 * Nuvemshop AI Reports
 * 
 * USO:
 * 1. Incluir Firebase SDK en el HTML:
 *    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
 *    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js"></script>
 * 
 * 2. Incluir este script:
 *    <script src="/assets/comments-system.js"></script>
 * 
 * 3. Inicializar con el ID único del reporte:
 *    initCommentsSystem('mi-reporte-unico-id');
 * 
 * Cada reporte mantiene sus comentarios separados en Firebase bajo:
 * /presentations/{presentationId}/comments
 */

// Configuración Firebase (compartida)
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBhrC9gzxfJrf-8_r0X3KpF8_PW0MgB3Gg",
  authDomain: "reports-ai-b02e8.firebaseapp.com",
  databaseURL: "https://reports-ai-b02e8-default-rtdb.firebaseio.com",
  projectId: "reports-ai-b02e8",
  storageBucket: "reports-ai-b02e8.firebasestorage.app",
  messagingSenderId: "497102969122",
  appId: "1:497102969122:web:921daf9a64b9dacef0ed7b"
};

// Inicializar Firebase si no está ya inicializado
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

/**
 * Clase principal del sistema de comentarios
 */
class SlideComments {
  constructor(options = {}) {
    this.presentationId = options.presentationId || 'default-report';
    this.theme = options.theme || 'dark'; // 'dark' o 'light'
    this.userName = options.userName || localStorage.getItem('commenter_name') || null;
    this.userColor = options.userColor || this.getRandomColor();
    this.comments = {};
    this.activeSlide = 1;
    this.isAddingComment = false;
    this.currentFilter = 'slide';
    this.database = firebase.database();
    this.init();
  }

  init() {
    this.injectStyles();
    this.createUI();
    this.loadComments();
    this.bindEvents();
    if (!this.userName) this.askForName();
  }

  getRandomColor() {
    const colors = ['#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#59A9FF', '#00965E', '#FF7A27'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getThemeStyles() {
    if (this.theme === 'light') {
      return {
        panelBg: '#fff',
        panelShadow: 'rgba(0,0,0,0.15)',
        headerBg: '#010B23',
        headerText: 'white',
        bodyBg: '#F9FAFB',
        itemBg: '#F9FAFB',
        itemHoverBg: '#EFF6FF',
        textPrimary: '#010B23',
        textSecondary: '#6B7280',
        textMuted: '#9CA3AF',
        border: '#E5E7EB',
        inputBg: '#fff',
        inputBorder: '#E5E7EB',
        inputText: '#010B23',
        buttonBg: '#59A9FF',
        buttonHover: '#3B82F6',
        toggleBg: '#010B23',
        toggleHover: '#59A9FF',
        badgeBg: '#EC3F41',
        accentColor: '#59A9FF',
        resolvedColor: '#00965E'
      };
    }
    // Dark theme (default)
    return {
      panelBg: '#0f0f23',
      panelShadow: 'rgba(0,0,0,0.5)',
      headerBg: 'linear-gradient(135deg,#1a1033,#2d1f4e)',
      headerText: 'white',
      bodyBg: 'transparent',
      itemBg: 'rgba(255,255,255,0.05)',
      itemHoverBg: 'rgba(139,92,246,0.1)',
      textPrimary: '#fff',
      textSecondary: '#E5E7EB',
      textMuted: '#9CA3AF',
      border: 'rgba(255,255,255,0.1)',
      inputBg: 'rgba(0,0,0,0.3)',
      inputBorder: 'rgba(255,255,255,0.1)',
      inputText: '#fff',
      buttonBg: 'linear-gradient(135deg,#8B5CF6,#EC4899)',
      buttonHover: 'opacity:0.9',
      toggleBg: 'linear-gradient(135deg,#8B5CF6,#EC4899)',
      toggleHover: 'transform:scale(1.1)',
      badgeBg: '#EF4444',
      accentColor: '#8B5CF6',
      resolvedColor: '#10B981'
    };
  }

  injectStyles() {
    if (document.getElementById('slide-comments-styles')) return;
    const t = this.getThemeStyles();
    const styles = document.createElement('style');
    styles.id = 'slide-comments-styles';
    styles.textContent = `
      .comments-panel{position:fixed;right:-400px;top:0;width:380px;height:100vh;background:${t.panelBg};box-shadow:-4px 0 20px ${t.panelShadow};z-index:10000;transition:right 0.3s ease;display:flex;flex-direction:column;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Space Grotesk',Roboto,sans-serif}
      .comments-panel.open{right:0}
      .comments-panel-header{padding:16px 20px;background:${t.headerBg};color:${t.headerText};display:flex;justify-content:space-between;align-items:center}
      .comments-panel-header h3{margin:0;font-size:16px;font-weight:600}
      .comments-panel-close{background:none;border:none;color:${t.headerText};font-size:24px;cursor:pointer;padding:0;line-height:1}
      .comments-panel-body{flex:1;overflow-y:auto;padding:16px;background:${t.bodyBg}}
      .comments-panel-footer{padding:16px;border-top:1px solid ${t.border};background:${t.theme === 'light' ? '#F9FAFB' : 'rgba(0,0,0,0.2)'}}
      .comments-toggle{position:fixed;right:20px;top:20px;width:50px;height:50px;border-radius:50%;background:${t.toggleBg};color:white;border:none;cursor:pointer;z-index:9999;display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 4px 20px ${t.panelShadow};transition:transform 0.2s,background 0.2s}
      .comments-toggle:hover{${t.toggleHover}}
      .comments-toggle .badge{position:absolute;top:-5px;right:-5px;background:${t.badgeBg};color:white;font-size:11px;font-weight:bold;padding:2px 6px;border-radius:10px;min-width:18px;text-align:center}
      .comment-item{background:${t.itemBg};border-radius:12px;padding:14px;margin-bottom:12px;border-left:4px solid ${t.accentColor};transition:all 0.2s}
      .comment-item:hover{background:${t.itemHoverBg}}
      .comment-item.resolved{border-left-color:${t.resolvedColor};opacity:0.7}
      .comment-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
      .comment-author{display:flex;align-items:center;gap:8px}
      .comment-avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:14px}
      .comment-meta{display:flex;flex-direction:column}
      .comment-name{font-weight:600;color:${t.textPrimary};font-size:14px}
      .comment-time{font-size:11px;color:${t.textMuted}}
      .comment-slide-badge{background:${this.theme === 'light' ? '#E5E7EB' : 'rgba(139,92,246,0.3)'};color:${this.theme === 'light' ? '#6B7280' : '#C4B5FD'};font-size:11px;padding:2px 8px;border-radius:4px}
      .comment-text{color:${t.textSecondary};font-size:14px;line-height:1.5;margin-bottom:10px}
      .comment-actions{display:flex;gap:8px}
      .comment-action-btn{background:${this.theme === 'light' ? 'none' : 'rgba(255,255,255,0.1)'};border:none;color:${t.textMuted};font-size:12px;cursor:pointer;padding:4px 8px;border-radius:4px;transition:all 0.2s}
      .comment-action-btn:hover{background:${this.theme === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.2)'};color:${t.textPrimary}}
      .comment-replies{margin-top:12px;padding-left:16px;border-left:2px solid ${t.border}}
      .reply-item{padding:10px;background:${this.theme === 'light' ? 'white' : 'rgba(255,255,255,0.03)'};border-radius:8px;margin-bottom:8px}
      .new-comment-input{width:100%;padding:12px;border:2px solid ${t.inputBorder};border-radius:8px;font-size:14px;resize:none;transition:border-color 0.2s;font-family:inherit;background:${t.inputBg};color:${t.inputText}}
      .new-comment-input:focus{outline:none;border-color:${t.accentColor}}
      .new-comment-input::placeholder{color:${t.textMuted}}
      .new-comment-submit{background:${t.buttonBg};color:white;border:none;padding:10px 20px;border-radius:8px;font-weight:600;cursor:pointer;transition:all 0.2s}
      .new-comment-submit:hover{${t.buttonHover}}
      .new-comment-submit:disabled{opacity:0.5;cursor:not-allowed}
      .adding-comment-mode{cursor:crosshair !important}
      .adding-comment-mode *{cursor:crosshair !important}
      .add-comment-hint{position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:${t.headerBg};color:white;padding:12px 24px;border-radius:8px;font-size:14px;z-index:10001;display:none;box-shadow:0 4px 20px ${t.panelShadow}}
      .adding-comment-mode .add-comment-hint{display:block}
      .name-modal{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,${this.theme === 'light' ? '0.5' : '0.8'});display:flex;align-items:center;justify-content:center;z-index:10002}
      .name-modal-content{background:${this.theme === 'light' ? 'white' : 'linear-gradient(135deg,#1a1033,#2d1f4e)'};padding:30px;border-radius:16px;max-width:400px;width:90%;text-align:center;border:1px solid ${t.border}}
      .name-modal h3{margin:0 0 10px;color:${t.textPrimary}}
      .name-modal p{color:${t.textMuted};margin-bottom:20px}
      .name-modal input{width:100%;padding:12px;border:2px solid ${t.inputBorder};border-radius:8px;font-size:16px;margin-bottom:16px;background:${t.inputBg};color:${t.inputText}}
      .name-modal input::placeholder{color:${t.textMuted}}
      .name-modal button{background:${t.buttonBg};color:white;border:none;padding:12px 30px;border-radius:8px;font-weight:600;cursor:pointer;font-size:16px}
      .comments-filter{display:flex;gap:8px;padding:12px 16px;border-bottom:1px solid ${t.border};background:${this.theme === 'light' ? '#F9FAFB' : 'rgba(0,0,0,0.2)'}}
      .filter-tab{padding:6px 12px;border-radius:6px;font-size:13px;cursor:pointer;background:none;border:none;color:${t.textMuted};transition:all 0.2s}
      .filter-tab:hover{background:${this.theme === 'light' ? '#E5E7EB' : 'rgba(255,255,255,0.1)'}}
      .filter-tab.active{background:${t.buttonBg};color:white}
      .comments-empty{text-align:center;padding:40px 20px;color:${t.textMuted}}
      .comments-empty-icon{font-size:48px;margin-bottom:16px}
      .comment-popup{background:${this.theme === 'light' ? 'white' : 'linear-gradient(135deg,#1a1033,#2d1f4e)'};border:1px solid ${t.border}}
      @media(max-width:768px){.comments-panel{width:100%;right:-100%}}
    `;
    document.head.appendChild(styles);
  }

  createUI() {
    const toggle = document.createElement('button');
    toggle.className = 'comments-toggle';
    toggle.innerHTML = '💬 <span class="badge" style="display:none;">0</span>';
    toggle.onclick = () => this.togglePanel();
    document.body.appendChild(toggle);
    this.toggleBtn = toggle;

    const panel = document.createElement('div');
    panel.className = 'comments-panel';
    panel.innerHTML = `
      <div class="comments-panel-header"><h3>💬 Comentarios</h3><button class="comments-panel-close">&times;</button></div>
      <div class="comments-filter">
        <button class="filter-tab active" data-filter="slide">Este slide</button>
        <button class="filter-tab" data-filter="open">Abiertos</button>
        <button class="filter-tab" data-filter="all">Todos</button>
      </div>
      <div class="comments-panel-body">
        <div class="comments-empty"><div class="comments-empty-icon">💭</div><p>No hay comentarios en este slide</p><p style="font-size:12px">Doble click en el slide para comentar</p></div>
      </div>
      <div class="comments-panel-footer"><button class="new-comment-submit" id="add-comment-btn" style="width:100%">➕ Agregar comentario</button></div>
    `;
    document.body.appendChild(panel);
    this.panel = panel;

    const hint = document.createElement('div');
    hint.className = 'add-comment-hint';
    hint.textContent = '📍 Haz clic donde quieras comentar (ESC para cancelar)';
    document.body.appendChild(hint);
    
    // Tooltip de ayuda
    const helpTip = document.createElement('div');
    helpTip.style.cssText = `position:fixed;bottom:80px;left:20px;background:${this.theme === 'light' ? '#010B23' : 'linear-gradient(135deg,#1a1033,#2d1f4e)'};color:#9CA3AF;padding:8px 12px;border-radius:6px;font-size:11px;z-index:9998;opacity:0.8`;
    helpTip.innerHTML = '💡 <b style="color:white">Doble click</b> en cualquier lugar para comentar';
    document.body.appendChild(helpTip);
    setTimeout(() => { helpTip.style.transition = 'opacity 0.5s'; helpTip.style.opacity = '0'; setTimeout(() => helpTip.remove(), 500); }, 5000);

    panel.querySelector('.comments-panel-close').onclick = () => this.togglePanel();
    panel.querySelector('#add-comment-btn').onclick = () => this.addCommentDirect();
    panel.querySelectorAll('.filter-tab').forEach(tab => {
      tab.onclick = (e) => {
        panel.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.renderComments();
      };
    });
  }

  askForName() {
    const modal = document.createElement('div');
    modal.className = 'name-modal';
    modal.innerHTML = `
      <div class="name-modal-content">
        <h3>👋 ¡Hola!</h3>
        <p>¿Cómo te llamas? Así sabremos quién deja cada comentario.</p>
        <input type="text" placeholder="Tu nombre..." id="commenter-name-input" />
        <button id="save-name-btn">Continuar</button>
      </div>
    `;
    document.body.appendChild(modal);
    const input = modal.querySelector('#commenter-name-input');
    const btn = modal.querySelector('#save-name-btn');
    btn.onclick = () => {
      const name = input.value.trim();
      if (name) { this.userName = name; localStorage.setItem('commenter_name', name); modal.remove(); }
    };
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') btn.click(); });
    input.focus();
  }

  togglePanel() { this.panel.classList.toggle('open'); }
  startAddingComment() { this.isAddingComment = true; document.body.classList.add('adding-comment-mode'); this.panel.classList.remove('open'); }
  cancelAddingComment() { this.isAddingComment = false; document.body.classList.remove('adding-comment-mode'); }
  
  // Agregar comentario directamente desde el botón (sin seleccionar posición)
  addCommentDirect() {
    const slide = this.detectCurrentSlide();
    // Posición centrada por defecto
    const x = 50;
    const y = 50;
    // Mostrar popup en el centro de la pantalla
    const screenX = window.innerWidth / 2 - 150;
    const screenY = window.innerHeight / 2 - 100;
    this.showCommentInput(screenX, screenY, { x, y, slide });
  }

  bindEvents() {
    if (this._eventsbound) return;
    this._eventsbound = true;
    
    document.addEventListener('click', (e) => {
      if (!this.isAddingComment) return;
      if (e.target.closest('.comments-panel') || e.target.closest('.comments-toggle') || e.target.closest('.comment-marker') || e.target.closest('.comment-popup')) return;
      this.openCommentPopup(e);
    });
    
    document.addEventListener('dblclick', (e) => {
      if (e.target.closest('.comments-panel') || e.target.closest('.comments-toggle') || e.target.closest('.comment-marker') || e.target.closest('.comment-popup') || e.target.closest('.name-modal')) return;
      this.openCommentPopup(e);
    });
    
    document.addEventListener('keydown', (e) => { 
      if (e.key === 'Escape') {
        this.cancelAddingComment();
        document.querySelectorAll('.comment-popup').forEach(p => p.remove());
      }
    });
    
    let lastSlide = this.detectCurrentSlide();
    const checkSlideChange = () => {
      const currentSlide = this.detectCurrentSlide();
      if (currentSlide !== lastSlide) {
        lastSlide = currentSlide;
        if (this.currentFilter === 'slide') {
          this.renderComments();
        }
      }
    };
    
    let retryCount = 0;
    const maxRetries = 10;
    const setupIndicatorObserver = () => {
      const indicator = document.querySelector('.ind');
      if (indicator) {
        const slideObserver = new MutationObserver(checkSlideChange);
        slideObserver.observe(indicator, { childList: true, characterData: true, subtree: true });
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(setupIndicatorObserver, 500);
      }
    };
    setupIndicatorObserver();
  }
  
  openCommentPopup(e) {
    document.querySelectorAll('.comment-popup').forEach(p => p.remove());
    this.cancelAddingComment();
    
    const slide = this.detectCurrentSlide();
    const rect = document.querySelector('.wrap')?.getBoundingClientRect() || document.body.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    
    this.showCommentInput(e.clientX, e.clientY, { x, y, slide });
  }

  detectCurrentSlide() {
    const indicator = document.querySelector('.ind');
    if (indicator) {
      const match = indicator.textContent.match(/(\d+)/);
      if (match) return parseInt(match[1]);
    }
    return 1;
  }

  showCommentInput(screenX, screenY, position) {
    const t = this.getThemeStyles();
    const popup = document.createElement('div');
    popup.className = 'comment-popup';
    popup.style.cssText = `position:fixed;left:${Math.min(screenX,window.innerWidth-320)}px;top:${Math.min(screenY,window.innerHeight-200)}px;padding:16px;border-radius:12px;box-shadow:0 8px 30px ${t.panelShadow};z-index:10003;width:300px`;
    popup.innerHTML = `
      <div style="margin-bottom:8px;font-size:12px;color:${t.textMuted}">📍 Slide ${position.slide}</div>
      <textarea class="new-comment-input" placeholder="Escribe tu comentario..." rows="3"></textarea>
      <div style="display:flex;gap:8px;margin-top:10px">
        <button class="new-comment-submit" style="flex:1">Publicar</button>
        <button class="comment-action-btn" style="padding:10px 16px">Cancelar</button>
      </div>
    `;
    document.body.appendChild(popup);
    const textarea = popup.querySelector('textarea');
    const submitBtn = popup.querySelector('.new-comment-submit');
    const cancelBtn = popup.querySelector('.comment-action-btn');
    
    setTimeout(() => textarea.focus(), 50);
    
    submitBtn.onclick = () => {
      const text = textarea.value.trim();
      if (text) {
        this.addComment({ text, x: position.x, y: position.y, slide: position.slide });
        popup.remove();
      } else {
        textarea.style.borderColor = '#EF4444';
        textarea.placeholder = '⚠️ Escribe algo...';
      }
    };
    cancelBtn.onclick = () => popup.remove();
    textarea.addEventListener('keydown', (e) => { 
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submitBtn.click();
      if (e.key === 'Escape') popup.remove();
    });
  }

  addComment({ text, x, y, slide }) {
    const comment = { 
      id: Date.now().toString(), 
      text, 
      x, 
      y, 
      slide: slide || this.activeSlide, 
      author: this.userName, 
      color: this.userColor, 
      timestamp: new Date().toISOString(), 
      resolved: false, 
      replies: [] 
    };
    if (!this.comments[this.presentationId]) this.comments[this.presentationId] = [];
    this.comments[this.presentationId].push(comment);
    this.saveComments(); 
    this.renderComments(); 
    this.updateBadge();
  }

  addReply(commentId, text) {
    const comments = this.comments[this.presentationId] || [];
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      comment.replies.push({ 
        id: Date.now().toString(), 
        text, 
        author: this.userName, 
        color: this.userColor, 
        timestamp: new Date().toISOString() 
      });
      this.saveComments(); 
      this.renderComments();
    }
  }

  resolveComment(commentId) {
    const comments = this.comments[this.presentationId] || [];
    const comment = comments.find(c => c.id === commentId);
    if (comment) { 
      comment.resolved = !comment.resolved; 
      this.saveComments(); 
      this.renderComments(); 
    }
  }

  deleteComment(commentId) {
    if (!confirm('¿Eliminar este comentario?')) return;
    const comments = this.comments[this.presentationId] || [];
    const index = comments.findIndex(c => c.id === commentId);
    if (index > -1) { 
      comments.splice(index, 1); 
      this.saveComments(); 
      this.renderComments(); 
      this.updateBadge(); 
    }
  }

  saveComments() {
    const commentsArray = this.comments[this.presentationId] || [];
    this.database.ref(`presentations/${this.presentationId}/comments`).set(commentsArray);
  }
  
  loadComments() {
    const ref = this.database.ref(`presentations/${this.presentationId}/comments`);
    ref.on('value', (snapshot) => {
      const data = snapshot.val();
      this.comments[this.presentationId] = data || [];
      this.renderComments();
      this.updateBadge();
    });
  }

  renderComments(filter = null) {
    const t = this.getThemeStyles();
    const activeFilter = filter || this.currentFilter || 'slide';
    const container = this.panel.querySelector('.comments-panel-body');
    const comments = this.comments[this.presentationId] || [];
    let filtered = comments;
    
    if (activeFilter === 'slide') filtered = comments.filter(c => c.slide === this.detectCurrentSlide());
    else if (activeFilter === 'open') filtered = comments.filter(c => !c.resolved);
    
    if (filtered.length === 0) {
      const emptyMessages = {
        'slide': 'No hay comentarios en este slide',
        'open': 'No hay comentarios abiertos 🎉',
        'all': 'No hay comentarios aún'
      };
      container.innerHTML = `<div class="comments-empty"><div class="comments-empty-icon">💭</div><p>${emptyMessages[activeFilter] || 'No hay comentarios'}</p><p style="font-size:12px;color:${t.textMuted}">Doble click en el slide para comentar</p></div>`;
      return;
    }
    
    // Ordenar: primero abiertos, luego cerrados. Dentro de cada grupo, por fecha (más reciente primero)
    filtered.sort((a, b) => {
      if (a.resolved !== b.resolved) return a.resolved ? 1 : -1;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    container.innerHTML = filtered.map(comment => `
      <div class="comment-item ${comment.resolved ? 'resolved' : ''}" data-id="${comment.id}">
        <div class="comment-header">
          <div class="comment-author">
            <div class="comment-avatar" style="background:${comment.color}">${comment.author.charAt(0).toUpperCase()}</div>
            <div class="comment-meta"><span class="comment-name">${comment.author}</span><span class="comment-time">${this.formatTime(comment.timestamp)}</span></div>
          </div>
          <span class="comment-slide-badge">Slide ${comment.slide}</span>
        </div>
        <div class="comment-text">${this.escapeHtml(comment.text)}</div>
        <div class="comment-actions">
          <button class="comment-action-btn" onclick="slideComments.showReplyInput('${comment.id}')">💬 Responder</button>
          <button class="comment-action-btn" onclick="slideComments.resolveComment('${comment.id}')">${comment.resolved ? '🔄 Reabrir' : '✓ Resolver'}</button>
          <button class="comment-action-btn" onclick="slideComments.deleteComment('${comment.id}')">🗑</button>
        </div>
        ${comment.replies.length > 0 ? `<div class="comment-replies">${comment.replies.map(reply => `
          <div class="reply-item">
            <div class="comment-author" style="margin-bottom:6px">
              <div class="comment-avatar" style="background:${reply.color};width:24px;height:24px;font-size:11px">${reply.author.charAt(0).toUpperCase()}</div>
              <div class="comment-meta"><span class="comment-name" style="font-size:13px">${reply.author}</span><span class="comment-time">${this.formatTime(reply.timestamp)}</span></div>
            </div>
            <div class="comment-text" style="font-size:13px;margin:0">${this.escapeHtml(reply.text)}</div>
          </div>
        `).join('')}</div>` : ''}
        <div class="reply-input-container" id="reply-${comment.id}" style="display:none;margin-top:12px">
          <textarea class="new-comment-input" placeholder="Escribe tu respuesta..." rows="2"></textarea>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button class="new-comment-submit" style="font-size:13px;padding:8px 16px">Responder</button>
            <button class="comment-action-btn" onclick="document.getElementById('reply-${comment.id}').style.display='none'">Cancelar</button>
          </div>
        </div>
      </div>
    `).join('');
    
    container.querySelectorAll('.reply-input-container').forEach(el => {
      const btn = el.querySelector('.new-comment-submit');
      const textarea = el.querySelector('textarea');
      const commentId = el.id.replace('reply-', '');
      btn.onclick = () => { 
        const text = textarea.value.trim(); 
        if (text) { 
          this.addReply(commentId, text); 
          el.style.display = 'none'; 
          textarea.value = ''; 
        } 
      };
    });
  }

  showReplyInput(commentId) {
    const container = document.getElementById(`reply-${commentId}`);
    if (container) { 
      container.style.display = 'block'; 
      container.querySelector('textarea').focus(); 
    }
  }

  updateBadge() {
    const comments = this.comments[this.presentationId] || [];
    const openCount = comments.filter(c => !c.resolved).length;
    const badge = this.toggleBtn.querySelector('.badge');
    if (openCount > 0) { 
      badge.textContent = openCount; 
      badge.style.display = 'block'; 
    } else { 
      badge.style.display = 'none'; 
    }
  }

  formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'Ahora';
    if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} min`;
    if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)}h`;
    return date.toLocaleDateString('es', { day: 'numeric', month: 'short' });
  }

  escapeHtml(text) { 
    const div = document.createElement('div'); 
    div.textContent = text; 
    return div.innerHTML; 
  }
}

// Variable global para el sistema de comentarios
let slideComments;

/**
 * Inicializa el sistema de comentarios
 * @param {string} presentationId - ID único del reporte (ej: 'chat-nov-2025', 'all-hands-oct-2025')
 * @param {object} options - Opciones adicionales
 * @param {string} options.theme - 'dark' o 'light' (default: 'dark')
 */
function initCommentsSystem(presentationId, options = {}) {
  const waitForAuth = () => {
    // Si hay autenticación Firebase, esperar a que esté lista
    if (document.body.classList.contains('authenticated') || !document.getElementById('auth-overlay')) {
      slideComments = new SlideComments({ 
        presentationId: presentationId,
        theme: options.theme || 'dark'
      }); 
      window.slideComments = slideComments;
    } else {
      setTimeout(waitForAuth, 500);
    }
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForAuth);
  } else {
    waitForAuth();
  }
}

// Exponer globalmente
window.initCommentsSystem = initCommentsSystem;
window.SlideComments = SlideComments;

