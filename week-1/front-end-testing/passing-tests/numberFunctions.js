//check if getBigger exists, if it's a function, returns a number when given two numbers

function getBigger (a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
}
}

function getSmallest (arr) {
    if (arr.length == 0 || !arr){
        return null
    }
    let smallestNo = arr[0] 
    for (let i=0; i<arr.length; i++){
    if (smallestNo > arr[i] ) {
        smallestNo = arr[i]
    }
    }
    return smallestNo;
}

function countValue (arr, value){
    if (!arr || arr.length == 0){
        return 0;
    } 
    if (value == undefined){
        return null
    }
    let count = 0;
    for(let i=0; i<arr.length;i++){
        if (arr[i] == value) {
            count++;
        }
    }
    return count;
}
    /*
    if (!value & arr())
        {
        return null
    }else {
        return value
    }
}
    */

module.exports = {getBigger, getSmallest, countValue}