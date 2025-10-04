// Admin App Main JavaScript

// Global variables
let currentUser = null;
let choferes = [];
let carreras = [];
let vehiculos = [];

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
    const token = localStorage.getItem('adminToken');
    if (!token) {
        redirectToLogin();
        return;
    }
    
    // Validate token (in real app, this would be a server call)
    currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
}

// Redirect to login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Load initial data
async function loadInitialData() {
    try {
        // Load data from mock data or API
        await loadChoferes();
        await loadCarreras();
        await loadVehiculos();
        
        // Update dashboard if on dashboard page
        if (window.location.pathname.includes('dashboard.html')) {
            updateDashboard();
        }
    } catch (error) {
        console.error('Error loading initial data:', error);
        showNotification('Error al cargar los datos', 'error');
    }
}

// Load choferes data
async function loadChoferes() {
    // In a real app, this would be an API call
    choferes = window.mockData?.choferes || [];
    return choferes;
}

// Load carreras data
async function loadCarreras() {
    // In a real app, this would be an API call
    carreras = window.mockData?.carreras || [];
    return carreras;
}

// Load vehiculos data
async function loadVehiculos() {
    // In a real app, this would be an API call
    vehiculos = window.mockData?.vehiculos || [];
    return vehiculos;
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
    
    // Form submissions (excluding login forms)
    const forms = document.querySelectorAll('form:not(#adminLoginForm)');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

// Handle search input
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const tableId = event.target.id.replace('search', '').toLowerCase();
    
    if (tableId === 'chofer') {
        filterChoferesTable(searchTerm);
    } else if (tableId === 'carrera') {
        filterCarrerasTable(searchTerm);
    } else if (tableId === 'vehiculo') {
        filterVehiculosTable(searchTerm);
    }
}

// Handle filter changes
function handleFilter(event) {
    const filterValue = event.target.value;
    const filterType = event.target.id.replace('Filter', '');
    
    if (filterType === 'status') {
        applyStatusFilter(filterValue);
    }
}

// Handle form submissions
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formId = event.target.id;
    
    if (formId === 'adminLoginForm') {
        handleAdminLogin(event);
    } else if (formId === 'crearCarreraForm') {
        handleCreateCarrera(event);
    } else if (formId === 'preciosForm') {
        handleSavePrecios(event);
    } else if (formId === 'horariosForm') {
        handleSaveHorarios(event);
    } else if (formId === 'notificacionesForm') {
        handleSaveNotificaciones(event);
    }
}

// Initialize page-specific functionality
function initializePage() {
    const currentPage = getCurrentPage();
    
    switch (currentPage) {
        case 'dashboard':
            initializeDashboard();
            break;
        case 'choferes':
            initializeChoferes();
            break;
        case 'chofer-detalle':
            initializeChoferDetalle();
            break;
        case 'carreras':
            initializeCarreras();
            break;
        case 'carrera-detalle':
            initializeCarreraDetalle();
            break;
        case 'crear-carrera':
            initializeCrearCarrera();
            break;
        case 'vehiculos':
            initializeVehiculos();
            break;
        case 'reportes':
            initializeReportes();
            break;
        case 'configuracion':
            initializeConfiguracion();
            break;
    }
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename.replace('.html', '');
}

// Dashboard functionality
function initializeDashboard() {
    updateDashboard();
}

function updateDashboard() {
    // Update statistics
    document.getElementById('totalChoferes').textContent = choferes.length;
    document.getElementById('carrerasActivas').textContent = carreras.filter(c => c.estado === 'en_progreso').length;
    document.getElementById('vehiculosDisponibles').textContent = vehiculos.filter(v => v.estado === 'disponible').length;
    
    // Calculate monthly income
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyIncome = carreras
        .filter(c => {
            const carreraDate = new Date(c.fecha);
            return carreraDate.getMonth() === currentMonth && 
                   carreraDate.getFullYear() === currentYear &&
                   c.estado === 'completada';
        })
        .reduce((sum, c) => sum + parseFloat(c.precio || 0), 0);
    
    document.getElementById('ingresosMes').textContent = `$${monthlyIncome.toFixed(2)}`;
    
    // Load recent activities
    loadRecentActivities();
}

function loadRecentActivities() {
    const activitiesList = document.getElementById('activitiesList');
    if (!activitiesList) return;
    
    const recentCarreras = carreras
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 5);
    
    activitiesList.innerHTML = recentCarreras.map(carrera => `
        <div class="activity-item">
            <div>
                <strong>Carrera ${carrera.id}</strong> - ${carrera.origen} → ${carrera.destino}
            </div>
            <div>
                <span class="status-badge ${carrera.estado}">${carrera.estado}</span>
            </div>
        </div>
    `).join('');
}

// Choferes functionality
function initializeChoferes() {
    loadChoferesTable();
}

function loadChoferesTable() {
    const tableBody = document.getElementById('choferesTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = choferes.map(chofer => `
        <tr>
            <td>${chofer.nombre}</td>
            <td>${chofer.email}</td>
            <td>${chofer.telefono}</td>
            <td><span class="status-badge ${chofer.estado}">${chofer.estado}</span></td>
            <td>${chofer.carrerasCompletadas || 0}</td>
            <td>
                <button class="btn-secondary" onclick="viewChofer('${chofer.id}')">Ver</button>
                <button class="btn-primary" onclick="editChofer('${chofer.id}')">Editar</button>
            </td>
        </tr>
    `).join('');
}

function filterChoferesTable(searchTerm) {
    const rows = document.querySelectorAll('#choferesTableBody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function viewChofer(choferId) {
    window.location.href = `chofer-detalle.html?id=${choferId}`;
}

function editChofer(choferId) {
    // Implementation for editing chofer
    showNotification('Función de edición en desarrollo', 'info');
}

// Navigation functions
function navigateTo(page) {
    window.location.href = page;
}

function agregarVehiculo() {
    showNotification('Función de agregar vehículo en desarrollo', 'info');
}

function editChofer() {
    showNotification('Función de editar chofer en desarrollo', 'info');
}

function deleteChofer() {
    if (confirm('¿Está seguro de que desea eliminar este chofer?')) {
        showNotification('Chofer eliminado', 'success');
    }
}

function editCarrera() {
    showNotification('Función de editar carrera en desarrollo', 'info');
}

function cancelCarrera() {
    if (confirm('¿Está seguro de que desea cancelar esta carrera?')) {
        showNotification('Carrera cancelada', 'success');
    }
}

function generarReporte() {
    showNotification('Generando reporte...', 'info');
}

function exportarDatos() {
    showNotification('Exportando datos...', 'info');
}

// Utility functions moved to auth.js to avoid conflicts
