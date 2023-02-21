export const getInfo = (rarityClass, minLevel, maxLevel, eggPrice, goldEggRatio) => {
  const filteredClass = rarityClass.filter((range) => range.new_level >= Number(minLevel) + 1 && range.new_level <= Number(maxLevel))

  const arrayCost = filteredClass.map((item) => Number(item.cost[0].quantity.split(' ')[0]))
  const arraySpedupCost = filteredClass.map((item) => Number(item.speed_up_cost[0].quantity.split(' ')[0]))
  const arrayTime = filteredClass.map((item) => Number(item.level_duration))

  if (arrayCost.length > 0) {
    const sum = arrayCost.reduce((a, b) => a + b)
    const sumSpeedup = arraySpedupCost.reduce((a, b) => a + b)
    let sumTime = arrayTime.reduce((a, b) => a + b)

    const days = Math.floor(sumTime / 86400)
    sumTime = sumTime % 86400
    const hours = Math.floor(sumTime / 3600)
    sumTime = sumTime % 3600
    const minutes = Math.floor(sumTime / 60)
    sumTime = Math.floor(sumTime % 60)
    const time = `${days >= 10 ? `${days}d` : days < 10 && days > 0 ? `${days}d` : '0d'} ${hours >= 10 ? `${hours}h` : hours < 10 && hours > 0 ? `0${hours}h` : '00h'}:${minutes >= 10 ? `${minutes}m` : minutes < 10 && minutes > 0 ? `0${minutes}m` : '00m'}:${sumTime >= 10 ? `${sumTime}s` : sumTime < 10 && sumTime > 0 ? `0${sumTime}s` : '00s'}`

    if (sum >= 0.1) {
      return {
        goldPrice: `${sum.toFixed(2)}`,
        transformedEggPrice: `${(sum * goldEggRatio).toFixed(2)}`,
        waxPrice: `${(sum * eggPrice * goldEggRatio).toFixed(2)}`,
        speedUp: `${sumSpeedup.toFixed(2)}`,
        timeToUpgrade: `${time}`,
      }
    }
    if (sum < 0.1) {
      return {
        goldPrice: `${sum.toFixed(8)}`,
        transformedEggPrice: `${(sum * goldEggRatio).toFixed(8)}`,
        waxPrice: `${(sum * eggPrice * goldEggRatio).toFixed(8)}`,
        speedUp: `${sumSpeedup.toFixed(8)}`,
        timeToUpgrade: `${time}`,
      }
    }
  }

  if (arrayCost.length === 0) {
    return {
      goldPrice: 'N/A',
      transformedEggPrice: 'N/A',
      waxPrice: 'N/A',
      speedUp: 'N/A',
      timeToUpgrade: 'N/A',
    }
  }
}
