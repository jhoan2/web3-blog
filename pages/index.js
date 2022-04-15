import { useState, useEffect } from 'react'
import { createClient } from 'urql'
import Grid from '@mui/material/Grid';
import Header from '../src/components/header/Header'
import Banner from '../src/components/banner/Banner'
import TagButton from '../src/components/tags/TagButton'
import BlogCard from '../src/components/blogcard/BlogCard'
import TopBlogCard from '../src/components/blogcard/TopBlogCard'
import Footer from '../src/components/Footer'
import Masonry from '@mui/lab/Masonry';
import useMediaQuery from '@mui/material/useMediaQuery';
import Loading from '../src/components/Loading'
import Pagination from '@mui/material/Pagination';

export default function Home(pageProps) {
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState([]);
  const [currentTag, setCurrentTag] = useState('All');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const tagMap = new Map();
  let amountPerPage = page * 10;
  let mdScreenSizeContent = content.slice((amountPerPage - 10 + 1), (amountPerPage + 1));
  let totalPages = Math.ceil(content.length / 10);

  const APIURL = 'https://api.thegraph.com/subgraphs/name/jhoan2/web3-blog-personal'
  const query =  `
    query {
      posts(first: 200, where:{postTag_contains: "${currentTag}"}, orderBy: createdAtTimestamp, orderDirection:desc) {
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

  const mdScreenSize = useMediaQuery('(min-width:900px)');


  useEffect(() => {
    fetchTags();
  }, [])

  useEffect(() => {
    fetchData();
  }, [currentTag])

  async function fetchTags() {
    const response = await client.query(query).toPromise()
    getTags(response.data)
    return 
  }

  async function fetchData() {
    setLoading(true);
    const response = await client.query(query).toPromise()
    setContent(response.data.posts)
    setLoading(false);
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

  const handlePageChange = (event) => {
    let number = parseInt(event)
    setPage(number)
  }



  return (
      <div>
        <Header pageProps={pageProps} />
        <Banner />
        {tags.map((tag, index) => {
          return <TagButton tag={tag} key={index} setCurrentTag={setCurrentTag} />
        })}
        { loading ? 
          <Loading /> :
          (mdScreenSize ? 
            (
              <Grid container spacing={2}sx={{marginTop: '15px'}} >
                <Grid item md={12}>
                  <TopBlogCard blog={content[0]} />
                </Grid>
                {mdScreenSizeContent ? 
                  (mdScreenSizeContent.map((blog) => {
                    return <Grid item md={4} lg={3} key={blog.id} sx={{display:'flex', justifyContent:'flex-grow'}}> 
                        <BlogCard blog={blog} key={blog.id} /> 
                    </Grid>
                  })) :
                  <Loading /> 
                }
              </Grid>
            )
            :
            (<Masonry columns={{xs: 1, sm: 2}} spacing={2} sx={{marginTop: '15px'}}>
            {content ? 
              (content.map((blog) => {return <BlogCard blog={blog} key={blog.id} />})) :
              <Loading />
            }
            </Masonry>)
          )}
          {content && (
            <Pagination 
              count={totalPages} 
              onChange={(e) => handlePageChange(e.target.innerText)}
              color='primary' 
              sx={{paddingTop: '25px', display:'flex', justifyContent:'center'}}
              page={page}
          />)}
          
          <Footer />
      </div>
  )
}
