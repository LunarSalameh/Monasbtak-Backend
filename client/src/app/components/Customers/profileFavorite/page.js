import React from 'react'
import './page.css'
import { FaStar } from 'react-icons/fa'
import Favorite from '../../Favorite/page'
import Link from 'next/link'

function page() {
  return (
    <div className='Favorite-container'>
        <div className='showall'> 
            <span className='large-font-size font-color bold-font'>Favorite</span>
            <Link href='/customers/showAllFav'>
                <span className='small-font-size bold-font Show-Button'>Show All</span>
            </Link>
        </div>
        <hr className='line'/>
        <div className='Fav-container Fav-phone-view'>
            <div className='Fav-Box'>
                <img src="/Planner1.jpg" className='Fav-img' />
                <div className='Transparent-Box'>
                <Favorite isFavorite={true} />
                </div>
                <span>Planner #1</span>
            </div>

            <div className='Fav-Box'>
                <img src="/wedding.jpg" className='Fav-img' />
                <div className='Transparent-Box'>
                    <Favorite isFavorite={true} />
                </div>
                <span>Package #1</span>
            </div>

            <div className='Fav-Box'>
                <img src="/wedding4.jpg" className='Fav-img' />
                <div className='Transparent-Box'>
                    <Favorite isFavorite={true} />
                </div>
                <span>Package #2</span>
            </div>

            <div className='Fav-Box'>
                <img src="/Planner4.jpg" className='Fav-img' />
                <div className='Transparent-Box'>
                    <Favorite isFavorite={true} />
                </div>
                <span>Planner #2</span>
            </div>

            <div className='Fav-Box'>
                <img src="/wedding3.jpg" className='Fav-img' />
                <div className='Transparent-Box'>
                    <Favorite isFavorite={true} />
                </div>
                <span>Package #3</span>
            </div>

            <div className='Fav-Box'>
                <img src="/Planner1.jpg" className='Fav-img' />
                <div className='Transparent-Box'>
                    <Favorite isFavorite={true} />
                </div>
                <span>Planner #3</span>
            </div>

            <div className='Fav-Box'>
                <img src="/Planner2.jpg" className='Fav-img' />
                <div className='Transparent-Box'>
                    <Favorite isFavorite={true} />
                </div>
                <span>Planner #4</span>
            </div>

            <div className='Fav-Box'>
                <img src="/wedding5.jpg" className='Fav-img' />
                <div className='Transparent-Box'>
                    <Favorite isFavorite={true} />
                </div>
                <span>Package #4</span>
            </div>


        </div>
    </div>
  )
}

export default page