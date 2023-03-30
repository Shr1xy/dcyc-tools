import { useState } from 'react'
import { Input } from '../Input'
import { Selector } from '../Selector'
import { getInfo } from '../../utils/get-chicken-info'
import '../Chickens/styles.css'

import uncommon_c1 from '../../templates/601886_U_C1'
import rare_c1 from '../../templates/601889_R_C1'
import epic_c1 from '../../templates/601919_E_C1'
import legendary_c1 from '../../templates/601925_L_C1'
import mythic_c1 from '../../templates/601929_M_C1'
import uncommon_c2 from '../../templates/611227_U_C2'
import rare_c2 from '../../templates/611239_R_C2'
import epic_c2 from '../../templates/611240_E_C2'
import legendary_c2 from '../../templates/611242_L_C2'
import mythic_c2 from '../../templates/611244_M_C2'
import uncommon_c3 from '../../templates/620591_U_C3'
import rare_c3 from '../../templates/620592_R_C3'
import epic_c3 from '../../templates/620594_E_C3'
import legendary_c3 from '../../templates/620597_L_C3'
import mythic_c3 from '../../templates/620599_M_C3'
import uncommon_c4 from '../../templates/626936_U_C4'
import rare_c4 from '../../templates/626937_R_C4'
import epic_c4 from '../../templates/626940_E_C4'
import legendary_c4 from '../../templates/626943_L_C4'
import mythic_c4 from '../../templates/626946_M_C4'
import uncommon_c5 from '../../templates/643579_U_C5'
import rare_c5 from '../../templates/643580_R_C5'
import epic_c5 from '../../templates/643584_E_C5'
import legendary_c5 from '../../templates/643588_L_C5'
import mythic_c5 from '../../templates/643590_M_C5'
import missions_map from '../../templates/missions_map'
import rarity_template from '../../templates/rarity_template'

const hashMap = {
  uncommon_c1,
  rare_c1,
  epic_c1,
  legendary_c1,
  mythic_c1,
  uncommon_c2,
  rare_c2,
  epic_c2,
  legendary_c2,
  mythic_c2,
  uncommon_c3,
  rare_c3,
  epic_c3,
  legendary_c3,
  mythic_c3,
  uncommon_c4,
  rare_c4,
  epic_c4,
  legendary_c4,
  mythic_c4,
  uncommon_c5,
  rare_c5,
  epic_c5,
  legendary_c5,
  mythic_c5,
}

const rarityOptions = [
  {
    name: 'Uncommon',
    value: 'uncommon',
  },
  {
    name: 'Rare',
    value: 'rare',
  },
  {
    name: 'Epic',
    value: 'epic',
  },
  {
    name: 'Legendary',
    value: 'legendary',
  },
  {
    name: 'Mythic',
    value: 'mythic',
  },
]
const classOptions = [
  {
    value: '1',
    name: '1',
  },
  {
    value: '2',
    name: '2',
  },
  {
    value: '3',
    name: '3',
  },
  {
    value: '4',
    name: '4',
  },
  {
    value: '5',
    name: '5',
  },
]

export const Chickens = (props) => {
  const [minLvl, setMinLvl] = useState(0)
  const [maxLvl, setMaxLvl] = useState(200)
  const [rarity, setRarity] = useState('uncommon')
  const [classLevel, setClassLevel] = useState('1')

  const handleRarityChange = (value) => setRarity(value)
  const handleClassLevelChange = (value) => setClassLevel(value)
  const handleMinLvlChange = (value) => setMinLvl(value)
  const handleMaxLvlChange = (value) => setMaxLvl(value)
  const key = `${rarity}_c${classLevel}`
  const reward = (missions_map[rarity_template[key][0]][maxLvl].reward * 8).toFixed(2)

  // console.log(missions_map[rarity_template[key][0]][maxLvl])

  const { goldPrice, transformedEggPrice, waxPrice, speedUp, timeToUpgrade } = getInfo(hashMap[key], minLvl, maxLvl, props.pr1, props.pr2)
  return (
    <div className="chickens">
      {/*<div className="chick__name">Chickens</div>*/}
      <div className="chickens__selectors">
        <Selector className="rarity" label="Rarity: " options={rarityOptions} onChange={handleRarityChange} value={rarity} />
        <Selector className="class" label="Class: " options={classOptions} onChange={handleClassLevelChange} value={classLevel} />
        <Input label="Level: " value={minLvl} onChange={handleMinLvlChange} type="number" min="0" max="199" step="1" />
        <span>-</span>
        <Input value={maxLvl} onChange={handleMaxLvlChange} type="number" min="1" max="200" step="1" />
      </div>
      <div className="chickens__info">
        <div className="upgrade">
          <p>
            <span className="info-row__name">Upgrade cost in gold: </span>
            <span className="info-row__value">{goldPrice}</span>
          </p>
          <p>
            <span className="info-row__name">Upgrade cost in egg: </span>
            <span className="info-row__value">{transformedEggPrice}</span>
          </p>
          <p>
            <span className="info-row__name">Upgrade cost in wax: </span>
            <span className="info-row__value">{waxPrice}</span>
          </p>
        </div>
        <hr />
        <div className="rewards">
          <p>
            <span className="info-row__name">Reward per 8 missions (West) in gold: </span>
            <span className="info-row__value">{reward}</span>
          </p>
          <p>
            <span className="info-row__name">Reward per 8 missions (West) in egg: </span>
            <span className="info-row__value">{(reward * props.pr2).toFixed(2)}</span>
          </p>
          <p>
            <span className="info-row__name">Reward per 8 missions (West) in wax: </span>
            <span className="info-row__value">{(reward * props.pr2 * props.pr1).toFixed(2)}</span>
          </p>
        </div>
        <hr />
        <div className="time-upgrade">
          <p>
            <span className="info-row__name">Time to upgrade: </span>
            <span className="info-row__value">{timeToUpgrade}</span>
          </p>
        </div>
        <hr />
        <div className="speedup">
          <p>
            <span className="info-row__name">Speedup cost in gold: </span>
            <span className="info-row__value">{speedUp}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
