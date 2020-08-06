'use strict';





const UtilintySort = function () {
    let _resetPropertyStatistics = false;
    const Property = function () {
        const _lowerBound = new WeakMap();
        const _upperBound = new WeakMap();
        const _sortIndex = new WeakMap();
        const _ascending = new WeakMap();
        const _propertiesNames = new WeakMap();
        const _propertiesIndex = new WeakMap();
        const _span = new WeakMap();
        class Property {
            constructor(name) {
                _lowerBound.set(this, -Infinity);
                _upperBound.set(this, Infinity);
                _ascending.set(this, 1);
                Object.defineProperties(this, {
                    name: { value: name, },
                    counter: { value: 0, writable: true, },
                    sorted: { value: 0, writable: true, },
                })
            }
        }
        Object.defineProperties(Property.prototype, {
            ascending: {
                get() { return _ascending.get(this); },
                set(value) {
                    if (value !== -1 && value !== 1)
                        throw new TypeError(`The entered value "${typeof value} ${value}" is not -1 or 1: descending or ascending`);
                    const oldValue = _ascending.get(this);
                    if (oldValue === 0)
                        throw new TypeError('A value never be ascending or descending');
                    if (oldValue === value)
                        throw new TypeError('The ascending property is still the same');
                    this.setRange(_upperBound.get(this), _lowerBound.get(this));
                }
            },
            range: {
                get() {
                    return Object.preventExtensions(Object.defineProperties(Object.create(null), {
                        lowerBound: { value: _lowerBound.get(this), },
                        upperBound: { value: _upperBound.get(this), },
                    }));
                }, enumerable: true,
            },
            setRange: {
                value(lowerBound, upperBound) {
                    if (!(Number.isInteger(lowerBound) || lowerBound === -Infinity || lowerBound === Infinity))
                        throw new TypeError(`The lowerBound "${lowerBound}" in not an Integer`);
                    if (!(Number.isInteger(upperBound) || upperBound === -Infinity || upperBound === Infinity))
                        throw new TypeError(`The upperBound "${upperBound}" in not an Integer`);
                    _lowerBound.set(this, lowerBound);
                    _upperBound.set(this, upperBound);
                    if (lowerBound < upperBound)
                        _ascending.set(this, 1);
                    else if (lowerBound > upperBound)
                        _ascending.set(this, -1);
                    else if (lowerBound === upperBound)
                        _ascending.set(this, 0);
                    return this;
                },
            },
            setValue: {
                value(value) {
                    this.setRange(value, value);
                    return this;
                },
            },
            sortIndex: {
                get() { return _sortIndex.get(this); },
                set(index) {
                    const span = _span.get(Property);
                    const thisIndex = this.sortIndex;
                    if (index >= span)
                        throw new TypeError(`Choose an index between 0-${span} `);
                    if (index === thisIndex)
                        throw new TypeError('The index property is still the same');;
                    const propertiesArray = _propertiesIndex.get(Property);
                    if (thisIndex > index)
                        for (let ix = thisIndex; ix > index; ix--) {
                            const nextProperty = propertiesArray[ix - 1];
                            propertiesArray[ix] = nextProperty;
                            _sortIndex.set(nextProperty, ix);
                        }
                    else
                        for (let ix = thisIndex; ix < index; ix++) {
                            const nextProperty = propertiesArray[ix + 1];
                            propertiesArray[ix] = nextProperty;
                            _sortIndex.set(nextProperty, ix);
                        }
                    propertiesArray[index] = this;
                    _sortIndex.set(this, index);
                },
            },
        })
        Object.defineProperties(Property, {
            add: {
                value(name) {
                    const propertiesObject = _propertiesNames.get(this);
                    const propertiesArray = _propertiesIndex.get(this);
                    const checkProperty = propertiesObject[name];
                    if (checkProperty instanceof Property === false) {
                        var property = new Property(name);
                        const span = _span.get(this);
                        _sortIndex.set(property, span);
                        _span.set(this, span + 1);
                        propertiesObject[name] = property;
                        propertiesArray[span] = property;
                    }
                    return checkProperty || property;
                },
            },
            delete: {
                value(name) {
                    const propertiesObject = _propertiesNames.get(this);
                    if (propertiesObject[name] === undefined)
                        return new TypeError(`The property with name "${name}" is not defined`);
                    const propertiesArray = _propertiesIndex.get(this);
                    let span = _span.get(this) - 1;
                    for (let ix = propertiesObject[name].sortIndex + 1; ix <= span; ix++) {
                        const property = propertiesArray[ix];
                        _sortIndex.set(property, ix - 1);
                        propertiesArray[ix - 1] = property;
                    }
                    _span.set(this, span);
                    delete (propertiesObject[name]);
                    delete (propertiesArray[span])
                },
            },
            get: {
                value(name) {
                    return _propertiesNames.get(this)[name];
                },
            },
            list: {
                get() {
                    const _arrPropertiesRanges = [];
                    const _arrPropertiesValues = [];
                    const propertiesArray = _propertiesIndex.get(this);
                    for (let ix in propertiesArray) {
                        const property = propertiesArray[ix];
                        if (_resetPropertyStatistics === true) {
                            property.counter = 0;
                            property.sorted = 0;
                        }
                        property.ascending === 0 ? _arrPropertiesValues.push(property) : _arrPropertiesRanges.push(property);
                    }
                    return [..._arrPropertiesValues, ..._arrPropertiesRanges];
                },
            },
        })
        _propertiesNames.set(Property, Object.create(null));
        _span.set(Property, 0);
        _propertiesIndex.set(Property, Object.create(null));
        return Property;
    }();





    const utilintySort = (order, list, ...properties) => {
        const property = properties[0];
        property.counter++;
        property.sorted += list.length;
        let ascending = property.ascending;
        ascending !== 0 ? order *= ascending : ascending = 1;
        const sortedObjPlus = {};
        const sortedObjMin = {};
        const name = property.name;
        const rng = property.range;
        for (let ix = 0; ix < list.length; ix++) {
            const object = list[ix];
            const int = object[name];
            if ((ascending === -1 && int >= rng.upperBound && int <= rng.lowerBound) ||
                (ascending === 1 && int >= rng.lowerBound && int <= rng.upperBound) ||
                (ascending === 0 && int === rng.lowerBound)) {
                if (int >= 0)
                    sortedObjPlus[int] === undefined ? sortedObjPlus[int] = [object] : sortedObjPlus[int].push(object);
                else
                    sortedObjMin[-int] === undefined ? sortedObjMin[-int] = [object] : sortedObjMin[-int].push(object);
            }
        }
        const nextprops = properties.slice(1);
        const sorted = [];
        const sortedLoop = (sortedObjFirst, sortedObjSecond) => {
            const sortedArraysFirst = Object.values(sortedObjFirst);
            for (let int = sortedArraysFirst.length - 1; int >= 0; int--) {
                let sortedArrayFirst = sortedArraysFirst[int];
                if (nextprops.length > 0 && sortedArrayFirst.length > 1)
                    sortedArrayFirst = utilintySort(ascending, sortedArrayFirst, ...nextprops);
                for (let i = sortedArrayFirst.length - 1; i >= 0; i--)
                    sorted.push(sortedArrayFirst[i]);
            }
            for (let int in sortedObjSecond) {
                let sortedArraySecond = sortedObjSecond[int];
                if (nextprops.length > 0 && sortedArraySecond.length > 1)
                    sortedArraySecond = utilintySort(ascending, sortedArraySecond, ...nextprops);
                for (let i = 0; i < sortedArraySecond.length; i++)
                    sorted.push(sortedArraySecond[i]);
            }
        };
        if (order === 1)
            sortedLoop(sortedObjMin, sortedObjPlus);
        else
            sortedLoop(sortedObjPlus, sortedObjMin);
        return sorted;
    };





    class UtilintySort {
        constructor(list) {
            if (!Array.isArray(list))
                throw new TypeError('list must be an Array');
            Object.defineProperties(this, {
                list: { value: list, },
                Property: { value: Property, },
            })
        }
    }
    Object.defineProperties(UtilintySort.prototype, {
        measureSort: {
            value() {
                const start = performance.now();
                const sorted = this.sort();
                console.log('', performance.now() - start);
                return sorted;
            },
        },
        sort: {
            value() {
                _resetPropertyStatistics = true;
                const properties = this.Property.list;
                _resetPropertyStatistics = false;
                const list = this.list;
                const ascending = 1;
                return utilintySort(ascending, list, ...properties);
            },
        },
    })
    return UtilintySort;
}();





