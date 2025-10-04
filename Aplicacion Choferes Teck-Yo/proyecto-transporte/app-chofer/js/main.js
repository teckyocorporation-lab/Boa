// Chofer App Main JavaScript

// Global variables
let currentChofer = null;
let carrerasDisponibles = [];
let misCarreras = [];
let notificaciones = [];

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Load initial data
    loadInitialData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize page-specific functionality
    initializePage();
}

// Check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem('choferToken');
    if (!token) {
        redirectToLogin();
        return;
    }
    
    // Validate token (in real app, this would be a server call)
    currentChofer = JSON.parse(localStorage.getItem('choferUser') || '{}');
}

// Redirect to login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Load initial data
async function loadInitialData() {
    try {
        // Load data from mock data or API
        await loadCarrerasDisponibles();
        await loadMisCarreras();
        await loadNotificaciones();
        
        // Update home page if on home
        if (window.location.pathname.includes('home.html')) {
            updateHomePage();
        }
    } catch (error) {
        console.error('Error loading initial data:', error);
        showNotification('Error al cargar los datos', 'error');
    }
}

// Load available carreras
async function loadCarrerasDisponibles() {
    // In a real app, this would be an API call
    carrerasDisponibles = window.mockData?.carreras?.filter(c => c.estado === 'disponible') || [];
    return carrerasDisponibles;
}

// Load my carreras
async function loadMisCarreras() {
    // In a real app, this would be an API call
    misCarreras = window.mockData?.carreras?.filter(c => c.choferId === currentChofer?.id) || [];
    return misCarreras;
}

// Load notifications
async function loadNotificaciones() {
    // In a real app, this would be an API call
    notificaciones = window.mockData?.notificaciones || [];
    return notificaciones;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearch);
    });
    
    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilter);
    });
    
    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

// Handle search input
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const searchType = event.target.id.replace('search', '').toLowerCase();
    
    if (searchType === 'carrera') {
        filterCarrerasDisponibles(searchTerm);
    } else if (searchType === 'historial') {
        filterHistorial(searchTerm);
    }
}

// Handle filter changes
function handleFilter(event) {
    const filterValue = event.target.value;
    const filterType = event.target.id.replace('Filter', '');
    
    if (filterType === 'status') {
        applyStatusFilter(filterValue);
    } else if (filterType === 'distance') {
        applyDistanceFilter(filterValue);
    } else if (filterType === 'price') {
        applyPriceFilter(filterValue);
    }
}

// Handle form submissions
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formId = event.target.id;
    
    if (formId === 'choferLoginForm') {
        handleChoferLogin(event);
    } else if (formId === 'choferRegistroForm') {
        handleChoferRegistro(event);
    } else if (formId === 'personalInfoForm') {
        handleUpdatePersonalInfo(event);
    } else if (formId === 'notificationsForm') {
        handleUpdateNotifications(event);
    } else if (formId === 'passwordForm') {
        handleChangePassword(event);
    } else if (formId === 'notificationSettingsForm') {
        handleUpdateNotificationSettings(event);
    }
}

// Initialize page-specific functionality
function initializePage() {
    const currentPage = getCurrentPage();
    
    switch (currentPage) {
        case 'home':
            initializeHome();
            break;
        case 'carreras-disponibles':
            initializeCarrerasDisponibles();
            break;
        case 'carrera-detalle':
            initializeCarreraDetalle();
            break;
        case 'mis-carreras':
            initializeMisCarreras();
            break;
        case 'historial':
            initializeHistorial();
            break;
        case 'perfil':
            initializePerfil();
            break;
        case 'notificaciones':
            initializeNotificaciones();
            break;
    }
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename.replace('.html', '');
}

// Home page functionality
function initializeHome() {
    updateHomePage();
}

function updateHomePage() {
    // Update chofer status
    const statusElement = document.getElementById('choferStatus');
    if (statusElement) {
        statusElement.textContent = currentChofer?.estado || 'Disponible';
    }
    
    // Update today's stats
    const today = new Date().toISOString().split('T')[0];
    const carrerasHoy = misCarreras.filter(c => c.fecha?.startsWith(today));
    const gananciasHoy = carrerasHoy.reduce((sum, c) => sum + parseFloat(c.precio || 0), 0);
    
    document.getElementById('carrerasHoy').textContent = carrerasHoy.length;
    document.getElementById('gananciasHoy').textContent = `$${gananciasHoy.toFixed(2)}`;
    
    // Update rating
    const calificacion = currentChofer?.calificacionPromedio || 0;
    document.getElementById('calificacion').textContent = calificacion > 0 ? calificacion.toFixed(1) : '-';
    
    // Load recent carreras
    loadRecentCarreras();
}

