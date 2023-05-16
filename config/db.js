import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import dotenv from 'dotenv'

dotenv.config()

// Configura las credenciales de AWS
const clientConfig = {
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    sessionToken: process.env.sessionToken,
  },
};

const dynamoClient = new DynamoDBClient(clientConfig);

// Realiza una operación de ejemplo para comprobar la conexión con DynamoDB
const connectDB = async () => {
  try {
    const data = await dynamoClient.send(new ListTablesCommand({}));
    console.log(
      `Conexión exitosa con DynamoDB! Tablas disponibles: ${data.TableNames}`
    );
  } catch (err) {
    console.log(`Error al conectar con DynamoDB: ${err}`);
  }
};

export { dynamoClient, connectDB };
