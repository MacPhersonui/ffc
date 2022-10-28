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
                    <div className={styles.player_left}>
                    </div>
                    <div className={styles.player_left_shadow1}></div>
                    <div className={styles.player_left_shadow2}></div>
                    <div className={styles.player_right}></div>
                    <div className={styles.player_right_shadow1}></div>
                    <div className={styles.player_right_shadow2}></div>
                    <div className={styles.solgen_bottom_bg}></div>
                    <div className={styles.solgen_title}>
                        <p>{t('ffc')}</p>
                        <p>{t('to_web3')}</p>
                    </div>
                    <div className={styles.solgen_subtitle}>
                        <p>{t('build_the_first_league')}</p>
                        <p>{t('in_the_web3_world')}</p>
                    </div>
                    <div className={styles.solgen_logo}></div>
                    <div className={styles.solgen_token1}></div>
                    <div className={styles.solgen_token2}></div>
                </section>
                <section id="ffc" className={styles.what_is_ffc}>
                    <div className={styles.title}>
                        <h1>{t('what_is_ffc')}</h1>
                        <h2>{t('what_is_ffc')}</h2>
                        <p>{t('what_is_ffc_content')}</p>
                    </div>
                    <ul className={styles.list}>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>{t('ffc_token')}</h1>
                                <p>{t('ffc_token_content')}</p>
                            </span>
                        </li>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>{t('ffc_nft')}</h1>
                                <p>{t('ffc_nft_content')}</p>
                            </span>
                        </li>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>{t('ffc_gamefi')}</h1>
                                <p>{t('ffc_gamefi_content')} </p>
                            </span>
                        </li>
                    </ul>
                </section>
                <section className={styles.the_best}>
                    <h1>{t('ffc_football_ambassador')}</h1>
                    <ul>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>{t("gianluigi_donnarumma")}</h1>
                            <p>{t("gianluigi_donnarumma_content1")}</p>
                            <p>{t("gianluigi_donnarumma_content2")}</p>
                            <p>{t("gianluigi_donnarumma_content3")}</p>
                        </li>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>{t("achraf_hakimi")}</h1>
                            <p>{t("achraf_hakimi_content1")}</p>
                            <p>{t("achraf_hakimi_content2")}</p>
                        </li>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>{t("marco_verratti")}</h1>
                            <p>{t('marco_verratti_content1')}</p>
                            <p>{t('marco_verratti_content2')}</p>
                            <p>{t('marco_verratti_content3')}</p>
                        </li>
                        <li>
                            <span className={styles.cover}></span>
                            <h1>{t('lucas_hernández')}</h1>
                            <p>{t('lucas_hernández_content1')}</p>
                            <p>{t('lucas_hernández_content2')}</p>
                            <p>{t('lucas_hernández_content3')}</p>
                        </li>
                    </ul>
                </section>
                <section  id="nft"  className={styles.plan}>
                    <div className={styles.title}></div>
                    <ul className={styles.content}>
                        <li>
                            <div className={styles.nft}></div>
                            <div className={styles.description}>
                                <h1></h1>
                                <p>{t('nft_content')}</p>
                                <ul>
                                    <li>{t('nft_content1')}</li>
                                    <li>{t('nft_content2')}</li>
                                    <li>{t('nft_content3')}</li>
                                </ul>
                            </div>
                            <i></i>
                        </li>
                        <li>
                            <div className={styles.nft}></div>
                            <div className={styles.description}>
                                <h1></h1>
                                <p>{t('gamefi_content1')} </p>
                                <p>{t('gamefi_content2')}</p>
                                <p>{t('gamefi_content3')}</p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section id="roadmap" className={styles.roadmap}>
                    <div className={styles.title}>{t('roadmap')}</div>
                    <div className={styles.content}>
                        <i className={styles.content_start}></i>
                        <i className={styles.content_line}></i>
                        <i className={styles.content_end}></i>
                        <ul>
                            <li>
                                <h1>{t('roadmap_time1')}</h1>
                                <h2>{t('roadmap_time1_content1')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time2')}</h1>
                                <h2>{t('roadmap_time2_content1')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time3')}</h1>
                                <h2>{t('roadmap_time3_content1')}</h2>
                                <h2>{t('roadmap_time3_content2')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time4')}</h1>
                                <h2>{t('roadmap_time4_content1')}</h2>
                                <h2>{t('roadmap_time4_content2')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time5')}</h1>
                                <h2>{t('roadmap_time5_content1')}</h2>
                                <h2>{t('roadmap_time5_content2')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time6')}</h1>
                                <h2>{t('roadmap_time6_content1')}</h2>
                                <h2>{t('roadmap_time6_content2')}</h2>
                                <h2>{t('roadmap_time6_content3')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time7')}</h1>
                                <h2>{t('roadmap_time7_content1')}</h2>
                                <i></i>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className={styles.our_partner}>
                    <div className={styles.title}>{t('our_partner')}</div>
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
