"use client"

import React from "react"

import { TransactionProps } from "@/types/transactions"

interface Props {
	transactions: TransactionProps[]
}

const StatusColor = {
	SUCCESSFUL: "bg-green-1200 text-green-100",
	PENDING: "bg-orange-1200 text-orange-1100",
	FAILED: "bg-red-1200 text-red-100",
}

const TransactionsTable = ({ transactions }: Props) => {
	return (
		<div className="h-[77vh] w-full overflow-hidden rounded-md border border-white-700 bg-black-700 p-6 text-white-300">
			<TableHead />
			<hr className="my-6 border-white-700" />
			<TableBody transactions={transactions} />
		</div>
	)
}

export default TransactionsTable

export const TableHead = () => (
	<div className="grid w-full grid-cols-6 rounded-md">
		<p className="">No.</p>
		<p className="">Date</p>
		<p className="">Amount</p>
		<p className="">Value</p>
		<p className="">Wallet Address</p>
		<p className="">Status</p>
	</div>
)

export const TableBody = ({
	transactions,
}: {
	transactions: TransactionProps[]
}) => {
	return (
		<>
			{!transactions.length ? (
				<div className="grid w-full place-items-center py-20">
					<p className="font-satoshi text-xl font-medium">No transactions yet.</p>
				</div>
			) : (
				<div className="w-full">
					{transactions.map((transaction) => (
						<div
							key={transaction.id}
							className={`${StatusColor[transaction.status]}`}></div>
					))}
				</div>
			)}
		</>
	)
}
