import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { StyledAppLogo } from './'

const AppLogo: FC = () => {
  return (
    <StyledAppLogo>
      <Link href="/" className="logo-link">
        <a className="logo">
          <div className="earth">
            <Image src="/images/earth-spinning.gif" height={34} width={34} alt="Spinning Earth" />
          </div>
          <svg viewBox="0 0 545 93" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M92.95 41.28C93.07 42.17 93.07 44.09 93.07 46.78C93.07 60.2 88.73 71.2 80.16 79.78C71.59 88.36 60.47 92.6999 46.79 92.6999C33.11 92.6999 21.99 88.3499 13.16 79.6999C4.33 71.0499 0 60.1399 0 46.8499C0 33.5599 4.33 22.5 13.16 13.92C21.99 5.33999 33.16 0.999962 46.79 0.999962C57.2907 0.818413 67.5509 4.15163 75.94 10.4699C84.25 16.7299 89.49 24.79 91.41 34.63H68.78C67.1278 30.1939 64.1351 26.3824 60.2178 23.7248C56.3004 21.0672 51.6526 19.6955 46.92 19.8C43.5894 19.7002 40.2766 20.3223 37.2093 21.6239C34.1419 22.9254 31.3925 24.8754 29.15 27.3399C24.42 32.3399 22.15 38.85 22.15 46.65C22.15 54.45 24.46 60.9699 29.15 65.9599C31.3663 68.4658 34.1077 70.4522 37.1791 71.7779C40.2505 73.1036 43.5764 73.736 46.92 73.63C57.15 73.63 65.71 68.13 68.78 59.56H46.92V41.28H92.95Z"
              fill="white"
            />
            <path
              d="M168.89 21.5H126.96V37.5H165.83V55.79H126.96V72.28H168.89V91.46H105.22V2.33996H168.89V21.5Z"
              fill="white"
            />
            <path
              d="M369.5 2.28002H347.77L347.74 37.29H318.33V2.29003H296.63V91.41H318.33V56.5H347.77V91.4H369.5V2.28002Z"
              fill="white"
            />
            <path
              d="M456.57 2.28002V59.28C456.57 69.12 453.25 77.05 446.47 83.28C439.69 89.51 431.13 92.62 420.52 92.62C409.91 92.62 401.08 89.55 394.31 83.28C387.54 77.01 384.08 69.09 384.08 59.28V2.28002H405.81V58.16C405.81 66.85 411.81 72.73 420.39 72.73C428.97 72.73 434.97 66.85 434.97 58.16V2.28002H456.57Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M537.41 84.88C542.11 80.53 544.41 74.75 544.41 67.75C544.41 56.5 537.76 48.18 527.52 45.24C531.448 43.582 534.788 40.7822 537.106 37.2036C539.424 33.625 540.613 29.4327 540.52 25.17C540.52 18.39 538.23 12.82 533.52 8.55004C528.81 4.28005 522.8 2.28002 515.52 2.28002H471.15V91.4H519.51C526.8 91.4 532.71 89.23 537.41 84.88ZM492.91 21.0799H510.91C512.04 21.0224 513.169 21.2003 514.226 21.6024C515.283 22.0045 516.245 22.6219 517.051 23.4155C517.857 24.2091 518.489 25.1616 518.907 26.2125C519.325 27.2634 519.52 28.3897 519.48 29.52C519.502 30.651 519.295 31.7747 518.872 32.8237C518.449 33.8728 517.818 34.8255 517.018 35.6249C516.217 36.4242 515.264 37.0538 514.214 37.4757C513.165 37.8976 512.041 38.1031 510.91 38.0799H492.91V21.0799ZM519.56 69.9517C517.992 71.5739 515.855 72.5235 513.6 72.6H492.89V55.21H513.6C515.855 55.2864 517.992 56.2361 519.56 57.8584C521.128 59.4807 522.005 61.6487 522.005 63.905C522.005 66.1613 521.128 68.3294 519.56 69.9517Z"
              fill="white"
            />
          </svg>
        </a>
      </Link>
    </StyledAppLogo>
  )
}

export default AppLogo