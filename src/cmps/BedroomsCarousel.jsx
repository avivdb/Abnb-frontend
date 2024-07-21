import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import arrowForward from "../assets/img/icons/arrowforward.svg"
import arrowBack from "../assets/img/icons/arrowback.svg"
import bed from "../assets/img/icons/bed.svg"



export function BedroomsCarousel({ stay }) {

  const images = stay.imgUrls;

  const handlePrevClick = (e, clickHandler) => {
    e.stopPropagation()
    e.preventDefault()
    clickHandler()
  }

  const handleNextClick = (e, clickHandler) => {
    e.stopPropagation()
    e.preventDefault()
    clickHandler()
  }


  return (
    <div className="img-carousel">
      <Carousel
        centerMode={true}
        centerSlidePercentage={33}
        useKeyboardArrows="true"
        showThumbs={false}
        statusFormatter={() => null}
        renderArrowNext={(clickHandler, hasNext) =>
          (stay.bedrooms.length > 3) && hasNext && (
            <button style={{ right: "0.25rem"}}
              className="nav-btn nav-btn-right"
              onClick={(e) => handleNextClick(e, clickHandler)}
            >
              <img src={arrowForward} alt="Next" />
            </button>
          )
        }
        renderArrowPrev={(clickHandler, hasNext) =>
          (stay.bedrooms.length > 3) && hasNext && (
            <button style={{ left: "0.25rem" }}
              className="nav-btn nav-btn-left"
              onClick={(e) => handlePrevClick(e, clickHandler)}
            >
              <img src={arrowBack} alt="Back" />
            </button>
          )
        }
      >
        {stay.bedrooms.map((bedroom, index) => (
          <div key={index} className='stay-bedroom-display-card'>
            <section className='bed-imgs'>
              {Array.from({ length: bedroom.beds }).map((_, index) => (
                <img key={index} src={bed} alt={`Bed ${index + 1}`} />
              ))}
            </section>
            <h1>Bedroom {index + 1}</h1>
            <p>{bedroom.beds} Bed{bedroom.beds > 1 ? 's' : ''}</p>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
