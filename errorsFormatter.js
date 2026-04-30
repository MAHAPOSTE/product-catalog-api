const errorsFormatter = (errors) => {
  const result = [];
  for(let key in errors){
    const errObj = { [key]: errors[key].message };
    result.push(errObj);
  }
  return result;
}
export default errorsFormatter;