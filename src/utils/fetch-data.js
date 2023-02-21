export const fetchData = async () => {
  const eggPriceResponse = await fetch('https://wax.alcor.exchange/api/markets/633')
  const price = await eggPriceResponse.json()

  const body = {
    json: true,
    code: 'dcycmissions',
    scope: 'dcycmissions',
    table: 'swaps',
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  const eggGoldRatioResponse = await fetch('https://api.wax.alohaeos.com/v1/chain/get_table_rows', options)
  const eggGoldRation = await eggGoldRatioResponse.json()

  const { asset_a, asset_b } = eggGoldRation.rows[0]
  const ratio = (asset_b.quantity.split(' ')[0] / asset_a.quantity.split(' ')[0]).toFixed(2)
  return {
    price: Number(price.last_price),
    ratio: Number(ratio),
  }
}
