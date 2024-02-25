"use client"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import { activate } from "@/app/helpers/activate"
import { Dialog, Spinner } from "@/components"

const Page = () => {
	const searchParams = useSearchParams()
	const key = searchParams.get("key")

	const { data, error, isLoading } = useQuery({
		queryFn: () => activate(String(key)),
		queryKey: ["activate"],
		enabled: !!key,
	})

	if (error)
		return (
			<Dialog
				isOpen={!!error}
				onDismiss={() => {}}
				title="Account Activation Error!"
				type="error"
				large
				description="Sorry we could not activate your account. Please try again later">
				<div></div>
			</Dialog>
		)

	if (data)
		return (
			<Dialog
				isOpen={!!data}
				onDismiss={() => {}}
				title="You've created your Stealth account"
				type="success"
				large
				description="Your account has been activated!">
				<div>
					<Link
						href="/account/login"
						className="text-white flex h-12 w-fit items-center justify-center gap-1 rounded bg-alt-orange-500 px-4 font-satoshi text-sm font-medium transition-all duration-200 active:scale-[0.98]">
						Continue to login
					</Link>
				</div>
			</Dialog>
		)

	if (isLoading)
		return (
			<div className="grid h-full w-full place-items-center">
				<Spinner />
			</div>
		)
}

export default Page
