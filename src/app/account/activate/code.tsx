"use client"

import Spinner from "@/components/spinner"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

export default function Activate({
	action,
}: {
	action: (code: string) => Promise<{ error?: string; success?: boolean }>
}) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const code = searchParams.get("key")

	const [error, setError] = React.useState("")
	const [loading, setLoading] = React.useState(false)
	const [activated, setActivated] = React.useState(false)

	async function activateAccount() {
		if (!code) {
			return
		}
		setActivated(false)
		setLoading(true)
		const res = await action(code)
		setLoading(false)
		if (res.error) {
			setError(res.error)
			return
		}
		setActivated(true)
		setError("")
		if (res.success || activated) {
			router.push("/account/login")
		}
	}

	if (!code) {
		return (
			<div className="flex flex-col items-center rounded-lg bg-slate-50 p-7">
				<p className="pt-3 text-center text-lg font-semibold">
					We sent you a mail
				</p>
				<p className="pt-3 text-center text-lg">
					Activate your account by clicking the link sent to your
					email.
				</p>
			</div>
		)
	}

	if (loading) {
		return (
			<div>
				<Spinner size="large" />
			</div>
		)
	}

	if (error) {
		return (
			<div className="flex flex-col items-center rounded-lg bg-red-50 p-7">
				<h1 className="text-xl font-semibold text-red-500">
					Account Activation Error!
				</h1>
				<p className="pt-3 text-center text-lg">
					Sorry we could not activate your account. Please try again
					later
				</p>
			</div>
		)
	}

	if (activated) {
		return (
			<div className="flex flex-col items-center rounded-lg bg-green-50 p-7">
				<h1 className="text-xl font-semibold text-green-500">
					Account Activated!
				</h1>
				<p className="pt-3 text-center text-lg">
					Your account has been activated. You can now login
				</p>
				<p className="pt-3 text-center text-lg">
					Click this button to login if you are not automatically
					redirected.
				</p>
				<button className="text-white mt-5 rounded-lg bg-green-500 px-5 py-2">
					<Link href="/account/login">Login</Link>
				</button>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center rounded-lg bg-green-50 px-28 py-10">
			<h1 className="text-xl font-semibold text-black-500">
				Activate Your Account
			</h1>

			<button
				onClick={activateAccount}
				className="text-white mt-5 rounded-lg bg-green-500 px-5 py-2">
				activate
			</button>
		</div>
	)
}
