// scripts/syncDynamoToPostgres.ts
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { db } from "../src/db/db";
import { students } from "../src/db/schema/students";
import dotenv from "dotenv";
dotenv.config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

async function syncDynamoToPostgres() {
    // currently fixing dynamo responses 
  // const command = new ScanCommand({ TableName: "BizTechMembers" });
  // const response = await client.send(command);

  const items = response.Items?.map(unmarshall) || [];

  for (const item of items) {
    await db.insert(students).values({
      name: item.name,
      email: item.email,
      year: item.year,
      major: item.major,
      career_of_interest: item.career_of_interest
    }).onConflictDoNothing();
  }

  console.log(`Synced ${items.length} records from DynamoDB to PostgreSQL`);
}

syncDynamoToPostgres().catch(console.error);
