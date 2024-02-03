import { Profile } from "@/types/profile"
import Image from "next/image"

export const Header = ({ profile }: { profile: Profile }) => {
	return (
		<div className="flex h-[80px] items-center justify-between border-b-[1px] border-t-0 border-b-white-700 bg-black-100 px-8 py-10 text-lg text-white-100">
			<p>Dashboard</p>
			<div className="flex items-center gap-8">
				<button className="text-white rounded font-bold">
					<Image
						src="/notification.svg"
						alt="logo"
						width={30}
						height={30}
					/>
				</button>
				<button className="flex items-center gap-3 text-[14px]">
					<p className="rounded-full bg-orange-100 px-3 py-1">TI</p>
					<p className={`${profile.firstName && "capitalize"}`}>
						{profile.firstName ?? profile.email}
					</p>
					<Image
						src="/chevron-down.svg"
						alt="logo"
						width={20}
						height={20}
					/>
				</button>
			</div>
		</div>
	)
}
