"use client"
import { PencilSimpleLine } from "@phosphor-icons/react"
import { useState } from "react"

import { Avatar, Button, Dialog, Input } from ".."
import { UserProps } from "@/types/profile"
import EditProfile from "./edit-profile"

const Profile = (props: UserProps) => {
	const [openModal, setOpenModal] = useState(false)

	return (
		<>
			<Dialog isOpen={openModal} onDismiss={() => setOpenModal(false)} large>
				<div className="min-h-[50dvh] w-full bg-black-100">
					<EditProfile onDismiss={() => setOpenModal(false)} />
				</div>
			</Dialog>
			<div className="h-[644px] w-full rounded-lg border border-black-500 bg-black-700 p-10">
				<div className="flex w-full items-center justify-between">
					<div className="flex items-center gap-5">
						<div className="aspect-square w-[120px] rounded-full bg-alt-orange-100">
							<Avatar
								imageUrl={props.imageUrl}
								name={`${props.firstName} ${props.lastName}`}
								email={props.email}
							/>
						</div>
						<div>
							<p className="font-satoshi text-2xl font-bold capitalize">
								{props.firstName} {props.lastName}
							</p>
							<p className="text-white-300">{props.email}</p>
						</div>
					</div>
					<Button type="button" width="w-[147px]" onClick={() => setOpenModal(true)}>
						<PencilSimpleLine size={20} /> Edit Profile
					</Button>
				</div>
				<hr className="my-10 w-full" />
				<div className="grid w-full grid-cols-3 gap-5">
					<div className="w-full">
						<p className="font-bold">Person Information</p>
						<p className="text-sm text-white-300">
							Update your personal details here.
						</p>
					</div>
					<div className="col-span-2 flex w-2/3 flex-col gap-5">
						<div className="grid w-full grid-cols-2 gap-5">
							<Input typed="text" defaultValue={props.firstName} label="First Name" />
							<Input typed="text" defaultValue={props.lastName} label="Last Name" />
						</div>
						<Input typed="email" defaultValue={props.email} label="Email Address" />
						<Input typed="text" label="Wallet Address" />
						<Input typed="text" label="Nationality" />
					</div>
				</div>
			</div>
		</>
	)
}

export default Profile
