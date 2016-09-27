'use strict';

/**
 * identity:  Designed to simply return the data type provided as input
 * 
 * @param {Any} value; Input any data type e.g. String, Number, Array, Boolean...
 * @return {Value} value; Returns the data type unchanged
 * 
 */
 
function identity(value) {
    return value;
}

/** 
 * typeOf: Designed to return a String of the input data type provided.
 *
 * @param {Any} value;  String, Array, Object, Function..
 * @return {String} 'value'; Returns the type of <input> as "string" 
 * Ex)  typeOf("Hello World!")  // "string"
 *      typeOf(['a','b'])   // "array"
 */ 
 
function typeOf(value) {
    if (typeof(value) === 'string') {
        return 'string';
    } else if (typeof(value) === 'boolean') {
        return 'boolean';
    } else if (typeof(value) === 'number') {
        return 'number';
    } else if (typeof(value) === 'undefined') {
        return 'undefined';
    } else if (typeof(value) === 'function') {
        return 'function';
    } else if (typeof(value) === 'object') {
        if (value === null) {
            return 'null';
        } else if (value instanceof Date === true) {
            return 'date';
        } else if (Array.isArray(value) === true) {
            return 'array';
        } else return 'object';
    }
}


/**
 * first: Designed to return an Array of the FIRST occurrence of the value in 
 * an Array.
 * 
 * If Array is NOT provided, an empty Array is returned.
 * If Number is NOT provided, the FIRST element of Array is returned.
 * 
 * @param {Array} array; Array in which the number provided will iterate
 * @param {Number} n; Number of elements to return in Array 
 * @return {Array} Returns FIRST occurance of element if found in Array
 * Ex)  first(["a","b","c"], 2)  // output: ["a","b"]
 *      first(["Tom","Jerry","Bugs","Bunny"]) // output: ["Tom"]
 */
 
function first(array, n) {
    if (!Array.isArray(array) || n < 0) return [];
    if (n === undefined || typeof n !== 'number' || n === 1) return array[0];
    return array.slice(0, n);
}


/**
 * last: Designed to return an Array of the LAST occurence of the value in 
 * an Array.
 * 
 * If Array is NOT provided, an empty Array is returned.
 * If Number is NOT provided, the LAST element of Array is returned.
 * 
 * @param {Array} array; Array in which the number provided will iterate
 * @param {Number} n; Number of elements to return in Array 
 * @return {Array} Returns LAST occurance of element if found in Array
 * Ex)  last(["a","b","c"], 2)  // output: ["a","b"]
 *      last(["Tom","Jerry","Bugs","Bunny"]) // output: ["Tom"]
 */
 
function last(array, n) {
    if (n === undefined) {
        return array[array.length - 1];
    } else if (n > array.length) {
        return array;
    } else if (n < 0 || !Array.isArray(array)) {
        return [];
    } else {
        return array.slice(n - 1, array.length);
    }
}


/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array/Object} collection; The collection over which to iterate.
 * @param {Function} action; The Function to be applied to each value in the 
 * collection
 */
 
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}

/**
 * indexOf: Designed to loop over an Array and return the index of a value 
 * in the given array. Returns -1 if value is NOT in array.
 * 
 * @param {Array} array; The collection over which to iterate.
 * @param {Value} value; The value in which will be searched for in array 
 * @return {Number} index; The index number of given value in array
 */

function indexOf(array, value) {
    for(var index = 0; index < array.length; index++) {
        if(value === array[index]) {
            return index;
        }
    }
    return -1;
}


/**
 * filter: Designed to loop over an Array and perform a function on each element
 * in the list provided, then returns a new array for all values that are TRUE
 * 
 * @param {Array} array; The collection over which to iterate.
 * @param {Function} action; The function which will be called on each element 
 * @return {Array} rejected; The new array for all values that returned TRUE
 */

