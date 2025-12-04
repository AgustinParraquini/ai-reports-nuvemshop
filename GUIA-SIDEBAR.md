# 📌 Guía del Sidebar - AI Reports

> Mantené siempre este diseño para consistencia visual cuando tengamos 20+ reportes.

## Estructura Visual

```
┌──────────────────────────────────┐
│  📊                              │
│                                  │
│  ┌────────────────────────────┐  │
│  │ 🏠 Hub Principal           │  │
│  └────────────────────────────┘  │
│                                  │
│  💬 NUVEM CHAT                   │
│  ├─ 📄 Noviembre 2024 ← activo  │
│  └─ 📊 Q4 2025                   │
│                                  │
│  ✨ LUMI                         │
│  └─ 📄 Próximamente...           │
│                                  │
│  ──────────────────────────────  │
│  👤 [Usuario]         [Salir]    │
│     email@tiendanube.com         │
└──────────────────────────────────┘
```

## Elementos del Menú

### 1. Sección de Producto
```html
<div class="sidebar-section">
    <div class="sidebar-section-title">💬 Nuvem Chat</div>
    <!-- items van acá -->
</div>
```

### 2. Separador de Año
```html
<div class="sidebar-year">2025</div>
```

### 3. Item Normal
```html
<a href="chat/2025/noviembre.html" class="sidebar-item">
    <span class="sidebar-item-icon">📄</span>
    Noviembre
</a>
```

### 4. Item Activo (página actual)
```html
<a href="chat/2024/noviembre.html" class="sidebar-item active">
    <span class="sidebar-item-icon">📄</span>
    Noviembre 2024
</a>
```

### 5. Item con Badge "Nuevo"
```html
<a href="chat/2025/diciembre.html" class="sidebar-item">
    <span class="sidebar-item-icon">📄</span>
    Diciembre
    <span class="sidebar-badge new">Nuevo</span>
</a>
```

### 6. Item Deshabilitado
```html
<div class="sidebar-item" style="color:#4B5563;cursor:default">
    <span class="sidebar-item-icon">📄</span>
    Próximamente...
</div>
```

## Iconos por Tipo

| Icono | Tipo | Ejemplo |
|-------|------|---------|
| 📄 | Reporte mensual | Noviembre, Diciembre |
| 📊 | Reporte especial | Q4 2025, Black Friday |
| 🏠 | Hub principal | Página de inicio |
| 🚀 | All Hands | Presentación ejecutiva |

## Emojis por Producto

| Producto | Emoji | Color asociado |
|----------|-------|----------------|
| Nuvem Chat | 💬 | Azul (#59A9FF) |
| Lumi | ✨ | Violeta (#8B5CF6) |
| All Hands | 🚀 | Violeta (#8B5CF6) |

## Orden Correcto

```
1. Hub Principal (siempre primero)
2. All Hands (si aplica)
3. Nuvem Chat
   ├── 2025 (año más reciente)
   │   ├── Diciembre (mes más reciente, con [Nuevo])
   │   ├── Noviembre
   │   └── ...
   ├── 2024 (años anteriores)
   │   └── ...
   └── Especiales (Q4, Black Friday, etc)
4. Lumi
   └── (misma estructura)
```

## Agregar Nuevo Reporte - Checklist

### En el Sidebar del `index.html`:

- [ ] Agregar item en la posición correcta (año → mes más reciente primero)
- [ ] Poner badge `Nuevo` solo en el más reciente
- [ ] Quitar badge `Nuevo` del reporte anterior
- [ ] Verificar que el link sea correcto

### Código a agregar:
```html
<!-- Agregar ANTES del item anterior del mismo año -->
<a href="chat/2025/diciembre.html" class="sidebar-item">
    <span class="sidebar-item-icon">📄</span>
    Diciembre
    <span class="sidebar-badge new">Nuevo</span>
</a>
```

## Ejemplo con 20 Reportes

Cuando el menú crezca, mantener esta estructura:

```
💬 NUVEM CHAT
├── 2025
│   ├── Diciembre [Nuevo]
│   ├── Noviembre
│   ├── Octubre
│   ├── Septiembre
│   ├── Agosto
│   └── Julio
├── 2024
│   ├── Diciembre
│   ├── Noviembre
│   ├── Octubre
│   ├── Septiembre
│   ├── Agosto
│   ├── Julio
│   └── ... (hasta 12)
└── Especiales
    ├── Q4 2025
    ├── Q3 2025
    └── Black Friday 2024
```

## Colores CSS del Sidebar

```css
/* Copiar estos valores para consistencia */
.sidebar {
    background: #0a1628;
    border-right: 1px solid #1e293b;
}

.sidebar-item {
    color: #9CA3AF;                /* Texto normal */
}

.sidebar-item:hover {
    background: #1e293b;
    color: white;
}

.sidebar-item.active {
    background: #59A9FF20;         /* Azul con opacity */
    color: #59A9FF;
}

.sidebar-badge.new {
    background: #00965E;           /* Verde */
}

.sidebar-year {
    color: #4B5563;               /* Gris oscuro */
}

.sidebar-section-title {
    color: #6B7280;               /* Gris */
}
```

## ⚠️ Errores Comunes a Evitar

1. ❌ No poner múltiples badges "Nuevo"
2. ❌ No mezclar años (2024 antes que 2025)
3. ❌ No olvidar quitar badge del reporte anterior
4. ❌ No usar rutas incorrectas (verificar que exista el archivo)
5. ❌ No cambiar el orden alfabético de productos

## Tips para Mantener Limpio

1. **Un solo "Nuevo" por producto** - El más reciente únicamente
2. **Años en orden descendente** - 2025, 2024, 2023...
3. **Meses en orden descendente** - Dic, Nov, Oct...
4. **Especiales al final** - Q4, Black Friday, etc.
5. **Consistencia de iconos** - 📄 para mensual, 📊 para especial

