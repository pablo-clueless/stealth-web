"use client"
import { Check } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

import { formatCurrency } from "@/app/helpers/amount"
import { formatTime } from "@/app/helpers/time"
import { Button } from ".."

const WAIT_PERIOD_IN_SECONDS = 60

interface Props {
	amountPayable: string
	isPaymentConfirmed: boolean
	next: () => void
}

const Processing = (props: Props) => {
	const [timer, setTimer] = useState(WAIT_PERIOD_IN_SECONDS)

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prev) => (prev > 0 ? prev - 1 : 0))
		}, 1000)
		return () => clearInterval(interval)
	})

	useEffect(() => {
		if (timer === 0 && props.isPaymentConfirmed) props.next()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timer])

	return (
		<div className="h-full w-full">
			<p className="font-satoshi text-[28px] font-medium">Pay Online</p>
			<p className="text-lg text-black-400">Pay with bank transfer</p>
			<div className="mb-16 mt-8 w-full">
				<p className="text-white-300">You are to pay</p>
				<p className="font-satoshi text-[28px] font-medium">
					{formatCurrency(props.amountPayable)}
				</p>
			</div>
			<p className="text-center text-xl font-medium">
				We are waiting to confirm your transfer. This can take a few minutes.
			</p>
			<div className="my-24 flex w-full items-center justify-between gap-4">
				<div className="flex w-10 flex-col items-center gap-1">
					<div className="grid aspect-square w-7 place-items-center rounded-full bg-green-100">
						<Check className="text-xl text-white-100" />
					</div>
					<p className="text-xs text-green-100">Sent</p>
				</div>
				<div className="h-1 w-full flex-1 rounded bg-black-600 p-[1px]">
					<div
						style={{
							width: `${(timer / WAIT_PERIOD_IN_SECONDS) * 100}%`,
						}}
						className="h-full rounded bg-green-100 transition-all duration-100"></div>
				</div>
				<div className="flex w-10 flex-col items-center gap-1">
					{timer > 0 ? (
						<div className="aspect-square w-7 animate-spin rounded-full border border-dotted border-t-transparent"></div>
					) : (
						<div className="grid aspect-square w-7 place-items-center rounded-full bg-green-100">
							<Check className="text-xl text-white-100" />
						</div>
					)}
					<p
						className={`text-xs ${timer > 0 ? "text-black-300" : "text-green-100"}`}>
						Received
					</p>
				</div>
			</div>
			{timer > 0 && (
				<Button
					type="button"
					onClick={props.next}
					width={`mx-auto w-[240px] ${
						timer > 0 ? "bg-black-600 " : "bg-alt-orange-500"
					}`}
					disabled>
					Please wait for {formatTime(timer)} minutes
				</Button>
			)}
		</div>
	)
}

export default Processing
