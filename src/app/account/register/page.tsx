"use client"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Link from "next/link"

import { Button, Dialog, Input, Spinner } from "@/components"

const Page = () => {
	const [formFields, setFormFields] = useState({
		email: "",
		password: "",
		confirm_password: "",
	})
	const [passwordsMatch, setPasswordsMatch] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: { email: string; password: string }) =>
			fetch("/api/register", {
				method: "POST",
				body: JSON.stringify({
					email: payload.email,
					password: payload.password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			}),
		mutationKey: ["register"],
		onSuccess: (data) => {
			console.log(data)
		},
		onError: (error) => {
			console.log(error)
			setError(error)
		},
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormFields({ ...formFields, [e.target.name]: e.target.value })

	const formAction = async () => {
		const isValid =
			/^(?=.*[a-zA-Z0-9])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])(?=.*[0-9]).{8,20}$/.test(
				formFields.password
			)
		if (!isValid) {
			alert("Password is not strong enough!")
			return
		}
		if (!passwordsMatch) {
			alert("Password do not match!")
			return
		}
		mutateAsync({ email: formFields.email, password: formFields.password })
	}

	useEffect(() => {
		setPasswordsMatch(formFields.password === formFields.confirm_password)
	}, [formFields.confirm_password, formFields.password])

	return (
		<>
			{error && (
				<Dialog
					isOpen={error !== null}
					onDismiss={() => setError(null)}
					title={error?.message}
					type="error"
					large
					description="">
					<div></div>
				</Dialog>
			)}
			<div className="h-full w-full">
				<p className="font-satoshi text-[28px] font-bold">Come On Board</p>
				<p className="text-lg">
					It&apos;s not your Bitcoin until you self-custody it. Start your journey to
					becoming a Bitcoin owner today.
				</p>
				<form action={formAction} className="mt-10 flex h-full w-full flex-col">
					<div className="flex w-full flex-col gap-6">
						<Input
							typed="email"
							name="email"
							onChange={handleChange}
							label="Email Address"
						/>
						<Input
							typed="password"
							name="password"
							onChange={handleChange}
							label="Password"
						/>
						<Input
							typed="password"
							name="confirm_password"
							onChange={handleChange}
							label="Confirm Password"
							error={passwordsMatch ? "" : "Passwords do not match"}
						/>
					</div>
					<div className="mt-[270px] flex w-full flex-col gap-5">
						<Button type="submit" width="w-full" disabled={isPending}>
							{isPending ? <Spinner /> : "Create Account"}
						</Button>
						<p className="flex items-center justify-center text-center">
							Already have an account?
							<Link href="/account/login" className="link ml-1 text-alt-orange-100">
								Log In
							</Link>
						</p>
					</div>
				</form>
			</div>
		</>
	)
}

export default Page
