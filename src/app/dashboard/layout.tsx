"use client"
import { Bell, SignOut } from "@phosphor-icons/react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { logo } from "@/assets/images"
import { Dialog } from "@/components"
import { NavList } from "./nav-list"

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	return (
		<>
			<Dialog
				isOpen={isOpen}
				onDismiss={() => setIsOpen(false)}
				title="Log Out"
				description="Do you really want to sign out?"
				type="error"></Dialog>
			<main className="flex h-screen w-screen items-start overflow-hidden bg-black-100 text-white-100">
				<div className="flex h-full w-1/5 flex-col justify-between border-r border-black-500 p-6">
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
					<button
						onClick={() => setIsOpen(true)}
						className="flex items-center gap-2 rounded-lg p-3 font-satoshi font-medium text-red-800 transition-all duration-300 hover:bg-red-800 hover:text-white-100">
						<SignOut size={24} /> Log Out
					</button>
				</div>
				<div className="flex h-full w-4/5 flex-1 flex-col">
					<div className="flex w-full items-center justify-between border-b border-black-500 p-6">
						<p className="font-satoshi text-xl font-bold">Dashboard</p>
						<div className="flex items-center gap-5">
							<button className="rounded-full border p-2">
								<Bell />
							</button>
							<div></div>
						</div>
					</div>
					<div className="w-full p-6">{children}</div>
				</div>
			</main>
		</>
	)
}
