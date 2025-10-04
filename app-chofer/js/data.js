// Data management functions for Chofer App

// Data storage
let choferData = {
    carreras: [],
    notificaciones: [],
    configuracion: {}
};

// Initialize data management
function initializeData() {
    loadDataFromStorage();
    setupDataListeners();
}

// Load data from localStorage
function loadDataFromStorage() {
    const storedData = localStorage.getItem('choferAppData');
    if (storedData) {
        choferData = JSON.parse(storedData);
    } else {
        // Initialize with default data
        initializeDefaultData();
    }
}

// Save data to localStorage
function saveDataToStorage() {
    localStorage.setItem('choferAppData', JSON.stringify(choferData));
}

// Initialize default data
function initializeDefaultData() {
    choferData = {
        carreras: [
            {
                id: 'carrera-001',
                origen: 'Centro de la Ciudad',
                destino: 'Aeropuerto',
                choferId: 'chofer-001',
                fecha: '2024-04-10T10:00:00',
                estado: 'completada',
                precio: 25.50,
                distancia: 15.2,
                calificacion: 5,
                cliente: {
                    nombre: 'María García',
                    telefono: '+1234567890',
                    calificacion: 4.8
                }
            },
            {
                id: 'carrera-002',
                origen: 'Plaza Principal',
                destino: 'Estación Central',
                choferId: 'chofer-001',
                fecha: '2024-04-10T14:30:00',
                estado: 'en_progreso',
                precio: 18.75,
                distancia: 8.5,
                cliente: {
                    nombre: 'Carlos López',
                    telefono: '+1234567891',
                    calificacion: 4.6
                }
            }
        ],
        notificaciones: [
            {
                id: 'notif-001',
                tipo: 'carrera',
                titulo: 'Nueva carrera disponible',
                mensaje: 'Hay una nueva carrera disponible cerca de tu ubicación',
                fecha: '2024-04-10T09:30:00',
                leida: false
            },
            {
                id: 'notif-002',
                tipo: 'pago',
                titulo: 'Pago recibido',
                mensaje: 'Se ha procesado tu pago de $125.50',
                fecha: '2024-04-09T16:45:00',
                leida: true
            },
            {
                id: 'notif-003',
                tipo: 'sistema',
                titulo: 'Actualización del sistema',
                mensaje: 'El sistema ha sido actualizado con nuevas funcionalidades',
                fecha: '2024-04-08T10:15:00',
                leida: true
            }
        ],
        configuracion: {
            notificaciones: {
                carreras: true,
                pagos: true,
                sistema: true,
                promociones: false,
                email: true,
                sms: false
            },
            horarios: {
                horaInicio: '08:00',
                horaFin: '22:00'
            }
        }
    };
    
    saveDataToStorage();
}

// Setup data change listeners
function setupDataListeners() {
    // Listen for data changes and auto-save
    const originalData = JSON.stringify(choferData);
    
    setInterval(() => {
        const currentData = JSON.stringify(choferData);
        if (currentData !== originalData) {
            saveDataToStorage();
        }
    }, 5000); // Check every 5 seconds
}

// Carreras CRUD operations
function getCarreras() {
    return choferData.carreras;
}

function getCarreraById(id) {
    return choferData.carreras.find(carrera => carrera.id === id);
}

function addCarrera(carreraData) {
    const newCarrera = {
        id: 'carrera-' + Date.now(),
        ...carreraData,
        fechaCreacion: new Date().toISOString()
    };
    
    choferData.carreras.push(newCarrera);
    saveDataToStorage();
    return newCarrera;
}

function updateCarrera(id, carreraData) {
    const index = choferData.carreras.findIndex(carrera => carrera.id === id);
    if (index !== -1) {
        choferData.carreras[index] = { ...choferData.carreras[index], ...carreraData };
        saveDataToStorage();
        return choferData.carreras[index];
    }
    return null;
}

function deleteCarrera(id) {
    const index = choferData.carreras.findIndex(carrera => carrera.id === id);
    if (index !== -1) {
        choferData.carreras.splice(index, 1);
        saveDataToStorage();
        return true;
    }
    return false;
}

// Notificaciones CRUD operations
function getNotificaciones() {
    return choferData.notificaciones;
}

function getNotificacionById(id) {
    return choferData.notificaciones.find(notif => notif.id === id);
}

function addNotificacion(notificacionData) {
    const newNotificacion = {
        id: 'notif-' + Date.now(),
        ...notificacionData,
        fecha: new Date().toISOString(),
        leida: false
    };
    
    choferData.notificaciones.push(newNotificacion);
    saveDataToStorage();
    return newNotificacion;
}

