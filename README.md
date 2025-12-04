# 📊 AI Reports - Tiendanube/Nuvemshop

Portal centralizado de reportes mensuales para los productos de AI de Tiendanube: **Nuvem Chat** y **Lumi**.

🔗 **Ver reportes:** https://agustinparraquini.github.io/nuvemchat-report-nov2025/

---

## 🗂️ Estructura del Repositorio

```
├── index.html              # 🏠 Página principal con sidebar de navegación
├── assets/
│   └── comments-system.js  # 💬 Sistema de comentarios (Firebase)
├── chat/                   # 📱 Reportes de Nuvem Chat
│   ├── 2024/
│   └── 2025/
│       └── noviembre.html
├── lumi/                   # 🤖 Reportes de Lumi
│   ├── 2024/
│   └── 2025/
├── all-hands/              # 🎤 Presentaciones All Hands
│   └── 2025/
│       └── octubre.html
├── q4-2025.html            # 📈 Reporte trimestral Q4
├── GUIA-PARA-PMS.md        # 📖 Guía para Product Managers
├── GUIA-SIDEBAR.md         # 📖 Cómo agregar reportes al sidebar
└── SECURITY.md             # 🔐 Configuración de seguridad
```

---

## 🚀 Cómo Funciona

### Autenticación
- Solo usuarios con email `@tiendanube.com` o `@nuvemshop.com.br` pueden acceder
- Se usa **Firebase Authentication** con Google Sign-In
- Al entrar, se muestra una pantalla de login

### Sistema de Comentarios
- Cada reporte tiene comentarios en tiempo real
- Los comentarios se guardan en **Firebase Realtime Database**
- Se pueden resolver/reabrir comentarios (como en Figma)
- **Doble click** en cualquier parte del slide para comentar

### Navegación
- El `index.html` tiene un sidebar con todos los reportes organizados
- Cada reporte es un archivo HTML independiente con el sistema de slides

---

## ➕ Agregar un Nuevo Reporte

### 1. Crear el archivo HTML

```bash
# Para Nuvem Chat
touch chat/2025/diciembre.html

# Para Lumi  
touch lumi/2025/diciembre.html

# Para All Hands
touch all-hands/2025/noviembre.html
```

### 2. Copiar la estructura base

Copiá un reporte existente y modificá:
- El contenido de los slides
- El `presentationId` para los comentarios (debe ser único)

```html
<!-- Al final del archivo, cambiar el ID -->
<script>
  initCommentsSystem('chat-dic-2025');  // ID único para este reporte
</script>
```

### 3. Agregar al Sidebar

Editá `index.html` y agregá el link en la sección correspondiente:

```html
<a href="/chat/2025/diciembre.html" class="report-link">
    <span class="report-icon">📊</span>
    <div class="report-info">
        <span class="report-title">Diciembre 2025</span>
        <span class="report-date">Nuevo</span>
    </div>
</a>
```

### 4. Commit y Push

```bash
git add .
git commit -m "feat: add chat december 2025 report"
git push
```

El sitio se actualiza automáticamente en 1-2 minutos.

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| 🔵 Azul Principal | `#59A9FF` | Links, highlights |
| 🟢 Verde | `#00965E` | Métricas positivas |
| 🔴 Rojo | `#EC3F41` | Métricas negativas, churn |
| 🟠 Naranja | `#FF7A27` | Warnings, pendientes |
| ⚫ Azul Oscuro | `#010B23` | Fondo principal |

---

## 🔧 Desarrollo Local

```bash
# Clonar el repo
git clone https://github.com/agustinparraquini/nuvemchat-report-nov2025.git
cd nuvemchat-report-nov2025

# Servir localmente (cualquier servidor estático)
npx serve .
# o
python -m http.server 8000

# Abrir en el navegador
open http://localhost:8000
```

> ⚠️ El login con Google solo funciona en dominios autorizados (localhost, github.io)

---

## 📝 Guías Adicionales

- **[GUIA-PARA-PMS.md](./GUIA-PARA-PMS.md)** - Cómo interpretar y usar los reportes
- **[GUIA-SIDEBAR.md](./GUIA-SIDEBAR.md)** - Cómo modificar la navegación
- **[SECURITY.md](./SECURITY.md)** - Configuración de seguridad de Firebase

---

## 🛠️ Stack Técnico

| Componente | Tecnología |
|------------|------------|
| Frontend | HTML + CSS + Vanilla JS |
| Slides | Sistema custom con navegación por teclado |
| Auth | Firebase Authentication (Google) |
| Comentarios | Firebase Realtime Database |
| Hosting | GitHub Pages |
| Dominio | `*.github.io` |

---

## 👥 Contacto

- **Agustín Parraquini** - Product Manager AI @ Tiendanube
- Slack: `#nuvem-chat` / `#lumi`

---

## 📅 Reportes Disponibles

### Nuvem Chat
| Mes | Link | Estado |
|-----|------|--------|
| Noviembre 2025 | [Ver](/chat/2025/noviembre.html) | ✅ Publicado |

### Lumi
| Mes | Link | Estado |
|-----|------|--------|
| - | - | Próximamente |

### All Hands
| Fecha | Link | Tema |
|-------|------|------|
| Octubre 2025 | [Ver](/all-hands/2025/octubre.html) | AI Businesses |

---

<p align="center">
  <img src="https://d26lpennugtm8s.cloudfront.net/assets/common/img/logos/logo-nuvemshop-b42c7c9ff2.svg" width="150" alt="Nuvemshop">
</p>

