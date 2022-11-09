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
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import {
    Navigation,
    Pagination,
    Keyboard,
    FreeMode,
    Thumbs,
    Autoplay
} from "swiper"
import 'animate.css'
import ReactFullpage from '@fullpage/react-fullpage'
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
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

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
            // console.log("roadmap", document.getElementById("roadmap").getBoundingClientRect().top)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            clearInterval(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [account])

    const afterLoad = (origin, destination, direction, trigger) => {
        console.log("afterLoad", origin, destination, direction, trigger)
        console.log(origin.index)
        if (origin.index == 0) {
            document.getElementById("solgen_logo").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast")
            document.getElementById("solgen_title").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-1s")
            document.getElementById("solgen_subtitle").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-2s")
            document.getElementById("solgen_team").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-3s")
            document.getElementById("solgen_video").classList.add("animate__animated", "animate__fadeInRight", "animate__fast")
        }
    }


    return (
        <HeaderFooter activeIndex={1}>
            <ToastContainer />
            <video className={styles.bg_video} autoPlay={true} loop={true} muted={true} poster="" >
                <source src="/home/bg_video.mp4" type="video/mp4" />
            </video>
            <main className={styles.container}>
                <ReactFullpage
                    //fullpage options
                    licenseKey={'YOUR_KEY_HERE'}
                    scrollingSpeed={1000} /* Options here */
                    afterLoad={afterLoad}
                    render={({ state, fullpageApi }) => {
                        return (
                            <ReactFullpage.Wrapper>
                                <div className={styles.solgen + " section"}>
                                    <div className={styles.solgen_content}>
                                        <i>Build the first league in the Web3 world Build the first league in the Web3 world Build the first league in the Web3 world</i>
                                        <div className={styles.text}>
                                            <div id="solgen_logo" className={styles.solgen_logo}></div>
                                            <h1 id="solgen_title">
                                                <p>THE FRANCE LEAGUE</p>
                                                <p>FOOTBALL CLUB</p>
                                            </h1>
                                            <h2 id="solgen_subtitle">Build the first league in the Web3 world</h2>
                                        </div>
                                        <div id="solgen_team" className={styles.team}>
                                            <Swiper
                                                slidesPerView={7}
                                                spaceBetween={10}
                                                pagination={{
                                                    clickable: true,
                                                }}
                                                autoplay={
                                                    {
                                                        delay: 2500,
                                                        disableOnInteraction: false,
                                                    }
                                                }
                                                modules={[Autoplay, Pagination]}
                                                className={styles.team_swiper}
                                            >
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                                <SwiperSlide className={styles.team_list}></SwiperSlide>
                                            </Swiper>
                                            <button>More Club &gt;&gt;</button>
                                        </div>
                                    </div>
                                    <div className={styles.video}>
                                        <div id="solgen_video" className={styles.video_warpper}>
                                            <Swiper
                                                style={{
                                                    "--swiper-navigation-color": "#fff",
                                                    "--swiper-pagination-color": "#fff",
                                                }}
                                                loop={true}
                                                spaceBetween={10}
                                                thumbs={{ swiper: thumbsSwiper }}
                                                modules={[FreeMode, Navigation, Thumbs]}
                                                className="mySwiper2"
                                            >
                                                <SwiperSlide className={styles.swiper_silde}>
                                                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde}>
                                                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </SwiperSlide>
                                            </Swiper>
                                            <Swiper
                                                onSwiper={setThumbsSwiper}
                                                loop={true}
                                                spaceBetween={10}
                                                slidesPerView={4}
                                                freeMode={true}
                                                watchSlidesProgress={true}
                                                modules={[FreeMode, Navigation, Thumbs]}
                                                className="mySwiper"
                                            >
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                            </Swiper>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.what_is_ffc + " section"}>
                                    <div className={styles.title}>
                                        <i></i>
                                    </div>
                                    <div className={styles.content}>
                                        <Swiper
                                            style={{
                                                "--swiper-navigation-color": "#fff",
                                                "--swiper-pagination-color": "#fff",
                                            }}
                                            loop={true}
                                            spaceBetween={10}
                                            thumbs={{ swiper: thumbsSwiper }}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper2"
                                        >
                                            <SwiperSlide className={styles.swiper_silde}>
                                                FFC est un projet de l&apos;écosystème du football sur Web3 créé conjointement par de nombreux clubs de football de haut niveau de la Ligue française. Il s&apos;est engagé à créer un métaverse de football sur Web3 grcedes technologies émergentes telles que les jetons de fans, les NFT et les jeux de football. Il permet aux utilisateurs de mieux interagir avec les stars du football dans l&apos;écosystème et de participer aux décisions de développement des clubs de football. Activez les utilisateurs pour le club, étendez l&apos;influence de tous les membres de l&apos;écosystème de la Ligue 1 française dans le monde et connectez-vous avec les fans de football du monde entier pour créer un métaverse de football interactif.
                                            </SwiperSlide>
                                            <SwiperSlide className={styles.swiper_silde}>
                                                FFC est un projet de l&apos;écosystème du football sur Web3 créé conjointement par de nombreux clubs de football de haut niveau de la Ligue française. Il s&apos;est engagé à créer un métaverse de football sur Web3 grcedes technologies émergentes telles que les jetons de fans, les NFT et les jeux de football. Il permet aux utilisateurs de mieux interagir avec les stars du football dans l&apos;écosystème et de participer aux décisions de développement des clubs de football. Activez les utilisateurs pour le club, étendez l&apos;influence de tous les membres de l&apos;écosystème de la Ligue 1 française dans le monde et connectez-vous avec les fans de football du monde entier pour créer un métaverse de football interactif.
                                            </SwiperSlide>
                                            <SwiperSlide className={styles.swiper_silde}>
                                                FFC est un projet de l&apos;écosystème du football sur Web3 créé conjointement par de nombreux clubs de football de haut niveau de la Ligue française. Il s&apos;est engagé à créer un métaverse de football sur Web3 grcedes technologies émergentes telles que les jetons de fans, les NFT et les jeux de football. Il permet aux utilisateurs de mieux interagir avec les stars du football dans l&apos;écosystème et de participer aux décisions de développement des clubs de football. Activez les utilisateurs pour le club, étendez l&apos;influence de tous les membres de l&apos;écosystème de la Ligue 1 française dans le monde et connectez-vous avec les fans de football du monde entier pour créer un métaverse de football interactif.
                                            </SwiperSlide>
                                            <SwiperSlide className={styles.swiper_silde}>
                                                FFC est un projet de l&apos;écosystème du football sur Web3 créé conjointement par de nombreux clubs de football de haut niveau de la Ligue française. Il s&apos;est engagé à créer un métaverse de football sur Web3 grcedes technologies émergentes telles que les jetons de fans, les NFT et les jeux de football. Il permet aux utilisateurs de mieux interagir avec les stars du football dans l&apos;écosystème et de participer aux décisions de développement des clubs de football. Activez les utilisateurs pour le club, étendez l&apos;influence de tous les membres de l&apos;écosystème de la Ligue 1 française dans le monde et connectez-vous avec les fans de football du monde entier pour créer un métaverse de football interactif.
                                            </SwiperSlide>
                                        </Swiper>
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            loop={true}
                                            spaceBetween={30}
                                            slidesPerView={4}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="mySwiper"
                                        >
                                            <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                <Image src="/home/imgs.jpeg" layout='fill' />
                                                <i>What is FFC</i>
                                            </SwiperSlide>
                                            <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                <Image src="/home/imgs.jpeg" layout='fill' />
                                                <i>FFC TOKEN</i>
                                            </SwiperSlide>
                                            <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                <Image src="/home/imgs.jpeg" layout='fill' />
                                                <i>FFC NFT</i>
                                            </SwiperSlide>
                                            <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                <Image src="/home/imgs.jpeg" layout='fill' />
                                                <i>FFC GAME</i>
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </ReactFullpage.Wrapper>
                        );
                    }}
                />
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
