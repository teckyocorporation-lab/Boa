// Authentication functions for Chofer App

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Setup form event listeners
    const loginForm = document.getElementById('choferLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleChoferLogin);
    }
    
    const registroForm = document.getElementById('choferRegistroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', handleChoferRegistro);
    }
});

// Handle chofer login
function handleChoferLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Basic validation
    if (!email || !password) {
        showNotification('Por favor complete todos los campos', 'error');
        return;
    }
    
    // Simulate login process
    showNotification('Iniciando sesión...', 'info');
    
    // In a real app, this would be an API call
    setTimeout(() => {
        // Mock authentication
        if (email === 'chofer@teckyo.com' && password === 'chofer123') {
            // Store authentication data
            const choferUser = {
                id: 'chofer-001',
                email: email,
                nombre: 'Juan Pérez',
                telefono: '+1234567890',
                licencia: 'LIC123456',
                estado: 'disponible',
                carrerasCompletadas: 45,
                calificacionPromedio: 4.8,
                gananciasMes: 1250.50,
                fechaRegistro: '2024-01-15',
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('choferUser', JSON.stringify(choferUser));
            localStorage.setItem('choferToken', 'mock-chofer-token-' + Date.now());
            
            showNotification('Inicio de sesión exitoso', 'success');
            
            // Redirect to home
            setTimeout(() => {
                window.location.href = 'pages/home.html';
            }, 1000);
        } else {
            showNotification('Credenciales incorrectas', 'error');
        }
    }, 1000);
}

// Handle chofer registration
function handleChoferRegistro(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const licencia = formData.get('licencia');
    const aceptoTerminos = formData.get('aceptoTerminos');
    
    // Basic validation
    if (!nombre || !email || !telefono || !password || !confirmPassword || !licencia) {
        showNotification('Por favor complete todos los campos', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (!aceptoTerminos) {
        showNotification('Debe aceptar los términos y condiciones', 'error');
        return;
    }
    
    // Simulate registration process
    showNotification('Registrando usuario...', 'info');
    
    // In a real app, this would be an API call
    setTimeout(() => {
        // Mock registration
        const choferUser = {
            id: 'chofer-' + Date.now(),
            email: email,
            nombre: nombre,
            telefono: telefono,
            licencia: licencia,
            estado: 'pendiente', // Pending approval
            carrerasCompletadas: 0,
            calificacionPromedio: 0,
            gananciasMes: 0,
            fechaRegistro: new Date().toISOString().split('T')[0],
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('choferUser', JSON.stringify(choferUser));
        localStorage.setItem('choferToken', 'mock-chofer-token-' + Date.now());
        
        showNotification('Registro exitoso. Su cuenta está pendiente de aprobación.', 'success');
        
        // Redirect to home
        setTimeout(() => {
            window.location.href = 'pages/home.html';
        }, 2000);
    }, 1000);
}

// Handle logout
function handleLogout() {
    // Clear authentication data
    localStorage.removeItem('choferUser');
    localStorage.removeItem('choferToken');
    
    showNotification('Sesión cerrada', 'info');
    
    // Redirect to login
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Check if user is authenticated
function isAuthenticated() {
    const token = localStorage.getItem('choferToken');
    const user = localStorage.getItem('choferUser');
    
    return !!(token && user);
}

// Get current user
function getCurrentUser() {
    const userData = localStorage.getItem('choferUser');
    return userData ? JSON.parse(userData) : null;
}

// Validate session
function validateSession() {
    if (!isAuthenticated()) {
        redirectToLogin();
        return false;
    }
    
    // Check if token is expired (in real app, this would be more sophisticated)
    const user = getCurrentUser();
    if (user && user.loginTime) {
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        // Session expires after 8 hours
        if (hoursDiff > 8) {
            handleLogout();
            return false;
        }
    }
    
    return true;
}

// Redirect to login page
function redirectToLogin() {
    window.location.href = 'login.html';
}

// Add logout functionality to header
function addLogoutButton() {
    const header = document.querySelector('.chofer-header');
    if (header && !document.querySelector('.logout-btn')) {
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'logout-btn btn-secondary';
        logoutBtn.textContent = 'Cerrar Sesión';
        logoutBtn.onclick = handleLogout;
        
        // Add some styling
        logoutBtn.style.cssText = `
            margin-left: auto;
            margin-right: 1rem;
        `;
        
        header.appendChild(logoutBtn);
    }
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status
    if (!validateSession()) {
        return;
    }
    
    // Add logout button if not on login/register page
    if (!window.location.pathname.includes('login.html') && 
        !window.location.pathname.includes('registro.html')) {
        addLogoutButton();
    }
    
    // Add user info to header
    const user = getCurrentUser();
    if (user) {
        const header = document.querySelector('.chofer-header h1');
        if (header) {
            header.innerHTML = `Panel del Chofer - ${user.nombre}`;
        }
    }
});

// Auto-logout on inactivity (30 minutes)
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (isAuthenticated()) {
            handleLogout();
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Reset timer on user activity
document.addEventListener('click', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);

// Initialize timer
resetInactivityTimer();

// Utility function for notifications
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
