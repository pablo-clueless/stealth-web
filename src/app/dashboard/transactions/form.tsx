"use client"
import { Funnel } from "@phosphor-icons/react"
import React, { useState } from "react"

import { Button, Input } from "@/components"

interface Props {
	handleQuery: (query: string) => void
}

const Form = () => {
	const [query, setQuery] = useState("")
	const [error, setError] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!query) {
			return setError("Please enter a query!")
		}
    setError("")
		console.log(query)
	}

	return (
		<form onSubmit={handleSubmit} className="flex items-center gap-5">
			<Input
				typed="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search"
				error={error}
				width="w-[300px]"
			/>
			<Button type="submit" width="w-[110px]">
				<Funnel /> Filter
			</Button>
		</form>
	)
}

export default Form
