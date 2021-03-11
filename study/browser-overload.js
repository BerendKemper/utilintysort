'use strict';





// let clients = [].concat.apply([], json.map( c => c.clients )); console.log('clients:', clients);
const utilintySort = (list, ascending = true) => {
    if (typeof ascending !== 'boolean') throw new TypeError('Param ascending must be a boolean');
    let objNumMin = {};
    let objNumPlus = {};
    for (let i = 0; i < list.length; i++) {
        const int = list[i];
        if (int >= 0) {
            if (objNumPlus[int] !== undefined)
                objNumPlus[int].push(int);
            else
                objNumPlus[int] = [int];
        }
        else {
            if (objNumMin[-int] !== undefined)
                objNumMin[-int].push(int);
            else
                objNumMin[-int] = [int];
        }
    }
    var sorted = [];
    const sortedLoop = (SortedObjFirst, sortedObjSecond) => {
        const sortedArraysFirst = Object.values(SortedObjFirst);
        // for (let int = sortedArraysFirst.length - 1; int >= 0; int--) {
        //     const sortedArrayFirst = sortedArraysFirst[int];
        //     for (let i = sortedArrayFirst.length - 1; i >= 0; i--)
        //         sorted.push(sortedArrayFirst[i]);
        // }

        const sortedArraysSecond = Object.values(sortedObjSecond);
        // // sorted = [].concat.apply([], sortedArraysSecond);
        // for (let sortedArraySecond of sortedObjSecond) {
        //     for (let i of sortedArraySecond)
        //         sorted.push(i);
        // }
        // for (let int in sortedObjSecond) {
        //     const sortedArraySecond = sortedObjSecond[int];
        // }
    };
    if (ascending === true)
        sortedLoop(objNumMin, objNumPlus);
    else
        sortedLoop(objNumPlus, objNumMin);
    return sorted;
};





const measureOverload = (sort, list, ascending, timesTesting) => {
    let sorted;
    let high = 0;
    let low = 1000;
    let avg = 0;
    for (let times = 0; times < timesTesting; times++) {
        if (sort === "utilintySort") {
            var t0 = performance.now();
            sorted = utilintySort(list, ascending);
            var t1 = performance.now() - t0;
        }
        if (sort === "Array-sort") {
            const unsorted = Array.from(list);
            var t0 = performance.now();
            sorted = unsorted.sort((a, b) => ascending === true ? a - b : b - a);
            var t1 = performance.now() - t0;
        }
        avg += performance.now() - t0;
        if (low > t1) low = t1;
        if (high < t1) high = t1;
    }
    console.log(`Test:    ${sort}`);
    console.log(sorted);
    console.log('slowest:', high, 'milliseconds');
    console.log('fastest:', low, 'milliseconds');
    console.log('avarage:', avg / timesTesting, 'milliseconds\n');
    console.log('\n');
    return sorted;
};
const generateOverloadArray = (size, range) => {
    const millionArr = [];
    for (let i = 0; i < size; i++) {
        const rInt = Math.floor(range - Math.random() * 1000);
        millionArr.push(rInt);
    }
    return millionArr;
};





// testing array of integers down here
let millionArr;
console.log('millionArr (1 million size array of objects):\n', millionArr, '\n');
console.log('\n');




millionArr = generateOverloadArray(1000000, 1000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 2000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 10000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 100000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000000000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000);
measureOverload('utilintySort', millionArr, true, 100);

millionArr = generateOverloadArray(1000000, 1000);
measureOverload('utilintySort', millionArr, true, 100);
