// scripts/syncDynamoMembers.ts
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { db } from "../src/db/db";
import { students } from "../src/db/schema/students";
import dotenv from "dotenv";
dotenv.config();

const client = new DynamoDBClient({ region: process.env.AWS_REGION });

async function fetchAllDynamoItems(tableName: string) {
  let items: any[] = [];
  let lastEvaluatedKey;

  do {
    const command = new ScanCommand({
      TableName: tableName,
      ExclusiveStartKey: lastEvaluatedKey,
    });

    const response = await client.send(command);
    const pageItems = response.Items?.map(unmarshall) || [];
    items = items.concat(pageItems);
    lastEvaluatedKey = response.LastEvaluatedKey;
  } while (lastEvaluatedKey);

  return items;
}

export async function syncMembers() {
  const dynamoTable = "biztechMembers2025PROD";
  const records = await fetchAllDynamoItems(dynamoTable);

  for (const item of records) {
    const {
      id,
      admin,
      createdAt,
      education,
      faculty,
      firstName,
      heardFrom,
      highSchool,
      international,
      lastName,
      major,
      prevMember,
      pronouns,
      studentNumber,
      topics,
      university,
      updatedAt,
      year
    } = item;

    await db.insert(students).values({
      id,
      isAdmin: admin,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      education,
      faculty,
      firstName,
      lastName,
      heardFrom,
      highSchool,
      isInternational: international,
      isPrevMember: prevMember,
      major,
      pronouns,
      studentNumber,
      topics,
      university,
      year,
    }).onConflictDoNothing(); // or use .onConflictDoUpdate({ target: students.id, set: {...} })
  }

  console.log(`✅ Synced ${records.length} members from ${dynamoTable}`);
}

syncMembers().catch(console.error);
