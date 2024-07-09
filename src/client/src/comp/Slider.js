import React, {useState, useLayoutEffect} from 'react'
import axios, { Axios } from 'axios'

import BtnSlider from './BtnSlider'
import '../css/Slider.css'

export default function Slider(props) {

    const [slideIndex, setSlideIndex] = useState(1)

    const getAttribution = (index, author1, author2, author3, author4, author5, license1, license2, license3, license4, license5, alink1, alink2, alink3, alink4, alink5, llink1, llink2, llink3, llink4, llink5, plink1, plink2, plink3, plink4, plink5 ) => {
        if(index==1){
            if(author1 === "public domain"){
                return
              }
            else{
                if(alink1?.length!==0){
                  return (
                    <div>
                    <a href={plink1} target="_blank">Picture</a> by <a href={alink1} target="_blank">{author1}</a> under <a href={llink1} target="_blank">{license1}</a>
                    </div>
                  )
                }
                else{
                  return(
                    <div>
                    <a href={plink1} target="_blank">Picture</a> by {author1} under <a href={llink1} target="_blank">{license1}</a>
                    </div>
                  ) 
                }        
              }
        }
        else if(index==2){
            if(author2 === "public domain"){
                return
              }
            else{
                if(alink2?.length!==0){
                  return (
                    <div>
                    <a href={plink2} target="_blank">Picture</a> by <a href={alink2} target="_blank">{author2}</a> under <a href={llink2} target="_blank">{license2}</a>
                    </div>
                  )
                }
                else{
                  return(
                    <div>
                    <a href={plink2} target="_blank">Picture</a> by {author2} under <a href={llink2} target="_blank">{license2}</a>
                    </div>
                  ) 
                }        
              }
        }
        else if(index==3){
            if(author3 === "public domain"){
                return
              }
            else{
                if(alink3?.length!==0){
                  return (
                    <div>
                    <a href={plink3} target="_blank">Picture</a> by <a href={alink3} target="_blank">{author3}</a> under <a href={llink3} target="_blank">{license3}</a>
                    </div>
                  )
                }
                else{
                  return(
                    <div>
                    <a href={plink3} target="_blank">Picture</a> by {author3} under <a href={llink3} target="_blank">{license3}</a>
                    </div>
                  ) 
                }        
              }
        }
        else if(index==4){
            if(author4 === "public domain"){
                return 
              }
            else{
                if(alink4?.length!==0){
                  return (
                    <div>
                    <a href={plink4} target="_blank">Picture</a> by <a href={alink4} target="_blank">{author4}</a> under <a href={llink4} target="_blank">{license4}</a>
                    </div>
                  )
                }
                else{
                  return(
                    <div>
                    <a href={plink4} target="_blank">Picture</a> by {author4} under <a href={llink4} target="_blank">{license4}</a>
                    </div>
                  ) 
                }        
              }
        }
        else if(index==5){
            if(author5 === "public domain"){
                return
              }
            else{
                if(alink5?.length!==0){
                  return (
                    <div>
                    <a href={plink5} target="_blank">Picture</a> by <a href={alink5} target="_blank">{author5}</a> under <a href={llink5} target="_blank">{license5}</a>
                    </div>
                  )
                }
                else{
                  return(
                    <div>
                    <a href={plink5} target="_blank">Picture</a> by {author5} under <a href={llink5} target="_blank">{license5}</a>
                    </div>
                  ) 
                }        
              }
        }
    }

    const workingIndex = [];

    for (let i = 1; i <= 5; i++) {
        if(checkPic(i, props.attributionData.author1, props.attributionData.author2, props.attributionData.author3, props.attributionData.author4, props.attributionData.author5)===1){
            workingIndex.push(i)
        }
    } 

    const nextSlide = () => {
        if(slideIndex !== workingIndex.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === workingIndex.length){
            setSlideIndex(1)
        }
    }
    

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(workingIndex.length)
        }
    }
    

    const moveDot = index => {
        setSlideIndex(index)
    }

    const getButtons = (working) => {
        if(working.length>1){
            return(
                <div>
                <BtnSlider moveSlide={nextSlide} direction={"next"} />
                <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

                <div className="container-dots">
                {Array.from({length: workingIndex.length}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
                </div>
            )
        }
    }

    return (
        <div className="container-slider">

                
                    <div className='slide'>
                    {getAttribution(workingIndex[slideIndex-1], props.attributionData.author1, props.attributionData.author2, props.attributionData.author3, props.attributionData.author4, props.attributionData.author5, props.attributionData.license1, props.attributionData.license2, props.attributionData.license3, props.attributionData.license4, props.attributionData.license5, props.attributionData.alink1, props.attributionData.alink2, props.attributionData.alink3, props.attributionData.alink4, props.attributionData.alink5, props.attributionData.llink1, props.attributionData.llink2, props.attributionData.llink3, props.attributionData.llink4, props.attributionData.llink5, props.attributionData.plink1, props.attributionData.plink2, props.attributionData.plink3, props.attributionData.plink4, props.attributionData.plink5)}
                        
                    <img src={getPicture(props.id, slideIndex, workingIndex)}></img>

                    </div>
                
            {getButtons(workingIndex)}
            
            

        </div>
    )
}
function getPicture(id, index, working){
    if(working.length>0){
        return `http://${window.location.hostname}/stadium/${id}_${working[index-1]}.jpg`
    }
    else{
        return `http://${window.location.hostname}/NoImage.jpg`
    }
}
function checkPic(index, author1, author2, author3, author4, author5){
    if(index===1){
      if(author1?.length>0){
        return 1
      }
      else{
        return 0
      }
    }
    else if(index===2){
      if(author2?.length>0){
        return 1
      }
      else{
        return 0
      }
    }
    else if(index===3){
      if(author3?.length>0){
        return 1
      }
      else{
        return 0
      }
    }
    else if(index===4){
      if(author4?.length>0){
        return 1
      }
      else{
        return 0
      }
    }
    else if(index===5){
      if(author5?.length>0){
        return 1
      }
      else{
        return 0
      }
    }
    else{
      return 0
    }
}