import logo from 'assets/images/logo.png';
import { PropsWithChildren, useRef, useState } from 'react';
import styles from './index.module.css';

export default function AppLayout(props: PropsWithChildren<{}>) {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={`${styles.appLayout}`}>
      <div className={`${styles.header}`}>
        <button
          ref={menuButtonRef}
          onClick={() => {
            setMenuVisibility(true);
            overlayRef.current?.focus();
          }}
          className="md:hidden"
        >
          <svg
            width="31"
            height="27"
            viewBox="0 0 31 27"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="text-brand"
          >
            <path d="M0 1.92857C0 1.41708 0.203189 0.926543 0.564866 0.564866C0.926543 0.203189 1.41708 0 1.92857 0H28.9286C29.4401 0 29.9306 0.203189 30.2923 0.564866C30.654 0.926543 30.8571 1.41708 30.8571 1.92857C30.8571 2.44006 30.654 2.9306 30.2923 3.29228C29.9306 3.65395 29.4401 3.85714 28.9286 3.85714H1.92857C1.41708 3.85714 0.926543 3.65395 0.564866 3.29228C0.203189 2.9306 0 2.44006 0 1.92857Z" />
            <path d="M0 25.0716C0 24.5601 0.203189 24.0696 0.564866 23.7079C0.926543 23.3463 1.41708 23.1431 1.92857 23.1431H28.9286C29.4401 23.1431 29.9306 23.3463 30.2923 23.7079C30.654 24.0696 30.8571 24.5601 30.8571 25.0716C30.8571 25.5831 30.654 26.0737 30.2923 26.4353C29.9306 26.797 29.4401 27.0002 28.9286 27.0002H1.92857C1.41708 27.0002 0.926543 26.797 0.564866 26.4353C0.203189 26.0737 0 25.5831 0 25.0716Z" />
            <path d="M1.92857 11.5713C1.41708 11.5713 0.926543 11.7745 0.564866 12.1362C0.203189 12.4978 0 12.9884 0 13.4999C0 14.0113 0.203189 14.5019 0.564866 14.8636C0.926543 15.2252 1.41708 15.4284 1.92857 15.4284H17.3571C17.8686 15.4284 18.3592 15.2252 18.7208 14.8636C19.0825 14.5019 19.2857 14.0113 19.2857 13.4999C19.2857 12.9884 19.0825 12.4978 18.7208 12.1362C18.3592 11.7745 17.8686 11.5713 17.3571 11.5713H1.92857Z" />
          </svg>
          <span className="sr-only">show navigation menu</span>
        </button>
        <div className="flex items-center space-x-[0.6875rem]">
          <div className="rounded-[0.3125rem] flex items-center justify-center text-white bg-[#F6CA65] w-[2.6875rem] h-[2.6875rem] text-[1.4375rem] font-bold">
            JD
          </div>
          <span className="text-brand font-bold">John Doe</span>
        </div>
      </div>
      <Nav isVisible={isMenuVisible} />
      <main className={`${styles.content}`}>{props.children}</main>
      <footer className={`${styles.footer}`}>
        <a href="#" className="text-brand font-bold">
          Terms&Conditions | Privacy policy
        </a>
      </footer>
      {/* Overlay to close the nav menu */}
      {isMenuVisible && (
        <button
          ref={overlayRef}
          className="fixed inset-0 bg-brand opacity-10"
          role="button"
          onClick={() => {
            setMenuVisibility(false);
            menuButtonRef.current?.focus();
          }}
          hidden={!isMenuVisible}
          data-testid="menu-overlay"
        >
          <span className="sr-only">hide navigation menu</span>
        </button>
      )}
    </div>
  );
}

