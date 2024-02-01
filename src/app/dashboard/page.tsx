"use client"
import { WarningCircle } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

import { CurrencyInput } from "@/components/shared/input"
import { Button, Dialog, Spinner } from "@/components"
import InstantBuy from "@/components/instant-buy"

const CurrencyList = ["NGN", "USD", "EUR", "GBP", "CAD", "SAT"]

const Page = () => {
	const [fields, setFields] = useState({ amount: "", currency: "NGN" })
	const [openModal, setOpenModal] = useState(false)
	const [loading, setLoading] = useState(false)

	const getTransactions = async () => {
		try {
			setLoading(true)
			const res = await fetch("api/transactions")
			console.log(await res.json())
			setLoading(false)
		} catch (error) {
			console.log(error)
			setLoading(false)
		}
	}

	const handleSubmit = async () => {
		const { amount, currency } = fields
		if (Number(amount) <= 0) {
			return alert("Please enter an amount greater than 0!")
		}
		if (!/^\d*\.?\d*$/.test(amount)) {
			return alert("Please enter a valid amount!")
		}
		if (currency === "SAT") {
			return alert("Please select a fiat currency!")
		}
		setOpenModal(true)
	}

	useEffect(() => {
		getTransactions()
	}, [])

	return (
		<>
			{openModal && (
				<Dialog isOpen={openModal} onDismiss={() => setOpenModal(false)}>
					<InstantBuy amount={fields.amount} currency={fields.currency} />
				</Dialog>
			)}
			<div className="flex h-full w-full flex-col gap-6">
				<p className="font-satoshi text-2xl font-bold">Hello,</p>
				<div className="grid h-[350px] w-full grid-cols-5 gap-6">
					<div className="col-span-2 flex h-full flex-col justify-between rounded-lg border border-black-500 bg-black-700 p-6">
						<div>
							<p className="font-satoshi text-xl font-medium">Instant Buy</p>
							<p className="mb-4 text-xs text-black-400">
								Instantly buy Bitcoin into your self custody hardware wallet. Remember
								it&apos;s not your Bitcoin until you self-custody it.
							</p>
							<CurrencyInput
								amount={fields.amount}
								currency={fields.currency}
								handleAmountChange={(e) =>
									setFields({ ...fields, amount: e.target.value })
								}
								handleCurrencyChange={(e) =>
									setFields({ ...fields, currency: e.target.value })
								}>
								{CurrencyList.map((currency) => (
									<option key={currency} value={currency}>
										{currency}
									</option>
								))}
							</CurrencyInput>
							<p className="flex items-center gap-1 text-xs text-black-400">
								<WarningCircle className="text-alt-orange-100" />
								Exchange rate: 1BTC ={" "}
							</p>
						</div>
						<div className="grid w-full grid-cols-2 gap-6">
							<Button type="button" width="w-full bg-black-600">
								Generate Payment Link
							</Button>
							<Button type="button" onClick={handleSubmit} width="w-full">
								Buy Now
							</Button>
						</div>
					</div>
					<div className="col-span-3 h-full rounded-lg border border-black-500 bg-black-700 p-6">
						<p className="font-satoshi text-xl font-medium">Market Summary</p>
					</div>
				</div>
				<div className="flex h-[372px] w-full flex-col rounded-lg border border-black-500 bg-black-700 p-6">
					<div className="flex items-center">
						<p className="font-satoshi text-xl font-medium">Recent Transactions</p>
					</div>
					<hr className="my-4 w-full" />
					{loading && <Spinner />}
				</div>
			</div>
		</>
	)
}

export default Page
