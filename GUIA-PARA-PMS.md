🚀 *Data Reports - Sistema de Reportes Mensuales*

Hola! Les comparto el nuevo sistema para los reportes mensuales de *Chat* y *Lumi*. La idea es documentar la evolución de cada producto mes a mes y que todos podamos colaborar.

---

*🔗 Acceso*
https://agustinparraquini.github.io/nuvemchat-report-nov2025/

> Loguearse con mail de `@tiendanube.com` o `@nuvemshop.com`

---

*📊 Estructura*

```
Hub Principal
├── 💬 Nuvem Chat
│   ├── chat/2024/noviembre.html
│   ├── chat/2024/diciembre.html
│   └── ...
└── ✨ Lumi
    ├── lumi/2024/noviembre.html
    └── ...
```

El botón 📊 (arriba a la izquierda) permite saltar entre reportes.

---

*💬 Comentarios*

• Doble click en el slide → comentar
• Se sincronizan en tiempo real
• Cada reporte tiene sus propios comentarios

---

*🛠️ Crear un reporte nuevo*

*Opción 1: Con Cursor AI (recomendado)*
Abrir el proyecto en Cursor y pedir:
> "Creá el reporte de [MES] [AÑO] para [Chat/Lumi] basándote en Data Chat.xlsx"

*Opción 2: Manual*
```
# 1. Copiar reporte existente
cp chat/2024/noviembre.html chat/2024/diciembre.html

# 2. Editar datos del nuevo mes

# 3. Agregar link en index.html (sidebar y recientes)

# 4. Publicar
git add .
git commit -m "feat(chat): add diciembre 2024 report"
git push origin main
```

---

*📁 Nombres de archivos*

| Producto | Ruta |
|----------|------|
| Chat mensual | `chat/[año]/[mes].html` |
| Lumi mensual | `lumi/[año]/[mes].html` |
| Especiales | `[nombre]-[año].html` |

Meses en español sin acentos: `enero`, `febrero`, `marzo`, `abril`, `mayo`, `junio`, `julio`, `agosto`, `septiembre`, `octubre`, `noviembre`, `diciembre`

---

*⚠️ Reglas*

• NO modificar reportes viejos
• NO cambiar URLs existentes
• Siempre actualizar el index.html con el nuevo reporte

---

*🔑 Acceso al repo*

Pásenme su usuario de GitHub para agregarlos como colaboradores.

Repo: https://github.com/AgustinParraquini/nuvemchat-report-nov2025

---

Dudas? Me avisan 🙌