function Nav({ isVisible }: { isVisible: boolean }) {
  return (
    <nav
      data-testid="nav-menu"
      className={`${styles.nav} ${isVisible ? styles.menuVisible + ' visible' : ''}`}
    >
      <div className={`${styles.logo}`}>
        <img src={logo} alt="balance logo" height={39.98} width={26.67} />
      </div>
      <a href="#" className={`${styles.navItem}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.32 0H2.68C1.19988 0 0 1.19988 0 2.68V21.32C0 22.8001 1.19988 24 2.68 24H21.32C22.8001 24 24 22.8001 24 21.32V2.68C24 1.19988 22.8001 0 21.32 0Z"
            fill="#CDCCCC"
          />
          <path
            d="M12.82 10.5H11.17C10.8 10.5 10.5 10.8 10.5 11.17V20.33C10.5 20.7 10.8 21 11.17 21H12.82C13.19 21 13.49 20.7 13.49 20.33V11.17C13.49 10.8 13.19 10.5 12.82 10.5Z"
            fill="white"
          />
          <path
            d="M6.83001 16.5H5.18001C4.80998 16.5 4.51001 16.8 4.51001 17.17V20.33C4.51001 20.7 4.80998 21 5.18001 21H6.83001C7.20004 21 7.50001 20.7 7.50001 20.33V17.17C7.50001 16.8 7.20004 16.5 6.83001 16.5Z"
            fill="#B3B3B3"
          />
          <path
            d="M18.83 3H17.18C16.81 3 16.51 3.29997 16.51 3.67V20.33C16.51 20.7 16.81 21 17.18 21H18.83C19.2 21 19.5 20.7 19.5 20.33V3.67C19.5 3.29997 19.2 3 18.83 3Z"
            fill="#B3B3B3"
          />
        </svg>
      </a>
      <a href="#" className={`${styles.navItem}`}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.0069 2.12628C10.8872 1.63136 10.6349 1.17844 10.2769 0.816275C9.92558 0.462808 9.48769 0.207656 9.00693 0.0762751C8.62727 0.0113012 8.24167 -0.0121702 7.85693 0.00627515H3.23693C2.86507 -0.0107365 2.49251 0.0161152 2.12693 0.0862751C1.63029 0.201537 1.17624 0.454559 0.816932 0.816275C0.45618 1.17787 0.20041 1.63065 0.0769325 2.12628C0.0155272 2.49289 -0.00793007 2.86485 0.00693245 3.23628V7.85628C-0.0141004 8.24144 0.0127718 8.62773 0.0869325 9.00628C0.199921 9.50669 0.453137 9.96456 0.816932 10.3263C1.18492 10.666 1.63731 10.9009 2.12693 11.0063C2.49251 11.0764 2.86507 11.1033 3.23693 11.0863H7.85693C8.2421 11.1073 8.62839 11.0804 9.00693 11.0063C9.5058 10.8892 9.96262 10.6366 10.3269 10.2763C10.6594 9.91869 10.8936 9.48118 11.0069 9.00628C11.077 8.64407 11.1039 8.27482 11.0869 7.90628V3.23628C11.1039 2.86442 11.0771 2.49185 11.0069 2.12628ZM9.23693 7.75628C9.26214 8.01232 9.26214 8.27023 9.23693 8.52628C9.20982 8.70562 9.12972 8.87277 9.00693 9.00628C8.88652 9.1291 8.73409 9.21571 8.56693 9.25628C8.31049 9.27131 8.05338 9.27131 7.79693 9.25628H3.32693C3.07088 9.28148 2.81298 9.28148 2.55693 9.25628C2.39336 9.214 2.24459 9.12751 2.12693 9.00628C2.00086 8.88839 1.91366 8.73492 1.87693 8.56628C1.85537 8.31006 1.85537 8.05249 1.87693 7.79628V3.32628C1.85578 3.07004 1.85578 2.81251 1.87693 2.55628C1.92116 2.3906 2.00725 2.23908 2.12693 2.11628C2.24579 1.99869 2.39445 1.91572 2.55693 1.87628C2.81318 1.85557 3.07068 1.85557 3.32693 1.87628H7.75693C8.01316 1.85512 8.2707 1.85512 8.52693 1.87628C8.70838 1.9096 8.87562 1.9967 9.00693 2.12628C9.12736 2.24456 9.21372 2.39309 9.25693 2.55628C9.27163 2.81273 9.27163 3.06982 9.25693 3.32628L9.23693 7.75628Z"
            fill="#B3B3B3"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.9269 2.12627C23.8119 1.63477 23.5648 1.18403 23.2124 0.822732C22.8599 0.461435 22.4154 0.203319 21.9269 0.0762699C21.5471 0.0124446 21.1616 -0.0110194 20.7769 0.00626985H16.1569C15.7717 -0.0134561 15.3856 0.013405 15.0069 0.0862698C14.5102 0.201531 14.0562 0.454554 13.6969 0.81627C13.3535 1.18311 13.1151 1.6356 13.0069 2.12627C12.9367 2.49184 12.9098 2.86441 12.9269 3.23627V7.85627C12.9058 8.24144 12.9327 8.62772 13.0069 9.00627C13.1258 9.49049 13.3751 9.9329 13.7276 10.2855C14.0802 10.6381 14.5226 10.8873 15.0069 11.0063C15.3725 11.076 15.745 11.1028 16.1169 11.0863H20.7369C21.122 11.106 21.5081 11.0791 21.8869 11.0063C22.3818 10.8866 22.8347 10.6342 23.1969 10.2763C23.5474 9.92434 23.7992 9.48633 23.9269 9.00627C24.001 8.62772 24.0279 8.24144 24.0069 7.85627V3.23627C24.0239 2.86441 23.997 2.49184 23.9269 2.12627ZM22.1569 7.75627C22.1715 8.01273 22.1715 8.26981 22.1569 8.52627C22.1104 8.69064 22.0225 8.84036 21.9017 8.96114C21.7809 9.08193 21.6312 9.16977 21.4669 9.21627C21.2137 9.23118 20.96 9.23118 20.7069 9.21627H16.2469C15.9942 9.2418 15.7395 9.2418 15.4869 9.21627C15.3097 9.19484 15.1428 9.12181 15.0069 9.00627C14.884 8.88586 14.7974 8.73342 14.7569 8.56627C14.7418 8.30982 14.7418 8.05272 14.7569 7.79627V3.32627C14.7357 3.07004 14.7357 2.8125 14.7569 2.55627C14.8011 2.39059 14.8872 2.23908 15.0069 2.11627C15.1282 1.99666 15.2806 1.91351 15.4469 1.87627C15.6997 1.85484 15.954 1.85484 16.2069 1.87627H20.6469C20.9031 1.85556 21.1606 1.85556 21.4169 1.87627C21.5782 1.92333 21.7251 2.01031 21.844 2.12916C21.9628 2.24802 22.0498 2.39491 22.0969 2.55627C22.118 2.8125 22.118 3.07004 22.0969 3.32627L22.1569 7.75627Z"
            fill="#CDCCCC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.007 15.0063C10.8881 14.5221 10.6388 14.0796 10.2862 13.7271C9.93363 13.3745 9.49123 13.1252 9.007 13.0063C8.64479 12.9362 8.27554 12.9093 7.907 12.9263H3.237C2.86514 12.9093 2.49258 12.9361 2.127 13.0063C1.63208 13.126 1.17917 13.3784 0.817002 13.7363C0.4617 14.0846 0.209139 14.524 0.0870023 15.0063C0.0141374 15.385 -0.0127237 15.7711 0.00700227 16.1563V20.7763C-0.00750807 21.1477 0.0159469 21.5196 0.0770023 21.8863C0.204051 22.3748 0.462167 22.8193 0.823464 23.1718C1.18476 23.5243 1.63551 23.7713 2.127 23.8863C2.49098 23.9699 2.86357 24.0101 3.237 24.0063H7.857C8.24217 24.0273 8.62846 24.0004 9.007 23.9263C9.50494 23.8068 9.96115 23.5546 10.327 23.1963C10.6668 22.8283 10.9016 22.3759 11.007 21.8863C11.0767 21.5206 11.1036 21.1481 11.087 20.7763V16.1563C11.1067 15.7711 11.0799 15.385 11.007 15.0063ZM9.237 20.6863C9.25192 20.9394 9.25192 21.1932 9.237 21.4463C9.1905 21.6106 9.10267 21.7604 8.98188 21.8812C8.86109 22.0019 8.71137 22.0898 8.547 22.1363C8.29055 22.151 8.03346 22.151 7.777 22.1363H3.327C3.07077 22.1574 2.81323 22.1574 2.557 22.1363C2.39564 22.0892 2.24875 22.0022 2.1299 21.8834C2.01104 21.7645 1.92407 21.6176 1.877 21.4563C1.8563 21.2 1.8563 20.9425 1.877 20.6863V16.2463C1.85513 15.9934 1.85513 15.7391 1.877 15.4863C1.90581 15.3033 1.9936 15.1348 2.127 15.0063C2.24529 14.8858 2.39382 14.7995 2.557 14.7563C2.81323 14.7351 3.07077 14.7351 3.327 14.7563H7.757C8.01345 14.7412 8.27056 14.7412 8.527 14.7563C8.70845 14.7896 8.87569 14.8767 9.007 15.0063C9.12661 15.1276 9.20976 15.28 9.247 15.4463C9.27253 15.699 9.27253 15.9536 9.247 16.2063L9.237 20.6863Z"
            fill="#B3B3B3"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.9269 15.0063C23.807 14.5225 23.5574 14.0807 23.2049 13.7283C22.8525 13.3759 22.4107 13.1262 21.9269 13.0063C21.5613 12.9366 21.1888 12.9097 20.8169 12.9263H16.1569C15.7718 12.9066 15.3856 12.9334 15.0069 13.0063C14.5232 13.1262 14.0813 13.3759 13.7289 13.7283C13.3765 14.0807 13.1269 14.5225 13.0069 15.0063C12.9372 15.3719 12.9104 15.7444 12.9269 16.1163V20.7363C12.9072 21.1214 12.9341 21.5076 13.0069 21.8863C13.1269 22.37 13.3765 22.8119 13.7289 23.1643C14.0813 23.5167 14.5232 23.7663 15.0069 23.8863C15.3726 23.956 15.7451 23.9828 16.1169 23.9663H20.7369C21.1088 23.9828 21.4813 23.956 21.8469 23.8863C22.3436 23.771 22.7976 23.518 23.1569 23.1563C23.5148 22.7941 23.7672 22.3412 23.8869 21.8463C23.9674 21.4953 24.0077 21.1364 24.0069 20.7763V16.1563C24.0266 15.7711 23.9998 15.385 23.9269 15.0063ZM22.1569 20.6463C22.1713 20.9027 22.1713 21.1598 22.1569 21.4163C22.1137 21.5795 22.0274 21.728 21.9069 21.8463C21.7865 21.9691 21.6341 22.0557 21.4669 22.0963C21.214 22.1177 20.9598 22.1177 20.7069 22.0963H16.2469C15.9938 22.1112 15.74 22.1112 15.4869 22.0963C15.3226 22.0498 15.1728 21.9619 15.052 21.8412C14.9313 21.7204 14.8434 21.5707 14.7969 21.4063C14.7817 21.1532 14.7817 20.8994 14.7969 20.6463V16.2463C14.7755 15.9934 14.7755 15.7392 14.7969 15.4863C14.8434 15.3219 14.9313 15.1722 15.052 15.0514C15.1728 14.9306 15.3226 14.8428 15.4869 14.7963C15.74 14.7814 15.9938 14.7814 16.2469 14.7963H20.6869C20.9432 14.7756 21.2007 14.7756 21.4569 14.7963C21.6201 14.8395 21.7686 14.9259 21.8869 15.0463C22.0097 15.1667 22.0964 15.3191 22.1369 15.4863C22.1584 15.7392 22.1584 15.9934 22.1369 16.2463L22.1569 20.6463Z"
            fill="#B3B3B3"
          />
        </svg>
      </a>
      <a href="#" className={`${styles.navItem}`}>
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.3"
            d="M18.6703 22.2203C18.1793 22.215 17.7018 22.0586 17.3028 21.7723C16.9038 21.486 16.6026 21.0838 16.4403 20.6203C16.4403 20.5303 16.4403 20.4403 16.3603 20.4403H8.44032C8.44032 20.5303 8.44032 20.6203 8.36032 20.6203C8.23016 21.0858 7.94969 21.4951 7.56261 21.7845C7.17553 22.0739 6.70358 22.2271 6.22032 22.2203C5.98428 22.2203 5.7579 22.3141 5.591 22.481C5.42409 22.6479 5.33032 22.8743 5.33032 23.1103C5.33032 23.3464 5.42409 23.5727 5.591 23.7396C5.7579 23.9065 5.98428 24.0003 6.22032 24.0003H18.6703C18.9064 24.0003 19.1327 23.9065 19.2996 23.7396C19.4666 23.5727 19.5603 23.3464 19.5603 23.1103C19.5603 22.8743 19.4666 22.6479 19.2996 22.481C19.1327 22.3141 18.9064 22.2203 18.6703 22.2203Z"
            fill="black"
          />
          <path
            d="M14.2203 11.5603H16.0003C16.2364 11.5603 16.4627 11.4665 16.6296 11.2996C16.7966 11.1327 16.8903 10.9063 16.8903 10.6703C16.8903 10.4343 16.7966 10.2079 16.6296 10.041C16.4627 9.87407 16.2364 9.7803 16.0003 9.7803H14.2203C13.9843 9.7803 13.7579 9.87407 13.591 10.041C13.4241 10.2079 13.3303 10.4343 13.3303 10.6703C13.3303 10.9063 13.4241 11.1327 13.591 11.2996C13.7579 11.4665 13.9843 11.5603 14.2203 11.5603Z"
            fill="#CDCCCC"
          />
          <path
            d="M22.2203 0.000308941H2.67031C2.31819 -0.00508849 1.96857 0.0602862 1.64219 0.192555C1.31582 0.324824 1.01932 0.521293 0.770309 0.770309C0.521293 1.01932 0.324824 1.31582 0.192555 1.64219C0.0602862 1.96857 -0.00508849 2.31819 0.000308941 2.67031V16.0003C-0.00508849 16.3524 0.0602862 16.702 0.192555 17.0284C0.324824 17.3548 0.521293 17.6513 0.770309 17.9003C1.01932 18.1493 1.31582 18.3458 1.64219 18.4781C1.96857 18.6103 2.31819 18.6757 2.67031 18.6703H22.2203C22.5724 18.6757 22.922 18.6103 23.2484 18.4781C23.5748 18.3458 23.8713 18.1493 24.1203 17.9003C24.3693 17.6513 24.5658 17.3548 24.6981 17.0284C24.8303 16.702 24.8957 16.3524 24.8903 16.0003V2.67031C24.8957 2.31819 24.8303 1.96857 24.6981 1.64219C24.5658 1.31582 24.3693 1.01932 24.1203 0.770309C23.8713 0.521293 23.5748 0.324824 23.2484 0.192555C22.922 0.0602862 22.5724 -0.00508849 22.2203 0.000308941ZM19.5603 12.4403C19.5603 12.6741 19.5143 12.9055 19.4248 13.1215C19.3354 13.3374 19.2042 13.5337 19.039 13.699C18.8737 13.8642 18.6774 13.9954 18.4615 14.0848C18.2455 14.1743 18.0141 14.2203 17.7803 14.2203H7.11031C6.63822 14.2203 6.18547 14.0328 5.85166 13.699C5.51784 13.3651 5.33031 12.9124 5.33031 12.4403V8.89031H19.5603V12.4403ZM19.5603 7.11031H5.33031V6.22031C5.33031 5.74822 5.51784 5.29547 5.85166 4.96166C6.18547 4.62784 6.63822 4.44031 7.11031 4.44031H17.7803C18.0141 4.44031 18.2455 4.48635 18.4615 4.5758C18.6774 4.66526 18.8737 4.79637 19.039 4.96166C19.2042 5.12695 19.3354 5.32317 19.4248 5.53913C19.5143 5.75509 19.5603 5.98656 19.5603 6.22031V7.11031Z"
            fill="#CDCCCC"
          />
        </svg>
      </a>
      <a href="#" className={`${styles.navItem}`}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.8819 13.21H12.7719L4.21191 21.77C5.9604 23.3099 8.10561 24.3287 10.404 24.7107C12.7023 25.0928 15.0618 24.8227 17.2144 23.9313C19.367 23.0398 21.2266 21.5626 22.5819 19.6675C23.9372 17.7724 24.7341 15.5352 24.8819 13.21Z"
            fill="#2DAEE5"
          />
          <path
            d="M3.112 20.66C1.57115 18.9126 0.551492 16.768 0.168971 14.4699C-0.213549 12.1718 0.0564146 9.81243 0.948167 7.66014C1.83992 5.50785 3.31768 3.64895 5.21343 2.2948C7.10917 0.940651 9.34684 0.145584 11.672 0V12.11L3.112 20.67V20.66Z"
            fill="#2DAEE5"
          />
          <path
            d="M13.2319 0V11.65H24.8819C24.695 8.62141 23.4076 5.76557 21.262 3.61996C19.1164 1.47435 16.2605 0.186932 13.2319 0V0Z"
            fill="#005B97"
          />
        </svg>
      </a>
      <button className={`${styles.navItem}`}>
        <svg
          width="23"
          height="25"
          viewBox="0 0 23 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5451 13.78C11.6956 13.7814 11.8449 13.7529 11.9844 13.6962C12.1239 13.6395 12.2507 13.5557 12.3576 13.4497C12.4646 13.3437 12.5494 13.2176 12.6073 13.0786C12.6653 12.9397 12.6951 12.7906 12.6951 12.64V1.15005C12.6934 0.845695 12.5711 0.554419 12.3551 0.340049C12.2493 0.232623 12.1232 0.147257 11.9841 0.0888949C11.8451 0.030533 11.6959 0.000334882 11.5451 4.92219e-05C11.394 -0.0013732 11.2443 0.0280473 11.105 0.0865097C10.9657 0.144972 10.8398 0.231246 10.7351 0.340049C10.6263 0.444825 10.54 0.570705 10.4815 0.709983C10.4231 0.849261 10.3936 0.999006 10.3951 1.15005V12.64C10.3951 12.7906 10.4249 12.9397 10.4828 13.0786C10.5407 13.2176 10.6256 13.3437 10.7325 13.4497C10.8394 13.5557 10.9663 13.6395 11.1057 13.6962C11.2452 13.7529 11.3945 13.7814 11.5451 13.78Z"
            fill="#B3B3B3"
          />
          <path
            d="M16.815 2.42005C16.5421 2.2827 16.2262 2.25758 15.935 2.35005C15.7911 2.39595 15.6578 2.46997 15.5428 2.56782C15.4278 2.66567 15.3334 2.7854 15.265 2.92005C15.1243 3.19165 15.0956 3.50753 15.185 3.80005C15.2816 4.0885 15.4858 4.32853 15.755 4.47005C16.8953 5.05547 17.9005 5.87296 18.7061 6.86999C19.5117 7.86703 20.0998 9.02155 20.4326 10.2594C20.7654 11.4972 20.8356 12.791 20.6386 14.0576C20.4417 15.3242 19.982 16.5355 19.289 17.6139C18.596 18.6922 17.6852 19.6137 16.6149 20.319C15.5446 21.0244 14.3386 21.498 13.0744 21.7096C11.8102 21.9211 10.5157 21.8658 9.27409 21.5473C8.0325 21.2288 6.87127 20.6541 5.86501 19.86C4.65532 18.9093 3.70369 17.6701 3.09738 16.256C2.49107 14.842 2.24949 13.2983 2.3948 11.7666C2.54011 10.2349 3.06765 8.76418 3.92905 7.48934C4.79044 6.21451 5.95813 5.17634 7.32501 4.47005C7.45997 4.40222 7.57921 4.30683 7.67501 4.19005C7.77104 4.07422 7.84555 3.94214 7.89501 3.80005C7.92438 3.65148 7.92438 3.49861 7.89501 3.35005C7.88114 3.20067 7.84049 3.05502 7.77501 2.92005C7.70718 2.78508 7.61179 2.66585 7.49501 2.57005C7.37698 2.47179 7.24119 2.39711 7.09501 2.35005C6.95331 2.30345 6.80355 2.28643 6.65501 2.30005C6.50185 2.31054 6.35229 2.35133 6.21501 2.42005C3.92721 3.60232 2.10291 5.51887 1.03484 7.86216C-0.0332276 10.2054 -0.283136 12.8396 0.325218 15.3419C0.933573 17.8443 2.36492 20.0697 4.38957 21.6611C6.41422 23.2525 8.91479 24.1176 11.49 24.1176C14.0652 24.1176 16.5658 23.2525 18.5904 21.6611C20.6151 20.0697 22.0464 17.8443 22.6548 15.3419C23.2632 12.8396 23.0132 10.2054 21.9452 7.86216C20.8771 5.51887 19.0528 3.60232 16.765 2.42005H16.815Z"
            fill="#CDCCCC"
          />
        </svg>
      </button>
    </nav>
  );
}
