// import { mutation, query } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return [];
		const userId = identity.subject;
		const items = await ctx.db
			.query("expenses")
			.withIndex("by_user_date", (q) => q.eq("userId", userId))
			.order("desc")
			.take(100);
		return items;
	},
});

export const add = mutation({
	args: {
		amount: v.number(),
		category: v.string(),
		note: v.optional(v.string()),
		date: v.number(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const now = Date.now();
		const id = await ctx.db.insert("expenses", {
			userId: identity.subject,
			amount: args.amount,
			category: args.category,
			note: args.note,
			date: args.date,
			createdAt: now,
		});
		return id;
	},
});

export const byCategory = query({
	args: { days: v.optional(v.number()) },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return [];
		const userId = identity.subject;
		const since = args.days
			? Date.now() - args.days * 24 * 60 * 60 * 1000
			: 0;
		const rows = await ctx.db
			.query("expenses")
			.withIndex("by_user_date", (q) => q.eq("userId", userId))
			.order("desc")
			.take(500);
		const data = new Map<string, number>();
		for (const r of rows) {
			if (r.date < since) continue;
			data.set(r.category, (data.get(r.category) || 0) + r.amount);
		}
		return Array.from(data.entries()).map(([name, value]) => ({
			name,
			value,
		}));
	},
});

export const byDay = query({
	args: { days: v.number() },
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) return [];
		const userId = identity.subject;
		const since = Date.now() - args.days * 24 * 60 * 60 * 1000;
		const rows = await ctx.db
			.query("expenses")
			.withIndex("by_user_date", (q) => q.eq("userId", userId))
			.order("desc")
			.take(1000);
		const buckets = new Map<string, number>();
		for (let i = 0; i < args.days; i++) {
			const d = new Date(Date.now() - i * 86400000);
			const key = d.toISOString().slice(0, 10);
			buckets.set(key, 0);
		}
		for (const r of rows) {
			if (r.date < since) continue;
			const key = new Date(r.date).toISOString().slice(0, 10);
			if (!buckets.has(key)) buckets.set(key, 0);
			buckets.set(key, (buckets.get(key) || 0) + r.amount);
		}
		return Array.from(buckets.entries())
			.map(([date, amount]) => ({ date, amount }))
			.sort((a, b) => a.date.localeCompare(b.date));
	},
});

export const update = mutation({
	args: {
		id: v.id("expenses"),
		amount: v.number(),
		category: v.string(),
		note: v.optional(v.string()),
		date: v.number(),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Not authenticated");
		const existing = await ctx.db.get(args.id);
		if (!existing) throw new Error("Expense not found");
		if (existing.userId !== identity.subject) throw new Error("Forbidden");
		await ctx.db.patch(args.id, {
			amount: args.amount,
			category: args.category,
			note: args.note,
			date: args.date,
		});
		return args.id;
	},
});
