import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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

export default function Home(pageProps) {
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState();
  const [currentTag, setCurrentTag] = useState('All');
  const tagMap = new Map();

  useEffect(() => {
    fetchData()
  }, [currentTag])

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

  const account = useContext(AccountContext)

  const router = useRouter()

  const mdScreenSize = useMediaQuery('(min-width:900px)');
  return (
      <div>
        <Header pageProps={pageProps} />
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
                (content.map((blog) => {
                  return <Grid item md={4} key={blog.id} sx={{display:'flex', justifyContent:'flex-grow'}}> 
                      <BlogCard blog={blog} key={blog.id} /> 
                  </Grid>
                })) :
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
