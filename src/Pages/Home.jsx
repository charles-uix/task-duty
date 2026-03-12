import React, { useContext} from 'react'
import Layout from '../Components/Layout'
import desktop from '../assets/Images/desktop.png'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../ContextApi/UserContext'
export default function Home() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)

  const handelOnClick = () =>{
    if (!user) {
      navigate('/login')
    }
    else{
      navigate('/all')
    }
  }
  return (
    <Layout className="container mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 px-4 md:px-12 lg:px-20">
        
        <div className="w-full lg:w-133.75 space-y-6 text-center lg:text-left">
          <h1 className="font-semibold text-3xl md:text-4xl lg:text-[50px] leading-tight">
            Manage your Tasks on{" "}
            <span className="text-purple-400 block lg:inline">TaskDuty</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus,
            sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea
            tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl
            semper porttitor. Nec accumsan.
          </p>
          <button onClick={handelOnClick} className="bg-purple-400 text-white font-semibold py-2.5 px-6 rounded-md cursor-pointer text-sm md:text-base lg:text-lg">
            Go to My Task
          </button>
        </div>

        <img
          className="w-70 md:w-87.5 lg:w-[418.56px] h-auto"
          src={desktop}
          alt="TaskDuty desktop preview"
        />
      </div>
    </Layout>
  )
}