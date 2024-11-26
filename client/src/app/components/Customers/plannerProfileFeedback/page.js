import React from 'react'
import './page.css'
import StarRating from '../../starRating/page'
import Link from 'next/link'

function PlannerFeedback() {
  return (
    <div className='Feedback-container'>
      <div className='showall'> 
        <span className='XL-font-size font-color bold-font'>Feedback</span>
        <Link href='/customers/showAllFeedback'>
          <span className='small-font-size bold-font Show-Button'>Show All</span>
        </Link>
      </div>
        <hr className='line'/>
        
        <div className='Feedback-types'>
            <div className='Feedback-Box'>
                <img src="/Planner2.jpg" className='Feedback-profile-Image' />
                <div className='Feedback-content'>
                  <div className='row-flex'>
                    <span className='mid-font-size'>Username #1</span>
                    <StarRating rating={3} />
                  </div>
                  <span className='Feedback-Text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero.
                  etur adipiscing elit. Nullam nec purus.
                  </span>
                </div>
            </div>

            <div className='Feedback-Box'>
                <img src="/Planner3.jpg" className='Feedback-profile-Image' />
                <div className='Feedback-content'>
                  <div className='row-flex'>
                    <span className='mid-font-size'>Username #2</span>
                    <StarRating rating={4} />
                  </div>
                  <span className='Feedback-Text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus in libero.
                  etur adipiscing elit. Nullam nec purus.
                  </span>
                </div>
            </div>
        </div>

    </div>
  )
}

export default PlannerFeedback