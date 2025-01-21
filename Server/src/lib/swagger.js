import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { glob } from 'glob';

//^ Get the directory path of the current module
const __dirname = path.dirname(new URL(import.meta.url).pathname);

//^ Get all the API documentation files dynamically
const apiDocs = glob.sync(path.resolve(__dirname, './swaggerDocs/v1/*.js'));

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'The Big Fashion 🛍',
			version: '1.0.0',
			description: 'API for managing a fashion e-commerce'
		},
		servers: [
			{
				url: 'http://localhost:8080/api/v1/products',
				url: 'http://localhost:8080/api/v1/users',
				url: 'http://localhost:8080/api/v1/cart',
				url: 'http://localhost:8080/api/v1/categories',
				url: 'http://localhost:8080/api/v1/address',
				url: 'http://localhost:8080/api/v1/orders',
				url: 'http://localhost:8080/api/v1/inventory',
				url: 'http://localhost:8080/api/v1/reviews',
				url: 'http://localhost:8080/api/v1/cartItem'
			}
		]
	},
	apis: apiDocs //? Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
