import React from 'react'
import Button from '@mui/material/Button';

export default function tagButton({props}) {
  return (
    <Button variant='contained' sx={{ borderRadius: 8, margin: 0.5 }}>{props}</Button>    
  )
}
