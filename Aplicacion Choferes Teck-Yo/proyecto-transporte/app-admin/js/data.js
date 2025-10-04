// Data management functions for Admin App

// Data storage
let appData = {
    choferes: [],
    carreras: [],
    vehiculos: [],
    configuracion: {}
};

// Initialize data management
function initializeData() {
    loadDataFromStorage();
    setupDataListeners();
}

// Load data from localStorage
function loadDataFromStorage() {
    const storedData = localStorage.getItem('adminAppData');
    if (storedData) {
        appData = JSON.parse(storedData);
    } else {
        // Initialize with default data
        initializeDefaultData();
    }
}

// Save data to localStorage
function saveDataToStorage() {
    localStorage.setItem('adminAppData', JSON.stringify(appData));
}

// Initialize default data
function initializeDefaultData() {
    appData = {
        choferes: [
            {
                id: 'chofer-001',
                nombre: 'Juan Pérez',
                email: 'juan.perez@email.com',
                telefono: '+1234567890',
                estado: 'activo',
                carrerasCompletadas: 45,
                calificacionPromedio: 4.8,
                fechaRegistro: '2024-01-15'
            },
            {
                id: 'chofer-002',
                nombre: 'María García',
                email: 'maria.garcia@email.com',
                telefono: '+1234567891',
                estado: 'activo',
                carrerasCompletadas: 32,
                calificacionPromedio: 4.6,
                fechaRegistro: '2024-02-10'
            }
        ],
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
                calificacion: 5
            },
            {
                id: 'carrera-002',
                origen: 'Plaza Principal',
                destino: 'Estación Central',
                choferId: 'chofer-002',
                fecha: '2024-04-10T14:30:00',
                estado: 'en_progreso',
                precio: 18.75,
                distancia: 8.5
            }
        ],
        vehiculos: [
            {
                id: 'vehiculo-001',
                placa: 'ABC-123',
                marca: 'Toyota',
                modelo: 'Corolla',
                año: 2022,
                capacidad: 4,
                estado: 'disponible',
                ultimoMantenimiento: '2024-03-15'
            },
            {
                id: 'vehiculo-002',
                placa: 'XYZ-789',
                marca: 'Honda',
                modelo: 'Civic',
                año: 2021,
                capacidad: 4,
                estado: 'en_uso',
                ultimoMantenimiento: '2024-02-20'
            }
        ],
        configuracion: {
            precios: {
                precioBase: 1.50,
                precioMinimo: 5.00,
                tarifaNoche: 1.5
            },
            horarios: {
                horaInicio: '06:00',
                horaFin: '22:00',
                diasServicio: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
            },
            notificaciones: {
                email: 'admin@teckyo.com',
                telefono: '+1234567890',
                emailEnabled: true,
                smsEnabled: false
            }
        }
    };
    
    saveDataToStorage();
}

// Setup data change listeners
function setupDataListeners() {
    // Listen for data changes and auto-save
    const originalData = JSON.stringify(appData);
    
    setInterval(() => {
        const currentData = JSON.stringify(appData);
        if (currentData !== originalData) {
            saveDataToStorage();
        }
    }, 5000); // Check every 5 seconds
}

// Choferes CRUD operations
function getChoferes() {
    return appData.choferes;
}

function getChoferById(id) {
    return appData.choferes.find(chofer => chofer.id === id);
}

function addChofer(choferData) {
    const newChofer = {
        id: 'chofer-' + Date.now(),
        ...choferData,
        carrerasCompletadas: 0,
        calificacionPromedio: 0,
        fechaRegistro: new Date().toISOString().split('T')[0]
    };
    
    appData.choferes.push(newChofer);
    saveDataToStorage();
    return newChofer;
}

function updateChofer(id, choferData) {
    const index = appData.choferes.findIndex(chofer => chofer.id === id);
    if (index !== -1) {
        appData.choferes[index] = { ...appData.choferes[index], ...choferData };
        saveDataToStorage();
        return appData.choferes[index];
    }
    return null;
}

function deleteChofer(id) {
    const index = appData.choferes.findIndex(chofer => chofer.id === id);
    if (index !== -1) {
        appData.choferes.splice(index, 1);
        saveDataToStorage();
        return true;
    }
    return false;
}

