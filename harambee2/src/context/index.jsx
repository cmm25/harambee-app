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
    return <StateContext.Provider
        value={{
            address,
            contract,
            connect,
            createHarambee: publishHarambee
        }}
    >
        {children}
    </StateContext.Provider>
}
export const useStateContext =()=> useContext(StateContext)