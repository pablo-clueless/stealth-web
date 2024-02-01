"use client"
import Link, { LinkProps } from "next/link"
import { ComponentProps } from "react"

type Props =
	| (ComponentProps<"button"> & {
			as?: "button"
			width?: string
	  })
	| (LinkProps & {
			as: "link"
			width?: string
			children: React.ReactNode
	  })

const Button = (props: Props) => {
	if (props.as === "link") {
		return (
			<Link
				className={`text-white flex h-12 items-center justify-center gap-1 rounded bg-alt-orange-500 px-4 font-satoshi text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
					props.width ? props.width : "w-fit"
				}`}
				{...props}>
				{props.children}
			</Link>
		)
	}

	return (
		<button
			className={`text-white flex h-12 items-center justify-center gap-1 rounded bg-alt-orange-500 px-4 font-satoshi text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
				props.width ? props.width : "w-fit"
			}`}
			{...props}>
			{props.children}
		</button>
	)
}

export default Button
