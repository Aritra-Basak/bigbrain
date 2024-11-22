import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // To define the schema of the table that needs to be used via convex(if not defined it will be used as no-sql)

  documents: defineTable({ 
    title: v.string(),
    tokenIdentifier: v.string(),
    fileId: v.string()})
    .index('by_tokenIdentifier',['tokenIdentifier'])
});