// testing array of objects down here
const gazillionArr = [];
for (let id = 0; id < 1000000; id++) {
    const rndmRankPoints = Math.ceil(Math.random() * 100);
    const rndmRank = Math.ceil((101 - rndmRankPoints) / 10);
    const rndmLevel = Math.ceil(Math.random() * 300);
    const rndmCash = 10 * Math.ceil((Math.random() * 500));

    const rndmStoryLevel = Math.ceil((rndmLevel / 6) + Math.random() * 51);
    const rndmGems = rndmLevel + rndmStoryLevel - 5 * Math.ceil(Math.random() * Math.floor((rndmLevel + rndmStoryLevel) / 5));

    const rndmAge = Math.ceil(18 + Math.random() * 23);
    const rndmLength = Math.ceil(160 + Math.random() * 45);
    const rndmWeight = Math.ceil(rndmLength - 120 + Math.random() * 45);
    const rndmNameLen = Math.ceil(4 + Math.random() * 5);
    let rndmName = '';
    for (let ix = 0; ix <= rndmNameLen; ix++) {
        const rndmAscii = Math.ceil(96 + Math.random() * 26);
        rndmName += String.fromCharCode(rndmAscii);
    }
    gazillionArr.push({
        rank: rndmRank, rankPs: rndmRankPoints, lvl: rndmLevel,
        id: id, cash: rndmCash, stLvl: rndmStoryLevel, gems: rndmGems,
        age: rndmAge, length: rndmLength, weight: rndmWeight, name: rndmName
    });
}
console.log('gazillionArr (1 million size array of objects):\n', gazillionArr, '\n');
console.log('\n');
const utilintySort = new UtilintySort(gazillionArr);
let sorted;
let high;
let low;
let avg;
const timesTesting = 5;