function filter(array, action) {
    var filtered = [];
    if(!typeof(action) === "function") {
        return array;
    } else {
        for(var i = 0; i < array.length; i++) {
            var result = action(array[i], i, array);
            if(result) {
                filtered.push(array[i]);
            }
        }
        return filtered;
    }
}


/**
 * reject: Designed to loop over an Array and perform a function on each element
 * in the list provided, then returns a new array for all values that are FALSE
 * 
 * @param {Array} array; The collection over which to iterate.
 * @param {Function} action; The function which will be called on each element 
 * @return {Array} rejected; The new array for all values that returned FALSE
 */

function reject(array, action) {
    var rejected = [];
    if(!typeof(action) === "function") {
        return array;
    } else {
        for (var i = 0; i < array.length; i++) {
            var result = action(array[i], i, array);
            if(!result){
                rejected.push(array[i]);
            }
        }
        return rejected;
    }
}


/**
 * partition: Designed to loop over an Array and perform a function of each element
 * in the given array. The results are returned into ONE array containing TWO seperate
 * sub-arrays.  One for all values that return TRUE, another array for the values
 * that return FALSE.
 * 
 * @param {Array} array; The collection over which to iterate.
 * @param {Function} action; The string in which will be searched for in array 
 * @return {Array} result; Returns an array containg TWO sub-arrays, one for
 * all values that are TRUE, one for all values that are FALSE
 */

function partition(array, action) {
    var result = [];
    var trueArray = [];
    var falseArray = [];
    if(!typeof(action) === "function") {
        return array;
    } else {
        for(var i = 0; i < array.length; i++) {
            var output = action(array[i], i, array);
            if(output) {
                trueArray.push(array[i]);
            } else {
                falseArray.push(array[i]);
            }
        }
        result.push(trueArray, falseArray);
        return result;
    }
}

/**
 * unique: Designed to sort through a collection (Array) containng elements of
 * any primitive data type e.g. String, Number, Boolean.. Removes all duplicates
 * and returns a new array containing no more than one of each element. 
 * 
 * @param {Array} array; The collection which provides a list of element.
 * @return {Array} unique; Array in which all duplicates have been removed
 */

function unique(array) {
    var unique = array.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    return unique;
}

/**
 * map: Designed to loop over a collection, Array or Object, and creates a new 
 * array containing values that have been transformed by the function provided
 * on each element in the list.
 * 
 * @param {Object/Array} collection; The collection which provides a list of elements.
 * @param {Function} action; The Function to be applied to each value in the collection
 * @return {Array} mapped; Array in which all duplicates have been removed
 */

function map(collection, action) {
    var mapped = [];
    if (typeof(action) === "function") {
        if (Array.isArray(collection)) {
            for (var i = 0; i < collection.length; i++) {
                mapped.push(action(collection[i], i, collection));
            }
            return mapped;
        }
        else {
            for (var x in collection) {
                mapped.push(action(collection[x], x, collection));
            }
            return mapped;
        }
    }
}


/** 
 * pluck:  Designed to loop over an Array and select a given set of values, and 
 * then return an array with the remaining values.
 * 
 * @param {Array} array; The list which contains a set of values 
 * @parm {Value} value; The value in which to look for and select out
 * 
 * @return {Array} plucked; Returns a new array with the specified values provided
 * 
 */

function pluck(array, prop) {
    var plucked = map(array,function(object, i, array){
        return object[prop];
    });
    return plucked;
}

/** 
 * contains:  Designed to loop over an Array and determine if a given value
 * is included in the array provided. Will return a TRUE value if value is 
 * found in the array, and FALSE if not included in the array.
 * 
 * @param {Array} array; The array over which to iterate 
 * @parm {Value} value; The value in which to look for in array provided
 * 
 * @return {Boolean} Returns TRUE if value is found, otherwise FALSE.
 * 
 */
 
function contains(array, value) {
    for(var i = 0; i < array.length; i++) {
        if (array.indexOf(value) > -1) return true;
    }
    return false;
}

