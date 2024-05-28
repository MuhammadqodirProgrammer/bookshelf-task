export const getPaginationsItems = (currentPage: number, lastPage: number, maxLength: number) => {
  const result: Array<number> = []

  if (lastPage <= maxLength) {
    for (let i = 1; i <= lastPage; i++) {
      result.push(i)
    }
  } else {
    let firstPage = 1
    const confirmationLength = 3
    const deductedMaxLength = maxLength - confirmationLength
    const sideLength = deductedMaxLength / 2

    if (currentPage - firstPage < sideLength || lastPage - currentPage < sideLength) {
      for (let j = 1; j <= firstPage + sideLength; j++) {
        result.push(j)
      }

      result.push(NaN)

      for (let k = lastPage - sideLength; k <= lastPage; k++) {
        result.push(k)
      }
    } else if (currentPage - firstPage >= deductedMaxLength && lastPage - currentPage >= deductedMaxLength) {
      const deductedSideLength = sideLength - 1

      result.push(firstPage)
      result.push(NaN)

      for (let l = currentPage - deductedSideLength; l <= currentPage + deductedSideLength; l++) {
        result.push(l)
      }

      result.push(NaN)
      result.push(lastPage)
    } else {
      let isNearFistPage = currentPage - firstPage < lastPage - currentPage
      let remainingLength = maxLength

      if (isNearFistPage) {
        for (let m = 1; m <= currentPage + 1; m++) {
          result.push(m)
          remainingLength -= 1
        }

        result.push(NaN)
        remainingLength -= 1

        for (let n = lastPage - (remainingLength - 1); n <= lastPage; n++) {
          result.push(n)
        }
      } else {
        for (let o = lastPage; o >= currentPage - 1; o--) {
          result.unshift(o)
          remainingLength -= 1
        }

        for (let p = remainingLength; p >= 1; p--) {
          result.unshift(p)
        }
      }
    }
  }

  return result
}
