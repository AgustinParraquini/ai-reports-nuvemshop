# 🔐 Guía de Seguridad - Nuvemshop AI Reports

## Estado Actual

Las credenciales de Firebase visibles en el código (`apiKey`, `projectId`, etc.) **son públicas por diseño**. Esto es normal en aplicaciones web con Firebase - la seguridad real se maneja en otras capas.

## ⚠️ CRÍTICO: Configurar en Firebase Console

### 1. Firebase Security Rules (Realtime Database)

Ir a [Firebase Console](https://console.firebase.google.com/) → `reports-ai-b02e8` → Realtime Database → Rules

**Reglas recomendadas:**

```json
{
  "rules": {
    "presentations": {
      "$presentationId": {
        "comments": {
          ".read": "auth != null && auth.token.email.matches(/.*@tiendanube\\.com$/) || auth.token.email.matches(/.*@nuvemshop\\.com\\.br$/)",
          ".write": "auth != null && auth.token.email.matches(/.*@tiendanube\\.com$/) || auth.token.email.matches(/.*@nuvemshop\\.com\\.br$/)"
        }
      }
    },
    ".read": false,
    ".write": false
  }
}
```

**Esto asegura que:**
- ✅ Solo usuarios autenticados con email de `@tiendanube.com` o `@nuvemshop.com.br` pueden leer/escribir comentarios
- ✅ No se puede acceder a nada fuera de la estructura de comentarios
- ✅ Acceso denegado por defecto

### 2. Restringir API Key a Dominios Autorizados

Ir a [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials

Buscar la API Key `AIzaSyBhrC9gzxfJrf-8_r0X3KpF8_PW0MgB3Gg` y agregar restricciones:

**Application restrictions → HTTP referrers:**
```
agustinparraquini.github.io/*
localhost:*
127.0.0.1:*
```

**API restrictions → Restrict key:**
- Firebase Realtime Database API
- Identity Toolkit API (para Auth)
- Token Service API

### 3. Firebase Authentication

Ir a Firebase Console → Authentication → Settings → Authorized domains

Verificar que solo estos dominios estén habilitados:
- `localhost`
- `reports-ai-b02e8.firebaseapp.com`
- `agustinparraquini.github.io`

### 4. Sign-in Providers

En Authentication → Sign-in method, verificar que solo esté habilitado:
- ✅ Google (con dominio restringido a @tiendanube.com y @nuvemshop.com.br)

## ✅ Checklist de Verificación

- [ ] Security Rules configuradas en Realtime Database
- [ ] API Key restringida a dominios autorizados
- [ ] Dominios autorizados en Firebase Auth correctos
- [ ] Google Sign-in restringido a dominios corporativos

## 🚨 Qué NO hacer

1. **NUNCA** guardar credenciales de service account (`firebase-admin-*.json`) en el repo
2. **NUNCA** usar las Security Rules por defecto en producción (`".read": true, ".write": true`)
3. **NUNCA** compartir tokens de acceso o refresh tokens

## 📝 Monitoreo

Revisar periódicamente en Firebase Console:
- **Usage** → Ver si hay accesos inusuales
- **Authentication** → Ver usuarios activos
- **Database** → Ver lecturas/escrituras

## Recursos

- [Firebase Security Rules Documentation](https://firebase.google.com/docs/database/security)
- [Restricting API Keys](https://cloud.google.com/docs/authentication/api-keys#adding_restrictions)
- [Firebase Auth Domain Verification](https://firebase.google.com/docs/auth/web/google-signin#before_you_begin)

