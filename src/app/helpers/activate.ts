"use server"
import endpoints from "@/config/endpoints"

export const activate = async (key: string) => {
	try {
		const url = endpoints(key).user.activate
		const res = await fetch(`${url}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
		if (res && !res.ok) {
			return new Error()
		}
		const data = await res.json()
		return data
	} catch (error) {
		return new Error()
	}
}
