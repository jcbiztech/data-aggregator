// scripts/syncDynamoEvents.ts
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { db } from "../src/db/db";
import { events } from "../src/db/schema/events";
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

export async function syncEvents() {
  const dynamoTable = "biztechEventsPROD";
  const records = await fetchAllDynamoItems(dynamoTable);

  for (const item of records) {
    const {
      id,
      year,
      ename,
      description,
      startDate,
      endDate,
      deadline,
      createdAt,
      updatedAt,
      elocation,
      imageUrl,
      facebookUrl,
      isApplicationBased,
      isPublished,
      isCompleted,
      hasDomainSpecificQuestions,
      isPartnerFormUsed,
      latitude,
      longitude,
      pricing,
      registrationQuestions,
      partnerRegistrationQuestions,
      partnershipsConfirmation,
      feedback,
      partnerDescription,
      capac
    } = item;

    await db.insert(events).values({
      id,
      year: parseInt(year),
      ename,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      deadline: new Date(deadline),
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
      location: elocation,
      imageUrl,
      facebookUrl,
      isApplicationBased,
      isPublished,
      isCompleted,
      hasDomainSpecificQuestions,
      isPartnerFormUsed,
      latitude,
      longitude,
      pricing,
      registrationQuestions,
      partnerRegistrationQuestions,
      partnershipsConfirmation,
      feedback,
      partnerDescription,
      capacity: parseInt(capac),
    }).onConflictDoNothing(); // adjust to .onConflictDoUpdate if needed
  }

  console.log(`✅ Synced ${records.length} events from ${dynamoTable}`);
}

syncEvents().catch(console.error);