function loadRecentCarreras() {
    const recentCarrerasList = document.getElementById('recentCarrerasList');
    if (!recentCarrerasList) return;
    
    const recentCarreras = misCarreras
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 3);
    
    recentCarrerasList.innerHTML = recentCarreras.map(carrera => `
        <div class="carrera-item">
            <div class="carrera-info">
                <div class="carrera-title">Carrera ${carrera.id}</div>
                <div class="carrera-route-info">${carrera.origen} → ${carrera.destino}</div>
                <div class="carrera-meta">
                    <span>${new Date(carrera.fecha).toLocaleDateString()}</span>
                    <span>$${carrera.precio}</span>
                </div>
            </div>
            <div class="carrera-status ${carrera.estado}">${carrera.estado}</div>
        </div>
    `).join('');
}

// Carreras disponibles functionality
function initializeCarrerasDisponibles() {
    loadCarrerasDisponiblesGrid();
}

function loadCarrerasDisponiblesGrid() {
    const carrerasGrid = document.getElementById('carrerasGrid');
    const noCarreras = document.getElementById('noCarreras');
    
    if (!carrerasGrid) return;
    
    if (carrerasDisponibles.length === 0) {
        carrerasGrid.style.display = 'none';
        if (noCarreras) noCarreras.style.display = 'block';
        return;
    }
    
    carrerasGrid.style.display = 'grid';
    if (noCarreras) noCarreras.style.display = 'none';
    
    carrerasGrid.innerHTML = carrerasDisponibles.map(carrera => `
        <div class="carrera-card">
            <div class="carrera-header">
                <span class="carrera-id">${carrera.id}</span>
                <span class="carrera-price">$${carrera.precio}</span>
            </div>
            <div class="carrera-route">
                <div class="route-item">
                    <span class="route-icon origin">O</span>
                    <span>${carrera.origen}</span>
                </div>
                <div class="route-item">
                    <span class="route-icon destination">D</span>
                    <span>${carrera.destino}</span>
                </div>
            </div>
            <div class="carrera-details">
                <div class="detail-item">
                    <span class="detail-label">Distancia</span>
                    <span class="detail-value">${carrera.distancia || 'N/A'} km</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Fecha</span>
                    <span class="detail-value">${new Date(carrera.fecha).toLocaleDateString()}</span>
                </div>
            </div>
            <div class="carrera-actions">
                <button class="btn-primary" onclick="verCarrera('${carrera.id}')">Ver Detalles</button>
                <button class="btn-success" onclick="aceptarCarrera('${carrera.id}')">Aceptar</button>
            </div>
        </div>
    `).join('');
}

