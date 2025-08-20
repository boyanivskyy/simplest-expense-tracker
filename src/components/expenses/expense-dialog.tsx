"use client";

import { useEffect, useMemo, useState } from "react";
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
import {
	Plus,
	Utensils,
	Car,
	Home,
	Music,
	Zap,
	ShoppingCart,
	HeartPulse,
	Tag,
} from "lucide-react";

type ExpenseInit = {
	id?: string;
	amount?: number;
	category?: string;
	note?: string;
	date?: number; // epoch ms
};

export function ExpenseDialog({
	trigger,
	initial,
}: {
	trigger?: React.ReactNode;
	initial?: ExpenseInit;
}) {
	const canUseConvex = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);
	const isEdit = Boolean(initial?.id);

	const add = useMutation(api.expenses.add);
	const update = useMutation(api.expenses.update);

	const categories = useMemo(
		() => [
			"Food",
			"Transport",
			"Housing",
			"Entertainment",
			"Utilities",
			"Shopping",
			"Health",
			"Other",
		],
		[]
	);

	const CategoryIcon = ({
		name,
		className,
	}: {
		name: string;
		className?: string;
	}) => {
		switch (name) {
			case "Food":
				return <Utensils className={className} />;
			case "Transport":
				return <Car className={className} />;
			case "Housing":
				return <Home className={className} />;
			case "Entertainment":
				return <Music className={className} />;
			case "Utilities":
				return <Zap className={className} />;
			case "Shopping":
				return <ShoppingCart className={className} />;
			case "Health":
				return <HeartPulse className={className} />;
			default:
				return <Tag className={className} />;
		}
	};

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState("Other");
	const [date, setDate] = useState(() =>
		new Date().toISOString().slice(0, 10)
	);
	const [note, setNote] = useState("");

	// Initialize state when opening or when `initial` changes
	useEffect(() => {
		if (open) {
			setAmount(initial?.amount != null ? String(initial.amount) : "");
			setCategory(initial?.category || "Other");
			setDate(
				initial?.date
					? new Date(initial.date).toISOString().slice(0, 10)
					: new Date().toISOString().slice(0, 10)
			);
			setNote(initial?.note || "");
		}
	}, [open, initial]);

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		const value = parseFloat(amount);
		if (Number.isNaN(value) || value <= 0) return;
		setLoading(true);
		try {
			if (isEdit && initial?.id) {
				await update({
					id: initial.id as any,
					amount: value,
					category,
					note: note || undefined,
					date: new Date(date).getTime(),
				});
			} else {
				await add({
					amount: value,
					category,
					note: note || undefined,
					date: new Date(date).getTime(),
				});
			}
			setOpen(false);
		} finally {
			setLoading(false);
		}
	}

	const DefaultTrigger = (
		<Button className="w-full" disabled={!canUseConvex}>
			<span className="inline-flex items-center gap-2">
				{isEdit ? null : <Plus className="h-4 w-4" />}
				{isEdit ? "Edit Expense" : "Add Expense"}
			</span>
		</Button>
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger ?? DefaultTrigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEdit ? "Edit Expense" : "Add Expense"}
					</DialogTitle>
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
							<SelectTrigger id="category">
								<span className="flex items-center gap-2">
									<SelectValue placeholder="Select a category" />
								</span>
							</SelectTrigger>
							<SelectContent>
								{categories.map((c) => (
									<SelectItem key={c} value={c}>
										<span className="flex items-center gap-2">
											<CategoryIcon
												name={c}
												className="h-4 w-4"
											/>
											<span>{c}</span>
										</span>
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
						{loading
							? isEdit
								? "Saving..."
								: "Adding..."
							: isEdit
								? "Save"
								: "Add"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default ExpenseDialog;
