import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SaaSOrbit API Documentation",
      version: "1.0.0",
      description:
        "Comprehensive API documentation for SaaSOrbit backend services",
      contact: {
        name: "SaaSOrbit Team",
        email: "support@saasorbit.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Development server",
      },
      {
        url: "http://localhost:5000",
        description: "Alternative development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "User ID",
            },
            name: {
              type: "string",
              description: "User full name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            role: {
              type: "string",
              enum: ["user", "admin", "vendor"],
              description: "User role",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Vendor: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            companyName: {
              type: "string",
              description: "Company name",
            },
            email: {
              type: "string",
              format: "email",
            },
            companyLogo: {
              type: "string",
              description: "Company logo file ID",
            },
            description: {
              type: "string",
            },
            website: {
              type: "string",
              format: "uri",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: {
              type: "string",
            },
            name: {
              type: "string",
            },
            description: {
              type: "string",
            },
            price: {
              type: "number",
            },
            category: {
              type: "string",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            error: {
              type: "string",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
            data: {
              type: "object",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication and authorization endpoints",
      },
      {
        name: "Vendor",
        description: "Vendor management endpoints",
      },
      {
        name: "OTP",
        description: "OTP verification endpoints",
      },
      {
        name: "AI",
        description: "AI-powered features endpoints",
      },
      {
        name: "Products",
        description: "Product listing and management endpoints",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
