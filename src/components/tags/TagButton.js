import React from 'react'
import Button from '@mui/material/Button';

export default function tagButton({tag, setCurrentTag}) {

  return (
    <Button variant='contained' onClick={() => setCurrentTag(tag)} sx={{ borderRadius: 8, margin: 0.5 }}>{tag}</Button>    
  )
}
