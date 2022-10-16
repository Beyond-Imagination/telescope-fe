import InfoIcon from '../../assets/info.svg'
interface IInformation {
  className?: string
  informationText?: string
}

function Information({ className, informationText }: IInformation) {
  return (
    <span className={`${className} hover:cursor-pointer`}>
      <InfoIcon></InfoIcon>
    </span>
  )
}
export default Information
