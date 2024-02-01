"use client"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { logo } from "@/assets/images"
import { NavList } from "./nav-list"

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()

	return (
		<main className="flex h-screen w-screen items-start overflow-hidden bg-black-100 text-white-100">
			<div className="flex h-full w-1/5 flex-col justify-between border-r p-6">
				<div className="flex w-full flex-col gap-12">
					<Image src={logo} alt="" className="w-[100px]" />
					<div className="flex w-full flex-col gap-6">
						{NavList.map((item, index) => (
							<Link
								key={index}
								href={item.path}
								className={`flex items-center gap-2 rounded-lg p-3 font-satoshi font-medium capitalize transition-all duration-300 hover:bg-black-800 ${
									pathname === item.path
										? "border border-black-500 bg-black-800 text-alt-orange-100"
										: ""
								}`}>
								{item.icon} {item.label}
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="flex h-full w-4/5 flex-1 flex-col">
				<div className="flex w-full items-center justify-between border-b p-6">
					<p className="font-satoshi text-xl font-bold">Dashboard</p>
				</div>
				<div className="w-full p-6">{children}</div>
			</div>
		</main>
	)
}
