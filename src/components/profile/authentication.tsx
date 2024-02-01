"use client"
const Authentication = () => {
	return (
		<div className="h-[644px] w-full rounded-lg border border-black-500 bg-black-700 p-10">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-5">
					<div className="aspect-square w-[120px] rounded-full bg-alt-orange-100"></div>
					<div>
						<p className="font-satoshi text-2xl font-bold">Pablo Clueless</p>
						<p className="text-white-300">smsnmicheal@gamil.com</p>
					</div>
				</div>
			</div>
			<hr className="my-10 w-full" />
			<div className="grid w-full grid-cols-3 gap-5">
				<div className="w-full">
					<p className="font-bold">2 Factor Authentication</p>
					<p className="text-sm text-white-300">
						Add extra security measures to protect your account
					</p>
				</div>
				<div className="col-span-2 w-2/3"></div>
			</div>
		</div>
	)
}

export default Authentication
