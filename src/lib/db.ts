import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;


declare global {
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const cached = global.mongooseConnection ?? (global.mongooseConnection = { conn: null, promise: null });

/** Reuses the dev connection during hot reload instead of opening one per request. */
export async function connectToDatabase() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is not configured.");
  if (cached.conn) return cached.conn;
  cached.promise ??= mongoose.connect(MONGODB_URI!, { bufferCommands: false });
  cached.conn = await cached.promise;
  return cached.conn;
}
