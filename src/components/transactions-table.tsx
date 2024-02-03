"use client"

import React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { CheckIcon, Cross1Icon, DotFilledIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const transactions = [
	{
		id: 1,
		date: "28 May, 8:44 AM",
		amount: "₦ 100,569.07",
		value: "0.000490 BTC",
		wallet: "1Lbcf7s****4ZnX71",
		status: "SUCCESSFUL",
	},
	{
		id: 2,
		date: "28 Aug, 10:44 PM",
		amount: "₦ 100,569.07",
		value: "0.000490 BTC",
		wallet: "1Lbcf7s****4ZnX71",
		status: "PENDING",
	},
	{
		id: 3,
		date: "28 May, 8:44 AM",
		amount: "₦ 1,000,678",
		value: "0.048950 BTC",
		wallet: "1Lbcf7s****4ZnX71",
		status: "FAILED",
	},
]

const getStatusColor = (status: string) => {
	switch (status) {
		case "SUCCESSFUL":
			return "bg-green-1200 text-green-100"
		case "PENDING":
			return "bg-orange-1200 text-orange-1100"
		case "FAILED":
			return "bg-red-1200 text-red-100"
		default:
			return "bg-green-1200 text-green-100"
	}
}

const TransactionsTable = () => {
	return (
		<div className="w-full rounded-md border border-white-700 p-6 text-white-100">
			<div className="mb-8 flex items-center gap-4 text-[20px]">
				<h2 className="text-[20px] ">Recent Transactions</h2>
				<span className="h-[24px] w-[1px] bg-white-700"></span>
				<Link href="#" className="text-orange-700">
					See all
				</Link>
			</div>

			<table className="relative w-full">
				<thead className="border border-l-0 border-r-0 border-white-700 text-white-400">
					<tr className="h-20">
						<th className="font-normal">No.</th>
						<th className="font-normal">Date</th>
						<th className="font-normal">Amount</th>
						<th className="font-normal">Value</th>
						<th className="font-normal">Wallet Address</th>
						<th className="font-normal">Status</th>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction) => (
						<tr key={transaction.id} className="h-[75px]">
							<td className="max-w-min text-center">
								{transaction.id}
							</td>
							<td className="max-w-min text-center">
								{transaction.date}
							</td>
							<td className="max-w-min text-center">
								{transaction.amount}
							</td>
							<td className="max-w-min text-center">
								{transaction.value}
							</td>
							<td className="max-w-min text-center">
								{transaction.wallet}
							</td>
							<td
								className={`w-[20px] rounded-[4px] px-3 py-2 text-left text-[10px] font-medium`}>
								<span
									className={`w-min rounded-md px-2 py-2 ${getStatusColor(
										transaction.status
									)}`}>
									{transaction.status}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TransactionsTable
