"use client"
import { useState } from "react"

import { updateProfile } from "@/app/helpers/get-profile"
import { Button, Input, Spinner } from ".."

interface Props {
	onDismiss: () => void
}

const EditProfile = (props: Props) => {
	const [fields, setFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		nationality: "",
		walletAddress: "",
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFields({ ...fields, [e.target.name]: e.target.value })

	const handleSubmit = async () => {
		console.log(fields)
		try {
			const res = await updateProfile(fields)
		} catch (error) {}
	}

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<p className="font-satoshi text-[28px] font-bold">Edit Profile</p>
			<div className="mt-9 flex w-full flex-col gap-6">
				<div className="grid w-full grid-cols-2 gap-6">
					<Input
						typed="text"
						name="firstName"
						onChange={handleChange}
						label="First Name"
					/>
					<Input
						typed="text"
						name="lastName"
						onChange={handleChange}
						label="First Name"
					/>
				</div>
				<div className="grid w-full grid-cols-2 gap-6">
					<Input
						typed="text"
						name="email"
						onChange={handleChange}
						label="Email Address"
					/>
					<Input
						typed="text"
						name="nationality"
						onChange={handleChange}
						label="Nationality"
					/>
				</div>
				<Input
					typed="text"
					name="walletAddress"
					onChange={handleChange}
					label="Wallet Address"
				/>
			</div>
			<div className="mt-36 grid w-full grid-cols-2 gap-6">
				<Button type="button" onClick={props.onDismiss} width="w-full bg-black-600">
					Discard
				</Button>
				<Button type="submit" width="w-full">
					Save Changes
				</Button>
			</div>
		</form>
	)
}

export default EditProfile
