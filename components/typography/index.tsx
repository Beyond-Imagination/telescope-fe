const styles = {
  text1: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
  },
}

interface ITypography {
  type: 'h1' | 'text1'
  children: any
  color?: string
}

function Typography({ type, children, color }: ITypography) {
  switch (type) {
    case 'h1':
      return <h1 color={color}>{children}</h1>
    case 'text1':
      return (
        <span color={color} style={styles.text1}>
          {children}
        </span>
      )
    default:
      return <span color={color}>{children}</span>
  }
}
export default Typography
