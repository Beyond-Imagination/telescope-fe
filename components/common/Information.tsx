import React, { useState } from 'react'
import InfoIcon from '../../assets/info.svg'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

interface IInformation {
  className?: string
  informationText?: string
}

function Information({ className, informationText }: IInformation) {
  const [isShown, setIsShown] = useState(false)

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  })

  function mouseOn() {
    setIsShown(true)
    let rankingDiv = document.querySelector('.rankings')
    let timeFrameDiv = document.querySelector('.timeFrame')
    rankingDiv?.classList.add('blur-sm')
    timeFrameDiv?.classList.add('blur-sm')
  }

  function mouseDown() {
    setIsShown(false)
    let rankingDiv = document.querySelector('.rankings')
    let timeFrameDiv = document.querySelector('.timeFrame')
    rankingDiv?.classList.remove('blur-sm')
    timeFrameDiv?.classList.remove('blur-sm')
  }

  return(
    <>
      {informationText=='Score' &&
        <CustomWidthTooltip 
          placement="top-end"
          title= {<div style = {{fontSize:"14px"}}>Showing members’ overall tag index numbers.<br/>Have a check total task score in each Tags!</div>}
          arrow
          > 
          <span className={`${className} hover:cursor-pointer`}
                onMouseOver = {() => mouseOn()}
                onMouseLeave = {() => mouseDown()}>
            <InfoIcon></InfoIcon>
          </span>
        </CustomWidthTooltip>
      }
      {informationText=='Ranking' && 
       <span className={`${className} hover:cursor-pointer`}>
          <InfoIcon></InfoIcon>
        </span>
      }
    </>
  )
}
export default Information
