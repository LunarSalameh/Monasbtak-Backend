

import stl from './Footer.module.css';
import Link from 'next/link';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = ()=>{
    return(
        <footer className='  top-0 left-0 w-full z-10'>
        <svg className={stl.bgGray100} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160">
            <path 
                fill="#4c1b41" 
                fillOpacity="1" 
                d="M0,80L80,74.7C160,69,320,59,480,64C640,69,800,90.5,960,90.7C1120,91,1280,69,1360,58.7L1440,48L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z">
            </path>
        <path 
            d="M0,80L80,74.7C160,69,320,59,480,64C640,69,800,90.5,960,90.7C1120,91,1280,69,1360,58.7L1440,48" 
            fill="none" 
            stroke="#d9b34d" 
            strokeWidth="25"
            strokeLinecap="round"/>
        </svg>
        <div className='bg-[#4c1b41] pb-[3.5rem] text-white grid lg:grid-cols-[1.5fr,1fr,1fr,1fr] grid-row-2 gap-8 justify-center justify-items-center px-10 '>
            {/** LOGO & BRIEF */}
            {/* <div className='flex flex-col gap-3 -mt-3 items-center'> */}
            
            <Link href="/customers/landingPage" className='flex  items-center'>  
                <img src="/Golden-logo.png" /> 
            </Link>
                {/* <p> Whether you’re organizing a wedding, a corporate event, or a celebration, we offer a curated selection of professionals who can bring your vision to life with creativity and expertise.</p> */}
            {/* </div> */}
           
           {/** ABOUT */}
            <div className='lg:block hidden '>
                
                <ul className='flex flex-col gap-4'>
                    <li className='font-bold text-lg'>About</li>
                    <li>
                        <Link href='/general/aboutUs#whatDoWeOffer' className='hover:text-[#d9b34d]'>What Do We Offer</Link>
                    </li>
                    <li>
                        <Link href="/general/aboutUs" className='hover:text-[#d9b34d]'>About Us </Link>
                    </li>
                    <li>
                        <Link href="/general/aboutUs#OurTeam" className='hover:text-[#d9b34d]'>Meet The Team</Link>
                    </li>
                </ul>
            </div>
           {/** COMMUNITY */}
            <div className='lg:block hidden'>
                <ul className='flex flex-col gap-4'>
                    <li className='font-bold text-lg'>Community</li>
                    <li>
                        <Link href="/customers/landingPage" className='hover:text-[#d9b34d]'>Categories</Link>
                    </li>
                    <li>
                        <Link href="../customers/profile" className='hover:text-[#d9b34d]'>Profile</Link>
                    </li>
                </ul>
            </div>
           {/** SOCIALS */}
            <div >
                <ul className='flex lg:flex-col lg:gap-4 gap-8'>
                    <li className='font-bold text-lg lg:block hidden'>Socials</li>
                    <li>
                        <Link href='#' className='hover:text-[#d9b34d] lg:block hidden' >Instagram</Link>
                        <Link href='#' className='hover:text-[#d9b34d] block lg:hidden' ><FaInstagram /></Link>
                    </li>
                    <li>
                        <Link href="#" className='hover:text-[#d9b34d] lg:block hidden'>Twitter</Link>
                        <Link href='#' className='hover:text-[#d9b34d] block lg:hidden' ><FaXTwitter /></Link>
                    </li>
                    <li>
                        <Link href="#" className='hover:text-[#d9b34d] lg:block hidden'>Facebook</Link>
                        <Link href='#' className='hover:text-[#d9b34d] block lg:hidden' ><FaFacebook /></Link>
                    </li>
                </ul>
            </div>
        </div>
        </footer>
    )
}
export default Footer;