import React from 'react'
import ProfilePicture from '@/components/atom/ProfilePicture'

function StarryPerson({ info, month }: any) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const monthName = monthNames[(month + 11) % 12]

    return (
        <div
            style={{
                marginLeft: '5px',
                marginRight: '5px',
                textAlignLast: 'center',
                width: '250px',
                height: '290px',
                borderRadius: '4px',
                border: `1px solid rgba(0, 0, 0)`,
            }}
        >
            <div style={{ marginTop: '10px' }}>
                <span className={`font-semibold text-[22px] color-[#23222c]`}>{monthName}</span>
            </div>
            <div className={`mr-2`} style={{ margin: '10px 0 10px 35px' }}>
                <ProfilePicture
                    className="w-[180px] h-[180px] rounded-[90px]"
                    profilePicture={info?.profilePicture}
                    name={info?.name}
                    jdenticonSize={180}
                />
            </div>
            <div>
                <span className={`font-semibold text-[20px] color-[#23222c]`}>
                    {info?.name ? info?.name : 'None'} ⭐{info?.score ? info?.score : 0}
                </span>
            </div>
        </div>
    )
}

export default StarryPerson
