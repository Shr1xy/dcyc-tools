import React from 'react'
import { Chickens } from '../../components/Chickens'
import '../Calculator/styles.css'

const Calculator = (props) => {
  return <div className="container-calculator">{<Chickens pr1={props.eggPrice} pr2={props.eggGoldRatio} />}</div>
}

export default Calculator
