const querySearch = function(query){
    const list = query.split('&')
    const Obj = {}
    for (let i = 0; i < list.length; i++) {
        const e = list[i];
        const keyValueList = e.split('=')
        Obj[keyValueList[0]] = keyValueList[1]
    }
    return Obj
}

export default querySearch;