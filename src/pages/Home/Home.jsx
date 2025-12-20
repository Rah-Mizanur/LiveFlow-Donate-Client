import React from 'react'

import Container from '../../components/Shared/Container'
import PendingRequest from './pendingRequest/PendingRequest'
import BannerComonent from '../../components/Home/BannerComonent'
const Home = () => {
  return (
    <div>
 <Container fluid className="p-0">
 <BannerComonent></BannerComonent>
  <PendingRequest></PendingRequest>
</Container>



   
    </div>
  )
}

export default Home
