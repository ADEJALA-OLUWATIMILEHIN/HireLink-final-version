import type { ButtonHTMLAttributes } from 'react'


type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className: string;
  label: string;
};

const ActionButton = ({className, label, ...props} : ActionButtonProps) => {
  return (
    <button {...props} className={`${className} px-5 py-2 rounded-md cursor-pointer`}>{label}</button>
  )
}

export default ActionButton