/** 
 * every: Designed to loop of a collection (Object/Array) and return a boolean
 * value of TRUE if ALL ELEMENTS have a truthy value. Otherwise it will 
 * return FALSE.
 * 
 * @param {Object/Array} collection; The collection over which to iterate
 * @parm {Function} action;  The function in which to call on elements in collection
 * 
 * @return {Boolean} Returns TRUE if ALL ELEMENTS in the collection provided
 * have a truthy value, otherwise returns FALSE if no values are true
 * 
 */

function every(collection, action) {
    var newArray = [];
    var count = 0;
    if (action === undefined) {
        for (var i = 0; i < collection.length; i++) {
            if (collection[i]) {
                count += 1;
            }
        }
        return (count === collection.length) ? true : false;
    }
    for (var x in collection) {
        newArray.push(action(collection[x], x, collection));
    }
    for (var j = 0; j < newArray.length; j++) {
        if (newArray[j]) {
            count += 1;
        }
    }
    return (count === newArray.length) ? true : false;
}


/** 
 * some: Designed to loop of a collection (Object/Array) and return a boolean
 * value of TRUE if only one element has a truthy value. Otherwise it will 
 * return FALSE.
 * 
 * @param {Object/Array} collection; The collection over which to iterate
 * @parm {Function} action; The function in which to call on elements in collection
 * 
 * @return {Boolean} Returns TRUE if only ONE element in the collection provided
 * has a truthy value, otherwise returns FALSE if no values are true
 * 
 */
 
function some(collection, action) {
    if(action === undefined) {
        for(var i = 0; i < collection.length; i++) {
            return (collection[i]) ? true : false;
        }
    }  
    if (typeof(action) === undefined && typeof(action) === "boolean") {
        if (action) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        var newArray = [];
        var count = 0;
        for (var x in collection) {
            newArray.push(action(collection[x], x, collection));
        }
        for (var j = 0; j < newArray.length; j++) {
            if (newArray[j]) {
                count += 1;
            }
        }
        return (count > 0) ? true : false;
    }
}

/** 
 * reduce: Designed to loop over an Array and call a function on each element
 * of the array to reduce a list of values into a single value.
 * 
 * @param {Array} array; List of values in which to be reduced
 * @parm {Function} action; Function in which to be called upon
 * @param {Value} seed; Value in which will act as a base on first iteration
 * 
 * @return {Value} Returns a value which will be the result of calling the function
 * on each element passed through
 * 
 */

function reduce(array, action, start) {
    var result;
    if (start !== undefined) {
        result = start;
        each(array, function(element, i, arr) {
            result = action(result, element, i);
        });
    } else {
        result = array[0];
        each(array, function(element, i, arr) {
            if (i === 0) return;
            result = action(result, element, i);
        });
    }
    return result;
}


/** 
 * extend:  Designed to modify or extend an Object's properties (key/value pairs)
 * with another Object and return the original Object with the modified properties.
 * This will replace key/value if already exists, or add a new pair if it does not
 * 
 * @param {Object} obj1; The original Object to be modified
 * @param {Object} obj2; The new Object to replace the original Object
 * @param {Object} obj3; (Optional) Can take as many arguements as you wish
 * @return {Object} obj1; Returns the original Object modified with either the 
 * replaced properties, or the new key/value pairs provided.
 * 
 */
 
function extend(obj1, obj2, obj3, etc){
    for(var i = 1; i < arguments.length; i++){
        each(arguments[i], function(value, key){
            obj1[key] = value;
        });
    }
    return obj1;
}

module.exports.identity = identity;
module.exports.typeOf = typeOf;
module.exports.first = first;
module.exports.last = last;
module.exports.each = each;
module.exports.indexOf = indexOf;
module.exports.filter = filter;
module.exports.reject = reject;
module.exports.partition = partition;
module.exports.unique = unique;
module.exports.map = map;
module.exports.pluck = pluck;
module.exports.contains = contains;
module.exports.every = every;
module.exports.some = some;
module.exports.reduce = reduce;
module.exports.extend = extend;