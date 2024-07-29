import React from 'react'
import TopBar from '../components/TopBar'
import NavBar from '../components/NavBar'
import Carousel from '../components/Carousel'
import Featured from '../components/Featured'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Offer from '../components/Offer'

export default function main() {
  return (
    <>
    <TopBar/>
    <NavBar/>
    <Carousel/>
    <Featured/>
    <Categories/>
    <Products/>
    <Offer/>
    </>
  )
}
