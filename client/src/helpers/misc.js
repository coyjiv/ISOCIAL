export const idFromTabLabel = (tabLabel, array) =>
  parseInt(array.find((tab) => tab.label === tabLabel).id) - 1
