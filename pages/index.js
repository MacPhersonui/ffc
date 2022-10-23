import React, { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/index.module.scss"
import classNames from "classnames/bind"
import Timer from "react-compound-timer"
import Web3 from "web3"
import Wallet from "../components/wallet"
import useWallet from "use-wallet"
import {
    getInvite,
    getInviteRank,
    createInvite
} from "../api/api"
import tokenConfig from "../contract.config"
import { confirmAlert } from "react-confirm-alert"
import HeaderFooter from "../layout/HeaderFooter"
import Clipboard from 'react-clipboard.js'
import {
    ToastContainer,
    toast
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    withRouter
} from "next/router"
import {
    useTranslation,
    Trans
} from 'next-i18next'
import {
    serverSideTranslations
} from 'next-i18next/serverSideTranslations'
import Cookies from 'js-cookie'
import {
    utils
} from "ethers"
import {
    Swiper,
    SwiperSlide
} from "swiper/react"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules
import {
    Navigation,
    Pagination,
    Keyboard
} from "swiper"

const cx = classNames.bind(styles)

const toastConfig = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: null,
    pauseOnHover: false,
}

const Home = ({
    router
}) => {

    const {
        t
    } = useTranslation('common')

    const wallet = useWallet()
    const {
        account,
        ethereum
    } = wallet

    const web3 = new Web3(ethereum)

    useEffect(async () => {
        const timer = setInterval(async () => {
            if (account) {

            }
            clearInterval(timer)
        }, 3000)
        return () => {
            clearInterval(timer)
        }
    }, [account])

    return (
        <HeaderFooter activeIndex={1}>
            <ToastContainer />
            <main className={styles.container}>
                <section className={styles.solgen}>
                    <div className={styles.player_left}></div>
                    <div className={styles.player_right}></div>
                    <div className={styles.solgen_bottom_bg}></div>
                    <div className={styles.solgen_title}>
                        <p>FFC Fan Token</p>
                        <p>To Web3</p>
                    </div>
                    <div className={styles.solgen_subtitle}>
                        <p>Build the first league</p>
                        <p>in the Web3 world</p>
                    </div>
                    <div className={styles.solgen_logo}></div>
                    <div className={styles.solgen_token1}></div>
                    <div className={styles.solgen_token2}></div>
                </section>
                <section className={styles.what_is_ffc}>
                    <div className={styles.title}>
                        <h1>What is FFC</h1>
                        <h2>What is FFC</h2>
                        <p>France Football Club (FFC) is a Web3 ecological product jointly created by the Ligue 1 League and several French clubs. It includes many sectors, such as fan economy, NFT star cards, football chain games, and the football metaverse. The ultimate vision of FFC is to build its football world about the Web3 on-chain so that users can experience football games better, and the club will gain more users and jointly build the first football metaverse world with football fans.</p>
                    </div>
                    <ul className={styles.list}>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>FFC TOKEN</h1>
                                <p>FFC Token is the only fan token officially authorized by the French Football League (referred to as Ligue 1). The official goal is to further enhance the interaction and two-way empowerment between football and fans through FFC Token to improve the widespread football culture worldwide and make more users fall in love with football. The governance scope of FFC Token will cover the NFT, GameFi, and the follow-up football metaverse world of FFC. Holders of the FFC will be the first generation of locals in the FFC football metaverse.</p>
                            </span>
                        </li>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>FFC NFT</h1>
                                <p>Relying on the official authorization of the French League, FFC will continue to sign new clubs and well-known stars and provide positive feedback to the FFC ecosystem to achieve the integration of the entire French League. In the future, FFC will issue NFTs and football-related NFT products based on stars and clubs, expand the FFC ecosystem, and enable users to gain more admission opportunities.</p>
                            </span>
                        </li>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>FFC GameFi</h1>
                                < p > GameFi is based on FFC ecology.It will be a Web3 football game that combines sports, social, and metaverse attributes.In this game, the NFT issued by FFC will serve as a ticket to participate in GameFi.FFC Token acts as the fuel in the game process and realizes the continuous deflation of FFC Token with the help of consumption in the game process. < /p>
                            </span>
                        </li>
                    </ul>
                </section>
                <section className={styles.the_best}>
                    <h1>FFC Football Ambassador</h1>
                    <ul>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>Gianluigi Donnarumma</h1>
                            <p>2022 Qatar World Cup Italy national team members</p>
                            <p>Former Paris Saint-Germain goalkeeper</p>
                            <p>2021 Yassin Prize Winners</p>
                        </li>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>Achraf Hakimi</h1>
                            <p>Paris Saint-Germain's primary defender</p>
                            <p>2018 FIFA World Cup with Real Madrid</p>
                        </li>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>Marco Verratti</h1>
                            <p>2022 Qatar World Cup Italy national team members</p>
                            <p>Eight-time Ligue 1 trophy winner</p>
                            <p>2021 European Championship with the Italian team</p>
                        </li>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>Lucas Hernández</h1>
                            <p>2022 Qatar World France National Team Member</p>
                            <p>2018 Europa League title with Atlético de Madrid</p>
                            <p>2019 won the Bayern Munich three-peat</p>
                        </li>
                    </ul>
                </section>
                <section className={styles.plan}>
                    <div className={styles.title}></div>
                    <ul className={styles.content}>
                        <li>
                            <div className={styles.nft}></div>
                            <div className={styles.description}>
                                <h1></h1>
                                <p>FFC依托整个法甲联盟发行，通过不断签约俱乐部和明星，进行正向反馈，实现整个法甲联盟的融合。未来将会发行以各球星和俱乐部为主的NFT以及足球周边NFT。</p>
                                <ul>
                                    <li>1. 访问专属俱乐部，与球星在元宇宙中进行互动。</li>
                                    <li>2. 获得参与FFC生态中Gamefi的权限赢取代币奖励。</li>
                                    <li>3. 融合手中的NFT，有机会获取限定款NFT。</li>
                                </ul>
                            </div>
                            <i></i>
                        </li>
                        <li>
                            <div className={styles.nft}></div>
                            <div className={styles.description}>
                                <h1></h1>
                                <p>将会是一款结合社交和元宇宙的Web3  足球。</p>
                                <p>NFT将会是参与Gamefi的门票</p>
                                <p>FFC将会是游戏过程中的燃料，将会不断消耗FFC，实现通缩。</p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section className={styles.roadmap}>
                    <div className={styles.title}>ROADMAP</div>
                    <div className={styles.content}>
                        <i className={styles.content_start}></i>
                        <i className={styles.content_line}></i>
                        <i className={styles.content_end}></i>
                        <ul>
                            <li>
                                <h1>Febuary 2022</h1>
                                <h2>Start officially</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>October 2022</h1>
                                <h2>Reveal some clubs and players we signed</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>November 2022</h1>
                                <h2>List FFC on top exchanges</h2>
                                <h2>List star NFT</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>December 2022</h1>
                                <h2>Reveal more clubs and players we signed</h2>
                                <h2>Launch GameFi</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>Q1 2023</h1>
                                <h2>Launch testnet</h2>
                                <h2>Launch NFT trading platform</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>Q2 2023</h1>
                                <h2>Co-brand with internationally renowned sports brands</h2>
                                <h2>Reveal details of cooperation with well-known VR manufacturers </h2>
                                <h2>Launch Football Metaverse</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>Q3 2023</h1>
                                <h2>Launch mainnet</h2>
                                <i></i>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className={styles.our_partner}>
                    <div className={styles.title}>OUR PARTNER</div>
                    <ul className={styles.partners}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className={styles.team}></div>
                </section>
            </main>
        </HeaderFooter>
    )
}

export const getStaticProps = async ({
    locale
}) => ({
    props: {
        ...await serverSideTranslations(locale, ['common']),
    },
})

export default withRouter(Home)
