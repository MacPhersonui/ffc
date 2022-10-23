import React, { useState, useEffect } from "react"
import Wallet from '../components/wallet'
import Link from 'next/link'
import classNames from "classnames/bind"
import styles from "../styles/layout.module.scss"
import {
    useRouter
} from 'next/router'
import {
    useTranslation,
    Trans
} from 'next-i18next'
const cx = classNames.bind(styles)

const Header = (props) => {
    const { activeIndex } = props

    const router = useRouter()
    const {
        t
    } = useTranslation('common')
    useEffect(async () => {
        // initNetWork()
    }, [])

    const initNetWork = async () => {
        let ethereum = window.ethereum
        const data = [
            {
                // chainId: "0x61",
                chainId: "0x38",
                chainName: "Binance Smart Chain Mainnet",
                nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                },
                rpcUrls: ["https://bsc-dataseed.binance.org"],
                blockExplorerUrls: ["https://bscscan.com/"],
            },
        ]

        /* eslint-disable */
        const tx = await ethereum.request({ method: "wallet_addEthereumChain", params: data }).catch()
        if (tx) {
            console.log(tx)
        }
    }

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <i className={styles.logo}></i>
                <ul>
                    <Link href="/"><li className={styles.active}>Home</li></Link>
                    <Link href="/"><li>NFT</li></Link>
                    <Link href="/"><li>GameFi</li></Link>
                    <Link href="/"><li>About US</li></Link>
                </ul>
                <div className={styles.wallet}>
                    <Wallet />
                </div>
            </nav>
            {/* <div className={styles.locale}>
                <Link
                    href='#'
                    locale={router.locale === 'en' ? 'zh' : 'en'}
                >
                    {router.locale === 'en' ? "English" : "中文"}
                </Link>
            </div> */}
            {props.children}
        </header>
    )
}

export default Header
