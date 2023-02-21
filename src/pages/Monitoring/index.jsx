import './styles.css'
import { useState, useEffect } from 'react'
import { fetchAccount } from '../../utils/fetch-account'
import { fetchAssets } from '../../utils/fetch-assets'
import { template_ID_String } from '../../templates/rarity'

const Monitoring = (props) => {
  const [account, setAccount] = useState('')
  const [buttons, setButtons] = useState(JSON.parse(localStorage.getItem('buttons')) || [])
  const [currentlyActive, setCurrentlyActive] = useState('')
  const [userBalance, setUserBalance] = useState()
  const [assets, setAssets] = useState('')

  const handleAddAccount = () => {
    if (buttons.length >= 8) {
      setAccount('')
      return alert('You have reached the maximum number of accounts.')
    }

    const accountWithoutSpaces = account.trim()
    if (!accountWithoutSpaces) {
      setAccount('')
      return alert('Account name cannot be empty.')
    }

    const accountExists = buttons.some((button) => button.account === accountWithoutSpaces)
    if (accountExists) {
      setAccount('')
      return alert('Account name already exists.')
    }

    setButtons([...buttons, { account: accountWithoutSpaces }])
    setAccount('')
    localStorage.setItem('buttons', JSON.stringify([...buttons, { account: accountWithoutSpaces }]))
  }

  const handleClearAccountList = () => {
    if (!buttons.length) return

    setButtons([])
    setCurrentlyActive('')
    setUserBalance('')
    setAssets('')
    localStorage.removeItem('buttons')
  }

  const handleToggleActive = (event) => {
    setCurrentlyActive(event.target.innerText)
  }

  const handleRemoveCurrent = () => {
    const filteredOut = buttons.filter((button) => button.account !== currentlyActive)
    setButtons(filteredOut)
    setCurrentlyActive('')
    setUserBalance('')
    setAssets('')
    localStorage.setItem('buttons', JSON.stringify(filteredOut))
  }

  useEffect(() => {
    if (currentlyActive) {
      ;(async () => {
        try {
          const data = await fetchAccount(currentlyActive)
          setUserBalance(data)
        } catch (error) {
          console.error(error)
          handleRemoveCurrent()
          setUserBalance('')
          setAssets('')
          return alert('Failed to fetch account, try again please and make sure you input the correct name.')
        }

        try {
          const data2 = await fetchAssets(currentlyActive)
          setAssets(data2)
        } catch (error) {
          console.error(error)
          handleRemoveCurrent()
          setUserBalance('')
          setAssets('')
          return alert('Failed to fetch account, try again please and make sure you input the correct name.')
        }
      })()
    }
  }, [currentlyActive])

  useEffect(() => {
    if (currentlyActive) {
      const interval = setInterval(async () => {
        setAssets((prevAssets) => {
          const updatedAssets = { ...prevAssets }
          updatedAssets.allData?.forEach((asset, i) => {
            const currentTime = new Date()
            const timeLeft = new Date(asset.available_at).getTime() - new Date(asset.available_at).getTimezoneOffset() * 60 * 1000 - currentTime
            const seconds = Math.floor(timeLeft / 1000) % 60
            const minutes = Math.floor(timeLeft / 1000 / 60) % 60
            const hours = Math.floor(timeLeft / 1000 / 60 / 60)
            asset.time_left = `${hours >= 10 ? `${hours}` : hours < 10 && hours > 0 ? `0${hours}` : '00'}:${minutes >= 10 ? `${minutes}` : minutes < 10 && minutes > 0 ? `0${minutes}` : '00'}:${seconds >= 10 ? `${seconds}` : seconds < 10 && seconds > 0 ? `0${seconds}` : '00'}`
          })
          return updatedAssets
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [currentlyActive])

  useEffect(() => {
    if (currentlyActive) {
      const interval = setInterval(async () => {
        const data = await fetchAccount(currentlyActive)
        setUserBalance(data)
        //console.log('fetched balance at ' + new Date().toLocaleTimeString())
        const data2 = await fetchAssets(currentlyActive)
        setAssets(data2)
        //console.log('fetched assets at ' + new Date().toLocaleTimeString())
      }, 300000)

      return () => clearInterval(interval)
    }
  }, [currentlyActive])

  return (
    <>
      <div className="container">
        <div className="monitoring-accounts">
          <p className="head">Monitoring accounts</p>
          <input type="text" placeholder="Enter your wax wallet" value={account} onChange={(e) => setAccount(e.target.value)} />
          <div className="buttons">
            <button className="add" onClick={handleAddAccount}>
              Add
            </button>
            <button className="remove-current" onClick={handleRemoveCurrent} disabled={!currentlyActive}>
              Remove current
            </button>
            <button className="remove-all" onClick={handleClearAccountList}>
              Remove all
            </button>
          </div>
          <div className="added-accounts">
            {buttons.map((button, index) => (
              <button key={index} className={`account${currentlyActive === button.account ? '-active' : ''}`} onClick={handleToggleActive}>
                {button.account}
              </button>
            ))}
          </div>
        </div>
        <div className="display-added-account">
          <p className="account-head">{currentlyActive ? currentlyActive : 'Account name'}</p>
          <p>Wax balance: {userBalance ? userBalance?.balanceWax : '0.00'}</p>
          <p>Egg balance: {userBalance ? userBalance?.balanceEgg : '0.00'}</p>
          <span>_ _ _ _ _ _ _</span>
          <p>In-game wax: {userBalance ? userBalance?.inGameWax : '0.00'}</p>
          <p>In game egg: {userBalance ? userBalance?.inGameEgg : '0.00'}</p>
          <p>In game gold: {userBalance ? userBalance?.inGameGold : '0.00'}</p>
        </div>
      </div>
      <div className="assets">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Rarity</th>
              <th>lvl</th>
              <th>Mission name</th>
              <th>Completed missions</th>
              <th>Time left</th>
              <th>Gold cost</th>
              <th>Wax cost</th>
              <th>Gold rewards</th>
              <th>Pure profit in Wax</th>
            </tr>
          </thead>
          <tbody>
            {assets ? (
              assets.allData?.map((asset, i) => (
                <tr key={i} className="asset">
                  <td className="template-number">{i + 1}</td>
                  <td className="template-id">{template_ID_String[asset.template_id]}</td>
                  <td className="level">{asset.level}</td>
                  <td className="mission-name">{asset.mission_name}</td>
                  <td className="missions-completed">{`${asset.missions_completed} / 8`}</td>
                  <td className="mission-time-left">{asset.time_left}</td>
                  <td className="mission-cost-gold">{asset.mission_cost_gold}</td>
                  <td className="mission-cost-wax">{asset.mission_cost_wax}</td>
                  <td className="mission-reward">{asset.mission_reward}</td>
                  <td className="mission-pure-profit">{(Number(asset.mission_reward - asset.mission_cost_gold) * Number(props.eggGoldRatio * props.eggPrice) - asset.mission_cost_wax).toFixed(3)}</td>
                </tr>
              ))
            ) : (
              <tr className="asset">
                <td>1</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>TOTAL</th>
              <td>{assets?.allCostGold}</td>
              <td>{assets?.allCostWax}</td>
              <td>{assets?.allRewards}</td>
              <td>{assets ? (assets?.pureProfit * Number(props.eggGoldRatio * props.eggPrice) - assets?.allCostWax).toFixed(3) : '-'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}

export default Monitoring
