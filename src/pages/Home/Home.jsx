import React from 'react'

import Container from '../../components/Shared/Container'
import PendingRequest from './pendingRequest/PendingRequest'
import BannerComonent from '../../components/Home/BannerComonent'
import FAQ from '../../components/Home/Faq/FAQ'
import ContactUs from '../../components/Home/ContactUs/ContactUs'
const Home = () => {
  return (
    <div>
 <Container fluid className="p-0">
 <BannerComonent></BannerComonent>
  <PendingRequest></PendingRequest>
  <ContactUs></ContactUs>
  <FAQ></FAQ>
</Container>



   
    </div>
  )
}

export default Home