function updateNotificacion(id, notificacionData) {
    const index = choferData.notificaciones.findIndex(notif => notif.id === id);
    if (index !== -1) {
        choferData.notificaciones[index] = { ...choferData.notificaciones[index], ...notificacionData };
        saveDataToStorage();
        return choferData.notificaciones[index];
    }
    return null;
}

function deleteNotificacion(id) {
    const index = choferData.notificaciones.findIndex(notif => notif.id === id);
    if (index !== -1) {
        choferData.notificaciones.splice(index, 1);
        saveDataToStorage();
        return true;
    }
    return false;
}

// Configuration management
function getConfiguracion() {
    return choferData.configuracion;
}

function updateConfiguracion(configData) {
    choferData.configuracion = { ...choferData.configuracion, ...configData };
    saveDataToStorage();
    return choferData.configuracion;
}

// Statistics functions
function getStatistics() {
    const carreras = getCarreras();
    const notificaciones = getNotificaciones();
    
    const today = new Date().toISOString().split('T')[0];
    const carrerasHoy = carreras.filter(c => c.fecha?.startsWith(today));
    const gananciasHoy = carrerasHoy.reduce((sum, c) => sum + parseFloat(c.precio || 0), 0);
    
    return {
        totalCarreras: carreras.length,
        carrerasHoy: carrerasHoy.length,
        gananciasHoy: gananciasHoy,
        carrerasCompletadas: carreras.filter(c => c.estado === 'completada').length,
        notificacionesNoLeidas: notificaciones.filter(n => !n.leida).length
    };
}

// Search and filter functions
function searchCarreras(query) {
    const carreras = getCarreras();
    return carreras.filter(carrera => 
        carrera.origen.toLowerCase().includes(query.toLowerCase()) ||
        carrera.destino.toLowerCase().includes(query.toLowerCase()) ||
        carrera.id.toLowerCase().includes(query.toLowerCase())
    );
}

function filterCarrerasByStatus(status) {
    const carreras = getCarreras();
    if (!status) return carreras;
    return carreras.filter(carrera => carrera.estado === status);
}

function searchNotificaciones(query) {
    const notificaciones = getNotificaciones();
    return notificaciones.filter(notif => 
        notif.titulo.toLowerCase().includes(query.toLowerCase()) ||
        notif.mensaje.toLowerCase().includes(query.toLowerCase())
    );
}

function filterNotificacionesByType(type) {
    const notificaciones = getNotificaciones();
    if (!type) return notificaciones;
    return notificaciones.filter(notif => notif.tipo === type);
}

function filterNotificacionesByStatus(status) {
    const notificaciones = getNotificaciones();
    if (!status) return notificaciones;
    return notificaciones.filter(notif => 
        status === 'unread' ? !notif.leida : notif.leida
    );
}

// Export data functions
function exportData(format = 'json') {
    const data = {
        carreras: getCarreras(),
        notificaciones: getNotificaciones(),
        configuracion: getConfiguracion(),
        exportDate: new Date().toISOString()
    };
    
    if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chofer-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Handle form submissions
function handleUpdatePersonalInfo(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        licencia: formData.get('licencia')
    };
    
    // Update current user data
    const currentUser = getCurrentUser();
    if (currentUser) {
        const updatedUser = { ...currentUser, ...userData };
        localStorage.setItem('choferUser', JSON.stringify(updatedUser));
        showNotification('Información personal actualizada', 'success');
        loadProfileData();
    }
}

function handleUpdateNotifications(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const notificationSettings = {
        notificacionesCarreras: formData.get('notificacionesCarreras') === 'on',
        notificacionesPagos: formData.get('notificacionesPagos') === 'on',
        notificacionesSistema: formData.get('notificacionesSistema') === 'on',
        notificacionesEmail: formData.get('notificacionesEmail') === 'on',
        notificacionesSMS: formData.get('notificacionesSMS') === 'on'
    };
    
    updateConfiguracion({ notificaciones: notificationSettings });
    showNotification('Configuración de notificaciones actualizada', 'success');
}

function handleChangePassword(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    
    if (newPassword !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    // In a real app, this would validate the current password with the server
    showNotification('Contraseña cambiada exitosamente', 'success');
    event.target.reset();
}

function handleUpdateNotificationSettings(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const settings = {
        notifCarreras: formData.get('notifCarreras') === 'on',
        notifPagos: formData.get('notifPagos') === 'on',
        notifSistema: formData.get('notifSistema') === 'on',
        notifPromociones: formData.get('notifPromociones') === 'on',
        notifApp: formData.get('notifApp') === 'on',
        notifEmail: formData.get('notifEmail') === 'on',
        notifSMS: formData.get('notifSMS') === 'on',
        horaInicio: formData.get('horaInicio'),
        horaFin: formData.get('horaFin')
    };
    
    updateConfiguracion(settings);
    showNotification('Configuración de notificaciones guardada', 'success');
}

// Initialize data management when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
});
