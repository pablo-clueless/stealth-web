import React from "react"

import ComingSoon from "@/components/coming-soon"

const Page = () => {
	return (
		<div className="w-full">
			<div className="flex w-full items-center mb-6">
				<p className="font-satoshi text-2xl font-bold capitalize">
					Dollar Cost Averaging (Automated Purchase)
				</p>
			</div>
			<ComingSoon />
		</div>
	)
}

export default Page
