"use client"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { Dialog, Spinner } from "@/components"

const Page = () => {
	const searchParams = useSearchParams()
	const key = searchParams.get("key")

	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState("")

	const handleActivate = useCallback(async () => {
		try {
			setLoading(true)
			const res = await fetch(`/api/activate?key=${key}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
			if (res && !res.ok) {
				setError(await res.text())
			}
			setLoading(false)
			setData(res)
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			}
			setLoading(false)
		}
	}, [key])

	useEffect(() => {
		if (key) handleActivate()
	}, [key, handleActivate])

	if (data)
		return (
			<Dialog
				isOpen={data}
				onDismiss={() => setData(null)}
				title="You've created your Stealth account"
				type="success"
				large
				description="Your account has been activated!">
				<div></div>
			</Dialog>
		)

	if (error)
		return (
			<Dialog
				isOpen={error !== ""}
				onDismiss={() => setError("")}
				title="Account Activation Error!"
				type="error"
				large
				description="Sorry we could not activate your account. Please try again later">
				<div></div>
			</Dialog>
		)

	if (loading)
		return (
			<div className="grid h-full w-full place-items-center">
				<Spinner />
			</div>
		)
}

export default Page
