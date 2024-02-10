"use server"
import { getTransactions } from "@/app/helpers/get-transactions"
import TransactionsTable from "@/components/transactions-table"
import { TransactionProps } from "@/types/transactions"
import Form from "./form"

const Page = async () => {
	const transactions: TransactionProps[] = await getTransactions()

	const handleQuery = (query: string) => {
		console.log(query)
	}

	return (
		<div className="w-full">
			<div className="mb-6 flex w-full items-center justify-between">
				<p className="font-satoshi text-2xl font-bold capitalize">Transactions</p>
				<Form />
			</div>
			<TransactionsTable transactions={transactions} />
		</div>
	)
}

export default Page
