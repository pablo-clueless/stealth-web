"use client"
import { ArrowsDownUp, WarningCircle } from "@phosphor-icons/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { CurrencyInput } from "@/components/shared/input"
import { Button, Input } from "@/components"

interface Props {
	fields: {
		amount: string
		currency: string
		amountInSats: string
		narration?: string
		walletAddress: string
	}
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	setAmountInSats: (value: string) => void
	setDepositInfo: Dispatch<
		SetStateAction<{
			bankName: string
			accountNumber: string
			amountPayable: string
			charges: string
		}>
	>
	next: () => void
}

const CurrencyList = ["NGN", "USD", "EUR", "GBP", "CAD", "SAT"]
const CHARGES = 230

const Init = (props: Props) => {
	const [reversed, setReversed] = useState(false)
	const { fields, handleChange } = props

	const handleSubmit = () => {
		const { amount, walletAddress } = fields
		if (!amount) {
			return alert("Please enter amount!")
		}
		if (!walletAddress) {
			return alert("Please enter wallet address!")
		}
		props.setDepositInfo({
			accountNumber: "988852055355",
			amountPayable: (Number(amount) + CHARGES).toString(),
			bankName: "Paystack Titan",
			charges: CHARGES.toString(),
		})
		props.next()
	}

	useEffect(() => {
		const amountInSats = Number(fields.amount) * (38_794_798.2 * 100_000_000)
		props.setAmountInSats(amountInSats.toString())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fields.amount])

	return (
		<div className="h-full w-full">
			<p className="font-satoshi text-[28px] font-medium">Instant Buy</p>
			<p className="text-lg text-black-400">
				Please enter narration and your wallet address correctly
			</p>
			<div className="my-8 flex w-full flex-col">
				<div
					className={`flex w-full ${reversed ? "flex-col-reverse" : "flex-col"}`}>
					<CurrencyInput
						amount={fields.amount}
						currency={fields.currency}
						inputName="amount"
						selectName="currency"
						handleAmountChange={handleChange}
						handleCurrencyChange={handleChange}>
						{CurrencyList.map((currency) => (
							<option key={currency} value={currency}>
								{currency}
							</option>
						))}
					</CurrencyInput>
					<div className="relative h-4 w-full">
						<button
							onClick={() => setReversed(!reversed)}
							className="absolute left-[3%] top-1/2 grid aspect-square w-8 -translate-y-1/2 place-items-center rounded-full border bg-[#111]">
							<ArrowsDownUp size={20} />
						</button>
					</div>
					<CurrencyInput
						amount={fields.amountInSats}
						currency="SATS"
						inputName="amountInSats"
						disableInput
						disableSelect
						handleAmountChange={handleChange}
						handleCurrencyChange={handleChange}>
						{CurrencyList.map((currency) => (
							<option key={currency} value={currency}>
								{currency}
							</option>
						))}
					</CurrencyInput>
				</div>
				<p className="flex items-center gap-1 text-xs text-black-400">
					<WarningCircle className="text-alt-orange-100" />
					Exchange rate: 1BTC ={" "}
				</p>
			</div>
			<div className="my-6">
				<Input
					typed="text"
					name="walletAddress"
					value={fields.walletAddress}
					onChange={handleChange}
					label="Wallet Address"
				/>
				<p className="text-xs">Please paste in your hardware wallet address here</p>
			</div>
			<div className="mb-28 mt-6">
				<Input
					typed="text"
					name="narration"
					value={fields.narration}
					onChange={handleChange}
					label="Narration"
				/>
			</div>
			<Button type="button" onClick={handleSubmit} width="w-full">
				Buy Now
			</Button>
		</div>
	)
}

export default Init
