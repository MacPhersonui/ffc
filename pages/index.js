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
                        <p>FFC是法甲联赛联合法国多家俱乐部联合打造的Web3生态产品。它包含了粉丝经济、NFT球星卡、足球链游、足球元宇宙等板块。最终，FFC将构建自己的Web3足球链上世界，让用户可以更好的体验足球游戏，俱乐部能收获更多的粉丝。建立足球世界的第一个元宇宙时代。</p>
                    </div>
                    <ul className={styles.list}>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>FFC TOKEN</h1>
                                <p>FFC是法甲联赛联合法国多家俱乐部联合打造的Web3生态产品。它包含了粉丝经济、NFT球星卡、足球链游、足球元宇宙等板块。最终，FFC将构建自己的</p>
                            </span>
                        </li>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>FFC TOKEN</h1>
                                <p>FFC是法甲联赛联合法国多家俱乐部联合打造的Web3生态产品。它包含了粉丝经济、NFT球星卡、足球链游、足球元宇宙等板块。最终，FFC将构建自己的</p>
                            </span>
                        </li>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>FFC TOKEN</h1>
                                <p>FFC是法甲联赛联合法国多家俱乐部联合打造的Web3生态产品。它包含了粉丝经济、NFT球星卡、足球链游、足球元宇宙等板块。最终，FFC将构建自己的</p>
                            </span>
                        </li>
                    </ul>
                </section>
                <section className={styles.the_best}>
                    <h1>FFC足球大使</h1>
                    <ul>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>Gianluigi Donnarumma</h1>
                            <p>吉安路易吉·多纳鲁马</p>
                        </li>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>Gianluigi Donnarumma</h1>
                            <p>吉安路易吉·多纳鲁马</p>
                        </li>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>Gianluigi Donnarumma</h1>
                            <p>吉安路易吉·多纳鲁马</p>
                        </li>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>Gianluigi Donnarumma</h1>
                            <p>吉安路易吉·多纳鲁马</p>
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
                                <h2>22年2月 正式启动</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>2023 Q1</h1>
                                <h2>测试网上线</h2>
                                <h2>NFT交易平台上线</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>October 2022</h1>
                                <h2>部分签约俱乐部、球员披露</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>2023 Q2</h1>
                                <h2>与知名体育品牌联名</h2>
                                <h2>与知名VR厂商合作细节披露</h2>
                                <h2>足球元宇宙上线</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>November 2022</h1>
                                <h2>FFC上线头部交易所</h2>
                                <h2>球星NFT上线</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>2023 Q3</h1>
                                <h2>主网上线</h2>
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
