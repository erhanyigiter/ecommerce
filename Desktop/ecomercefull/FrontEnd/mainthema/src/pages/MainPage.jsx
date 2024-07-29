import React from 'react'
import TopBar from '../components/TopBar'
import NavBar from '../components/NavBar'
import Carousel from '../components/Carousel'
import Featured from '../components/Featured'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Offer from '../components/Offer'
import Vendor from '../components/Vendor'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'

export default function main() {
  return (
    <>

    <Carousel/>
    <Featured/>
    <Categories/>
    <Products/>
    <Offer/>
    <Vendor/>

    </>
  )
}
