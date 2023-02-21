export const fetchAssets = async (account) => {
  const url = 'https://api.waxsweden.org/v1/chain/get_table_rows'
  //const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  //const corsUrl = proxyUrl + url

  const allData = []
  const current_time = new Date()
  const allCostGold = []
  const allCostWax = []
  const allRewards = []
  const pureProfit = []

  const body = {
    json: true,
    code: 'dcycmissions',
    scope: account,
    table: 'usermissions',
    limit: 375,
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  const response = await fetch(url, options)
  const data = await response.json()

  await Promise.all(
    data.rows.map(async (item) => {
      const dataMissions = {
        json: true,
        code: 'dcycmissions',
        scope: 'dcycmissions',
        table: 'missions',
        limit: 375,
        lower_bound: String(item.completed_missions[0]),
        upper_bound: String(item.completed_missions[0]),
      }

      const optionsMissions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataMissions),
      }

      const responseMissions = await fetch(url, optionsMissions)
      const parsedResponseMissions = await responseMissions.json()

      const endTime = new Date(item.available_at)
      const timeLeft = endTime.getTime() - endTime.getTimezoneOffset() * 60 * 1000 - current_time

      const seconds = Math.floor(timeLeft / 1000) % 60
      const minutes = Math.floor(timeLeft / 1000 / 60) % 60
      const hours = Math.floor(timeLeft / 1000 / 60 / 60)

      allCostGold.push(Number(parsedResponseMissions.rows[0]?.mission_cost[0]?.quantity.split(' ')[0] * 8).toFixed(3))
      allCostWax.push(Number(parsedResponseMissions.rows[0]?.mission_cost[1]?.quantity.split(' ')[0] * 8).toFixed(3))
      allRewards.push(Number(parsedResponseMissions.rows[0]?.mission_reward_success[0]?.quantity.split(' ')[0] * 8).toFixed(3))
      pureProfit.push(Number(parsedResponseMissions.rows[0]?.mission_reward_success[0]?.quantity.split(' ')[0] * 8).toFixed(3) - Number(parsedResponseMissions.rows[0]?.mission_cost[0]?.quantity.split(' ')[0] * 8).toFixed(3))

      const obj = {
        template_id: parsedResponseMissions.rows[0]?.allowlist[0][0]?.template_id,
        level: parsedResponseMissions.rows[0]?.allowlist[0][0]?.level_req,
        mission_name: parsedResponseMissions.rows[0]?.info[0]?.value,
        mission_cost_gold: Number(parsedResponseMissions.rows[0]?.mission_cost[0]?.quantity.split(' ')[0] * 8).toFixed(3),
        mission_cost_wax: Number(parsedResponseMissions.rows[0]?.mission_cost[1]?.quantity.split(' ')[0] * 8).toFixed(3),
        mission_reward: Number(parsedResponseMissions.rows[0]?.mission_reward_success[0]?.quantity.split(' ')[0] * 8).toFixed(3),
        missions_completed: item.completed_missions.length,
        time_left: timeLeft > 0 ? `${hours >= 10 ? `${hours}` : hours < 10 && hours > 0 ? `0${hours}` : '00'}:${minutes >= 10 ? `${minutes}` : minutes < 10 && minutes > 0 ? `0${minutes}` : '00'}:${seconds >= 10 ? `${seconds}` : seconds < 10 && seconds > 0 ? `0${seconds}` : '00'}` : '00:00:00',
        available_at: item.available_at,
        // allCostGold: allCostGold,
        // allCostWax: allCostWax,
        // allRewards: allRewards,
      }
      allData.push(obj)
    })
  )
  // data.rows.forEach(async (item, index) => {

  // })

  //console.log(allData)
  // allCostGold.reduce((a, b) => Number(a) + Number(b))
  // allCostWax.reduce((a, b) => Number(a) + Number(b))
  // allRewards.reduce((a, b) => Number(a) + Number(b))

  return {
    allData: allData,
    allCostGold: allCostGold.reduce((a, b) => (Number(a) + Number(b)).toFixed(3)),
    allCostWax: allCostWax.reduce((a, b) => (Number(a) + Number(b)).toFixed(3)),
    allRewards: allRewards.reduce((a, b) => (Number(a) + Number(b)).toFixed(3)),
    pureProfit: pureProfit.reduce((a, b) => (Number(a) + Number(b)).toFixed(3)),
  }
}
