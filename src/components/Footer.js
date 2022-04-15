import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
const copyRight = () => {
    const date = new Date();
    let year = date.getFullYear()
    return year
  }

export default function Footer() {

    const year = copyRight();
    
    return (
    <div style={{display: 'flex', justifyContent:'end'}}>
        <p>
            Copyright © jhoangeth {year}
        </p>
        <IconButton aria-label="twitter-handle" href='https://twitter.com/jhoangeth'>
          <TwitterIcon />
        </IconButton>
    </div>
  )
}
