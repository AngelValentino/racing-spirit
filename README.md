# [Racing Spirit](https://racing-spirit.pages.dev/)

Racing Spirit is an e-commerce **single-page application (SPA)**, featuring a JSON mock back-end, developed from scratch using **HTML/CSS**, **JavaScript** , and **React**. Inspired by [DoomsdayCo](https://doomsdayco.com/) design and featuring product images from [Iron Heart](https://www.ironheart.co.uk/). The platform offers a diverse range of high-quality jackets designed for both safety and style. With its **responsive**, **user-friendly**, and **accessible** interface, Racing Spirit ensures a seamless shopping experience, making it easy for customers to find and purchase the perfect motorcycle jacket.

*Currently, the website uses **JSON server** as a mock back-end. In the future, it will be upgraded to use a real database with **Node.js** and **MongoDB.***

> Employing React best practices, I prioritized meticulous **component organization**, **structured file management**, and enforced **immutability**. My emphasis was especially on optimizing code for enhanced performance, readability and accessibility.

<br />

## Table of contents

* [Functional Cart with LocalStorage](#functional-cart-with-localstorage)
  * [Custom localStorage hook](#custom-localstorage-hook)
  * [Cart Context](#cart-context)

* [Data Fetching, Rendering and Loaders](#data-fetching-rendering-and-loaders)
	* [`<ProductsCollection />`](#productscollection-)
	* [`<ProductDetails />`](#productdetails-)
	* [`<ProductCarousel />`](#productcarousel-)
  * [Loaders](#loaders)
  * [useFetch hook](#usefetch-hook)

* [Invalid Route](#invalid-route)

* [Reusable Modal](#reusable-modal)
  * [Rendering `<SlideModal />`](#slidemodal--rendering)

* [Slider Components](#slider-components)
	* [`<HeroSlider />`](#heroslider-)
	* [`<ProductCarousel />`](#productcarousel-component)
	* [`<ProductPreviewSlider />`](#productpreviewslider-)

* [Accordion Component](#accordion-component)
  * [Product Details `<Accordion />`](#product-details-accordion-)
  * [FAQs Search and `<Accordion />`](#faqs-search-and-accordion-)

* [Future Improvements](#future-improvements)

<br />


## Functional Cart with LocalStorage

Implemented a fully functional cart system leveraging a custom **localStorage hook** and React's **context API**. The solution allows seamless addition of products in various sizes with quantity management capabilities.

![Racing Spirit cart](https://i.imgur.com/XbHP97P.jpeg)

![Racing Spirit product details](https://i.imgur.com/yJYPfKu.jpeg)

> ### Custom localStorage hook
> Custom React hook that facilitates storing and retrieving data in the browser's **localStorage**.

```jsx
import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  /* useState is initialized with a function to avoid 
  running localStorage.getItem on every render. This function 
  will only run on the initial render. */
  const [ value, setValue ] = useState(() => {
    // Check if the item exists in localStorage
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    /* If the item doesn't exist in localStorage, check if the 
    initial value is a callback function; call it if true, 
    otherwise return initialValue */
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });
  
  // Set the item in localStorage whenever the key or value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [ value, setValue ];
}
 
export default useLocalStorage;
```

> ### Cart Context
> Establishes a robust shopping cart system in React utilizing the **useContext** and **createContext** hooks for state management, coupled with a custom **useLocalStorage** hook to ensure persistent storage for cart data.

```jsx
import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// Create context for the cart with an empty default value
const ShoppingCartContext = createContext({});

// Custom hook to use ShoppingCartContext
export const useShoppingCart = () => useContext(ShoppingCartContext);

export function ShoppingCartProvider({ children }) {
  const [ cartItems, setCartItems ] = useLocalStorage('cartItems', []);

  const cartQuantity = cartItems.reduce((acc, item) => item.quantity + acc, 0);

  function addToCart(id, title, price, imgUrl, size) {
    // initialize variantId
    const variantId = id + size;

    setCartItems(currItems => {
      // If item already exists in cart, increment quantity
      if (currItems.find(item => item.variantId === variantId)) {
        // update the matched item
        return currItems.map(item => item.variantId === variantId ? { ...item, quantity: item.quantity + 1 } : item);
      } 
      // Otherwise, add new item to cart
      return [...currItems, { id, variantId, quantity: 1, size, title, price, imgUrl}];
    });
  }

  function editQuantity(variantId, quantity) {
    setCartItems(currItems => {
      // If quantity is less than 1 and item exists, remove it from cart
      if (quantity < 1 && currItems.find(item => item.variantId === variantId))  {
        return currItems.filter(item => item.variantId !== variantId);
      }
      // Otherwise, update the quantity of the matched item
      return currItems.map(item => item.variantId === variantId ? { ...item, quantity: quantity } : item);
    });
  }

  function handleEditQuantity(e, variantId, quantity) {
    /* Checks if the input value is the same as the item quantity and returns 
    early if it's true. There is no need to update the item with the same value. */
    if (quantity === Number(e.target.value)) return;
    // If input value is empty, set quantity to 1. Otherwise, update quantity
    e.target.value === '' ?  editQuantity(variantId, 1) : editQuantity(variantId, Number(e.target.value))
  }

  function increaseCartQuantity(variantId) {
    // If item matches the variantId, increase its quantity by 1
    setCartItems(currItems => currItems.map(item => item.variantId === variantId ? { ...item, quantity: item.quantity + 1 } : item));
  }

  function decreaseCartQuantity(variantId) {
    setCartItems(currItems => {
      // Check if the item with the specified variantId exists in the cart
      if (currItems.find(item => item.variantId === variantId).quantity === 1) {
        /* If quantity is 1, remove the item from the cart. As decreasing from 1 
        will result in 0 */ 
        return currItems.filter(item => item.variantId !== variantId);
      } 
      // Otherwise, decrease the quantity of the item by 1
      return currItems.map(item => item.variantId === variantId ? { ...item, quantity: item.quantity - 1 } : item);
    });
  }

  function removeFromCart(variantId) {
    setCartItems(currItems => currItems.filter(item => item.variantId !== variantId));
  }

  return (
    <ShoppingCartContext.Provider value={{ 
        cartItems, 
        cartQuantity, 
        addToCart, 
        decreaseCartQuantity, 
        removeFromCart,
        increaseCartQuantity,
        handleEditQuantity
      }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}
```

<br />


## Data Fetching, Rendering and Loaders

Used a custom **useFetch** hook to fetch and cache data. leveraging it across various components such as `<ProductsCollection />`, `<ProductDetails />` and `<ProductCarousel />`.

Each of these layouts/pages has been properly organized into **reusable components** to ensure maximum readability and reusability. Furthermore, **loading animations** and **error messages** for edge cases also have been added.

*Since a **mock server (JSON server)** is being used, the loading animations appear almost instantaneously and are barely visible.*


### `<ProductsCollection />`
![Racing Spirit jackets collection](https://i.imgur.com/tDxyqzs.jpeg)

![Racing Spirit jackets collection loader](https://i.imgur.com/ZR4HMGv.gif)

![Racing Spirit jackets collection fetch error message](https://i.imgur.com/2swKMfg.jpeg)


### `<ProductDetails />`
![Racing Spirit product details](https://i.imgur.com/oy7Qhs3.jpeg)

![Racing Spirit product details loader](https://i.imgur.com/muZQb90.gif)

![Racing Spirit product details fetch error message](https://i.imgur.com/NuOB8kn.jpeg)


### `<ProductCarousel />`
![Racing Spirit product carousel](https://i.imgur.com/UhuZmLH.jpeg)

![Racing Spirit product carousel loader](https://i.imgur.com/EZxkRXB.gif)

![Racing Spirit product carousel fetch error message](https://i.imgur.com/lbHSPTe.jpeg)

> ### Loaders
> Utilized `<skeletonElement />` and `<BouncingBallsLoader />` reusable components as loaders.

```jsx
import '../styles/skeleton.css'

const SkeletonElement = ({ type, addClass, width, height }) => {
  function renderType() {
    // If neither type nor addClass are provided, return the base class
    if (!type && !addClass) {
      return 'skeleton-element';
    }  
    // If type is not provided but addClass is, return the base class with additional classes
    else if (!type && addClass) {
      return `skeleton-element ${addClass}`;
    }
    // If type is provided, return the base class with type and additional classes
    else {
      return `skeleton-element skeleton__${type}${addClass ? ` ${addClass}` : ''}`;
    }
  }

  return ( 
    <div style={{ width, height }} className={renderType()} role="alert" aria-busy="true" aria-live="polite" aria-label="Loading..."></div>
  );
}
 
export default SkeletonElement;
```

> ### useFetch hook
> This custom hook manages **data fetching** with state for data, loading, and error. It optimizes performance with **caching**, supports **fetch cancellation**, and handles errors effectively. This modular approach ensures efficient and reusable data fetching across the website.

```jsx
import { useEffect, useState } from "react";

const cache = {};

const useFetch = url => {
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    // Check if the data for the given URL is already in the cache
    if (cache[url]) {
      setData(cache[url]);
      setLoading(false);
      return;
    }

    // Create an AbortController to allow aborting the fetch request
    const abortCont = new AbortController();
    // Reset loading state and clear any previous errors for edge cases
    setLoading(true);
    setError(null);

    // Fetch data from the given URL
    fetch(url, { signal: abortCont.signal })
      .then(res => {
        if (!res.ok) throw Error(`Couldn't fetch the products data. ${res.statusText} ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Set cache
        cache[url] = data;
        // Set Data
        setData(data);
        setError(null);
      })
      .catch(err => {
        // If the error is an AbortError, do nothing
        if (err.name === 'AbortError') return;
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
 
    return () => abortCont.abort();

  }, [url]);
    
  return { data, loading, error };
}
 
export default useFetch;
```

<br />


## Invalid Route

Implemented a `<NotFound />` page to handle instances where the user may attempt to access a non-existent route on the current website, ensuring a smooth and user-friendly browsing experience.

![Racing Spirit not found page](https://i.imgur.com/IQNOPwC.jpeg)

<br />


## Reusable Modal

Implemented a reusable modal using the `<ModalContext.Provider />`, efficiently managing modal state and functionality with `useState`, `useRef`, and `useEffect` hooks. The modal-related logic is encapsulated within **ModalContext**, allowing easy integration across components via the **useModal** hook. DOM manipulation ensures smooth transitions and accessibility features like **focus trapping**, while event listeners handle modal opening and closing with **escape key press** or on **overlay click**.

```jsx
import '../styles/modal.css';
import { createContext, useContext, useState, useRef } from "react";
import { useEffect } from "react";
import SlideModal from "../layouts/SlideModal/SlideModal";

// Create context for the modal with an empty default value
const ModalContext = createContext({});

// Custom hook to use ModalContext
export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isCart, setIsCart ] = useState(false);
  const lastFocusableLmRef = useRef(null);
  const modalContentRef = useRef(null);
  const modalOverlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const timeoutId = useRef(null);

  // Open the modal and set its type
  const openModal = modalType => {
    setIsOpen(true);
    setIsCart(modalType === 'cart');
  }

  // Close the modal with a slide effect and an overlay opacity fade
  const closeModal = () => {
    document.body.style.overflow = 'auto'; // Enable scrolling once more when the modal is closed
    modalContentRef.current.style.right = '-' + (modalContentRef.current.offsetWidth + 50) + 'px'; // Slide modal content out of view
    modalOverlayRef.current.style.opacity = 0; // Fade out the modal overlay
    // Apply transition effects to the modal content and overlay only when closing, not opening
    modalContentRef.current.style.transition = 'right 0.25s';
    modalOverlayRef.current.style.transition = 'opacity 0.25s';
    // Reset Modal
    timeoutId.current = setTimeout(() => {
      setIsOpen(false);
      lastFocusableLmRef.current.focus(); // Return focus to the last focusable element before the modal opened
    }, 250);
  }

  const closeModalAtEsc = e => e.key === 'Escape' && closeModal();

  const closeModalAtOverlayClick = e => e.target.matches('.modal-overlay') && closeModal();

  // Trap focus within the modal for accessibility
  function trapFocus(e) {
    const focusableLms = modalContentRef.current.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    const firstFocusableLm = focusableLms[0]; 
    const lastFocusableLm = focusableLms[focusableLms.length - 1];
    const isTabPressed = (e.key === 'Tab');

    if (!isTabPressed) return; 

    if (e.shiftKey) /* shift + tab */ {
      if (document.activeElement === firstFocusableLm ) {
        lastFocusableLm.focus();
        e.preventDefault();
      }
    } 
    else /* tab */ {
      if (document.activeElement === lastFocusableLm) {
        firstFocusableLm.focus();
        e.preventDefault();
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      lastFocusableLmRef.current = document.activeElement;  // Store the last focused element before opening the modal
      closeBtnRef.current.focus(); // Focus the close button when the modal opens
      document.body.addEventListener('keydown', closeModalAtEsc);
      document.body.style.overflow = 'hidden'; // Disable scrolling when the modal is open
      modalContentRef.current.style.right = 0; // Slide modal content into view
      modalOverlayRef.current.style.opacity = 1; // Fade in the modal overlay
    } 

    return () => {
      clearTimeout(timeoutId.current);
      document.body.removeEventListener('keydown', closeModalAtEsc);
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{
      isCart,
      lastFocusableLmRef,
      closeBtnRef,
      modalContentRef,
      modalOverlayRef,
      openModal, 
      closeModal,
      closeModalAtOverlayClick,
      trapFocus,
    }}>
      { children }
      { isOpen && <SlideModal /> }
    </ModalContext.Provider>
  );
}
```

> ### `<SlideModal />` Rendering
> It uses conditional rendering to choose between rendering the `<Cart />` or `<MobileMenu />` components based on **isCart** state.

![Racing Spirit cart](https://i.imgur.com/XbHP97P.jpeg)

![Racing Spirit mobile menu](https://i.imgur.com/JzJyJOF.jpeg)

```jsx
import { Link } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import Cart from "./Cart/Cart";
import MobileMenu from "./MobileMenu/MobileMenu";

const SlideModal = () => {
  const { 
    isCart,
    closeBtnRef,
    modalContentRef,
    modalOverlayRef,
    closeModal,
    closeModalAtOverlayClick,
    trapFocus,
  } = useModal();

  return ( 
    <div className="modal-container" onClick={closeModalAtOverlayClick}>
      <div ref={modalContentRef} className="modal-content" onKeyDown={trapFocus}>
        <section className="modal-header">
          <h1 className="modal-title">
            { isCart 
              ? 'Cart' 
              : <Link aria-label="Go to home." title="Home" to="/" onClick={closeModal}>
                  <img aria-hidden="true" role="presentation" src="https://i.imgur.com/kLOpHbk.png" />
                </Link>
            }
          </h1>
          <button aria-label="Close modal." title="Close" ref={closeBtnRef} className="modal__close-btn" onClick={closeModal}>
            <svg className="modal__close-icon" aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path fill="currentColor" d="m4.3 2.9l12.8 12.8l-1.4 1.4L2.9 4.3z" />
              <path fill="currentColor" d="M17.1 4.3L4.3 17.1l-1.4-1.4L15.7 2.9z" />
            </svg>
          </button>
        </section>
        { isCart ? <Cart /> : <MobileMenu /> }
      </div>
      <div ref={modalOverlayRef} className="modal-overlay"></div>
    </div>
  );
}
 
export default SlideModal;
```

<br />


## Slider Components

### `<HeroSlider />`

The `<HeroSlider />` component manages a dynamic slideshow with **automatic playback** and **touch-enabled** navigation. It utilizes state management to control image indexing, visibility, and autoplay functionality. Integrated with a **custom swipe hook**, it enhances user interaction by allowing seamless navigation between images. Additionally, it includes a **progress bar** that adjusts its style based on the autoplay status and current image index, ensuring smooth transitions and user engagement.

![Racing Spirit hero slider](https://i.imgur.com/iCj1pKx.jpeg)

```jsx
import { useState, useEffect, useRef } from "react";
import { heroImgsData } from "../../../data/heroImgsData";
import useSwipe from "../../../hooks/useSwipe";
import HeroImgs from "./HeroImgs";
import NavigationBtns from "./NavigationBtns";

const HeroSlider = () => {
  const [ imgIndex, setImgIndex ] = useState(0);
  const [ isProgressBarStyled, setIsProgressBarStyled ] = useState(false);
  const [ autoPlay, setAutoPlay ] = useState(true);
  const heroVideoRef = useRef(null);

  // AutoPlay stops when the user tabs out of the page and restarts when they come back.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // User tabbed back into the page
        setAutoPlay(true);
        setImgIndex(0);
      } else {
        // User tabbed out from the page
        setAutoPlay(false);
        heroVideoRef.current.currentTime = 0; // Reset video playback
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  function showPrevImage() {
    setImgIndex(index => index === 0 ? heroImgsData.length - 1 : index - 1);
  }

  function showNextImage() {
    setImgIndex(index => index === heroImgsData.length - 1 ? 0 : index + 1);
  }

  // Custom hook for swipe functionality
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(showNextImage, showPrevImage);

  // Calculate progress bar styling
  function getProgressBarStyle() {
    // If progress bar is styled and not on the first image, expand width 105%
    if (isProgressBarStyled && imgIndex !== 0) {
      return { width: '105%' };
    } 
    // If progress bar is styled and is on the first image, expand width 103%
    else if (isProgressBarStyled) {
      return { width: '103%', transition: 'width 11s linear' };
    } 
    // If progress bar is not styled, set width to 0 with no transition
    else {
      return { width: 0, transition: 'none' };
    }
  }
  
  useEffect(() => {
    let intervalId;
    let progressBarTim
    /* Delay to allow the browser to reset the width, also appears 
    just after the hero button. 
    1500ms - HeroTittle(500ms) + HeroButton(1500ms)* Both timers start 
    at the same time so it finnally becomes 1500ms */
    if (autoPlay) {
      // Timeout to delay progress bar appearance
      progressBarTim = setTimeout(() => {
        setIsProgressBarStyled(true); // Start progress bar after timeout
      }, 1500);

      // First carousel slide
      if (imgIndex === 0) {
        heroVideoRef.current.currentTime = 0; // Reset hero video
        intervalId = setInterval(() => {
          showNextImage();
        }, 12500); // Timeout for video
      } 
      // Other slides
      else {
        // 5000ms + 1500ms to wait for the hero title and progress bar to appear
        intervalId = setInterval(() => {
          showNextImage();
        }, 6500); // Timeout for images
      }
    } 

    return () => {
      clearInterval(intervalId);
      clearTimeout(progressBarTim);
      setIsProgressBarStyled(false);
    };
  }, [imgIndex, autoPlay]);

  return ( 
    <header>
      <section aria-roledescription="carousel" className="hero-slider">
        <div
          className="hero-slider__main-img-slider-container"     
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <HeroImgs 
            autoPlay={autoPlay} 
            imgIndex={imgIndex}
            heroVideoRef={heroVideoRef}
          />
        </div>
        <div className="hero-slider__navigation-btns-container">
          <NavigationBtns imgIndex={imgIndex} setImgIndex={setImgIndex} />
        </div>
        <div className="hero-slider__arrow-btns-container">
          <button aria-label="Show previous image." className="hero-slider__prev-btn" onClick={showPrevImage}>
            <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" d="m16.75 17l-7.5-5l7.5-5a.901.901 0 1 0-1-1.5l-8.502 5.668a1 1 0 0 0 0 1.664L15.75 18.5a.901.901 0 1 0 1-1.5" />
            </svg>
          </button>
          <button aria-label="Show next image." className="hero-slider__next-btn" onClick={showNextImage}>
            <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" d="m7.25 17l7.5-5l-7.5-5a.901.901 0 1 1 1-1.5l8.502 5.668a1 1 0 0 1 0 1.664L8.25 18.5a.901.901 0 1 1-1-1.5" />
            </svg>
          </button>
        </div>
        <div className="hero-slider__progress-bar-container">
          <div className="hero-slider__progress-bar" style={getProgressBarStyle()}></div>
        </div>
      </section>
    </header>
  );
}

export default HeroSlider;
```

<h3 id="productcarousel-component"><code>&lt;ProductCarousel /&gt;</code></h3>

The `<ProductCarousel />` component displays a horizontal carousel of products fetched from an API endpoint. It includes navigation buttons for scrolling left or right, **dynamically adjusting visibility** based on scroll position to indicate carousel boundaries. Utilizing React's **useRef** hook ensures efficient DOM interaction. Integrated with the `<Products />` component, it renders items fetched from a specified URL. Furthermore, its use of CSS classes and conditional rendering facilitates **seamless integration** across both `<Home />` and `<ProductDetails />` pages, ensuring consistent and flexible product display throughout the application.

![Racing Spirit product carousel](https://i.imgur.com/UhuZmLH.jpeg)

```jsx
import '../styles/carousel.css';
import { useRef } from "react";
import Products from "./Products";

const ProductCarousel = ({ hidden }) => {
  const carouselRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const productsUrl = 'https://my-json-server.typicode.com/AngelValentino/racing-spirit-test-api/products?_page=1&_limit=6';

  function slideRight() {
    carouselRef.current.scrollLeft += carouselRef.current.children[0].offsetWidth + 30;
  }

  function slideLeft() {
    carouselRef.current.scrollLeft -= carouselRef.current.children[0].offsetWidth + 30;
  }

  // Adjusts visibility of carousel buttons based on scroll position
  function handleScroll() {
    const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const currentScrollLeft = carouselRef.current.scrollLeft;

    // Adjusting visibility of next button based on scroll position
    /* If (currentScrollLeft === maxScrollLeft) check is added, 
    the nextBtn element doesn't properly hide on Samsung mobile devices. */
    if (currentScrollLeft < maxScrollLeft) {
      nextBtnRef.current.style.display = 'initial'; // Show next button when not scrolled to maximum width 
    }
    else {
      nextBtnRef.current.style.display = 'none'; // Hide next button when scrolled to maximum width
    } 

    // Adjusting visibility of previous button based on scroll position
    if (currentScrollLeft === 0) {
        prevBtnRef.current.style.display = 'none'; // Hide previous button when scrolled to initial width
    } 
    else {
      prevBtnRef.current.style.display = 'initial'; // Show previous button when not scrolled to initial width
    }
  }

  return ( 
    <div className={hidden ? 'carousel recommended-products-carousel' : 'carousel'}>
      <button aria-controls="carousel__slider" aria-label="Show previous image." ref={prevBtnRef} className="carousel__btn carousel__prev-btn" onClick={slideLeft}>
        <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="m16.75 17l-7.5-5l7.5-5a.901.901 0 1 0-1-1.5l-8.502 5.668a1 1 0 0 0 0 1.664L15.75 18.5a.901.901 0 1 0 1-1.5" />
        </svg>
      </button>
      <ul id="carousel__slider" ref={carouselRef} className="carousel__slider" onScroll={handleScroll}>
        <Products url={productsUrl} carousel={true}/>
      </ul>
      <button aria-controls="carousel__slider" aria-label="Show next image." ref={nextBtnRef} className="carousel__btn carousel__next-btn" onClick={slideRight}>
        <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" fillRule="evenodd" d="m7.25 17l7.5-5l-7.5-5a.901.901 0 1 1 1-1.5l8.502 5.668a1 1 0 0 1 0 1.664L8.25 18.5a.901.901 0 1 1-1-1.5" />
        </svg>
      </button>
    </div>
  );
}
 
export default ProductCarousel;
```

### `<ProductPreviewSlider />`

The `<ProductPreviewSlider />` component manages a dynamic image carousel to display product image variations. It utilizes React's **useState** for state management, tracking the current image index, and **useEffect** to handle updates when imgIndex changes. Navigation buttons' **visibility adjusts** based on slider position and the imgIndex, ensuring they appear/disappear appropriately. Scroll behavior is managed through event handlers, providing smooth user interaction. The component integrates **swipe functionality** for touch devices, enhancing usability, and uses semantic HTML elements and ARIA attributes for accessibility. Additionally, it features a vertical thumbnail slider that adapts to a horizontal layout on smaller screens.

![Racing Spirit product details](https://i.imgur.com/yJYPfKu.jpg)

```jsx
import { useEffect, useRef, useState } from "react";
import ProductImgsList from "./ProductImgsList";
import ProductThumbsList from "./ProductThumbsList";
import useSwipe from "../../../hooks/useSwipe";

const ProductPreviewSlider = ({ data: jacket }) => {
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const carouselRef = useRef(null);
  const [ imgIndex, setImgIndex ] = useState(0);

  // Manage arrow buttons visibility on imgIndex change
  useEffect(() => {
    // Reached the end of the product images
    if (imgIndex === carouselRef.current.children.length - 1) {
      nextBtnRef.current.style.display = 'none'; // Hide next button
    } 
    // Reached the start of the product images
    else if (imgIndex === 0) {
      prevBtnRef.current.style.display = 'none'; // Hide previous button
    } 
    // Currently scrolling
    else {
      prevBtnRef.current.style.display = 'block'; // Show previous button
      nextBtnRef.current.style.display = 'block'; // Show next button
    }

    // Check if the current image index is the last one in the carousel
    if (imgIndex === carouselRef.current.children.length - 1) {
      // Scroll to the end of the carousel (right-most image)
      carouselRef.current.scrollTo(carouselRef.current.scrollWidth, 0);
    } 
    // Check if the current image index is the first one in the carousel
    else if (imgIndex === 0) {
      // Scroll to the beginning of the carousel (left-most image)
      carouselRef.current.scrollTo(0, 0);
    }
  }, [imgIndex])

  // Track the last scroll position, initially set to 0 if the carouselRef is not defined
  let lastScrollLeft = carouselRef.current ? carouselRef.current.scrollLeft : 0;

  // Manage arrow buttons visibility on scroll
  function handleScroll() {
    const currentScrollLeft = carouselRef.current.scrollLeft;
    // const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    
    // Scrolling to the right
    if (currentScrollLeft > lastScrollLeft) {
      prevBtnRef.current.style.display = 'block'; // Show previous button
    } 
    // Scrolling to the left
    else if (currentScrollLeft < lastScrollLeft) {
      nextBtnRef.current.style.display = 'block'; // Show next button
    }

    // Scrolling to the left, reached the initial width and the user is on the first image
    if (
      currentScrollLeft < lastScrollLeft && 
      currentScrollLeft === 0 && 
      imgIndex === 0
    ) {
      prevBtnRef.current.style.display = 'none'; // Hide previous button
    } 
    // Scrolling to the right, reached the maximum width and the user is on the last image
    else if (
      currentScrollLeft > lastScrollLeft && 
      /* If (currentScrollLeft === maxScrollLeft &&) check is added, 
      the nextBtn doesn't properly hide on Samsung mobile devices */
      imgIndex === carouselRef.current.children.length - 1
    ) {
      nextBtnRef.current.style.display = 'none'; // Hide next button
    }

    lastScrollLeft = currentScrollLeft;
  }

  function showNextImage() {
    // Update the image index to show the next image, but ensure it doesn't exceed the last image from the carousel
    setImgIndex(index => index === carouselRef.current.children.length - 1 ? carouselRef.current.children.length - 1 : index + 1);
  }

  function showPrevImage() {
    // Update the image index to show the previous image, ensuring it doesn't go below zero
    setImgIndex(index => index === 0 ? 0 : index - 1);
  }

  function slideLeft() {
    showPrevImage();
    const firstImageWidth = carouselRef.current.children[0].clientWidth + 10;
    carouselRef.current.scrollLeft -= firstImageWidth;
  }

  function slideRight() {
    showNextImage(); 
    const firstImageWidth = carouselRef.current.children[0].clientWidth + 10;
    carouselRef.current.scrollLeft += firstImageWidth;
  }

  // Custom hook for swipe functionality
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(showNextImage, showPrevImage);

  return ( 
    <section aria-roledescription="carousel" className="product-slider">
      <ul role="tablist" className="product-slider__vertical-thumbs-container">
        <ProductThumbsList 
          jacket={jacket}
          imgIndex={imgIndex}
          className={"product-slider__vertical-thumb"}
          setImgIndex={setImgIndex}
        />
      </ul>
      <div 
        className="product-slider__main-img"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ProductImgsList jacket={jacket} imgIndex={imgIndex} />
      </div>
      <div className="slider-controls">
        <button aria-controls="slider-controls__carousel" ref={prevBtnRef} className="slider-controls__prev-btn" aria-label="Show previous image." onClick={slideLeft}>
          <svg aria-hidden="true" focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="currentColor" d="M380.6 81.7c7.9 15.8 1.5 35-14.3 42.9L103.6 256 366.3 387.4c15.8 7.9 22.2 27.1 14.3 42.9s-27.1 22.2-42.9 14.3l-320-160C6.8 279.2 0 268.1 0 256s6.8-23.2 17.7-28.6l320-160c15.8-7.9 35-1.5 42.9 14.3z" />
          </svg>
        </button>
        <ul id="slider-controls__carousel" role="tablist" ref={carouselRef} className="slider-controls__carousel" onScroll={handleScroll}>
          <ProductThumbsList 
            jacket={jacket}
            imgIndex={imgIndex}
            className={"slider-controls__carousel-img"}
            setImgIndex={setImgIndex}
          />
        </ul>
        <button aria-controls="slider-controls__carousel" ref={nextBtnRef} className="slider-controls__next-btn" aria-label="Show next image." onClick={slideRight}>
          <svg aria-hidden="true" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path fill="currentColor" d="M3.4 81.7c-7.9 15.8-1.5 35 14.3 42.9L280.5 256 17.7 387.4C1.9 395.3-4.5 414.5 3.4 430.3s27.1 22.2 42.9 14.3l320-160c10.8-5.4 17.7-16.5 17.7-28.6s-6.8-23.2-17.7-28.6l-320-160c-15.8-7.9-35-1.5-42.9 14.3z" />
          </svg>
        </button>
      </div>
    </section>
  );
}
 
export default ProductPreviewSlider;
```

<br />


## Accordion Component

The `<Accordion />` component toggles each item's visibility based on user clicks, managed through **useState** for state and **useEffect** for data initialization. It supports two styles (accordion-faqs for FAQs and default for other content), adjusting button styles and icons accordingly. **Accessibility features** including aria-expanded, aria-controls, aria-hidden, and the inert attribute ensure proper screen reader support. Clicking an item toggles its visibility, optionally keeping others open, enabling interactive content presentation based on the provided data.

```jsx
import '../styles/accordion.css';
import { useState, useEffect } from "react";
import Highlighter from "../pages/About/components/Highlighter";

const Accordion = ({ description, factsData, keepOthersOpen, ulClass, btnClass, query }) => {
  const [ accordionItems, setAccordionItems ] = useState(null);
  const isFaqs = ulClass === 'accordion-faqs'; // Check if the accordion is for FAQs

  useEffect(() => {
    if (factsData) {
      // Returns toggled property for all facts, first is defaulted to true if isFaqs is false
      setAccordionItems([ 
        ...factsData.map((fact, i) => (
          { ...fact, toggled: isFaqs ? false : i === 0 }
        )) 
      ]);
    }
  }, [factsData]);

  // Determines if an item should be toggled or not
  const checkToggled = (clickedItem, fact) => clickedItem.id === fact.id ? !fact.toggled : !keepOthersOpen ? false : fact.toggled;

  // Opens or closes the current item and checks if it has to keep the others open or not
  function toggle(clickedItem) {
    setAccordionItems(prevItems => [ 
      ...prevItems.map(fact => (
        { ...fact, toggled: checkToggled(clickedItem, fact)}
      )) 
    ]);
  }

  // Get button style based on toggled state
  const getButtonStyle = fact => {
    if (fact.toggled) return { backgroundColor: '#fff' };
    return isFaqs ? { backgroundColor: '#fafafa' } : { backgroundColor: '#fff' };
  };

  return ( 
    <ul className={`accordion ${ulClass}`} >
      {accordionItems?.map((fact, i) => (
        <li key={i}>
          <button 
            aria-expanded={fact.toggled} 
            aria-controls={`accordion__section-${fact.title}`} 
            className={`accordion__title-btn ${btnClass}`} 
            style={getButtonStyle(fact)}
            onClick={() => toggle(fact)}
          >
            {isFaqs 
              ? <h3 className="accordion__faqs-title">
                  <Highlighter highlight={query}>{fact.title}</Highlighter>
                </h3> 
              : <h2 className="accordion__product-details-title">{fact.title.toUpperCase()}</h2>
            }
            {isFaqs 
              ? <svg aria-hidden="true" focusable="false" role="presentation" className={fact.toggled ? 'accordion__plus-icon accordion__plus-icon--open' : 'accordion__plus-icon'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              : <svg aria-hidden="true" focusable="false" role="presentation" className={fact.toggled ? 'accordion__chevron accordion__chevron--open' : 'accordion__chevron'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                </svg>
            }
          </button>
          <div 
            inert={!fact.toggled ? 'true' : null}
            role="region" 
            id={`accordion__section-${fact.title}`} 
            aria-hidden={!fact.toggled} 
            className={fact.toggled ? 'accordion__content-container open-accordion-section' : 'accordion__content-container'}
          >
            <div className="accordion__content-wrapper">
              <div className="accordion__content">
                {fact.renderContent(description)}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
 
export default Accordion;
```

> ### Product Details `<Accordion />`
> Additionally, implemented `<ContactForm />` component, a reusable and accessible form, which is utilized in both the accordion component and the contact us page.

![Racing Spirit product details accordion](https://i.imgur.com/fKNYzoa.jpeg)

![Racing Spirit product details accordion reusable form component](https://i.imgur.com/gN52cmD.jpeg)

![Racing Spirit contact page](https://i.imgur.com/f178HEW.jpeg)

> ### FAQs Search and `<Accordion />`
> Moreover, implemented **search functionality** to FAQs which additionally includes **text highlighting** thanks to a dedicated `<Highlighter />` component.

```jsx
import { Fragment } from "react";

const Highlighter = ({ children, highlight }) => {
  // If highlight is empty or only whitespace, return the original children
  if (!highlight.trim()) return <>{children}</>;

  /* Creates a regular expression object to match occurrences of the 'highlight' string,
  ignoring case and trimming any leading or trailing whitespace. */
  const regex = new RegExp(`(${highlight.trim()})`, 'gi');
  /* The parentheses creates a capturing group for the regular expression, allowing the matched
  substring to be also included in the split array, if not it would be ignored. */
  const parts = children.split(regex); // Splits children text into parts based on the regular expression

  // Return a fragment containing the highlighted span and non-highlighted fragments
  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) 
          ? <span key={index} className="highlighted">{part}</span>
          : <Fragment key={index}>{part}</Fragment>
      )}
    </>
  );
};

export default Highlighter;
```

![Racing Spirit about us page FAQs](https://i.imgur.com/cdWjmtE.jpeg)

![Racing Spirit about us page FAQs; text highlighting on search functionality.](https://i.imgur.com/WyEh4Dk.jpeg)

<br />


## Future Improvements

* Set up a server to fetch products from an actual database **(Node.js, Express, and MongoDB)**.

* **Expand the number of jackets**; JSON Server currently supports up to 10kb, and I'm currently at 9.7kb.

* Add authentication with **JWT** (JSON Web Tokens).

* Implement an actual **fully functional cart** with payment options, checkout and product stock validation.

* Ensure all forms are fully functional.

* **Optimize loaders** for improved styling and user experience.

* Add **filter functionality** to jackets and create dedicated pages for each category.

* Implement **progressive loading** for all images and videos to enhance accessibility and user experience.

* Improve the **useFetch** hook by adding cache clearing after a certain amount of time.

* Improve Product Details `<ProductPreviewSlider>` by adding a custom sticky scroll functionality, similar to DoomsdayCo's.