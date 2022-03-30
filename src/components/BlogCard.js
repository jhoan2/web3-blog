import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function BlogCard({blog}) {
    const { title, createdAtTimestamp, postContent } = blog
    let timeToRead = Math.ceil(postContent.split(' ').length / 250);
    
  return (
    <Card>
        <CardActionArea>
            <CardMedia 
                component='img'
                height='140'
                image='/placeholder-image.png'
            />
            <CardContent>
                <Typography variant='h5' component='div'>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {createdAtTimestamp} - {timeToRead} min read
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}
