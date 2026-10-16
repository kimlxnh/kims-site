function getLonger (a, b) {
    if (a == undefined || b == undefined){
        throw new Error ('This function requires two arguments!')
    }  
    if (typeof a !== "string" || typeof b !== "string"){
        throw new Error ('Arguments must be strings!')
    }

    if (a.length > b.length){
        return a
    } else {
        return b
    }
}

function greet (name){
    if (greet == undefined){
        return "Hi!"
    } else {
        return "Hello, " + name + "!"
    }
    
}

module.exports = {getLonger, greet}