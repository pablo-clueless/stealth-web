"use client"
import { useState } from "react"

import { Authentication, Profile, Security } from "@/components/profile"
import { TabPanel } from "@/components"

const TabList = [
	{ label: "Profile", component: <Profile /> },
	{ label: "Security Settings", component: <Security /> },
	{ label: "2-FA", component: <Authentication /> },
]

const Page = () => {
	const [tab, setTab] = useState(0)

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
							{item.label}
						</button>
					))}
				</div>
				{TabList.map((item, index) => (
					<TabPanel key={index} tabIndex={index} index={tab}>
						{item.component}
					</TabPanel>
				))}
			</div>
		</div>
	)
}

export default Page
