export type TransactionProps = {
	id: string
	date: Date | string
	amount: string
	value: string
	wallet: string
	status: "PENDING" | "SUCCESSFUL" | "FAILED"
}
