import { NextRequest, NextResponse } from "next/server"

const env = process.env.NODE_ENV
const baseUrl =
	env === "development"
		? "http://localhost:8080/api"
		: "https://api.stealth.com/api"

export async function GET(request: NextRequest, response: NextResponse) {
	const txn = request.nextUrl.searchParams.get("txn")
	if (txn) {
		try {
			const res = await fetch(`${baseUrl}/transactions?txn=${txn}`, {
				headers: { "Content-Type": "application/json" },
			})
			if (res.ok) {
				return NextResponse.json(
					{ success: true, message: "Transaction retrieved!", data: res.json() },
					{ status: 201 }
				)
			} else if (res.status === 400) {
				return NextResponse.json(
					{ success: false, message: "Bad request!" },
					{ status: 400 }
				)
			} else if (res.status === 401) {
				return NextResponse.json(
					{ success: false, message: "You're not authorized to make this request!" },
					{ status: 400 }
				)
			} else {
				return NextResponse.json(
					{ success: false, message: "Internal server error" },
					{ status: 500 }
				)
			}
		} catch (error) {
			return NextResponse.json(
				{ success: false, message: "Internal server error" },
				{ status: 500 }
			)
		}
	}
	try {
		const res = await fetch(`${baseUrl}/transactions`, {
			headers: { "Content-Type": "application/json" },
		})
		if (res.ok) {
			return NextResponse.json(
				{ success: true, message: "Transactions retrieved!", data: res.json() },
				{ status: 201 }
			)
		} else if (res.status === 400) {
			return NextResponse.json(
				{ success: false, message: "Bad request!" },
				{ status: 400 }
			)
		} else if (res.status === 401) {
			return NextResponse.json(
				{ success: false, message: "You're not authorized to make this request!" },
				{ status: 400 }
			)
		} else {
			return NextResponse.json(
				{ success: false, message: "Internal server error" },
				{ status: 500 }
			)
		}
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 }
		)
	}
}
