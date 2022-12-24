
const host ='localhost:8080';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Sample API',
        description: '',
        version: '1.0.0',
        contact: {
            email: 'dotnetexpertde'
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            }
        }
    }
    
    
};

module.exports = {
    swaggerDefinition,
    host,
    basePath: '/api/v1',
    apis: [
        'routes/*.js'
    ]
}