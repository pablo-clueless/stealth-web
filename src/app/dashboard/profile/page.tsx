"use client"
import { useEffect, useState } from "react"

import { Authentication, Profile, Security } from "@/components/profile"
import { UserProps } from "@/types/profile"
import { TabPanel } from "@/components"
import Loading from "./loading"

const TabList = ["Profile", "Security Settings", "2-FA"]

const Page = () => {
	const [user, setUser] = useState<UserProps | null>(null)
	const [tab, setTab] = useState(0)

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch("/api/profile", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				})
				if (!res.ok) {
					console.log(res)
				}
				const data = await res.json()
				setUser(data)
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		}
		getUser()
	}, [])

	if (!user) return <Loading />

	return (
		<div className="flex h-full w-full flex-col gap-6">
			<p className="font-satoshi text-2xl font-bold">My Profile</p>
			<div className="mt-5 w-full">
				<div className="mb-6 flex items-center">
					{TabList.map((item, index) => (
						<button
							key={index}
							onClick={() => setTab(index)}
							className={`border-b p-4 ${
								tab === index
									? "border-alt-orange-100 text-alt-orange-100"
									: "text-white-100"
							}`}>
							{item}
						</button>
					))}
				</div>
				<TabPanel tabIndex={1} index={tab}>
					<Profile {...user} />
				</TabPanel>
				<TabPanel tabIndex={2} index={tab}>
					<Security />
				</TabPanel>
				<TabPanel tabIndex={3} index={tab}>
					<Authentication {...user} />
				</TabPanel>
			</div>
		</div>
	)
}

export default Page
