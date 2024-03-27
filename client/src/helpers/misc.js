export const idFromTabLabel = (tabLabel, array) => {
  const tab = array.find((tab) => tab.label === tabLabel)
  if (!tab) {
    return 0
  }
  return parseInt(tab.id) - 1
}
