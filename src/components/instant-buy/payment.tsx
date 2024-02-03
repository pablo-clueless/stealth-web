"use client"
import { useEffect, useState } from "react"

import { formatCurrency } from "@/app/helpers/amount"
import { formatTime } from "@/app/helpers/time"
import { Button } from ".."

interface Props {
	amount: string
	depositInfo: {
		bankName: string
		accountNumber: string
		amountPayable: string
		charges: string
	}
	handleConfirmPayment: () => void
	next: () => void
	previous: () => void
}

const Payment = (props: Props) => {
	const { amount, depositInfo } = props

	const [timer, setTimer] = useState(1800)

	const handleSubmit = async () => {
		await props.handleConfirmPayment()
		props.next()
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prev) => (prev > 0 ? prev - 1 : 0))
		}, 1000)
		return () => clearInterval(interval)
	})

	return (
		<div className="h-full w-full">
			<p className="font-satoshi text-[28px] font-medium">Make Payment</p>
			<p className="text-lg text-black-400">
				Make payment into the account details provided below.
			</p>
			<div className="mb-16 mt-8 w-full">
				<p className="text-white-300">You are to pay</p>
				<p className="font-satoshi text-[28px] font-medium">
					{formatCurrency(depositInfo.amountPayable)}
				</p>
			</div>
			<div className="w-full">
				<div className="flex w-full items-center justify-between text-sm text-white-300">
					<p>Bank Name</p>
					<p>Account Number</p>
				</div>
				<div className="flex w-full items-center justify-between text-xl font-medium">
					<p>{depositInfo.bankName}</p>
					<p>{depositInfo.accountNumber}</p>
				</div>
			</div>
			<div className="my-12 w-full">
				<div className="flex w-full items-center justify-between text-sm text-white-300">
					<p>Amount of Bitcoin Purchase</p>
					<p>Charges</p>
				</div>
				<div className="flex w-full items-center justify-between text-xl font-medium">
					<p>{formatCurrency(amount)}</p>
					<p>{formatCurrency(depositInfo.charges)}</p>
				</div>
			</div>
			<hr className="w-full" />
			<div className="mb-40 mt-12 w-full">
				<div className="flex w-full items-center justify-between text-sm text-white-300">
					<p>Total Amount To Be Paid</p>
					<p>Expires In</p>
				</div>
				<div className="flex w-full items-center justify-between text-xl font-medium">
					<p>{formatCurrency(depositInfo.amountPayable)}</p>
					<p
						className={`${
							timer > 0 ? "text-green-500" : "text-red-500"
						}`}>
						{formatTime(timer)}
					</p>
				</div>
			</div>
			<div className="grid w-full grid-cols-2 gap-3">
				<Button
					type="button"
					onClick={props.previous}
					width="w-full bg-black-600">
					Go Back
				</Button>
				<Button type="button" onClick={handleSubmit} width="w-full">
					I Have Paid
				</Button>
			</div>
		</div>
	)
}

export default Payment
