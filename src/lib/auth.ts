
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoClient = new MongoClient(process.env.MONGODB_URI!);

const database = mongoClient.db();

export const auth = betterAuth({
  database: mongodbAdapter(database, {
    client: mongoClient,
  }),

  emailAndPassword: {
    enabled: true,
  },
});

