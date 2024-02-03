import React from "react"

const Loading = () => {
	return (
		<div className="flex h-full w-full flex-col gap-6">
			<div className="h-8 w-[200px] animate-pulse rounded-md bg-gray-400"></div>
			<div className="mt-5 w-full">
				<div className="mb-6 flex items-center">
					{[...Array(3)].map((_, index) => (
						<div
							key={index}
							className="h-8 w-[200px] animate-pulse rounded-md bg-gray-400"></div>
					))}
				</div>
			</div>
			<div className="h-[644px] w-full animate-pulse rounded-lg bg-gray-400"></div>
		</div>
	)
}

export default Loading
