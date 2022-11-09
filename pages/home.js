import React, { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/home.module.scss"
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
import 'animate.css'

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
    const [swapCount, setSwapCount] = useState(4)

    useEffect(async () => {
        const timer = setInterval(async () => {
            if (account) {

            }
            clearInterval(timer)
        }, 3000)


        const windowWidth = document.body.clientWidth
        if (windowWidth <= 500) {
            setSwapCount(1)
        }
        const handleScroll = event => {
            console.log('window.scrollY', window.scrollY)
            console.log("roadmap", document.getElementById("roadmap").getBoundingClientRect().top)
            if (document.getElementById("ffc").getBoundingClientRect().top < 250) {
                console.log("ffc", document.getElementById("ffc").getBoundingClientRect().top)
                
                document.querySelector("#ffc_title p").classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                document.querySelector("#ffc_title h1").classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                document.querySelector("#ffc_title h2").classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                document.querySelectorAll("#ffc ul li")[0].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-1s")
                document.querySelectorAll("#ffc ul li")[1].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-2s")
                document.querySelectorAll("#ffc ul li")[2].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-3s")
            }
            if (document.getElementById("nft").getBoundingClientRect().top < 300) {
                console.log("nft", document.getElementById("nft").getBoundingClientRect().top)
                console.log(document.querySelectorAll("#nft ul li")[1])
                document.querySelectorAll("#nft>ul>li")[0].classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                document.querySelectorAll("#nft>ul>li")[1].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-1s")
            }
            if (document.getElementById("roadmap").getBoundingClientRect().top < 300) {
                console.log("roadmap", document.getElementById("roadmap").getBoundingClientRect().top)
                document.querySelectorAll("#roadmap ul li")[0].classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                document.querySelectorAll("#roadmap ul li")[1].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-1s")
                document.querySelectorAll("#roadmap ul li")[2].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-2s")
                document.querySelectorAll("#roadmap ul li")[3].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-3s")
                document.querySelectorAll("#roadmap ul li")[4].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-4s")
                document.querySelectorAll("#roadmap ul li")[5].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-5s")
                document.querySelectorAll("#roadmap ul li")[6].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-6s")
                document.querySelectorAll("#roadmap ul li")[7].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-7s")
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            clearInterval(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [account])


    return (
        <HeaderFooter activeIndex={1}>
            <ToastContainer />
            <main className={styles.container}>
                
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
