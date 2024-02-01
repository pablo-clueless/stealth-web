import Image from "next/image"
import Link from "next/link"

export const Sidebar = () => {
	return (
		<aside className="fixed left-0 top-0 flex h-full w-[276px] flex-col items-start gap-[64px] border-r-[1px] border-r-white-700 bg-black-100 p-7">
			<div className="flex flex-col items-center text-white-100">
				<Link href="#">
					<Image src="/stealth.svg" alt="logo" width={100} height={100} />
				</Link>
			</div>
			<div className="flex flex-col items-start gap-y-[55px] text-left font-thin text-white-100">
				<Link href="#" className="flex w-full items-center justify-start gap-3">
					<Image src="/square.svg" alt="logo" width={20} height={20} />
					<p className="text-lg">Dashboard</p>
				</Link>
				<Link href={"#"} className="flex w-full items-center justify-start gap-3">
					<Image src="/list.svg" alt="logo" width={20} height={20} />
					<p className="text-lg">Transactions</p>
				</Link>
				<Link href={"#"} className="flex w-full items-center justify-start gap-3">
					<Image src="/calender.svg" alt="logo" width={20} height={20} />
					<p className="text-lg">Plans</p>
				</Link>
				<Link href={"#"} className="flex w-full items-center justify-start gap-3">
					<Image src="/user.svg" alt="logo" width={20} height={20} />
					<p className="text-lg">Profile</p>
				</Link>
				<Link href={"#"} className="flex w-full items-center justify-start gap-3">
					<Image src="/stack.svg" alt="logo" width={20} height={20} />
					<p className="text-lg">Resources</p>
				</Link>
				<Link href={"#"} className="flex w-full items-center justify-start gap-3">
					<Image src="/headset.svg" alt="logo" width={20} height={20} />
					<p className="text-lg">Help and Support</p>
				</Link>
			</div>
			<div className="flex flex-col items-center text-white-100">
				<Link href={"#"} className="flex w-full items-center justify-start gap-3">
					<Image src="/signout.svg" alt="logo" width={20} height={20} />
					<p className="text-center text-lg text-red-100">Log out</p>
				</Link>
			</div>
		</aside>
	)
}
