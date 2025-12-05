/**
 * Sistema de Internacionalización (i18n) para AI Reports
 * Tiendanube/Nuvemshop - v1.0
 * 
 * Idiomas soportados:
 * - es-AR: Español de Argentina
 * - pt-BR: Portugués de Brasil
 * - en-US: Inglés de Estados Unidos
 * 
 * USO:
 * 1. Incluir este script en el HTML:
 *    <script src="./assets/i18n.js"></script>
 * 
 * 2. Incluir archivo de traducciones del reporte:
 *    <script src="./assets/i18n/q4-2025.js"></script>
 * 
 * 3. Usar traducciones:
 *    const T = window.i18n.t;
 *    T('slide1.title') // Retorna el texto en el idioma actual
 * 
 * 4. Inicializar selector (después del DOM):
 *    window.i18n.initSelector();
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'ai-reports-lang';
    const SUPPORTED_LANGS = ['es-AR', 'pt-BR', 'en-US'];
    const DEFAULT_LANG = 'es-AR';

    // Traducciones base (UI común)
    const baseTranslations = {
        'es-AR': {
            // Auth
            'auth.verifying': 'Verificando acceso...',
            'auth.title': 'AI Reports',
            'auth.subtitle': 'Reportes mensuales de productos Tiendanube',
            'auth.login': 'Iniciar sesión con Google',
            'auth.only_emails': 'Solo emails',
            'auth.and': 'y',
            'auth.no_access': 'no tiene acceso',
            'auth.error': 'Error',
            
            // Navigation
            'nav.home': 'Hub Principal',
            'nav.other_reports': 'Ver otros reportes',
            'nav.all_hands': 'All Hands',
            'nav.nuvem_chat': 'Nuvem Chat',
            'nav.lumi': 'Lumi',
            'nav.coming_soon': 'Próximamente...',
            'nav.specials': 'Especiales',
            
            // Common metrics
            'common.merchants': 'Merchants',
            'common.revenue': 'Revenue',
            'common.churn': 'Churn',
            'common.arpu': 'ARPU',
            'common.pending': 'Pendientes',
            'common.retention': 'Retención',
            'common.new_payments': 'New Payments',
            'common.ai_chats': 'AI Chats',
            'common.trial': 'Trial',
            'common.paid': 'Pagados',
            'common.total': 'Total',
            'common.month': 'Mes',
            'common.year': 'Año',
            'common.vs': 'vs',
            'common.change': 'Cambio',
            'common.base': 'Base',
            'common.new': 'Nuevos',
            'common.lost': 'Perdidos',
            'common.net': 'Neto',
            
            // Countries
            'country.BR': 'Brasil',
            'country.AR': 'Argentina',
            'country.MX': 'México',
            'country.CO': 'Colombia',
            'country.CL': 'Chile',
            
            // Plans
            'plan.enterprise': 'Enterprise',
            'plan.plan_a': 'Plan A',
            'plan.plan_b': 'Plan B',
            'plan.plan_c': 'Plan C',
            'plan.free': 'Plan Free',
            
            // Table Headers
            'table.segment': 'Segmento',
            'table.users': 'Usuarios',
            'table.nov_users': 'Nov Users',
            'table.oct_users': 'Oct Users',
            'table.pct_total': '% Total',
            'table.change_mom': 'Cambio MoM',
            'table.definition': 'Definición',
            'table.country': 'País',
            'table.share': '% Share',
            'table.interactions': 'Interacciones',
            'table.per_user': 'Por Usuario',
            'table.growth': 'Crecimiento',
            'table.feature': 'Feature',
            'table.category': 'Categoría',
            'table.status': 'Status',
            'table.metric': 'Métrica',
            'table.value': 'Valor',
            'table.vs_prev': 'vs Anterior',
            'table.plan': 'Plan',
            'table.active_stores': 'Tiendas Activas',
            'table.penetration': 'Penetración',
            
            // User Segments
            'segment.testers': 'Testers',
            'segment.light_users': 'Light Users',
            'segment.medium_users': 'Medium Users',
            'segment.hard_users': 'Hard Users',
            'segment.top_users': 'Top Users',
            'segment.light': 'Light',
            'segment.medium': 'Medium',
            'segment.hard': 'Hard',
            'segment.top': 'Top',
            
            // Common Labels
            'common.users': 'usuarios',
            'common.unique_users': 'usuarios únicos',
            'common.total_month': 'total mes',
            'common.average': 'promedio',
            'common.vs_oct': 'vs Oct',
            'common.vs_nov': 'vs Nov',
            'common.interactions': 'Interacciones',
            'common.active': 'activos',
            'common.inactive': 'inactivos',
            'common.definition': 'Definición',
            'common.processed': 'procesados',
            
            // Insights & Notes
            'insight.key': 'Key Insight:',
            'insight.interpretation': 'Interpretación positiva:',
            'insight.total_stable': 'Total estable:',
            'insight.note': 'Nota:',
            'insight.highlight': 'Highlight:',
            'insight.alert': 'Alerta:',
            'insight.important': 'Importante:',
            
            // Status
            'status.ga': 'GA',
            'status.beta': 'Beta',
            'status.alpha': 'Alpha',
            'status.discovery': 'Discovery',
            'status.planned': 'Planeado',
            'status.in_progress': 'En progreso',
            'status.done': 'Completado',
            'status.new': 'NEW',
            
            // Feature Categories
            'category.products': 'Productos',
            'category.suggestions': 'Sugerencias',
            'category.categories': 'Categorías',
            'category.images': 'Imágenes',
            'category.content': 'Contenido',
            
            // Actions
            'action.logout': 'Salir',
            'action.select_language': 'Seleccionar idioma',
            
            // Time
            'time.january': 'Enero',
            'time.february': 'Febrero',
            'time.march': 'Marzo',
            'time.april': 'Abril',
            'time.may': 'Mayo',
            'time.june': 'Junio',
            'time.july': 'Julio',
            'time.august': 'Agosto',
            'time.september': 'Septiembre',
            'time.october': 'Octubre',
            'time.november': 'Noviembre',
            'time.december': 'Diciembre',
            'time.q1': 'Q1',
            'time.q2': 'Q2',
            'time.q3': 'Q3',
            'time.q4': 'Q4',
            
            // UI
            'ui.slide': 'Slide',
            'ui.of': 'de',
            'ui.thanks': 'Gracias',
            'ui.questions': '¿Preguntas?',
            'ui.summary': 'Resumen',
            'ui.details': 'Detalles',
            'ui.analysis': 'Análisis',
            'ui.conclusions': 'Conclusiones',
            'ui.actions': 'Acciones',
            'ui.timeline': 'Timeline',
            'ui.goals': 'Objetivos',
            'ui.kpis': 'KPIs',
            'ui.glossary': 'Glosario',
            'ui.insights': 'Insights',
            'ui.context': 'Contexto',
            'ui.history': 'Historia',
            'ui.overview': 'Overview',
            'ui.by_country': 'Por País',
            'ui.by_plan': 'Por Plan',
            'ui.growth': 'Crecimiento',
            'ui.projection': 'Proyección',
            'ui.urgent': 'Urgente',
            'ui.priority': 'Prioridad',
            'ui.good': 'Lo Bueno',
            'ui.bad': 'Lo Malo',
            'ui.week': 'Semana',
            'ui.report': 'Reporte'
        },
        'pt-BR': {
            // Auth
            'auth.verifying': 'Verificando acesso...',
            'auth.title': 'AI Reports',
            'auth.subtitle': 'Relatórios mensais de produtos Tiendanube',
            'auth.login': 'Entrar com Google',
            'auth.only_emails': 'Apenas emails',
            'auth.and': 'e',
            'auth.no_access': 'não tem acesso',
            'auth.error': 'Erro',
            
            // Navigation
            'nav.home': 'Hub Principal',
            'nav.other_reports': 'Ver outros relatórios',
            'nav.all_hands': 'All Hands',
            'nav.nuvem_chat': 'Nuvem Chat',
            'nav.lumi': 'Lumi',
            'nav.coming_soon': 'Em breve...',
            'nav.specials': 'Especiais',
            
            // Common metrics
            'common.merchants': 'Merchants',
            'common.revenue': 'Receita',
            'common.churn': 'Churn',
            'common.arpu': 'ARPU',
            'common.pending': 'Pendentes',
            'common.retention': 'Retenção',
            'common.new_payments': 'Novos Pagamentos',
            'common.ai_chats': 'AI Chats',
            'common.trial': 'Trial',
            'common.paid': 'Pagos',
            'common.total': 'Total',
            'common.month': 'Mês',
            'common.year': 'Ano',
            'common.vs': 'vs',
            'common.change': 'Variação',
            'common.base': 'Base',
            'common.new': 'Novos',
            'common.lost': 'Perdidos',
            'common.net': 'Líquido',
            
            // Countries
            'country.BR': 'Brasil',
            'country.AR': 'Argentina',
            'country.MX': 'México',
            'country.CO': 'Colômbia',
            'country.CL': 'Chile',
            
            // Plans
            'plan.enterprise': 'Enterprise',
            'plan.plan_a': 'Plano A',
            'plan.plan_b': 'Plano B',
            'plan.plan_c': 'Plano C',
            'plan.free': 'Plano Free',
            
            // Table Headers
            'table.segment': 'Segmento',
            'table.users': 'Usuários',
            'table.nov_users': 'Nov Users',
            'table.oct_users': 'Out Users',
            'table.pct_total': '% Total',
            'table.change_mom': 'Variação MoM',
            'table.definition': 'Definição',
            'table.country': 'País',
            'table.share': '% Share',
            'table.interactions': 'Interações',
            'table.per_user': 'Por Usuário',
            'table.growth': 'Crescimento',
            'table.feature': 'Feature',
            'table.category': 'Categoria',
            'table.status': 'Status',
            'table.metric': 'Métrica',
            'table.value': 'Valor',
            'table.vs_prev': 'vs Anterior',
            'table.plan': 'Plano',
            'table.active_stores': 'Lojas Ativas',
            'table.penetration': 'Penetração',
            
            // User Segments
            'segment.testers': 'Testers',
            'segment.light_users': 'Light Users',
            'segment.medium_users': 'Medium Users',
            'segment.hard_users': 'Hard Users',
            'segment.top_users': 'Top Users',
            'segment.light': 'Light',
            'segment.medium': 'Medium',
            'segment.hard': 'Hard',
            'segment.top': 'Top',
            
            // Common Labels
            'common.users': 'usuários',
            'common.unique_users': 'usuários únicos',
            'common.total_month': 'total mês',
            'common.average': 'média',
            'common.vs_oct': 'vs Out',
            'common.vs_nov': 'vs Nov',
            'common.interactions': 'Interações',
            'common.active': 'ativos',
            'common.inactive': 'inativos',
            'common.definition': 'Definição',
            'common.processed': 'processados',
            
            // Insights & Notes
            'insight.key': 'Key Insight:',
            'insight.interpretation': 'Interpretação positiva:',
            'insight.total_stable': 'Total estável:',
            'insight.note': 'Nota:',
            'insight.highlight': 'Highlight:',
            'insight.alert': 'Alerta:',
            'insight.important': 'Importante:',
            
            // Status
            'status.ga': 'GA',
            'status.beta': 'Beta',
            'status.alpha': 'Alpha',
            'status.discovery': 'Discovery',
            'status.planned': 'Planejado',
            'status.in_progress': 'Em progresso',
            'status.done': 'Concluído',
            'status.new': 'NOVO',
            
            // Feature Categories
            'category.products': 'Produtos',
            'category.suggestions': 'Sugestões',
            'category.categories': 'Categorias',
            'category.images': 'Imagens',
            'category.content': 'Conteúdo',
            
            // Actions
            'action.logout': 'Sair',
            'action.select_language': 'Selecionar idioma',
            
            // Time
            'time.january': 'Janeiro',
            'time.february': 'Fevereiro',
            'time.march': 'Março',
            'time.april': 'Abril',
            'time.may': 'Maio',
            'time.june': 'Junho',
            'time.july': 'Julho',
            'time.august': 'Agosto',
            'time.september': 'Setembro',
            'time.october': 'Outubro',
            'time.november': 'Novembro',
            'time.december': 'Dezembro',
            'time.q1': 'Q1',
            'time.q2': 'Q2',
            'time.q3': 'Q3',
            'time.q4': 'Q4',
            
            // UI
            'ui.slide': 'Slide',
            'ui.of': 'de',
            'ui.thanks': 'Obrigado',
            'ui.questions': 'Perguntas?',
            'ui.summary': 'Resumo',
            'ui.details': 'Detalhes',
            'ui.analysis': 'Análise',
            'ui.conclusions': 'Conclusões',
            'ui.actions': 'Ações',
            'ui.timeline': 'Timeline',
            'ui.goals': 'Objetivos',
            'ui.kpis': 'KPIs',
            'ui.glossary': 'Glossário',
            'ui.insights': 'Insights',
            'ui.context': 'Contexto',
            'ui.history': 'História',
            'ui.overview': 'Visão Geral',
            'ui.by_country': 'Por País',
            'ui.by_plan': 'Por Plano',
            'ui.growth': 'Crescimento',
            'ui.projection': 'Projeção',
            'ui.urgent': 'Urgente',
            'ui.priority': 'Prioridade',
            'ui.good': 'O Bom',
            'ui.bad': 'O Ruim',
            'ui.week': 'Semana',
            'ui.report': 'Relatório'
        },
        'en-US': {
            // Auth
            'auth.verifying': 'Verifying access...',
            'auth.title': 'AI Reports',
            'auth.subtitle': 'Monthly reports for Tiendanube products',
            'auth.login': 'Sign in with Google',
            'auth.only_emails': 'Only emails',
            'auth.and': 'and',
            'auth.no_access': 'does not have access',
            'auth.error': 'Error',
            
            // Navigation
            'nav.home': 'Main Hub',
            'nav.other_reports': 'View other reports',
            'nav.all_hands': 'All Hands',
            'nav.nuvem_chat': 'Nuvem Chat',
            'nav.lumi': 'Lumi',
            'nav.coming_soon': 'Coming soon...',
            'nav.specials': 'Specials',
            
            // Common metrics
            'common.merchants': 'Merchants',
            'common.revenue': 'Revenue',
            'common.churn': 'Churn',
            'common.arpu': 'ARPU',
            'common.pending': 'Pending',
            'common.retention': 'Retention',
            'common.new_payments': 'New Payments',
            'common.ai_chats': 'AI Chats',
            'common.trial': 'Trial',
            'common.paid': 'Paid',
            'common.total': 'Total',
            'common.month': 'Month',
            'common.year': 'Year',
            'common.vs': 'vs',
            'common.change': 'Change',
            'common.base': 'Base',
            'common.new': 'New',
            'common.lost': 'Lost',
            'common.net': 'Net',
            
            // Countries
            'country.BR': 'Brazil',
            'country.AR': 'Argentina',
            'country.MX': 'Mexico',
            'country.CO': 'Colombia',
            'country.CL': 'Chile',
            
            // Plans
            'plan.enterprise': 'Enterprise',
            'plan.plan_a': 'Plan A',
            'plan.plan_b': 'Plan B',
            'plan.plan_c': 'Plan C',
            'plan.free': 'Free Plan',
            
            // Table Headers
            'table.segment': 'Segment',
            'table.users': 'Users',
            'table.nov_users': 'Nov Users',
            'table.oct_users': 'Oct Users',
            'table.pct_total': '% Total',
            'table.change_mom': 'MoM Change',
            'table.definition': 'Definition',
            'table.country': 'Country',
            'table.share': '% Share',
            'table.interactions': 'Interactions',
            'table.per_user': 'Per User',
            'table.growth': 'Growth',
            'table.feature': 'Feature',
            'table.category': 'Category',
            'table.status': 'Status',
            'table.metric': 'Metric',
            'table.value': 'Value',
            'table.vs_prev': 'vs Previous',
            'table.plan': 'Plan',
            'table.active_stores': 'Active Stores',
            'table.penetration': 'Penetration',
            
            // User Segments
            'segment.testers': 'Testers',
            'segment.light_users': 'Light Users',
            'segment.medium_users': 'Medium Users',
            'segment.hard_users': 'Hard Users',
            'segment.top_users': 'Top Users',
            'segment.light': 'Light',
            'segment.medium': 'Medium',
            'segment.hard': 'Hard',
            'segment.top': 'Top',
            
            // Common Labels
            'common.users': 'users',
            'common.unique_users': 'unique users',
            'common.total_month': 'month total',
            'common.average': 'average',
            'common.vs_oct': 'vs Oct',
            'common.vs_nov': 'vs Nov',
            'common.interactions': 'Interactions',
            'common.active': 'active',
            'common.inactive': 'inactive',
            'common.definition': 'Definition',
            'common.processed': 'processed',
            
            // Insights & Notes
            'insight.key': 'Key Insight:',
            'insight.interpretation': 'Positive interpretation:',
            'insight.total_stable': 'Stable total:',
            'insight.note': 'Note:',
            'insight.highlight': 'Highlight:',
            'insight.alert': 'Alert:',
            'insight.important': 'Important:',
            
            // Status
            'status.ga': 'GA',
            'status.beta': 'Beta',
            'status.alpha': 'Alpha',
            'status.discovery': 'Discovery',
            'status.planned': 'Planned',
            'status.in_progress': 'In Progress',
            'status.done': 'Done',
            'status.new': 'NEW',
            
            // Feature Categories
            'category.products': 'Products',
            'category.suggestions': 'Suggestions',
            'category.categories': 'Categories',
            'category.images': 'Images',
            'category.content': 'Content',
            
            // Actions
            'action.logout': 'Logout',
            'action.select_language': 'Select language',
            
            // Time
            'time.january': 'January',
            'time.february': 'February',
            'time.march': 'March',
            'time.april': 'April',
            'time.may': 'May',
            'time.june': 'June',
            'time.july': 'July',
            'time.august': 'August',
            'time.september': 'September',
            'time.october': 'October',
            'time.november': 'November',
            'time.december': 'December',
            'time.q1': 'Q1',
            'time.q2': 'Q2',
            'time.q3': 'Q3',
            'time.q4': 'Q4',
            
            // UI
            'ui.slide': 'Slide',
            'ui.of': 'of',
            'ui.thanks': 'Thank you',
            'ui.questions': 'Questions?',
            'ui.summary': 'Summary',
            'ui.details': 'Details',
            'ui.analysis': 'Analysis',
            'ui.conclusions': 'Conclusions',
            'ui.actions': 'Actions',
            'ui.timeline': 'Timeline',
            'ui.goals': 'Goals',
            'ui.kpis': 'KPIs',
            'ui.glossary': 'Glossary',
            'ui.insights': 'Insights',
            'ui.context': 'Context',
            'ui.history': 'History',
            'ui.overview': 'Overview',
            'ui.by_country': 'By Country',
            'ui.by_plan': 'By Plan',
            'ui.growth': 'Growth',
            'ui.projection': 'Projection',
            'ui.urgent': 'Urgent',
            'ui.priority': 'Priority',
            'ui.good': 'The Good',
            'ui.bad': 'The Bad',
            'ui.week': 'Week',
            'ui.report': 'Report'
        }
    };

    // Traducciones del reporte actual (se agregan desde archivo externo)
    let reportTranslations = {
        'es-AR': {},
        'pt-BR': {},
        'en-US': {}
    };

    // Idioma actual
    let currentLang = DEFAULT_LANG;

    // Callbacks para re-render
    let onLangChangeCallbacks = [];

    /**
     * Detecta el idioma preferido del navegador
     */
    function detectBrowserLang() {
        const browserLang = navigator.language || navigator.userLanguage || '';
        
        // Mapeo de idiomas del navegador a nuestros códigos
        if (browserLang.startsWith('pt')) return 'pt-BR';
        if (browserLang.startsWith('en')) return 'en-US';
        if (browserLang.startsWith('es')) return 'es-AR';
        
        return DEFAULT_LANG;
    }

    /**
     * Obtiene el idioma guardado o detecta uno nuevo
     */
    function getInitialLang() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && SUPPORTED_LANGS.includes(saved)) {
                return saved;
            }
        } catch (e) {
            console.warn('localStorage not available');
        }
        return detectBrowserLang();
    }

    /**
     * Guarda el idioma en localStorage
     */
    function saveLang(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            console.warn('Could not save language preference');
        }
    }

    /**
     * Obtiene una traducción por key
     * @param {string} key - Clave de traducción (ej: 'slide1.title')
     * @param {object} params - Parámetros para interpolación (opcional)
     * @returns {string} - Texto traducido
     */
    function t(key, params = {}) {
        // Buscar primero en traducciones del reporte
        let text = reportTranslations[currentLang]?.[key];
        
        // Si no existe, buscar en traducciones base
        if (text === undefined) {
            text = baseTranslations[currentLang]?.[key];
        }
        
        // Si aún no existe, usar key como fallback
        if (text === undefined) {
            console.warn(`Missing translation for key: ${key} in ${currentLang}`);
            return key;
        }
        
        // Interpolación de parámetros
        if (params && typeof text === 'string') {
            Object.keys(params).forEach(param => {
                text = text.replace(new RegExp(`{${param}}`, 'g'), params[param]);
            });
        }
        
        return text;
    }

    /**
     * Cambia el idioma actual
     * @param {string} lang - Código de idioma (es-AR, pt-BR, en-US)
     */
    function setLang(lang) {
        if (!SUPPORTED_LANGS.includes(lang)) {
            console.error(`Unsupported language: ${lang}`);
            return;
        }
        
        currentLang = lang;
        saveLang(lang);
        document.documentElement.lang = lang.split('-')[0];
        
        // Actualizar selector visual
        updateSelectorUI();
        
        // Traducir elementos del DOM
        translatePage();
        
        // Ejecutar callbacks de cambio de idioma
        onLangChangeCallbacks.forEach(cb => {
            try {
                cb(lang);
            } catch (e) {
                console.error('Error in language change callback:', e);
            }
        });
    }
    
    /**
     * Traduce todos los elementos del DOM con atributo data-i18n
     */
    function translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) {
                const translated = t(key);
                // Solo actualizar si la traducción existe y es diferente a la key
                if (translated !== key) {
                    el.textContent = translated;
                }
            }
        });
        
        // Traducir placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (key) {
                const translated = t(key);
                if (translated !== key) {
                    el.placeholder = translated;
                }
            }
        });
        
        // Traducir títulos (tooltips)
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (key) {
                const translated = t(key);
                if (translated !== key) {
                    el.title = translated;
                }
            }
        });
    }

    /**
     * Obtiene el idioma actual
     * @returns {string} - Código de idioma actual
     */
    function getLang() {
        return currentLang;
    }

    /**
     * Registra traducciones específicas del reporte
     * @param {object} translations - Objeto con traducciones por idioma
     */
    function registerTranslations(translations) {
        SUPPORTED_LANGS.forEach(lang => {
            if (translations[lang]) {
                reportTranslations[lang] = {
                    ...reportTranslations[lang],
                    ...translations[lang]
                };
            }
        });
    }

    /**
     * Registra callback para cuando cambia el idioma
     * @param {function} callback - Función a ejecutar cuando cambia idioma
     */
    function onLangChange(callback) {
        if (typeof callback === 'function') {
            onLangChangeCallbacks.push(callback);
        }
    }

    /**
     * Actualiza la UI del selector de idioma
     */
    function updateSelectorUI() {
        const selector = document.getElementById('i18n-selector');
        if (!selector) return;
        
        const buttons = selector.querySelectorAll('.i18n-lang-btn');
        buttons.forEach(btn => {
            const lang = btn.dataset.lang;
            btn.classList.toggle('active', lang === currentLang);
        });
    }

    /**
     * Crea e inyecta el selector de idioma flotante
     */
    function initSelector() {
        // No crear si ya existe
        if (document.getElementById('i18n-selector')) return;
        
        // DEV_MODE check - no esperar auth en localhost
        const DEV_MODE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // Esperar a que el body esté autenticado (o DEV_MODE)
        const waitForAuth = () => {
            if (DEV_MODE || document.body.classList.contains('authenticated') || !document.getElementById('auth-overlay')) {
                createSelector();
                // Traducir la página con el idioma actual
                translatePage();
                console.log('🌐 i18n selector inicializado');
            } else {
                setTimeout(waitForAuth, 200);
            }
        };
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', waitForAuth);
        } else {
            waitForAuth();
        }
    }

    /**
     * Crea el elemento del selector
     */
    function createSelector() {
        // Estilos
        const style = document.createElement('style');
        style.id = 'i18n-styles';
        style.textContent = `
            #i18n-selector {
                position: fixed;
                top: 16px;
                right: 70px;
                z-index: 9997;
                display: flex;
                gap: 4px;
                background: rgba(255, 255, 255, 0.95);
                padding: 6px 10px;
                border-radius: 10px;
                border: 1px solid #E5E7EB;
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                backdrop-filter: blur(10px);
                transition: right 0.3s ease;
            }
            
            /* Mover selector cuando comentarios están abiertos */
            body.comments-open #i18n-selector {
                right: 390px;
            }
            
            .i18n-lang-btn {
                width: 28px;
                height: 28px;
                border: none;
                background: transparent;
                border-radius: 6px;
                cursor: pointer;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                opacity: 0.5;
            }
            
            .i18n-lang-btn:hover {
                background: rgba(89, 169, 255, 0.15);
                opacity: 0.8;
            }
            
            .i18n-lang-btn.active {
                background: rgba(89, 169, 255, 0.25);
                opacity: 1;
                transform: scale(1.05);
            }
            
            .i18n-lang-btn:focus {
                outline: none;
                box-shadow: 0 0 0 2px #59A9FF;
            }
            
            @media (max-width: 768px) {
                #i18n-selector {
                    top: auto;
                    bottom: 80px;
                    right: 10px;
                }
                body.comments-open #i18n-selector {
                    right: 10px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Selector HTML
        const selector = document.createElement('div');
        selector.id = 'i18n-selector';
        selector.setAttribute('role', 'group');
        selector.setAttribute('aria-label', t('action.select_language'));
        
        const flags = {
            'es-AR': '🇦🇷',
            'pt-BR': '🇧🇷',
            'en-US': '🇺🇸'
        };
        
        const labels = {
            'es-AR': 'Español (Argentina)',
            'pt-BR': 'Português (Brasil)',
            'en-US': 'English (US)'
        };
        
        SUPPORTED_LANGS.forEach(lang => {
            const btn = document.createElement('button');
            btn.className = `i18n-lang-btn ${lang === currentLang ? 'active' : ''}`;
            btn.dataset.lang = lang;
            btn.textContent = flags[lang];
            btn.setAttribute('aria-label', labels[lang]);
            btn.setAttribute('title', labels[lang]);
            btn.onclick = () => setLang(lang);
            selector.appendChild(btn);
        });
        
        document.body.appendChild(selector);
    }

    /**
     * Fuerza re-render de React si está disponible
     */
    function forceReactRerender() {
        // Si hay un root de React, forzar re-render
        const rootElement = document.getElementById('root');
        if (rootElement && rootElement._reactRootContainer) {
            // React 17
            rootElement._reactRootContainer._internalRoot.current.stateNode.forceUpdate();
        } else if (window.__REACT_ROOT__) {
            // Custom reference
            window.__REACT_ROOT__.render(window.__REACT_APP__());
        }
    }

    // Inicializar idioma al cargar
    currentLang = getInitialLang();

    // Exponer API globalmente
    window.i18n = {
        t,
        setLang,
        getLang,
        registerTranslations,
        onLangChange,
        initSelector,
        translatePage,
        forceReactRerender,
        autoTranslate,
        setupAutoTranslate,
        SUPPORTED_LANGS,
        DEFAULT_LANG
    };

    // Shortcut para usar en React/JSX
    window.T = t;

    /**
     * Traduce automáticamente el contenido de un elemento y sus hijos
     * basándose en un diccionario de texto -> clave de traducción
     * Útil para reportes que no tienen data-i18n en cada elemento
     */
    function autoTranslate(containerSelector, textMap, originalMap) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        // Crear mapa inverso para saber qué texto original corresponde a cada traducción
        const reverseMap = {};
        Object.keys(originalMap || textMap).forEach(originalText => {
            const key = (originalMap || textMap)[originalText];
            reverseMap[key] = originalText;
        });
        
        // Buscar elementos con texto directo
        const allElements = container.querySelectorAll('*');
        
        allElements.forEach(el => {
            // Solo procesar nodos hoja (sin hijos elemento, solo texto)
            if (el.children.length === 0 && el.textContent) {
                const text = el.textContent.trim();
                
                // Buscar en el mapa original
                if (textMap[text]) {
                    const translation = t(textMap[text]);
                    if (translation !== textMap[text]) {
                        el.textContent = translation;
                        el.setAttribute('data-original-text', text);
                    }
                }
                // Si el elemento tiene el texto original guardado, usar eso para buscar
                else if (el.hasAttribute('data-original-text')) {
                    const originalText = el.getAttribute('data-original-text');
                    if (textMap[originalText]) {
                        const translation = t(textMap[originalText]);
                        el.textContent = translation;
                    }
                }
            }
        });
        
        // También procesar nodos de texto directos
        const walker = document.createTreeWalker(
            container,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Solo aceptar nodos de texto con contenido significativo
                    if (node.textContent.trim().length > 0 && node.parentElement) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_SKIP;
                }
            },
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(node => {
            const text = node.textContent.trim();
            const parent = node.parentElement;
            
            if (text && textMap[text]) {
                const translation = t(textMap[text]);
                if (translation !== textMap[text]) {
                    // Preservar espacios originales
                    const leadingSpace = node.textContent.match(/^\s*/)[0];
                    const trailingSpace = node.textContent.match(/\s*$/)[0];
                    node.textContent = leadingSpace + translation + trailingSpace;
                    
                    if (parent) {
                        parent.setAttribute('data-original-text', text);
                    }
                }
            }
            // Buscar por texto original guardado en el padre
            else if (parent && parent.hasAttribute('data-original-text')) {
                const originalText = parent.getAttribute('data-original-text');
                if (textMap[originalText]) {
                    const translation = t(textMap[originalText]);
                    const leadingSpace = node.textContent.match(/^\s*/)[0];
                    const trailingSpace = node.textContent.match(/\s*$/)[0];
                    node.textContent = leadingSpace + translation + trailingSpace;
                }
            }
        });
        
        console.log(`🌐 Auto-translate: procesados ${allElements.length} elementos`);
    }

    /**
     * Registra y aplica traducciones automáticas para un reporte
     * @param {object} textToKeyMap - Mapa de { "texto original": "clave.traduccion" }
     * @param {string} containerSelector - Selector del contenedor (default: body)
     */
    function setupAutoTranslate(textToKeyMap, containerSelector = 'body') {
        // Guardar el mapa para re-aplicar cuando cambie el idioma
        window._autoTranslateMap = textToKeyMap;
        window._autoTranslateContainer = containerSelector;
        
        // Aplicar traducciones iniciales
        setTimeout(() => {
            autoTranslate(containerSelector, textToKeyMap, textToKeyMap);
        }, 100);
        
        // Re-aplicar cuando cambie el idioma
        onLangChange(() => {
            setTimeout(() => {
                autoTranslate(containerSelector, textToKeyMap, textToKeyMap);
            }, 50);
        });
    }

    // Auto-inicializar selector cuando el DOM esté listo y el body esté autenticado
    // Esto permite que funcione en todos los reportes sin llamar initSelector() manualmente
    function autoInit() {
        const DEV_MODE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        // Verificar si ya hay selector
        if (document.getElementById('i18n-selector')) return;
        
        // Crear selector si está autenticado o en DEV_MODE
        if (DEV_MODE || document.body.classList.contains('authenticated')) {
            createSelector();
            translatePage();
            console.log('🌐 i18n: Auto-inicializado');
        } else {
            // Reintentar en 500ms
            setTimeout(autoInit, 500);
        }
    }
    
    // Iniciar auto-init cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(autoInit, 100));
    } else {
        setTimeout(autoInit, 100);
    }

})();

