"use server"

import endpoints from "@/config/endpoints"
import { auth } from "@/auth"

interface ChangePasswordPayload {
	currentPassword: string
	newPassword: string
}

export const changePassword = async (payload: ChangePasswordPayload) => {
	const session = await auth()
	if (!session) {
		return new Error("No session found")
	}
	const { accessToken } = session
	const url = endpoints().auth["change-password"]
	const res = await fetch(url, {
		method: "",
		body: JSON.stringify(payload),
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	})
	if (!res.ok) {
		return new Error("Failed to fetch user profile")
	}
	const data = await res.json()
	return data
}
