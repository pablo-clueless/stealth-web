import { NextRequest, NextResponse } from "next/server"
import endpoints from "@/config/endpoints"

export async function GET(req: NextRequest, res: NextResponse) {
	const url = endpoints().user.profile
	try {
		const res = await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		})
		if (res.status === 201 || res.ok) {
			const data = await res.json()
			return NextResponse.json(
				{
					success: true,
					message: "User details retrieved!",
					data,
				},
				{ status: 201 }
			)
		} else if (res.status === 400) {
			return NextResponse.json(
				{ success: false, message: "Bad request" },
				{ status: 400 }
			)
		} else {
			return NextResponse.json(
				{ success: false, message: "Internal server error!" },
				{ status: 500 }
			)
		}
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Internal server error!" },
			{ status: 500 }
		)
	}
}
