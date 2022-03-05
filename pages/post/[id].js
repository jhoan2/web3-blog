import ReactMarkdown from 'react-markdown'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { AccountContext } from '../../context'

/* import contract and owner addresses */
import {
  contractAddress, ownerAddress, nftContractAddress
} from '../../config'
import Blog from '../../artifacts/contracts/Blog.sol/Blog.json'
import NFTMinter from '../../artifacts/contracts/NFTMinter.sol/NFTMinter.json'

const ipfsURI = 'https://ipfs.io/ipfs/'
export default function Post({ post }) {
  const account = useContext(AccountContext)
  const router = useRouter()
  const { id } = router.query
  
  
  const metadataURI = post.metadataURI.replace(/^ipfs:\/\//, "");

  const mintToken = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(nftContractAddress, NFTMinter.abi, signer);
        const result = await nftContract.safeMint(account, metadataURI);
        await result.wait();
      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${metadataURI}`);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {
        post && (
          <div className={container}>
            {
              /* if the owner is the user, render an edit button */
              ownerAddress === account && (
                <div className={editPost}>
                  <Link href={`/edit-post/${id}`}>
                    <a>
                      Edit post
                    </a>
                  </Link>
                </div>
              )
            }
            <button onClick={() => mintToken()}>Mint</button>
            {
              /* if the post has a cover image, render it */
              post.coverImage && (
                <img
                  src={post.coverImage}
                  className={coverImageStyle}
                />
              )
            }
            <h1>{post.title}</h1>
            <div className={contentContainer}>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        )
      }
    </div>
  )
}

export async function getStaticPaths() {
  /* here we fetch the posts from the network */
  let provider
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  }

  const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
  const data = await contract.fetchPosts()

  /* then we map over the posts and create a params object passing */
  /* the id property to getStaticProps which will run for every post */
  /* in the array and generate a new page */
  const paths = data.map(d => ({ params: { id: d[2] } }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  /* using the id property passed in through the params object */
  /* we can us it to fetch the data from IPFS and pass the */
  /* post data into the page as props */
  const { id } = params
  const ipfsUrl = `${ipfsURI}/${id}`
  const response = await fetch(ipfsUrl)
  const data = await response.json()
  if(data.coverImage) {
    let coverImage = `${ipfsURI}/${data.coverImage}`
    data.coverImage = coverImage
  }

  return {
    props: {
      post: data
    },
  }
}

const editPost = css`
  margin: 20px 0px;
`

const coverImageStyle = css`
  width: 900px;
`

const container = css`
  width: 900px;
  margin: 0 auto;
`

const contentContainer = css`
  margin-top: 60px;
  padding: 0px 40px;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  & img {
    max-width: 900px;
  }
`