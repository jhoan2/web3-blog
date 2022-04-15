import ReactMarkdown from 'react-markdown'
import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AccountContext } from '../../context'
import Header from '../../src/components/header/Header'
import Footer from '../../src/components/Footer'
import { createClient } from 'urql'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ownerAddress } from '../../config'
import Button from '@mui/material/Button';
import Loading from '../../src/components/Loading';

const ipfsURI = 'https://ipfs.io/ipfs/'
export default function Post(pageProps) {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);
  const account = useContext(AccountContext)
  const router = useRouter()
  const { id } = router.query
  let cardImage
  if (post !== undefined) {
    cardImage = `${ipfsURI}/${post.coverImage}`
  }
  const APIURL = 'https://api.thegraph.com/subgraphs/name/jhoan2/web3-blog-personal'
  const query =  `
    query {
      posts(where:{ contentHash: "${id}"}) {
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

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    setLoading(true);
    const response = await client.query(query).toPromise()
    setPost(response.data.posts[0])
    setLoading(false);
    return 
  }
  async function navigate() {
    router.push(`/edit-post/${id}`)
  }

  if (router.isFallback) {
    return <Loading />
  }

  return (
    <div>
      <Header pageProps={pageProps}/>
      {loading ? 
        <Loading /> :
        (
          <div>
            <Box sx={{padding: '25px 0px'}}>
              <Card>
                <CardMedia 
                    component='img'
                    image={post ? cardImage : '/placeholder-image.png'}
                />
              </Card>
            </Box>
      
            <Typography variant='h4' component='div'>
              {post && (post.title)}
            </Typography>
            <Typography variant='body1' component='div'>
              <ReactMarkdown>
                {post && (post.postContent)}
              </ReactMarkdown>
            </Typography>
            {ownerAddress === account && (
              <Button size="medium" onClick={() => navigate()}>Edit Post</Button>
            )}
          </div>
        )
      }
      <Footer />
    </div>
  )
}