const host ='localhost:8080';
//Swagger Defination
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Sample API',
        description: '',
        version: '1.0.0',
        contact: {
            email: 'dotnetexpertdev@gmail.com'
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