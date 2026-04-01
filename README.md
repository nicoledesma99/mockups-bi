# Mockups BI - Portfolio

Dashboards interactivos de demostración para feedlots y frigoríficos.

## 📁 Estructura del proyecto

```
mockups-bi/
├── public/                     # Assets públicos
├── src/
│   └── pages/
│       ├── mockup-feedlot.html
│       └── mockup-frigorifico.html
├── index.html                  # Página principal
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

## 🚀 Instalación y desarrollo local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

## 🌐 Deploy en Vercel

1. **Subir a GitHub:**
```bash
git init
git add .
git commit -m "Mockups BI completos"
git remote add origin https://github.com/nicoledesma99/mockups-bi.git
git push -u origin main --force
```

2. **En Vercel:**
   - Importar repositorio `mockups-bi`
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Click Deploy

3. **¡Listo!** El link es: `https://mockups-bi.vercel.app`

## 📱 Responsive

Todos los mockups están optimizados para verse bien en móvil.

## 🎯 Navegación interactiva

Cada mockup tiene 4 tabs navegables:
- **Feedlot:** Operativo, Performance, Clientes, Costos
- **Frigorífico:** Operativo, Rendimiento, Comercial, Stock

## 👤 Autor

**Nicolás Ledesma**  
Consultor BI especializado en Power BI y DAX  
📧 nicolas.ledesma.bi@gmail.com
