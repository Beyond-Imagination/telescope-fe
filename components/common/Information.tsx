import React, {useState} from 'react';
import InfoIcon from '../../assets/info.svg'
interface IInformation {
  className?: string
  informationText?: string
}

function Information({ className, informationText }: IInformation) {

  const [isShown, setIsShown] = useState(false);

  function mouseOn(){
    setIsShown(true);
    let rankingDiv = document.querySelector(".rankings");
    let timeFrameDiv = document.querySelector(".timeFrame");
    rankingDiv?.classList.add("blur-sm")
    timeFrameDiv?.classList.add("blur-sm")
    //summaryStat은 그대로
    
  }

  function mouseDown(){
    setIsShown(false);
    let rankingDiv = document.querySelector(".rankings");
    let timeFrameDiv = document.querySelector(".timeFrame");
    rankingDiv?.classList.remove("blur-sm")
    timeFrameDiv?.classList.remove("blur-sm")
  }

  return (
    
      <span className={`${className} hover:cursor-pointer`}
            onMouseOver = {() => mouseOn()}
            onMouseLeave = {() => mouseDown()}>
        <InfoIcon></InfoIcon>
        {isShown && (
          <div  className={``}>말표</div>
        )}
      </span>
    
    
  )
}
export default Information
