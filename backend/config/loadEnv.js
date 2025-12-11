import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from the backend/.env file before other modules run
dotenv.config({ path: path.join(__dirname, "..", ".env") });