// Test 0: utilintySort 1 property
utilintySort.Property.add('cash').ascending = -1; // 1st property
high = 0;
low = 1000;
avg = 0;
for (let i = 0; i < timesTesting; i++) {
    const t0 = performance.now();
    sorted = utilintySort.sort();
    const t1 = performance.now() - t0;
    avg += t1;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 0:    utilintySort');
console.log('           Sorting 1 property (cash-)');
// console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
console.log('\n');





// Test 1: Array-sort 1 property
high = 0;
low = 1000;
avg = 0;
for (let i = 0; i < timesTesting; i++) {
    const unsorted = Array.from(gazillionArr);
    const t0 = performance.now();
    sorted = unsorted.sort((a, b) => b.cash - a.cash);
    const t1 = performance.now() - t0;
    avg += t1;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 1:    Array-sort');
console.log('           Sorting 1 property (cash-)');
// console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
console.log('\n');





// Test 2: utilintySort 9 properties
utilintySort.Property.add('gems').ascending = -1; // 2nd property
utilintySort.Property.add('lvl'); // 3rd property
utilintySort.Property.add('stLvl'); // 4th property
utilintySort.Property.add('rankPs').ascending = -1; // 5th property
utilintySort.Property.add('age'); // 6th property
utilintySort.Property.add('length').ascending = -1; // 7th property
utilintySort.Property.add('weight'); // 8th property
utilintySort.Property.add('id'); // 9th property
high = 0;
low = 1000;
avg = 0;
for (let i = 0; i < timesTesting; i++) {
    const t0 = performance.now();
    sorted = utilintySort.sort();
    const t1 = performance.now() - t0;
    avg += t1;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 2:    utilintySort');
console.log('           Sorting 9 properties (cash-, gems-, lvl+, stLvl+, rankPs-, age+, length-, weight+, id+)');
console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds\n');
console.log('\n');





// Test 3: utilintySort 9 properties with ranges
utilintySort.Property.get('lvl').setRange(200, 300); // (ascending = 1 OR 200<=lvl<=300)
utilintySort.Property.get('cash').setRange(5000, 2500); // (ascending = -1 OR 5000<=lvl<=2500)
utilintySort.Property.get('age').setValue(26); // (ascending = 0 OR 26=age=26 AND sortIndex 6th->1st)
high = 0;
low = 1000;
avg = 0;
for (let i = 0; i < timesTesting; i++) {
    const t0 = performance.now();
    sorted = utilintySort.sort();
    const t1 = performance.now() - t0;
    avg += t1;
    if (low > t1) low = t1;
    if (high < t1) high = t1;
}
console.log('Test 3:    utilintySort');
console.log('           Sorting 9 properties by value and range (age===26, 5000<=cash<=2500, gems-, 200<=lvl<=300, stLvl+, rankPs-, length-, weight+, id+)');
console.log(sorted);
console.log('slowest:', high, 'milliseconds');
console.log('fastest:', low, 'milliseconds');
console.log('avarage:', avg / timesTesting, 'milliseconds');
console.log('\n\n');





console.log(utilintySort);
