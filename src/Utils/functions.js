const {decayData, usageData} = require('./Json');

export const findDacayUsageValue = (query, key) => {
  return key === 'decay' ? decayData[query] : usageData[query];
};

export const findDacayUsageKeyByValue = (query, key) => {
  return key === 'decay'
    ? Object.keys(decayData).find(
        k => decayData[k].replaceAll(`'`, ``) === query.replaceAll(`’`, ``),
      )
    : Object.keys(usageData).find(k => usageData[k] === query);
};

export const addZeroes = num => {
  return num.toLocaleString('en', {
    useGrouping: false,
    minimumFractionDigits: 2,
  });
};

export const formatName = name => {
  return name?.replaceAll(' ', '\n');
};

export const randomNameGenerator = () => {
  return parseInt(new Date().getTime() + Math.random() * 100);
};
