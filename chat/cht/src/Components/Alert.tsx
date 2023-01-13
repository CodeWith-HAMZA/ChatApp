interface Props {
  text: string,
  variant: string,
};

interface AlertVariant {
  error: string,
  success: string,
  info: string
}

const Alert: React.FC<Props> = ({ text, variant }: Props): JSX.Element => {
  const Variants = {
    "error": "red",
    "success": "teal",
    "info": "blue"
  }

  let alertColor;

  switch (variant) {
    case "error":
      alertColor = "red";
      break;
    case "success":
      alertColor = "teal";
      break;
    case "warning":
      alertColor = "orange";
      break;
    case "info":
      alertColor = "blue";
      break;
  }
  const capitalize = (givenStr: string) => givenStr.charAt(0).toUpperCase() + givenStr.slice(1);


  return (
    <div className={`bg-${alertColor}-100 border-l-4 border-${alertColor}-500 text-${alertColor}-700 p-4`} role="alert">
      <p className="font-bold">{capitalize(variant)}</p>
      <p>{text}.</p>
    </div >
  )


}


export default Alert;