import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

export default function TopBlogCard({blog}) {
    const { id, title, coverImage, createdAtTimestamp, postContent, contentHash } = blog;
    let synopsis = postContent.split(' ').slice(0,30).join(' ')
    let timeToRead = Math.ceil((postContent.split(' ').length) / 250);
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit'}).format(createdAtTimestamp * 1000)
    const ipfsURI = 'https://ipfs.io/ipfs/'
    let cardImage = `${ipfsURI}/${coverImage}`
    const router = useRouter()
    async function navigate() {
      router.push(`/post/${contentHash}`)
    }
  return (
    <Card sx={{display: 'flex'}}>
            <Box sx={{ width:'50%'}}>
            <CardMedia 
                    component='img'
                    image={coverImage ? cardImage : '/placeholder-image.png'}
                />
                
            </Box>
            <Box sx={{display: 'flex', alignItems:'center', width: '50%'}}>
                <CardContent>
                    <Typography component="div" variant="h5">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        <ReactMarkdown>{synopsis}</ReactMarkdown>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {timeToRead} min read - {date} 
                    </Typography>
                    <Box>
                <CardActions>
                    <Button size="small" onClick={() => navigate()}>Read More</Button>
                </CardActions>
            </Box>
                </CardContent>
            </Box>


    </Card>
  )
}


