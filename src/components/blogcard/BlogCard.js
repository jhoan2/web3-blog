import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function BlogCard({blog}) {
    const { title, createdAtTimestamp, postContent, coverImage } = blog
    let timeToRead = Math.ceil((postContent.split(' ').length) / 250);
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(createdAtTimestamp * 1000)
    const ipfsURI = 'https://ipfs.io/ipfs/'
    let cardImage = `${ipfsURI}/${coverImage}`

    return (
    <Card >
        <CardActionArea>
            <CardMedia 
                    component='img'
                    image={coverImage ? cardImage : '/placeholder-image.png'}
                />
                <CardContent >
                    <Typography variant='h5' component='div'>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {timeToRead} min read - {date} 
                    </Typography>
                </CardContent>
        </CardActionArea>
    </Card>
  )
}
