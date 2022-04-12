import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Link from 'next/link'

export default function TopBlogCard() {
  return (
    <Card >
        <CardActionArea sx={{display: 'flex'}}>
        
            <Box sx={{ width:'50%'}}>
                <CardMedia component='img' image= '/placeholder-image.png' height='250px' />
                
            </Box>
            <Box sx={{display: 'flex', alignItems:'center', width: '50%'}}>
                <CardContent>
                    <Typography component="div" variant="h5">
                        Live From Space Live From Space 
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Mac Miller Live From SpaceLive From SpaceLive From SpaceLive From SpaceLive From SpaceLive From SpaceLive From Space
                    </Typography>
                </CardContent>
            </Box>
        </CardActionArea>
    </Card>
  )
}


