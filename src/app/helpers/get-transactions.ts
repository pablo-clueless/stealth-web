"use server"

import { auth } from "@/auth"

export const getTransactions = async () => {
	const session = await auth()
	if (!session) {
		return new Error("No session found!")
	}
	const { accessToken } = session
	const url = "http://localhost:8080/api/transactions"
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		// revalidate data every 30 seconds
		next: { revalidate: 30, tags: ["price"] },
	})
	if (!response.ok) {
		return new Error("Failed to fetch exchange rate!")
	}
	const data = await response.json()
	return data
}
