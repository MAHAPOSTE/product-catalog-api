const errorsFormatter=(errors)=>{
const result = [];
    for(let key in errors){
    //computed property-dynamically creating key's from a variable
    const errObj = { [key]:errors[key].message };
    result.push(errObj);
        }
        return result;
}

export default errorsFormatter;

//common js
//module.export=errorsFormatter