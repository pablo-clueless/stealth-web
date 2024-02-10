"use client"
import { UserProps } from "@/types/profile"
import { Avatar, Button, Input } from ".."

const Security = (props: UserProps) => {
	const displayName = props.firstName
		? `${props.firstName} ${props.lastName}`
		: props.email.split("@")[0]

	return (
		<div className="h-[644px] w-full rounded-lg border border-black-500 bg-black-700 p-10">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-5">
					<div className="aspect-square w-[120px] rounded-full bg-alt-orange-100">
						<Avatar
							imageUrl={props.imageUrl}
							name={displayName}
							email={props.email}
						/>
					</div>
					<div>
						<p className="font-satoshi text-2xl font-bold capitalize">
							{displayName}
						</p>
						<p className="text-white-300">{props.email}</p>
					</div>
				</div>
			</div>
			<hr className="my-10 w-full" />
			<div className="grid w-full grid-cols-3 gap-5">
				<div className="w-full">
					<p className="font-bold">Password</p>
					<p className="text-sm text-white-300">Reset your password here</p>
				</div>
				<form className="col-span-2 flex w-2/3 flex-col gap-5">
					<Input typed="password" label="Enter Old Password" />
					<Input typed="password" label="Enter New Password" />
					<Input typed="password" label="Confirm New Password" />
					<Button type="submit" width="-full">
						Save Password
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Security
