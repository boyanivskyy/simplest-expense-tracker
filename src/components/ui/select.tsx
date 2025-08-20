"use client";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectTrigger = (
	props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
) => (
	<SelectPrimitive.Trigger
		{...props}
		// Prevent form submissions when used inside forms
		type="button"
		className={cn(
			"flex h-10 w-full items-center justify-between rounded-md border border-foreground/15 bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
			props.className
		)}
	>
		{props.children}
		<ChevronDown className="h-4 w-4 opacity-60" />
	</SelectPrimitive.Trigger>
);

export const SelectContent = (
	props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			{...props}
			className={cn(
				"z-[99999] overflow-hidden rounded-md border border-foreground/10 bg-background shadow-md",
				props.className
			)}
		>
			<SelectPrimitive.Viewport className="p-1">
				{props.children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
);

export const SelectItem = (
	props: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
) => (
	<SelectPrimitive.Item
		{...props}
		className={cn(
			"relative flex w-full cursor-default select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none hover:bg-foreground/10",
			props.className
		)}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<SelectPrimitive.ItemIndicator>
				<Check className="h-4 w-4" />
			</SelectPrimitive.ItemIndicator>
		</span>
		<SelectPrimitive.ItemText>{props.children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
);
