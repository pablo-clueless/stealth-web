"use client"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Dialog } from "@/components"

const Page = () => {
	const searchParams = useSearchParams()
	const key = searchParams.get("key")

	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<any>(null)
	const [error, setError] = useState("")

	const activate = async () => {
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
		} catch (error: any) {
			setLoading(false)
			setError(error)
		}
	}

	useEffect(() => {
		if (key) activate()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key])

	if (data)
		return (
			<Dialog
				isOpen={data}
				onDismiss={() => {}}
				title="You’ve created your Stealth account"
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
				onDismiss={() => {}}
				title="Account Activation Error!"
				type="error"
				large
				description="Sorry we could not activate your account. Please try again later">
				<div></div>
			</Dialog>
		)

	if (loading) return <div className="h-full w-full">Loading...</div>
}

export default Page
