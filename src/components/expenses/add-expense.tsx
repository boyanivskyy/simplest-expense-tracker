/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogCloseButton,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const defaultCategories = [
	"Food",
	"Transport",
	"Housing",
	"Entertainment",
	"Utilities",
	"Shopping",
	"Health",
	"Other",
];

export function AddExpense() {
	if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
		return (
			<Button className="w-full" disabled>
				Add Expense
			</Button>
		);
	}
	const add = useMutation(api.expenses.add);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("Other");
	const [date, setDate] = useState(() =>
		new Date().toISOString().slice(0, 10)
	);
	const [note, setNote] = useState("");

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		const value = parseFloat(amount);
		if (Number.isNaN(value) || value <= 0) return;
		setLoading(true);
		try {
			await add({
				amount: value,
				category,
				note: note || undefined,
				date: new Date(date).getTime(),
			});
			setOpen(false);
			setAmount("");
			setNote("");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="w-full">Add Expense</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Expense</DialogTitle>
					<DialogCloseButton onClick={() => setOpen(false)} />
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-3">
					<div className="grid gap-1.5">
						<Label htmlFor="amount">Amount</Label>
						<Input
							id="amount"
							type="number"
							step="0.01"
							min="0"
							required
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="0.00"
						/>
					</div>
					<div className="grid gap-1.5">
						<Label htmlFor="category">Category</Label>
						<Select value={category} onValueChange={setCategory}>
							<SelectTrigger>
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								{defaultCategories.map((c) => (
									<SelectItem key={c} value={c}>
										{c}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="grid gap-1.5">
						<Label htmlFor="date">Date</Label>
						<Input
							id="date"
							type="date"
							required
							value={date}
							onChange={(e) => setDate(e.target.value)}
						/>
					</div>
					<div className="grid gap-1.5">
						<Label htmlFor="note">Note</Label>
						<Input
							id="note"
							value={note}
							onChange={(e) => setNote(e.target.value)}
							placeholder="Optional"
						/>
					</div>
					<Button type="submit" disabled={loading} className="w-full">
						{loading ? "Adding..." : "Add"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
