import { useState } from 'react'
import '../styles/globals.css'
import { css } from '@emotion/css'
import 'easymde/dist/easymde.min.css'
import PageProvider from "../src/PageProvider";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from "next-themes";
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'

function MyApp({ Component, pageProps }) {
 /* create local state to save account information after signin */
 const [account, setAccount] = useState(null)
  
 /* web3Modal configuration for enabling wallet access */
 async function getWeb3Modal() {
   const web3Modal = new Web3Modal({
     network: 'mainnet',
     cacheProvider: false,
     providerOptions: {
       walletconnect: {
         package: WalletConnectProvider,
         options: { 
           infuraId: process.env.NEXT_PUBLIC_INFURA_ID
         },
       },
     },
   })
   return web3Modal
 }

 /* the connect function uses web3 modal to connect to the user's wallet */
 async function connect() {
   try {
     const web3Modal = await getWeb3Modal()
     web3Modal.clearCachedProvider()
     const connection = await web3Modal.connect()
     const provider = new ethers.providers.Web3Provider(connection)
     const accounts = await provider.listAccounts()
     setAccount(accounts[0])
   } catch (err) {
     console.log('error:', err)
   }
 }
  return (
    <div>
      <div className={container}>
        <ThemeProvider>
          <PageProvider>
            <GlobalStyles
                styles={css`
                  :root {
                    body {
                      background-color: #fff;
                      color: #121212;
                    }
                  }
    [data-theme="dark"] {
                    body {
                      background-color: #121212;
                      color: #fff;
                    }
                  }
                `}
              />
              <AccountContext.Provider value={account}>
                <Component {...pageProps} connect={connect} />
              </AccountContext.Provider>

          </PageProvider>
        </ThemeProvider>
      </div>
    </div>
  )
}

const container = css`
  padding: 40px;
`

export default MyApp