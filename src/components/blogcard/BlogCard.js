import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/router'

export default function BlogCard({blog}) {
    const { title, createdAtTimestamp, postContent, coverImage, contentHash } = blog
    let timeToRead = Math.ceil((postContent.split(' ').length) / 250);
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(createdAtTimestamp * 1000)
    const ipfsURI = 'https://ipfs.io/ipfs/'
    let cardImage = `${ipfsURI}/${coverImage}`
    let synopsis = postContent.split(' ').slice(0,10).join(' ')
    const mdScreenSize = useMediaQuery('(min-width:900px)');
    const router = useRouter()
    async function navigate() {
      router.push(`/post/${contentHash}`)
    }
    return (
    <Card sx={{display: 'flex', alignItems:'stretch'}}>
        <CardContent >
            <CardMedia 
                    component='img'
                    image={coverImage ? cardImage : '/placeholder-image.png'}
                />

                <Typography variant='h5' component='div'>
                    {title}
                </Typography>
                {mdScreenSize &&
                    <Typography variant='body1' component='div'>
                        <ReactMarkdown>{synopsis}</ReactMarkdown>
                    </Typography>
                }  
                <Typography variant="body2" color="text.secondary">
                {timeToRead} min read - {date} 
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => navigate()}>Read More</Button>
            </CardActions>
    </Card>
  )
}

