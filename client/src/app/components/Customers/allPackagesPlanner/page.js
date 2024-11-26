import React from 'react'
import './page.css'
import Favorite from '../../Favorite/page'
import { CiLocationOn } from "react-icons/ci";

function PlannerPackages() {
  return (
    <div className='Packages-container'>
        <span className='XL-font-size font-color bold-font'>Packages</span>
        <hr className='line'/>

        <div className='Packages-types'>
          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite isFavorite={true}/>
              </div>
              <span className='Price-tag'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>
          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite isFavorite={true}/>
              </div>
              <span className='Price-tag'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>
          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite isFavorite={true}/>
              </div>
              <span className='Price-tag'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>
          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite isFavorite={true}/>
              </div>
              <span className='Price-tag'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>

          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding2.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite isFavorite={false} />
              </div>
              <span className='Price-tag2'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>

          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding3.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite />
              </div>
              <span className='Price-tag2'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>

          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding4.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite />
              </div>
              <span className='Price-tag2'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>

          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding5.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite />
              </div>
              <span className='Price-tag'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>

          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding6.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite isFavorite={true}/>
              </div>
              <span className='Price-tag2'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>

          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite />
              </div>
              <span className='Price-tag2'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>

          <div className='Package-Box'>
            <div className='Package-img-container'>
              <img src="/wedding2.jpg" className='Package-img' />
              <div className='Transparent-Box'>
                    <Favorite />
              </div>
              <span className='Price-tag2'>$99.9</span>
            </div>
            <span>Package #1</span>
            <div className='row-felx'>
              <CiLocationOn />
              <span>Location</span>
            </div>
          </div>
          
        </div>

    </div>
  )
}

export default PlannerPackages