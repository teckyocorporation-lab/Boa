// Mock data for both admin and chofer apps

window.mockData = {
    // Choferes data
    choferes: [
        {
            id: 'chofer-001',
            nombre: 'Juan Pérez',
            email: 'juan.perez@email.com',
            telefono: '+1234567890',
            licencia: 'LIC123456',
            estado: 'activo',
            carrerasCompletadas: 45,
            calificacionPromedio: 4.8,
            gananciasMes: 1250.50,
            fechaRegistro: '2024-01-15',
            ubicacion: {
                lat: 40.7128,
                lng: -74.0060
            }
        },
        {
            id: 'chofer-002',
            nombre: 'María García',
            email: 'maria.garcia@email.com',
            telefono: '+1234567891',
            licencia: 'LIC123457',
            estado: 'activo',
            carrerasCompletadas: 32,
            calificacionPromedio: 4.6,
            gananciasMes: 980.25,
            fechaRegistro: '2024-02-10',
            ubicacion: {
                lat: 40.7589,
                lng: -73.9851
            }
        },
        {
            id: 'chofer-003',
            nombre: 'Carlos López',
            email: 'carlos.lopez@email.com',
            telefono: '+1234567892',
            licencia: 'LIC123458',
            estado: 'inactivo',
            carrerasCompletadas: 28,
            calificacionPromedio: 4.4,
            gananciasMes: 0,
            fechaRegistro: '2024-01-20',
            ubicacion: {
                lat: 40.7505,
                lng: -73.9934
            }
        },
        {
            id: 'chofer-004',
            nombre: 'Ana Rodríguez',
            email: 'ana.rodriguez@email.com',
            telefono: '+1234567893',
            licencia: 'LIC123459',
            estado: 'suspendido',
            carrerasCompletadas: 15,
            calificacionPromedio: 3.8,
            gananciasMes: 0,
            fechaRegistro: '2024-03-05',
            ubicacion: {
                lat: 40.7614,
                lng: -73.9776
            }
        }
    ],

    // Carreras data
    carreras: [
        {
            id: 'carrera-001',
            origen: 'Centro de la Ciudad',
            destino: 'Aeropuerto Internacional',
            choferId: 'chofer-001',
            cliente: {
                nombre: 'Roberto Silva',
                telefono: '+1234567894',
                email: 'roberto.silva@email.com',
                calificacion: 4.9
            },
            fecha: '2024-04-10T10:00:00',
            estado: 'completada',
            precio: 25.50,
            distancia: 15.2,
            duracion: 25,
            calificacion: 5,
            observaciones: 'Viaje sin problemas',
            fechaCreacion: '2024-04-10T09:30:00'
        },
        {
            id: 'carrera-002',
            origen: 'Plaza Principal',
            destino: 'Estación Central',
            choferId: 'chofer-002',
            cliente: {
                nombre: 'Laura Martínez',
                telefono: '+1234567895',
                email: 'laura.martinez@email.com',
                calificacion: 4.7
            },
            fecha: '2024-04-10T14:30:00',
            estado: 'en_progreso',
            precio: 18.75,
            distancia: 8.5,
            duracion: 15,
            fechaCreacion: '2024-04-10T14:00:00'
        },
        {
            id: 'carrera-003',
            origen: 'Universidad',
            destino: 'Centro Comercial',
            choferId: null,
            cliente: {
                nombre: 'Pedro González',
                telefono: '+1234567896',
                email: 'pedro.gonzalez@email.com',
                calificacion: 4.5
            },
            fecha: '2024-04-10T16:00:00',
            estado: 'disponible',
            precio: 12.30,
            distancia: 5.8,
            duracion: 12,
            fechaCreacion: '2024-04-10T15:45:00'
        },
        {
            id: 'carrera-004',
            origen: 'Hospital Central',
            destino: 'Terminal de Buses',
            choferId: 'chofer-001',
            cliente: {
                nombre: 'Carmen Herrera',
                telefono: '+1234567897',
                email: 'carmen.herrera@email.com',
                calificacion: 4.8
            },
            fecha: '2024-04-09T11:15:00',
            estado: 'completada',
            precio: 22.80,
            distancia: 12.3,
            duracion: 20,
            calificacion: 4,
            observaciones: 'Cliente muy amable',
            fechaCreacion: '2024-04-09T11:00:00'
        },
        {
            id: 'carrera-005',
            origen: 'Zona Norte',
            destino: 'Aeropuerto Regional',
            choferId: null,
            cliente: {
                nombre: 'Miguel Torres',
                telefono: '+1234567898',
                email: 'miguel.torres@email.com',
                calificacion: 4.6
            },
            fecha: '2024-04-10T08:30:00',
            estado: 'disponible',
            precio: 35.20,
            distancia: 22.1,
            duracion: 35,
            fechaCreacion: '2024-04-10T08:15:00'
        }
    ],

    // Vehículos data
    vehiculos: [
        {
            id: 'vehiculo-001',
            placa: 'ABC-123',
            marca: 'Toyota',
            modelo: 'Corolla',
            año: 2022,
            color: 'Blanco',
            capacidad: 4,
            estado: 'disponible',
            choferId: null,
            ultimoMantenimiento: '2024-03-15',
            proximoMantenimiento: '2024-06-15',
            kilometraje: 45000,
            combustible: 'Gasolina',
            tipo: 'Sedán'
        },
        {
            id: 'vehiculo-002',
            placa: 'XYZ-789',
            marca: 'Honda',
            modelo: 'Civic',
            año: 2021,
            color: 'Gris',
            capacidad: 4,
            estado: 'en_uso',
            choferId: 'chofer-001',
            ultimoMantenimiento: '2024-02-20',
            proximoMantenimiento: '2024-05-20',
            kilometraje: 52000,
            combustible: 'Gasolina',
            tipo: 'Sedán'
        },
        {
            id: 'vehiculo-003',
            placa: 'DEF-456',
            marca: 'Nissan',
            modelo: 'Versa',
            año: 2023,
            color: 'Azul',
            capacidad: 4,
            estado: 'mantenimiento',
            choferId: null,
            ultimoMantenimiento: '2024-04-01',
            proximoMantenimiento: '2024-07-01',
            kilometraje: 28000,
            combustible: 'Gasolina',
            tipo: 'Sedán'
        },
        {
            id: 'vehiculo-004',
            placa: 'GHI-789',
            marca: 'Hyundai',
            modelo: 'Elantra',
            año: 2020,
            color: 'Negro',
            capacidad: 4,
            estado: 'fuera_servicio',
            choferId: null,
            ultimoMantenimiento: '2024-01-10',
            proximoMantenimiento: '2024-04-10',
            kilometraje: 75000,
            combustible: 'Gasolina',
            tipo: 'Sedán'
        }
    ],

    // Notificaciones data
    notificaciones: [
        {
            id: 'notif-001',
            tipo: 'carrera',
            titulo: 'Nueva carrera disponible',
            mensaje: 'Hay una nueva carrera disponible cerca de tu ubicación',
            fecha: '2024-04-10T09:30:00',
            leida: false,
            choferId: 'chofer-001'
        },
        {
            id: 'notif-002',
            tipo: 'pago',
            titulo: 'Pago recibido',
            mensaje: 'Se ha procesado tu pago de $125.50',
            fecha: '2024-04-09T16:45:00',
            leida: true,
            choferId: 'chofer-001'
        },
        {
            id: 'notif-003',
            tipo: 'sistema',
            titulo: 'Actualización del sistema',
            mensaje: 'El sistema ha sido actualizado con nuevas funcionalidades',
            fecha: '2024-04-08T10:15:00',
            leida: true,
            choferId: 'chofer-001'
        },
        {
            id: 'notif-004',
            tipo: 'promocion',
            titulo: 'Oferta especial',
            mensaje: 'Aprovecha nuestra oferta especial del 20% de descuento en comisiones',
            fecha: '2024-04-07T14:20:00',
            leida: false,
            choferId: 'chofer-001'
        },
        {
            id: 'notif-005',
            tipo: 'carrera',
            titulo: 'Carrera completada',
            mensaje: 'Has completado exitosamente la carrera #carrera-001',
            fecha: '2024-04-10T10:30:00',
            leida: true,
            choferId: 'chofer-001'
        }
    ],

    // Configuración data
    configuracion: {
        precios: {
            precioBase: 1.50,
            precioMinimo: 5.00,
            tarifaNoche: 1.5,
            comisionChofer: 0.8
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
        },
        sistema: {
            version: '1.0.0',
            ultimaActualizacion: '2024-04-01',
            mantenimiento: false
        }
    },

    // Estadísticas data
    estadisticas: {
        totalChoferes: 4,
        choferesActivos: 2,
        totalCarreras: 5,
        carrerasActivas: 1,
        carrerasCompletadas: 2,
        totalVehiculos: 4,
        vehiculosDisponibles: 1,
        ingresosTotales: 102.35,
        ingresosMes: 102.35,
        carrerasHoy: 2,
        gananciasHoy: 44.25
    },

    // Ubicaciones comunes
    ubicaciones: [
        {
            nombre: 'Centro de la Ciudad',
            direccion: 'Plaza Principal, Centro',
            coordenadas: { lat: 40.7128, lng: -74.0060 }
        },
        {
            nombre: 'Aeropuerto Internacional',
            direccion: 'Terminal Principal, Aeropuerto',
            coordenadas: { lat: 40.6413, lng: -73.7781 }
        },
        {
            nombre: 'Estación Central',
            direccion: 'Terminal de Buses, Centro',
            coordenadas: { lat: 40.7505, lng: -73.9934 }
        },
        {
            nombre: 'Universidad',
            direccion: 'Campus Principal, Zona Universitaria',
            coordenadas: { lat: 40.7505, lng: -73.9934 }
        },
        {
            nombre: 'Centro Comercial',
            direccion: 'Mall Central, Zona Comercial',
            coordenadas: { lat: 40.7614, lng: -73.9776 }
        },
        {
            nombre: 'Hospital Central',
            direccion: 'Hospital Principal, Zona Médica',
            coordenadas: { lat: 40.7589, lng: -73.9851 }
        }
    ]
};

