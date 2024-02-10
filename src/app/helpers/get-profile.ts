"use server"

import { UserProps } from "@/types/profile"
import endpoints from "@/config/endpoints"
import { auth } from "@/auth"

export const getProfile = async (): Promise<UserProps | Error> => {
	const session = await auth()
	if (!session) {
		return new Error("No session found")
	}
	const { accessToken } = session

	const url = endpoints().user.profile
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
	if (!res.ok) {
		return new Error("Failed to fetch user profile")
	}
	const profile = await res.json()

	return profile as UserProps
}

interface UpdateUserDto {
	firstName?: string
	lastName?: string
	email?: string
	nationality?: string
	walletAddress?: string
}

export const updateProfile = async (payload: UpdateUserDto) => {
	const session = await auth()
	if (!session) {
		throw new Error("No session found")
	}
	const { accessToken } = session
	const url = ""
	const res = await fetch(url, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	})
	if (!res.ok) {
		throw new Error("Failed to update user profile")
	}
	const data = await res.json()
	return data
}
