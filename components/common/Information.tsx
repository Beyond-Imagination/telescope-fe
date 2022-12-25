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

  function mouseOn(informationText: string) {
    setIsShown(true)

    let blurDom = new Array()
    if (informationText === 'Score') {
      blurDom = ['.rankings', '.timeFrame']
    } else if (informationText === 'Ranking') {
      blurDom = ['.timeFrame', '.scoreInfo', '.scoreFrame']
    } else if (informationText === 'Time') {
      blurDom = ['.rankings', '.scoreInfo', '.scoreFrame']
    }

    for (let i = 0; i < blurDom.length; i++) {
      let blurDiv = document.querySelector(blurDom[i])
      blurDiv?.classList.add('blur-sm')
    }
  }

  function mouseDown() {
    setIsShown(false)

    let blurredDiv = document.querySelectorAll('.blur-sm')
    for (let i = 0; i < blurredDiv.length; i++) {
      blurredDiv[i].classList.remove('blur-sm')
    }
  }

  return (
    <>
      {informationText == 'Score' && (
        <CustomWidthTooltip
          placement="top-end"
          title={
            <div style={{ fontSize: '14px' }}>
              Showing members’ overall tag index numbers.
              <br />
              Have a check total task score in each Tags!
            </div>
          }
          arrow
        >
          <span
            className={`${className} hover:cursor-pointer`}
            onMouseOver={() => mouseOn('Score')}
            onMouseLeave={() => mouseDown()}
          >
            <InfoIcon></InfoIcon>
          </span>
        </CustomWidthTooltip>
      )}
      {informationText == 'Ranking' && (
        <CustomWidthTooltip
          placement="top-end"
          title={
            <div style={{ fontSize: '14px' }}>
              You can monitor the ranking by tag indexes in timeframe you
              selected. <br />
              Please handle with the timeframe tap above!
            </div>
          }
          arrow
        >
          <span
            className={`${className} hover:cursor-pointer`}
            onMouseOver={() => mouseOn('Ranking')}
            onMouseLeave={() => mouseDown()}
          >
            <InfoIcon></InfoIcon>
          </span>
        </CustomWidthTooltip>
      )}
      {informationText == 'Time' && (
        <CustomWidthTooltip
          placement="top-end"
          title={
            <div style={{ fontSize: '14px' }}>
              You can check the task score by timeframe you selected.
            </div>
          }
          arrow
        >
          <span
            className={`${className} hover:cursor-pointer`}
            onMouseOver={() => mouseOn('Time')}
            onMouseLeave={() => mouseDown()}
          >
            <InfoIcon></InfoIcon>
          </span>
        </CustomWidthTooltip>
      )}
    </>
  )
}
export default Information
