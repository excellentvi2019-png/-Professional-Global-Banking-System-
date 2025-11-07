// Database Configuration for AWS RDS
const DB_CONFIG = {
    // For Production with AWS RDS
    PRODUCTION: {
        host: 'transswift.proxy-cwjqo4gmq2mg.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: 'your_secure_password',
        database: 'transswift_banking',
        charset: 'utf8mb4',
        
        // Connection pool settings
        connectionLimit: 10,
        acquireTimeout: 60000,
        timeout: 60000,
        reconnect: true
    },
    
    // For Read Replicas
    READ_REPLICA: {
        host: 'transswift.proxy-cwjqo4gmq2mg.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'admin',
        password: 'your_secure_password',
        database: 'transswift_banking',
        charset: 'utf8mb4',
        readOnly: true
    },
    
    // For Demo (current local mode)
    DEMO: {
        // In-memory storage for demo
        mode: 'memory',
        persistInterval: 30000 // Save every 30 seconds
    }
};

// Environment detection
const ENVIRONMENT = process.env.NODE_ENV || 'demo';
const DB_CONNECTION = ENVIRONMENT === 'production' ? DB_CONFIG.PRODUCTION : DB_CONFIG.DEMO;

// Database connection string
const getConnectionString = () => {
    if (ENVIRONMENT === 'production') {
        return `mysql://${DB_CONFIG.PRODUCTION.user}:${DB_CONFIG.PRODUCTION.password}@${DB_CONFIG.PRODUCTION.host}:${DB_CONFIG.PRODUCTION.port}/${DB_CONFIG.PRODUCTION.database}`;
    }
    return 'memory://demo';
};

console.log('Database Configuration:');
console.log(`Environment: ${ENVIRONMENT}`);
console.log(`Connection: ${getConnectionString()}`);

module.exports = {
    DB_CONFIG,
    ENVIRONMENT,
    DB_CONNECTION,
    getConnectionString
};