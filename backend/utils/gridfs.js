import { GridFSBucket } from "mongodb";

let gfsBucket;

export function initGridFS(connection) {
  if (!gfsBucket) {
    gfsBucket = new GridFSBucket(connection.db, { bucketName: "uploads" });
  }
  return gfsBucket;
}

export function getGridFSBucket() {
  if (!gfsBucket) throw new Error("GridFSBucket not initialized");
  return gfsBucket;
}
