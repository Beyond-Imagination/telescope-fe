import React from 'react'
import InfoIcon from '../../assets/info.svg'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

interface IInformation {
    className?: string
    informationText?: string
}

function Information({ className, informationText }: IInformation) {
    const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 500,
        },
    })

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
                    <span className={`${className} hover:cursor-pointer`}>
                        <InfoIcon></InfoIcon>
                    </span>
                </CustomWidthTooltip>
            )}
            {informationText == 'Ranking' && (
                <CustomWidthTooltip
                    placement="top-end"
                    title={
                        <div style={{ fontSize: '14px' }}>
                            You can monitor the ranking by tag indexes in timeframe you selected. <br />
                            Please handle with the timeframe tap above!
                        </div>
                    }
                    arrow
                >
                    <span className={`${className} hover:cursor-pointer`}>
                        <InfoIcon></InfoIcon>
                    </span>
                </CustomWidthTooltip>
            )}
            {informationText == 'Time' && (
                <CustomWidthTooltip
                    placement="top-end"
                    title={<div style={{ fontSize: '14px' }}>You can check the task score by timeframe you selected.</div>}
                    arrow
                >
                    <span className={`${className} hover:cursor-pointer`}>
                        <InfoIcon></InfoIcon>
                    </span>
                </CustomWidthTooltip>
            )}
        </>
    )
}

export default Information
