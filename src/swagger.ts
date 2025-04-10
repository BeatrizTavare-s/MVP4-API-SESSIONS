// swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Study Sessions API',
    version: '1.0.0',
    description: 'Documentação da API de tempo de estudo',
  },
  servers: [
    {
      url: 'http://localhost:3001',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/**/*.ts'], // ajuste o caminho para suas rotas
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
