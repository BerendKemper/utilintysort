'use strict';





const utilintySort = (list, ascending = true) => {
    if (typeof ascending !== 'boolean') throw new TypeError('Param ascending must be a boolean');
    const objNumMin = {};
    const objNumPlus = {};
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
    const sorted = [];
    const sortedLoop = (SortedObjFirst, sortedObjSecond) => {
        const sortedArraysFirst = Object.values(SortedObjFirst);
        for (let int = sortedArraysFirst.length - 1; int >= 0; int--) {
            const sortedArrayFirst = sortedArraysFirst[int];
            for (let i = sortedArrayFirst.length - 1; i >= 0; i--)
                sorted.push(sortedArrayFirst[i]);
        }
        const sortedArraysSecond = Object.values(sortedObjSecond);
        for (let sortedArraySecond of sortedArraysSecond) {
            for (let i of sortedArraySecond)
                sorted.push(i);
        }
    };
    if (ascending === true)
        sortedLoop(objNumMin, objNumPlus);
    else
        sortedLoop(objNumPlus, objNumMin);
    return sorted;
};





// testing array of integers down here
let millionArr = [];
for (let i = 0; i < 1000000; i++) {
    const rInt = Math.floor(Math.random() * 1000);
    millionArr.push(rInt);
}
console.log('millionArr (1 million size array of objects):\n', millionArr, '\n');
console.log('\n');
let sorted;
let high;
let low;
let avg;
const timesTesting = 10;





high = 0;
low = 1000;
avg = 0;
for (let times = 0; times < timesTesting; times++) {
    const unsorted = Array.from(millionArr);
    const t0 = performance.now();
    sorted = unsorted.sort((a, b) => a - b);
    const t1 = performance.now() - t0;
    avg += performance.now() - t0;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 0:    Array-sort');
// console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
console.log('\n');





high = 0;
low = 1000;
avg = 0;
for (let times = 0; times < timesTesting; times++) {
    const t0 = performance.now();
    sorted = utilintySort(millionArr);
    const t1 = performance.now() - t0;
    avg += performance.now() - t0;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 0:    utilintySort in between range(0-1000)');
console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
console.log('\n');





millionArr = [];
for (let i = 0; i < 1000000; i++) {
    const rInt = Math.floor(Math.random() * 10000);
    millionArr.push(rInt);
}
high = 0;
low = 1000;
avg = 0;
for (let times = 0; times < timesTesting; times++) {
    const t0 = performance.now();
    sorted = utilintySort(millionArr);
    const t1 = performance.now() - t0;
    avg += performance.now() - t0;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 1:    utilintySort in between range(0-10000)');
console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
console.log('\n');





millionArr = [];
for (let i = 0; i < 1000000; i++) {
    const rInt = Math.floor(Math.random() * 100000);
    millionArr.push(rInt);
}
high = 0;
low = 1000;
avg = 0;
for (let times = 0; times < timesTesting; times++) {
    const t0 = performance.now();
    sorted = utilintySort(millionArr);
    const t1 = performance.now() - t0;
    avg += performance.now() - t0;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 2:    utilintySort in between range(0-100000)');
console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
console.log('\n');





millionArr = [];
for (let i = 0; i < 1000000; i++) {
    const rInt = Math.floor(Math.random() * 1000000);
    millionArr.push(rInt);
}
high = 0;
low = 1000;
avg = 0;
for (let times = 0; times < timesTesting; times++) {
    const t0 = performance.now();
    sorted = utilintySort(millionArr);
    const t1 = performance.now() - t0;
    avg += performance.now() - t0;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 3:    utilintySort in between range(0-1000000)');
console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
console.log('\n');





millionArr = sorted;
high = 0;
low = 1000;
avg = 0;
for (let times = 0; times < timesTesting; times++) {
    const t0 = performance.now();
    sorted = utilintySort(millionArr, false);
    const t1 = performance.now() - t0;
    avg += performance.now() - t0;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 4:    utilintySort already sorted array in between range(0-1000000)');
console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
console.log('\n');





millionArr = [];
for (let i = 0; i < 1000000; i++) {
    const rInt = Math.floor(Math.random() * 100000000);
    millionArr.push(rInt);
}
high = 0;
low = 1000;
avg = 0;
for (let times = 0; times < timesTesting; times++) {
    const t0 = performance.now();
    sorted = utilintySort(millionArr);
    const t1 = performance.now() - t0;
    avg += performance.now() - t0;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 5:    utilintySort in between range(0-100000000)');
console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