// Carreras CRUD operations
function getCarreras() {
    return appData.carreras;
}

function getCarreraById(id) {
    return appData.carreras.find(carrera => carrera.id === id);
}

function addCarrera(carreraData) {
    const newCarrera = {
        id: 'carrera-' + Date.now(),
        ...carreraData,
        estado: 'disponible',
        fechaCreacion: new Date().toISOString()
    };
    
    appData.carreras.push(newCarrera);
    saveDataToStorage();
    return newCarrera;
}

function updateCarrera(id, carreraData) {
    const index = appData.carreras.findIndex(carrera => carrera.id === id);
    if (index !== -1) {
        appData.carreras[index] = { ...appData.carreras[index], ...carreraData };
        saveDataToStorage();
        return appData.carreras[index];
    }
    return null;
}

function deleteCarrera(id) {
    const index = appData.carreras.findIndex(carrera => carrera.id === id);
    if (index !== -1) {
        appData.carreras.splice(index, 1);
        saveDataToStorage();
        return true;
    }
    return false;
}

// Vehiculos CRUD operations
function getVehiculos() {
    return appData.vehiculos;
}

function getVehiculoById(id) {
    return appData.vehiculos.find(vehiculo => vehiculo.id === id);
}

function addVehiculo(vehiculoData) {
    const newVehiculo = {
        id: 'vehiculo-' + Date.now(),
        ...vehiculoData,
        estado: 'disponible'
    };
    
    appData.vehiculos.push(newVehiculo);
    saveDataToStorage();
    return newVehiculo;
}

function updateVehiculo(id, vehiculoData) {
    const index = appData.vehiculos.findIndex(vehiculo => vehiculo.id === id);
    if (index !== -1) {
        appData.vehiculos[index] = { ...appData.vehiculos[index], ...vehiculoData };
        saveDataToStorage();
        return appData.vehiculos[index];
    }
    return null;
}

function deleteVehiculo(id) {
    const index = appData.vehiculos.findIndex(vehiculo => vehiculo.id === id);
    if (index !== -1) {
        appData.vehiculos.splice(index, 1);
        saveDataToStorage();
        return true;
    }
    return false;
}

// Configuration management
function getConfiguracion() {
    return appData.configuracion;
}

function updateConfiguracion(configData) {
    appData.configuracion = { ...appData.configuracion, ...configData };
    saveDataToStorage();
    return appData.configuracion;
}

// Statistics functions
function getStatistics() {
    const choferes = getChoferes();
    const carreras = getCarreras();
    const vehiculos = getVehiculos();
    
    return {
        totalChoferes: choferes.length,
        choferesActivos: choferes.filter(c => c.estado === 'activo').length,
        totalCarreras: carreras.length,
        carrerasActivas: carreras.filter(c => c.estado === 'en_progreso').length,
        carrerasCompletadas: carreras.filter(c => c.estado === 'completada').length,
        totalVehiculos: vehiculos.length,
        vehiculosDisponibles: vehiculos.filter(v => v.estado === 'disponible').length,
        ingresosTotales: carreras
            .filter(c => c.estado === 'completada')
            .reduce((sum, c) => sum + parseFloat(c.precio || 0), 0)
    };
}

// Search and filter functions
function searchChoferes(query) {
    const choferes = getChoferes();
    return choferes.filter(chofer => 
        chofer.nombre.toLowerCase().includes(query.toLowerCase()) ||
        chofer.email.toLowerCase().includes(query.toLowerCase()) ||
        chofer.telefono.includes(query)
    );
}

function filterChoferesByStatus(status) {
    const choferes = getChoferes();
    if (!status) return choferes;
    return choferes.filter(chofer => chofer.estado === status);
}

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

// Export data functions
function exportData(format = 'json') {
    const data = {
        choferes: getChoferes(),
        carreras: getCarreras(),
        vehiculos: getVehiculos(),
        configuracion: getConfiguracion(),
        exportDate: new Date().toISOString()
    };
    
    if (format === 'json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize data management when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
});
