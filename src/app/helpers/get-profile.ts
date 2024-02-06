"use server"

import { auth } from "@/auth"
import endpoints from "@/config/endpoints"
import { UserProps } from "@/types/profile"

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
		throw new Error("Failed to fetch user profile")
	}
	const profile = await res.json()

	return profile as UserProps
}
