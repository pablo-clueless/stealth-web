import { getTransactions } from "../helpers/get-transactions"
import { getExchangeRate } from "../helpers/get-price"
import { getProfile } from "../helpers/get-profile"
import Client from "./client"

const Page = async () => {
	const transactions = await getTransactions()
	const rate = await getExchangeRate()
	const profile = await getProfile()

	if (rate instanceof Error) {
		return (
			<div className="flex h-screen flex-col items-center justify-center">
				<h1 className="mt-4 font-satoshi text-lg font-bold">
					Failed to fetch exchange rate!
				</h1>
				<p className="mt-2 text-sm text-gray-500">{rate.message}</p>
			</div>
		)
	}

	if (profile instanceof Error) {
		return (
			<div className="flex h-screen flex-col items-center justify-center">
				<h1 className="mt-4 font-satoshi text-lg font-bold">
					Failed to fetch user profile!
				</h1>
				<p className="mt-2 text-sm text-gray-500">{profile.message}</p>
			</div>
		)
	}

	return (
		<Client exchangeRate={rate} profile={profile} transactions={transactions} />
	)
}

export default Page