function filterCarrerasDisponibles(searchTerm) {
    const carreras = document.querySelectorAll('.carrera-card');
    carreras.forEach(carrera => {
        const text = carrera.textContent.toLowerCase();
        carrera.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function applyDistanceFilter(distance) {
    // Implementation for distance filter
    console.log('Distance filter:', distance);
}

function applyPriceFilter(price) {
    // Implementation for price filter
    console.log('Price filter:', price);
}

// Navigation functions
function navigateTo(page) {
    window.location.href = page;
}

function goBack() {
    window.history.back();
}

function refreshCarreras() {
    loadCarrerasDisponibles().then(() => {
        loadCarrerasDisponiblesGrid();
        showNotification('Carreras actualizadas', 'success');
    });
}

function clearFilters() {
    document.getElementById('searchCarrera').value = '';
    document.getElementById('distanceFilter').value = '';
    document.getElementById('priceFilter').value = '';
    loadCarrerasDisponiblesGrid();
}

// Carrera actions
function verCarrera(carreraId) {
    window.location.href = `carrera-detalle.html?id=${carreraId}`;
}

function aceptarCarrera(carreraId) {
    if (confirm('¿Está seguro de que desea aceptar esta carrera?')) {
        // Update carrera status
        const carrera = carrerasDisponibles.find(c => c.id === carreraId);
        if (carrera) {
            carrera.estado = 'aceptada';
            carrera.choferId = currentChofer.id;
            misCarreras.push(carrera);
            carrerasDisponibles = carrerasDisponibles.filter(c => c.id !== carreraId);
        }
        
        showNotification('Carrera aceptada', 'success');
        loadCarrerasDisponiblesGrid();
    }
}

function rechazarCarrera() {
    if (confirm('¿Está seguro de que desea rechazar esta carrera?')) {
        showNotification('Carrera rechazada', 'info');
        goBack();
    }
}

function cancelarCarrera() {
    if (confirm('¿Está seguro de que desea cancelar esta carrera?')) {
        showNotification('Carrera cancelada', 'info');
        goBack();
    }
}

function updateProgress() {
    showNotification('Progreso actualizado', 'success');
}

// Status toggle
function toggleStatus() {
    const currentStatus = currentChofer?.estado || 'disponible';
    const newStatus = currentStatus === 'disponible' ? 'ocupado' : 'disponible';
    
    currentChofer.estado = newStatus;
    localStorage.setItem('choferUser', JSON.stringify(currentChofer));
    
    document.getElementById('choferStatus').textContent = newStatus;
    showNotification(`Estado cambiado a ${newStatus}`, 'success');
}

// Profile functions
function editProfile() {
    const inputs = document.querySelectorAll('#personalInfoForm input');
    inputs.forEach(input => {
        input.removeAttribute('readonly');
    });
    
    document.querySelector('#personalInfoForm .form-actions').style.display = 'flex';
}

function cancelEdit() {
    const inputs = document.querySelectorAll('#personalInfoForm input');
    inputs.forEach(input => {
        input.setAttribute('readonly', 'readonly');
    });
    
    document.querySelector('#personalInfoForm .form-actions').style.display = 'none';
    loadProfileData();
}

function loadProfileData() {
    if (!currentChofer) return;
    
    document.getElementById('choferNombre').textContent = currentChofer.nombre || '-';
    document.getElementById('choferEmail').textContent = currentChofer.email || '-';
    document.getElementById('choferTelefono').textContent = currentChofer.telefono || '-';
    document.getElementById('choferEstado').textContent = currentChofer.estado || '-';
    
    document.getElementById('nombre').value = currentChofer.nombre || '';
    document.getElementById('email').value = currentChofer.email || '';
    document.getElementById('telefono').value = currentChofer.telefono || '';
    document.getElementById('licencia').value = currentChofer.licencia || '';
    
    // Update stats
    document.getElementById('carrerasCompletadas').textContent = currentChofer.carrerasCompletadas || 0;
    document.getElementById('calificacionPromedio').textContent = currentChofer.calificacionPromedio || '-';
    document.getElementById('gananciasMes').textContent = `$${currentChofer.gananciasMes || 0}`;
    document.getElementById('fechaRegistro').textContent = currentChofer.fechaRegistro || '-';
}

// Notification functions
function markAllAsRead() {
    notificaciones.forEach(notif => notif.leida = true);
    showNotification('Todas las notificaciones marcadas como leídas', 'success');
    loadNotificacionesList();
}

function refreshNotifications() {
    loadNotificaciones().then(() => {
        loadNotificacionesList();
        showNotification('Notificaciones actualizadas', 'success');
    });
}

function loadNotificacionesList() {
    const notificationsList = document.getElementById('notificationsList');
    const noNotifications = document.getElementById('noNotifications');
    
    if (!notificationsList) return;
    
    if (notificaciones.length === 0) {
        notificationsList.style.display = 'none';
        if (noNotifications) noNotifications.style.display = 'block';
        return;
    }
    
    notificationsList.style.display = 'block';
    if (noNotifications) noNotifications.style.display = 'none';
    
    notificationsList.innerHTML = notificaciones.map(notif => `
        <div class="notification-item ${notif.leida ? '' : 'unread'}">
            <div class="notification-icon ${notif.tipo}">
                ${getNotificationIcon(notif.tipo)}
            </div>
            <div class="notification-content">
                <div class="notification-title">${notif.titulo}</div>
                <div class="notification-message">${notif.mensaje}</div>
                <div class="notification-time">${new Date(notif.fecha).toLocaleString()}</div>
            </div>
            <div class="notification-actions">
                ${!notif.leida ? '<button onclick="markAsRead(\'' + notif.id + '\')">Marcar como leída</button>' : ''}
                <button onclick="deleteNotification(\'' + notif.id + '\')">Eliminar</button>
            </div>
        </div>
    `).join('');
}

function getNotificationIcon(tipo) {
    const icons = {
        carrera: '🚗',
        pago: '💰',
        sistema: '⚙️',
        promocion: '🎉'
    };
    return icons[tipo] || '📢';
}

function markAsRead(notifId) {
    const notif = notificaciones.find(n => n.id === notifId);
    if (notif) {
        notif.leida = true;
        loadNotificacionesList();
    }
}

function deleteNotification(notifId) {
    notificaciones = notificaciones.filter(n => n.id !== notifId);
    loadNotificacionesList();
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
