const NoContentPopup = ({ organizationName, toggleModal }: any) => {
    return (
        // 뒷배경을 클릭하면 모달을 나갈 수 있게 해야하므로 뒷 배경 onClick에 state함수를 넣는다.
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 5, // 모달과 뒷배경은 렌더링 순서와 상관없이 다른 컴포넌트들보다 앞에 있어야 하므로 z-index를 5로 설정한다.
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onClick={toggleModal}
        >
            <div
                style={{
                    padding: '1.5rem 1rem 1.5rem 0rem',
                    width: '30%',
                    maxWidth: '50rem',
                    minWidth: '35em',
                    borderRadius: '1rem',
                    paddingBottom: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    background: `linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%), #D2D1FF`,
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                }}
                onClick={
                    e => e.stopPropagation() // 모달을 클릭해도 뒷 배경으로 이벤트가 전달되지 않게 한다.
                }
            >
                <img style={{ marginLeft: 'auto', width: '30px', height: '30px' }} src={'./close_button.png'} onClick={toggleModal}></img>
                <span style={{ fontSize: '2.5rem', marginBottom: '20px' }}>No Achievement :(</span>
                <span>We don&apos;t have any {organizationName}’s achievement.</span>
                <span>Please do any work and come back later.</span>
            </div>
        </div>
    )
}

export default NoContentPopup
