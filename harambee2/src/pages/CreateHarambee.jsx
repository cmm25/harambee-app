import React,{useState} from 'react';
import { Form, useNavigate } from 'react-router-dom';
import ethers from 'ethers';
import { money } from '../assets';
import { CustomButton,FormField } from '../components';
import { useStateContext} from '../context';
import { checkIfimage } from '../utils';
const CreateHarambee = () => {
 const navigate=useNavigate();
 const[isLoading,setLoading]=useState(false); 
 const {createHarambee} = useStateContext()
 //harambee details
 const[form,setForm]=useState({
  name:'',
  title:'',
  description:'',
  target:'',
  deadline:'',
  image:''

 });
 
 const handleFormFieldChange = (fieldName, e) => {
  setForm({ ...form, [fieldName]: e.target.value })
}

 const handleSubmit=async(e)=>{
  e.preventDefault();
  checkIfimage(form.image,async(exits)=>{
    if(exits){
      setIsLoading(true)
      await createHarambee({...form, target:ethers.utils.parseUnits(form.target,18)})
      setIsLoading(false)
      navigate('/')
    } else {
      alert('Provide valid URL')
      setForm({...form, image:''})
    }
  })
  console.log(form)
}

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>{isLoading && 'Loader...'}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px] bg-[#3a3a43]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] text-white'>Create a Harambee</h1>
      </div>
      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col  gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            LabelName = "Your Name"
            placeholder = "John Doe"
            inputType = "text"
            value = {form.name}
            handleChange ={(e)=>handleFormFieldChange('name',e)}
          />
          <FormField
            LabelName = "Harambee Title"
            placeholder = "Give an appropriate title"
            inputType = "text"
            value = {form.title}
            handleChange ={(e)=>handleFormFieldChange('title',e)}
          />
        </div>
        <FormField
            LabelName = "Background"
            placeholder = "Share your story"
            isTextArea
            value = {form.description}
            handleChange ={(e)=>handleFormFieldChange('description',e)}
          />
          <div className='w-full flex justify-center items-center p-4 bg-[#A5582C] rounded-[10px] h-[120px]'>
            <img src={money} alt='money' className='w-[40px] h-[40px] object-contain'/>
            <h4 className='font-epilogue font-bold text-[25px] text-white  ml-[20px]'>You will get 100% of the contribution raised.</h4>
          </div>
          <div className='flex flex-wrap gap-[40px]'>
          <FormField
            LabelName = "Target"
            placeholder = "ETH 0.50"
            inputType = "text"
            value = {form.target}
            handleChange ={(e)=>handleFormFieldChange('target',e)}
          />
          <FormField
            LabelName = "End Date"
            placeholder = "Harambee end date"
            inputType = "date"
            value = {form.deadline}
            handleChange ={(e)=>handleFormFieldChange('deadline',e)}
          />
           <FormField
            LabelName = "Harambee image"
            placeholder = "Image link resonating with the Harambee."
            inputType = "url"
            value = {form.image}
            handleChange ={(e)=>handleFormFieldChange('image',e)}
          />
          <div className='justify-center items-center mt-[35px]'>{/*Consider button placement ml-[30vw]*/}
            <CustomButton
              btnType='submit'
              title='Submit new harambee'
              styles='bg-[#452212]'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateHarambee