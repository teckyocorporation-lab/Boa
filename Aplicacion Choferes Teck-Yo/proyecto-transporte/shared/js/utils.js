// Common utility functions for both apps

// Date and Time utilities
const DateUtils = {
    // Format date to readable string
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(date).toLocaleDateString('es-ES', { ...defaultOptions, ...options });
    },

    // Format time to readable string
    formatTime(date, options = {}) {
        const defaultOptions = {
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleTimeString('es-ES', { ...defaultOptions, ...options });
    },

    // Format datetime to readable string
    formatDateTime(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleString('es-ES', { ...defaultOptions, ...options });
    },

    // Get relative time (e.g., "hace 2 horas")
    getRelativeTime(date) {
        const now = new Date();
        const diff = now - new Date(date);
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `hace ${days} día${days > 1 ? 's' : ''}`;
        if (hours > 0) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
        if (minutes > 0) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        return 'hace unos segundos';
    },

    // Check if date is today
    isToday(date) {
        const today = new Date();
        const checkDate = new Date(date);
        return today.toDateString() === checkDate.toDateString();
    },

    // Check if date is yesterday
    isYesterday(date) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const checkDate = new Date(date);
        return yesterday.toDateString() === checkDate.toDateString();
    }
};

// String utilities
const StringUtils = {
    // Capitalize first letter
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    // Capitalize all words
    capitalizeWords(str) {
        return str.split(' ').map(word => this.capitalize(word)).join(' ');
    },

    // Truncate string with ellipsis
    truncate(str, length = 50) {
        if (str.length <= length) return str;
        return str.substring(0, length) + '...';
    },

    // Remove accents from string
    removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    },

    // Generate random string
    randomString(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    // Format phone number
    formatPhone(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    },

    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }
};

// Number utilities
const NumberUtils = {
    // Format number with commas
    formatNumber(num) {
        return new Intl.NumberFormat('es-ES').format(num);
    },

    // Round to specified decimal places
    round(num, decimals = 2) {
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    },

    // Generate random number between min and max
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Check if number is even
    isEven(num) {
        return num % 2 === 0;
    },

    // Check if number is odd
    isOdd(num) {
        return num % 2 !== 0;
    }
};

// Array utilities
const ArrayUtils = {
    // Remove duplicates from array
    unique(arr) {
        return [...new Set(arr)];
    },

    // Shuffle array
    shuffle(arr) {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Group array by key
    groupBy(arr, key) {
        return arr.reduce((groups, item) => {
            const group = item[key];
            groups[group] = groups[group] || [];
            groups[group].push(item);
            return groups;
        }, {});
    },

    // Sort array by key
    sortBy(arr, key, direction = 'asc') {
        return arr.sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];
            if (direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    },

    // Chunk array into smaller arrays
    chunk(arr, size) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }
};

// Object utilities
const ObjectUtils = {
    // Deep clone object
    clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    // Merge objects deeply
    merge(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();

        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.merge(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }

        return this.merge(target, ...sources);
    },

    // Check if value is object
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    },

    // Get nested property value
    get(obj, path, defaultValue) {
        const keys = path.split('.');
        let result = obj;
        for (const key of keys) {
            if (result == null || typeof result !== 'object') {
                return defaultValue;
            }
            result = result[key];
        }
        return result !== undefined ? result : defaultValue;
    },

    // Set nested property value
    set(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let current = obj;
        
        for (const key of keys) {
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[lastKey] = value;
        return obj;
    }
};

// Local Storage utilities
const StorageUtils = {
    // Set item with expiration
    setItem(key, value, expirationMinutes = null) {
        const item = {
            value: value,
            timestamp: Date.now(),
            expiration: expirationMinutes ? Date.now() + (expirationMinutes * 60 * 1000) : null
        };
        localStorage.setItem(key, JSON.stringify(item));
    },

    // Get item with expiration check
    getItem(key) {
        try {
            const item = JSON.parse(localStorage.getItem(key));
            if (!item) return null;
            
            if (item.expiration && Date.now() > item.expiration) {
                localStorage.removeItem(key);
                return null;
            }
            
            return item.value;
        } catch (error) {
            return null;
        }
    },

    // Remove item
    removeItem(key) {
        localStorage.removeItem(key);
    },

    // Clear all items
    clear() {
        localStorage.clear();
    },

    // Get all keys
    getKeys() {
        return Object.keys(localStorage);
    }
};

// Validation utilities
const ValidationUtils = {
    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Phone validation
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    // URL validation
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    // Required field validation
    isRequired(value) {
        return value !== null && value !== undefined && value !== '';
    },

    // Minimum length validation
    minLength(value, min) {
        return value && value.length >= min;
    },

    // Maximum length validation
    maxLength(value, max) {
        return value && value.length <= max;
    },

    // Number range validation
    isInRange(value, min, max) {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    }
};

// DOM utilities
const DOMUtils = {
    // Get element by ID
    getById(id) {
        return document.getElementById(id);
    },

    // Get elements by class
    getByClass(className) {
        return document.getElementsByClassName(className);
    },

    // Get elements by selector
    query(selector) {
        return document.querySelector(selector);
    },

    // Get all elements by selector
    queryAll(selector) {
        return document.querySelectorAll(selector);
    },

    // Create element with attributes
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'innerHTML') {
                element.innerHTML = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        if (content) {
            element.textContent = content;
        }
        
        return element;
    },

    // Add event listener with cleanup
    addEventListener(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        return () => element.removeEventListener(event, handler, options);
    },

    // Show element
    show(element) {
        if (element) element.style.display = '';
    },

    // Hide element
    hide(element) {
        if (element) element.style.display = 'none';
    },

    // Toggle element visibility
    toggle(element) {
        if (element) {
            element.style.display = element.style.display === 'none' ? '' : 'none';
        }
    }
};

// API utilities
const APIUtils = {
    // Make HTTP request
    async request(url, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const config = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return await response.text();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    },

    // GET request
    async get(url, params = {}) {
        const urlObj = new URL(url);
        Object.keys(params).forEach(key => {
            urlObj.searchParams.append(key, params[key]);
        });
        
        return this.request(urlObj.toString());
    },

    // POST request
    async post(url, data = {}) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    // PUT request
    async put(url, data = {}) {
        return this.request(url, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    // DELETE request
    async delete(url) {
        return this.request(url, {
            method: 'DELETE'
        });
    }
};

// Export all utilities
window.DateUtils = DateUtils;
window.StringUtils = StringUtils;
window.NumberUtils = NumberUtils;
window.ArrayUtils = ArrayUtils;
window.ObjectUtils = ObjectUtils;
window.StorageUtils = StorageUtils;
window.ValidationUtils = ValidationUtils;
window.DOMUtils = DOMUtils;
window.APIUtils = APIUtils;
