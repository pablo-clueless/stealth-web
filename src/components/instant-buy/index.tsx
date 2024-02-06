import { useState } from "react"

import Processing from "./processing"
import Success from "./success"
import Payment from "./payment"
import Init from "./init"

type BuyState = "init" | "payment" | "processing" | "success"

interface Props {
	amount: string
	currency: string
}

const InstantBuy = (props: Props) => {
	const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false)
	const [screen, setScreen] = useState<BuyState>("init")
	const [txnHash, setTxnHash] = useState("")

	const [depositInfo, setDepositInfo] = useState({
		bankName: "",
		accountNumber: "",
		amountPayable: "",
		charges: "",
	})
	const [fields, setFields] = useState({
		amount: props.amount,
		currency: props.currency,
		amountInSats: "",
		narration: "",
		walletAddress: "",
	})

	const handleConfirmPayment = async () => {
		try {
			console.log("transaction confirmed!")
			setTxnHash("tb1pjw92ak78d62tc453uuqg69f2wqyszzg0nglxku7j5dcmy4s257asdcsxnu")
			setIsPaymentConfirmed(true)
		} catch (error) {
			setIsPaymentConfirmed(false)
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => setFields({ ...fields, [e.target.name]: e.target.value })

	return (
		<div className="min-h-[70dvh] w-full">
			{screen === "init" && (
				<Init
					fields={fields}
					handleChange={handleChange}
					setDepositInfo={setDepositInfo}
					setAmountInSats={(value: string) =>
						setFields({ ...fields, amountInSats: value })
					}
					next={() => setScreen("payment")}
				/>
			)}
			{screen === "payment" && (
				<Payment
					amount={fields.amount}
					depositInfo={depositInfo}
					handleConfirmPayment={handleConfirmPayment}
					next={() => setScreen("processing")}
					previous={() => setScreen("init")}
				/>
			)}
			{screen === "processing" && (
				<Processing
					amountPayable={depositInfo.amountPayable}
					isPaymentConfirmed={isPaymentConfirmed}
					next={() => setScreen("success")}
				/>
			)}
			{screen === "success" && <Success txnHash={txnHash} />}
		</div>
	)
}

export default InstantBuy
