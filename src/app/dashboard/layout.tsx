import DashboardLayoutClient from "./layout-client"
import { getProfile } from "../helpers/get-profile"

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await getProfile()

	if (user instanceof Error) {
		return (
			<div className="flex h-screen flex-col items-center justify-center">
				<h1 className="mt-4 font-satoshi text-lg font-bold">
					Failed to fetch user profile!
				</h1>
				<p className="mt-2 text-sm text-gray-500">{user.message}</p>
			</div>
		)
	}

	return <DashboardLayoutClient user={user}>{children}</DashboardLayoutClient>
}
