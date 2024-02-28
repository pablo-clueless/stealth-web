"use client"
import { WarningCircle } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

import { TableBody, TableHead } from "@/components/transactions-table"
import { CurrencyInput } from "@/components/shared/input"
import { TransactionProps } from "@/types/transactions"
import { formatCurrency } from "../helpers/amount"
import InstantBuy from "@/components/instant-buy"
import { ExchangeRateProps } from "@/types/price"
import { INT_REGEX } from "@/config/constants"
import { Button, Dialog } from "@/components"
import { UserProps } from "@/types/profile"
import Image from "next/image"

const CurrencyList = ["NGN", "USD"]

interface Props {
	exchangeRate: ExchangeRateProps
	profile: UserProps
	transactions: TransactionProps[]
}

const Client = ({ exchangeRate: { data }, profile, transactions }: Props) => {
	const [fields, setFields] = useState({ amount: "", currency: "NGN" })
	const [openModal, setOpenModal] = useState(false)
	const [error, setError] = useState("")

	const displayName = profile.firstName
		? profile.firstName
		: profile.email.split("@")[0]

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => setFields({ ...fields, [e.target.name]: e.target.value })

	const handleSubmit = async () => {
		const { amount } = fields
		if (Number(amount) <= 0) {
			return setError("Please enter an amount greater than 0!")
		}
		//checks if the amount includes only integers to avoid exponential notation e.g 3.9e10
		if (!INT_REGEX.test(amount)) {
			return setError("Please enter a valid amount!")
		}
		setOpenModal(true)
	}

	const closeModal = () => {
		setOpenModal(false)
		setFields({ ...fields, amount: "" })
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			setError("")
		}, 5000)
		return () => clearTimeout(timeout)
	}, [error])

	return (
		<>
			<Dialog isOpen={openModal} onDismiss={closeModal}>
				<InstantBuy
					amount={fields.amount}
					currency={fields.currency}
					exchangeRate={data}
				/>
			</Dialog>
			<div className="flex h-full w-full flex-col gap-6">
				<p className="font-satoshi text-2xl font-bold capitalize">
					Hello {displayName},
				</p>
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
								inputName="amount"
								label="Enter Amount"
								selectName="currency"
								handleAmountChange={handleChange}
								handleCurrencyChange={handleChange}
								error={error}>
								{CurrencyList.map((currency) => (
									<option key={currency} value={currency}>
										{currency}
									</option>
								))}
							</CurrencyInput>
							<p className="flex items-center gap-1 text-xs text-black-400">
								<WarningCircle className="text-alt-orange-100" />
								Exchange rate: 1BTC = {formatCurrency(data.pricePerBtc)}
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
					<div className="col-span-3 flex h-full items-center justify-center rounded-lg border border-black-500 bg-black-700 p-6">
						{/* <p className="font-satoshi text-xl font-medium">Market Summary</p> */}
						<Image src="/trezor.png" alt="Market Summary" width={300} height={120} />
					</div>
				</div>
				<div className="flex h-[372px] w-full flex-col rounded-lg border border-black-500 bg-black-700 p-6">
					<div className="flex items-center">
						<p className="font-satoshi text-xl font-medium">Recent Transactions</p>
					</div>
					<hr className="my-4 w-full" />
					<div className="w-full">
						<TableHead />
						<TableBody transactions={transactions} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Client
