"use client"
import { WarningOctagon } from "@phosphor-icons/react"
import React from "react"

import { Button } from ".."

interface Props {
	txnHash: string
}

const Success = (props: Props) => {
	const viewTxn = () => {
		window.open(`https://mempool.space/tx/${props.txnHash}`, "_blank")
	}

	return (
		<div className="flex h-full w-full flex-col items-center">
			<div className="my-8">
				<WarningOctagon className="text-9xl text-alt-orange-100" />
			</div>
			<p className="font-satoshi text-4xl font-bold">Processing!</p>
			<p className="my-4 text-center text-xl text-black-300">
				Your Bitcoin purchase is being processed. You can track the progress by
				clicking the link below or pasting the Hash on any blockchain explorer.
			</p>
			<p className="mb-44 max-w-[90%] break-words text-center text-alt-orange-100">
				{props.txnHash}
			</p>
			<Button type="button" onClick={viewTxn} width="w-full">
				View Transaction
			</Button>
		</div>
	)
}

export default Success