// Helper functions for mock data
window.MockDataUtils = {
    // Get chofer by ID
    getChoferById(id) {
        return window.mockData.choferes.find(chofer => chofer.id === id);
    },

    // Get carrera by ID
    getCarreraById(id) {
        return window.mockData.carreras.find(carrera => carrera.id === id);
    },

    // Get vehiculo by ID
    getVehiculoById(id) {
        return window.mockData.vehiculos.find(vehiculo => vehiculo.id === id);
    },

    // Get carreras by chofer ID
    getCarrerasByChofer(choferId) {
        return window.mockData.carreras.filter(carrera => carrera.choferId === choferId);
    },

    // Get carreras disponibles
    getCarrerasDisponibles() {
        return window.mockData.carreras.filter(carrera => carrera.estado === 'disponible');
    },

    // Get notificaciones by chofer ID
    getNotificacionesByChofer(choferId) {
        return window.mockData.notificaciones.filter(notif => notif.choferId === choferId);
    },

    // Get vehiculos disponibles
    getVehiculosDisponibles() {
        return window.mockData.vehiculos.filter(vehiculo => vehiculo.estado === 'disponible');
    },

    // Get estadísticas actualizadas
    getEstadisticas() {
        const carreras = window.mockData.carreras;
        const choferes = window.mockData.choferes;
        const vehiculos = window.mockData.vehiculos;
        
        const today = new Date().toISOString().split('T')[0];
        const carrerasHoy = carreras.filter(c => c.fecha?.startsWith(today));
        const gananciasHoy = carrerasHoy.reduce((sum, c) => sum + parseFloat(c.precio || 0), 0);
        
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
                .reduce((sum, c) => sum + parseFloat(c.precio || 0), 0),
            carrerasHoy: carrerasHoy.length,
            gananciasHoy: gananciasHoy
        };
    },

    // Generate new ID
    generateId(prefix) {
        return `${prefix}-${Date.now()}`;
    },

    // Add new carrera
    addCarrera(carreraData) {
        const newCarrera = {
            id: this.generateId('carrera'),
            ...carreraData,
            fechaCreacion: new Date().toISOString()
        };
        window.mockData.carreras.push(newCarrera);
        return newCarrera;
    },

    // Add new notificacion
    addNotificacion(notificacionData) {
        const newNotificacion = {
            id: this.generateId('notif'),
            ...notificacionData,
            fecha: new Date().toISOString(),
            leida: false
        };
        window.mockData.notificaciones.push(newNotificacion);
        return newNotificacion;
    },

    // Update carrera status
    updateCarreraStatus(carreraId, status, choferId = null) {
        const carrera = this.getCarreraById(carreraId);
        if (carrera) {
            carrera.estado = status;
            if (choferId) {
                carrera.choferId = choferId;
            }
            return carrera;
        }
        return null;
    },

    // Update chofer status
    updateChoferStatus(choferId, status) {
        const chofer = this.getChoferById(choferId);
        if (chofer) {
            chofer.estado = status;
            return chofer;
        }
        return null;
    }
};
