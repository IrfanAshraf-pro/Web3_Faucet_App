"use client"

import React, { useEffect, useState } from 'react'
import web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

export default function Card() {
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null
    })
    const [account, setAccount] = useState(null)

    // const enableEthereum = async () => {
    //     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    //     console.log(accounts);
    // }

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                setWeb3Api({
                    web3: new web3(provider),
                    provider: provider
                })
            } else {
                console.error("Please install metamask")
            }
            // if (window.ethereum) {
            //     provider = window.ethereum
            //     try {
            //         await provider.request({ method: 'eth_requestAccounts' })
            //     } catch (error) {
            //         console.error("User Denied Account Access")
            //     }
            // } else if (window.web3) {
            //     provider = window.web3.currentProvider
            // } else if (!process.env.production) {
            //     provider = new web3.providers.HttpProvider('http://localhost:7545')
            // }

        }
        loadProvider()
    }, [])

    const connectWallet = async () => {
        web3Api.provider.request({ method: "eth_requestAccounts" })
    }
    useEffect(() => {
        const getAccounts = async () => {
            const accounts = await web3Api.web3.eth.getAccounts()
            setAccount(accounts[0])
        }
        web3Api.web3 && getAccounts()
    }, [web3Api.web3])
    return (
        <div className='bg-light py-3'>
            <div className="container-lg">
                <div className='mt-5 text-center'>
                    <div className='row justify-content-center my-4'>
                        <div className='h3 col-5'>Account</div>
                        <button onClick={connectWallet} className='col-2 border-0 btn fs-4 btn-primary text-white py-1 rounded shadow-sm'>Connect</button>
                    </div>
                    <p className='text-primary'>{account ? account : "Not Connected"}</p>
                    <h2 className='text-center h2 my-4'>Current Balance : <span className='fs-2 fw-normal'>{10} ETH</span></h2>
                    <div className='row justify-content-center gap-4'>
                        <div className='row justify-content-center gap-4'>
                            <button className='col-9 col-lg-4 border-0 btn fs-4 btn-primary text-white py-2 rounded-pill shadow-sm'>Donate</button>
                            <button className='col-9 col-lg-4  border-0 btn fs-4 btn-primary text-white py-2 rounded-pill shadow-sm'>Withdraw</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
