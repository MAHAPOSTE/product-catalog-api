const calculateSum = (values) => {
  const num = values.split(',');
  let sum = 0;

  num.forEach(ele => {
    let n = Number(ele.trim());
    if (!isNaN(n)) {
      sum += n;
    }
  });

  return { sum };
};

export default calculateSum;