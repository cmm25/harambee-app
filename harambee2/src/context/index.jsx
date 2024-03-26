import React,{useContext,createContext} from "react";
import{useAddress,useContract,useMetamask,useContractWrite} from '@thirdweb-dev/react'
import{ethers} from 'ethers'

//contract to front-end connector
const StateContext = createContext();

export const StateContextProvider = ({children})=>{
    const {contract} = useContract('')// remember to provide contract address
    const {mutateAsync:createHarambee} = useContractWrite(contract,'createHarambee')
    const address = useAddress()
    const connect = useMetamask();

    const publishHarambee = async(form)=>{
        try{
            const data = await createHarambee([
            address,
            form.title,
            form.description,
            form.target,
            new Date(form.deadline).getTime(),
            form.image
        ])
        console.log('successful call', data)
        } catch(error) {
            console.log('failed to call the contract', error)

        }
        
    }
    const getCampaigns = async () =>{
        const campaigns = await contract.call('getCampaigns')
        const parsedCampaigns = campaigns.map((campaign,i)=>({
            owner:campaign.owner,
            title:campaign.title,
            description:campaign.title,
            target:ethers.utils.formatEther(campaign.target.toString()),
            deadline:campaign.deadline.toNumber(),
            raisedAmount:ethers.utils.formatEther(campaign.raisedAmount.toString()),
            image:campaign.image,
            pid:i
        }))
        return parsedCampaigns
    }
    return <StateContext.Provider
        value={{
            address,
            contract,
            connect,
            getCampaigns,
            createHarambee: publishHarambee
        }}
    >
        {children}
    </StateContext.Provider>
}
export const useStateContext =()=> useContext(StateContext)