import React from 'react'
import { Link } from 'react-router-dom'
import '../NavBar/styles.css'

const NavBar = (props) => {
  return (
    <div className="navbar-component">
      <div className="navbar-component-sized">
        <div className="navbar-links">
          <div>
            <Link to="/dcyc-tools" className="navbar-links-home">
              Monitoring
            </Link>
          </div>
          {/* <div>
            <Link to="/bot" className="navbar-links-bot">
              Bot
            </Link>
          </div> */}
          <div>
            <Link to="/calculator" className="navbar-links-calculator">
              Calculator
            </Link>
          </div>
        </div>
        <div className="navbar-prices">
          <div className="navbar-prices-ratio">
            <div className="navbar-prices-ratio-images">
              <img src="./images/dcyc-gold.png" alt="dcyc-gold" />
              <span className="ratio-images-span">/</span>
              <img src="./images/dcyc-egg.png" alt="dcyc-egg" />
            </div>
            <div className="navbar-prices-ratio"> {props.eggGoldRatio}</div>
          </div>
          <div className="navbar-prices-eggprice">
            <div className="navbar-prices-eggprice-images">
              <img src="./images/dcyc-egg.png" alt="dcyc-egg" />
              <span className="eggprice-images-span">/</span>
              <img src="./images/wax.png" alt="wax" />
            </div>
            <div className="navbar-prices-eggprice"> {props.eggPrice}</div>
            <div className="navbar-end">
              <div>
                <button className="navbar-darklightmode" onClick={props.toggle}>
                  {props.theme === 'light' ? <img src="./images/light-off.png" alt="light-off" /> : <img src="./images/light-on.png" alt="light-on" />}
                </button>
              </div>
            </div>
          </div>
          {/*<div className="navbar-profile">UserName</div>*/}
          {/* <div>
            <button className="navbar-wallet">Connect Wallet</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default NavBar
