import React from 'react'

const navBarButton = ({btnType, styles,handleClick,title}) => {
  return (
    <button type={btnType}
    className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounde-[10px]${styles}`}
    onClick={handleClick}>{title}</button>
  )
}

export default navBarButton