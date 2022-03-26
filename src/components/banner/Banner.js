import React from 'react'
import { css } from '@emotion/css'

export default function Banner() {
  return (
      <div>
        <h1 className={bannerTitle}>jhoangeth</h1>
        <h2 className={bannerSubtitle}>Blog</h2>
      </div>
  )
}

const bannerTitle = css`
  text-align: center;
  padding-top: 50px;  
  background-color: #f32c03;
  background-image: linear-gradient(45deg, #f32c03, #9147FF);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
  font-size: 40px;
`

const bannerSubtitle = css`
    text-align: center;
    font-size: 20px;
    color: rgb(220, 220, 220);
`