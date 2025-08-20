import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  expenses: defineTable({
    userId: v.string(),
    amount: v.number(),
    category: v.string(),
    note: v.optional(v.string()),
    date: v.number(), // epoch ms
    createdAt: v.number(),
  }).index("by_user_date", ["userId", "date"]),
});

