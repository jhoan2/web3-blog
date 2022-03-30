import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Link from 'next/link'
import { createClient } from 'urql'
import { AccountContext } from '../context'
import Grid from '@mui/material/Grid';
import Header from '../src/components/header/Header'
import Banner from '../src/components/banner/Banner'
import TagButton from '../src/components/tags/TagButton'
import BlogCard from '../src/components/BlogCard'

/* import contract address and contract owner address */
import {
  contractAddress, ownerAddress
} from '../config'

/* import Application Binary Interface (ABI) */
import Blog from '../artifacts/contracts/Blog.sol/Blog.json'

const APIURL = 'https://api.thegraph.com/subgraphs/name/jhoan2/web3-blog-personal'
const query =  `
  query {
    posts(first: 5) {
      id
      title
      contentHash
      published
      postTag
      postContent
      createdAtTimestamp
      updatedAtTimestamp
    }
  }
`

const client = createClient({
  url: APIURL
})

export default function Home() {
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState();
  const tagMap = new Map();

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const response = await client.query(query).toPromise()
    getTags(response.data)
    console.log(response.data)
    setContent(response.data.posts)
    return 
  }

  const getTags = ({posts}) => {
    let tagArr = [];
    for (let i = 0; i < posts.length; i++) {
      let postTag = posts[i].postTag.split(' ');
      for (let j = 0; j < postTag.length; j++) {
        //hash map to make sure tags are unique
        if (!(tagMap.has(postTag[j]))) {
          tagMap.set(postTag[j], tagMap.size + 1)
          tagArr.push(postTag[j])
        }
      }
    }
    setTags(tagArr)
    return tagMap
  }
  
  const account = useContext(AccountContext)

  const router = useRouter()
  async function navigate() {
    router.push('/create-post')
  }
  
  return (
      <div>
        <Header />
        <Banner />
        {tags.map((tag, index) => {
          return <TagButton props={tag} key={index} />
        })}
        <Grid container>
          {content.map((blog) => {
            return <Grid item><BlogCard blog={blog} key={blog.id}/></Grid>
          })}
        </Grid>
        
          {
            (account === ownerAddress) && posts && !posts.length && (
              /* if the signed in user is the account owner, render a button */
              /* to create the first post */
              <button className={buttonStyle} onClick={navigate}>
                Create your first post
                <img
                  src='/right-arrow.svg'
                  alt='Right arrow'
                  className={arrow}
                />
              </button>
            )
          }
      </div>
  )
}

