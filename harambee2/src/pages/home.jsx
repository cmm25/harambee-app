import React,{useState,useEffect} from 'react'
import {useStateContext} from '../context'
import {DisplayHarambee} from '../components'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  
  const{address, contract, getCampaigns} = useStateContext()
  
  const fetchCampaigns = async() =>{
    setIsLoading(true)
    const data = await getCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(()=>{
    if(contract) fetchCampaigns()
  },[address,contract])
  return (
    <DisplayHarambee
      title = 'All Harambees'
      isLoading ={isLoading}
      campaigns ={campaigns}
    />
  )
}

export default Home