import * as React from 'react'
import Image from 'next/future/image'
import { useAccount, useNetwork } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { cx } from 'cva'
import AppLink from './AppLink'
import Menu from './Menu'
import TxSubmittedDialog from '../TxSubmittedDialog'
import { useDialogState } from 'ariakit'

interface ILayoutProps {
	children?: React.ReactNode
	style?: React.CSSProperties
	className?: string
}

export default function Layout({ children, className, ...props }: ILayoutProps) {
	const { isConnected } = useAccount()
	const { chain } = useNetwork()
	const dialog = useDialogState()
	const txHash = React.useRef<string | null>(null)

	return (
		<>
			<header className="flex flex-col gap-4 flex-wrap p-3 w-full max-w-8xl mx-auto sm:flex-row sm:justify-between sm:items-center">
				<nav className="flex items-center gap-3 text-base font-semibold bg-white text-black mr-auto p-1 rounded-xl w-full sm:w-auto">
					<Image src="/gib.png" alt="llamalend" height={24} width={24} priority />
					<AppLink name="Borrow" path="/" />
					<AppLink name="Repay" path="/repay" />
				</nav>

				<span className="flex gap-4 items-center flex-wrap [&>*:first-child]:!mr-auto">
					<ConnectButton />
					<Menu />
				</span>
			</header>

			<React.Suspense fallback={null}>
				<main
					className={cx(
						'flex-1 min-h-full w-full max-w-8xl mx-auto p-3 sm:flex sm:[&>*:first-child]:!flex-1',
						className
					)}
					{...props}
				>
					{isConnected && !chain?.unsupported ? children : <></>}
				</main>

				<TxSubmittedDialog dialog={dialog} transactionHash={txHash} />
			</React.Suspense>
		</>
	)
}