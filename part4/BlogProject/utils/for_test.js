const reverse=(string)=>{
    return string.split('').reverse().join('')
}

const average=(array)=>{
    const reducer=(sum,item)=>{
        return item+sum;
    }
    return array.length===0?0:array.reduce(reducer,0)
}

module.exports={
    average,reverse
}