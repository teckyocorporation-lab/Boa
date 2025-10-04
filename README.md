# 🚗 Sistema de Transporte Teck-Yo

Un sistema completo de gestión de transporte con aplicaciones separadas para administradores y choferes.

## 📋 Descripción

Sistema web desarrollado para la gestión eficiente de servicios de transporte, incluyendo:

- **Panel de Administración**: Gestión completa de choferes, carreras, vehículos y reportes
- **Panel de Chofer**: Interfaz para choferes con gestión de carreras y perfil personal
- **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- **Sistema de Autenticación**: Login seguro para ambos tipos de usuarios

## 🚀 Características Principales

### 👨‍💼 Panel de Administración
- Dashboard con estadísticas en tiempo real
- Gestión completa de choferes (CRUD)
- Control de carreras y vehículos
- Sistema de reportes y gráficos
- Configuración del sistema
- Gestión de notificaciones

### 🚕 Panel de Chofer
- Dashboard personal con estadísticas
- Visualización de carreras disponibles
- Gestión de carreras propias
- Historial completo de viajes
- Perfil personalizable
- Centro de notificaciones

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Diseño**: CSS Grid, Flexbox, Responsive Design
- **Almacenamiento**: LocalStorage (para desarrollo)
- **Iconos**: Emojis y símbolos Unicode
- **Fuentes**: Segoe UI, Tahoma, Geneva, Verdana

## 📁 Estructura del Proyecto

```
proyecto-transporte/
├── index.html                 # Página de inicio
├── app-admin/                 # Aplicación de Administración
│   ├── index.html
│   ├── login.html
│   ├── css/
│   │   ├── styles.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── auth.js
│   │   └── data.js
│   ├── pages/                 # Páginas del admin
│   └── assets/                # Recursos del admin
├── app-chofer/                # Aplicación del Chofer
│   ├── index.html
│   ├── login.html
│   ├── registro.html
│   ├── css/
│   │   ├── styles.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── main.js
│   │   ├── auth.js
│   │   └── data.js
│   ├── pages/                 # Páginas del chofer
│   └── assets/                # Recursos del chofer
└── shared/                    # Archivos compartidos
    ├── css/
    │   └── common.css
    ├── js/
    │   └── utils.js
    └── data/
        └── mock-data.js
```

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Instalación
1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/proyecto-transporte.git
cd proyecto-transporte
```

2. Abre el archivo `index.html` en tu navegador o usa un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server

# Con PHP
php -S localhost:8000
```

3. Navega a `http://localhost:8000` en tu navegador

## 🔐 Credenciales de Prueba

### Administrador
- **Email**: `admin@teckyo.com`
- **Contraseña**: `admin123`

### Chofer
- **Email**: `chofer@teckyo.com`
- **Contraseña**: `chofer123`

## 📱 Funcionalidades

### Dashboard
- Estadísticas en tiempo real
- Gráficos y métricas
- Actividades recientes
- Accesos rápidos

### Gestión de Usuarios
- CRUD completo de choferes
- Perfiles personalizables
- Sistema de autenticación
- Gestión de permisos

### Gestión de Carreras
- Creación y asignación de carreras
- Seguimiento en tiempo real
- Historial completo
- Sistema de calificaciones

### Reportes
- Estadísticas detalladas
- Exportación de datos
- Gráficos interactivos
- Filtros avanzados

## 🎨 Diseño

- **Responsive Design**: Adaptable a todos los dispositivos
- **UI Moderna**: Interfaz intuitiva y atractiva
- **Colores Diferenciados**: Azul para admin, verde para chofer
- **Animaciones**: Transiciones suaves y efectos visuales
- **Accesibilidad**: Diseño accesible y fácil de usar

## 🔧 Desarrollo

### Estructura de Archivos
- **HTML**: Estructura semántica y accesible
- **CSS**: Organizado por componentes y responsivo
- **JavaScript**: Modular y bien documentado
- **Datos**: Mock data para desarrollo y pruebas

### Características Técnicas
- **Modular**: Código organizado y reutilizable
- **Responsive**: Mobile-first approach
- **Performance**: Optimizado para carga rápida
- **SEO**: Estructura optimizada para motores de búsqueda

## 📊 Datos de Prueba

El sistema incluye datos de prueba predefinidos:
- 4 choferes de ejemplo
- 5 carreras de muestra
- 4 vehículos disponibles
- Notificaciones de prueba
- Configuración del sistema

## 🚀 Próximas Mejoras

- [ ] Integración con base de datos real
- [ ] API REST para comunicación
- [ ] Sistema de pagos integrado
- [ ] Notificaciones push
- [ ] Geolocalización en tiempo real
- [ ] Aplicación móvil nativa
- [ ] Sistema de chat
- [ ] Integración con mapas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Desarrollador Principal**: [Tu Nombre]
- **Email**: tu-email@ejemplo.com
- **GitHub**: [@tu-usuario](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- Comunidad de desarrolladores
- Contribuidores del proyecto
- Usuarios que han probado el sistema

---

**Desarrollado con ❤️ para la gestión eficiente del transporte**

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, no dudes en contactarnos:
- 📧 Email: soporte@teckyo.com
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/proyecto-transporte/issues)
- 📖 Documentación: [Wiki del Proyecto](https://github.com/tu-usuario/proyecto-transporte/wiki)
