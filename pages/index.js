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
import BlogCard from '../src/components/blogcard/BlogCard'
import TopBlogCard from '../src/components/blogcard/TopBlogCard'
import Footer from '../src/components/Footer'
import Masonry from '@mui/lab/Masonry';
import useMediaQuery from '@mui/material/useMediaQuery';

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
      coverImage
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
  const mdScreenSize = useMediaQuery('(min-width:900px)');
  return (
      <div>
        <Header />
        <Banner />
        {tags.map((tag, index) => {
          return <TagButton props={tag} key={index} />
        })}
        {mdScreenSize ? 
          (
            <Grid container spacing={2}sx={{marginTop: '15px'}} >
              <Grid item md={12}>
                <TopBlogCard />
              </Grid>
              {content ? 
                (content.map((blog) => {return <Grid item md={4} sx={{display:'flex', justifyContent:'flex-grow'}}> <BlogCard blog={blog} key={blog.id} /> </Grid>})) :
                <h2>Needs Loading Page</h2>
              }
            </Grid>
          )
           :
           (<Masonry columns={{xs: 2}} spacing={2} sx={{marginTop: '15px'}}>
           {content ? 
             (content.map((blog) => {return <BlogCard blog={blog} key={blog.id} />})) :
             <h2>Needs Loading Page</h2>
           }
           </Masonry>)
        }

          <Footer />
      </div>


  )
}
          {/* {
            (account === ownerAddress) && posts && !posts.length && (
              <button className={buttonStyle} onClick={navigate}>
                Create your first post
                <img
                  src='/right-arrow.svg'
                  alt='Right arrow'
                  className={arrow}
                />
              </button>
            )
          } */}