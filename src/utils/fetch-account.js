export const fetchAccount = async (account) => {
  const url = 'https://api.waxsweden.org/v1/chain/get_table_rows'
  const url2 = 'https://wax.greymass.com/v1/chain/get_currency_balance'
  const url3 = 'https://api.wax.alohaeos.com/v1/chain/get_account'

  const body = {
    json: true,
    code: 'dcycmissions',
    scope: 'dcycmissions',
    table: 'users',
    lower_bound: account,
    upper_bound: account,
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

  const body2 = {
    json: true,
    code: 'dcyctokeneos',
    account: account,
    symbol: 'EGG',
  }
  const options2 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body2),
  }

  const response2 = await fetch(url2, options2)
  const data2 = await response2.json()

  const body3 = {
    json: true,
    account_name: account,
  }
  const options3 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body3),
  }

  const response3 = await fetch(url3, options3)
  const data3 = await response3.json()

  return {
    inGameGold: data.rows[0] ? Number(data.rows[0].tokens[0].quantity.split(' ')[0]).toFixed(2) : '0.00',
    inGameEgg: data.rows[0] ? Number(data.rows[0].tokens[1].quantity.split(' ')[0]).toFixed(2) : '0.00',
    inGameWax: data.rows[0] ? Number(data.rows[0].tokens[2].quantity.split(' ')[0]).toFixed(2) : '0.00',
    balanceEgg: data2.length ? Number(data2[0].split(' ')[0]).toFixed(2) : '0.00',
    balanceWax: data3.core_liquid_balance ? Number(data3.core_liquid_balance.split(' ')[0]).toFixed(2) : '0.00',
  }
}
