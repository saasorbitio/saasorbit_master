import multer from "multer";
// GridFS upload middleware placeholder
// Use multer memoryStorage to get file buffer, then store in GridFS in controller
const storage = multer.memoryStorage();
const upload = multer({ storage });
export default upload;
