const styles = {
  text1: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
  },
  text2: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 1.2,
  },
  h1: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 30,
    lineHeight: 1.2,
  },
  caption: {
    fontFamily: 'Pretendard',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 1.2,
  },
}

interface ITypography {
  type: 'h1' | 'text1' | 'caption' | 'text2'
  children: any
  color?: string
  className?: string
}

function Typography({ type, children, color, className }: ITypography) {
  switch (type) {
    case 'h1':
      return (
        <h1 color={color} className={className} style={styles.h1}>
          {children}
        </h1>
      )
    case 'text1':
      return (
        <span color={color} className={className} style={styles.text1}>
          {children}
        </span>
      )
    case 'caption':
      return (
        <span color={color} className={className} style={styles.caption}>
          {children}
        </span>
      )
    default:
      return (
        <span color={color} className={className}>
          {children}
        </span>
      )
  }
}
export default Typography
