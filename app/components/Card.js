"use client"

import React, { useEffect, useState, useCallback } from 'react'
import web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { loadContract } from '@/utils/load-contracts'
import Link from 'next/link'
export default function Card() {
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isProviderLoaded: false
    })
    const [account, setAccount] = useState(null)
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(false)
    const canConnectToContract = account && web3Api.contract
    const reloadEffect = useCallback(() => setLoading(!loading), [loading])

    // const enableEthereum = async () => {
    //     const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    //     console.log(accounts);
    // }
    const setAccountListener = (provider) => {
        provider.on("accountsChanged", _ => window.location.reload())
        provider.on("chainChanged", _ => window.location.reload())

        // provider._jsonRpcConnection.events.on("notification", (payload) => {
        //     const { method } = payload
        //     if (method === "metamask_unlockStateChanged") {
        //         setAccount(null)
        //     }
        // })
    }

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider();
            if (provider) {
                const contract = await loadContract("Faucet", provider)
                setAccountListener(provider)
                setWeb3Api({
                    web3: new web3(provider),
                    provider: provider,
                    contract,
                    isProviderLoaded: true
                })
            } else {
                // setWeb3Api({
                //     ...web3Api,
                //     isProviderLoaded: true
                // })
                setWeb3Api((web3Apicurrent) => ({
                    ...web3Apicurrent,
                    isProviderLoaded: true
                }))
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
    useEffect(() => {
        const loadBalance = async () => {
            const { contract, web3 } = web3Api
            const ballance = await web3.eth.getBalance(contract.address)

            setBalance(web3.utils.fromWei(ballance, "ether"))
            console.log(ballance);
            console.log(web3.utils.fromWei(ballance, "ether"));
        }
        web3Api.contract && loadBalance()
    }, [web3Api, loading])

    const addFunds = useCallback(async () => {
        const { contract, web3 } = web3Api
        await contract.addFunds({
            from: account,
            value: web3.utils.toWei("1", "ether")
        })
        // window.location.reload()
        reloadEffect()
    }, [web3Api, account, reloadEffect])

    const withdrawFunds = async () => {
        const { contract, web3 } = web3Api
        const withdrawAmount = web3.utils.toWei("0.1", "ether")
        await contract.withdraw(withdrawAmount, {
            from: account,
        })
        reloadEffect()
    }

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
                    {
                        web3Api.isProviderLoaded ?
                            <div className='row justify-content-center my-4 gap-1'>
                                <div className='h3 col-5'>Account</div>
                                {
                                    account ?
                                        <p className='text-primary col-12'>{account}</p> :
                                        !web3Api.provider ?
                                            <>
                                                <p className='text-error col-12'>Wallet is not detected!
                                                    <Link target='_blank' rel='noreferrer' className='col-3 btn btn-dark ms-5' href={'https://docs.metamask.io'}>
                                                        Install Metamask
                                                    </Link>
                                                </p> :

                                            </> :
                                            <button onClick={connectWallet} className='col-2 border-0 btn fs-4 btn-primary text-white py-1 rounded shadow-sm'>Connect</button>
                                }
                            </div>
                            :
                            <p className='col-12 fs-1 text-secondart'>Looking for web3...</p>
                    }
                    <h2 className='text-center h2 my-4'>Current Balance : <span className='fs-2 fw-normal'>{balance} ETH</span></h2>
                    {
                        !canConnectToContract && <i className='text-primary fs-3'>Connect to Ganache Network</i>
                    }
                    <div className='row justify-content-center gap-4'>
                        <div className='row justify-content-center gap-4'>
                            <button
                                disabled={!canConnectToContract}
                                onClick={addFunds}
                                className='col-9 col-lg-4 border-0 btn fs-4 btn-primary text-white py-2 rounded-pill shadow-sm'>Donate 1 eth</button>
                            <button
                                disabled={!canConnectToContract}
                                onClick={withdrawFunds}
                                className='col-9 col-lg-4  border-0 btn fs-4 btn-primary text-white py-2 rounded-pill shadow-sm'>Withdraw 0.1 eth</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
