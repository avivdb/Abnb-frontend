import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import arrowForward from "../assets/img/icons/arrowforward.svg"
import arrowBack from "../assets/img/icons/arrowback.svg"


export function ImgCarousel({ stay }) {

  const images = stay.imgUrls.slice(0, 5);

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
        useKeyboardArrows={true}
        showThumbs={false}
        statusFormatter={() => null}
        showIndicators={true}
        renderArrowNext={(clickHandler, hasNext) =>
          hasNext && (
            <button style={{ right: "1rem"}}
              className="nav-btn nav-btn-right"
              onClick={(e) => handleNextClick(e, clickHandler)}
            >
              <img src={arrowForward} alt="Next" />
            </button>
          )
        }
        renderArrowPrev={(clickHandler, hasNext) =>
          hasNext && (
            <button style={{ left: "1rem"}}
              className="nav-btn nav-btn-left"
              onClick={(e) => handlePrevClick(e, clickHandler)}
            >
              <img src={arrowBack} alt="Back" />
            </button>
          )
        }
      >
        {images.map((URL, index) => (
          <div key={index} className="slide">
              <img 
              alt={`Slide ${index + 1}`} 
              src={URL} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
