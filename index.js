'use strict';

const UtilintySort = function () {
	let _resetPropertyStatistics = false;
	const accessKey = Symbol("UtilintySort Access Key");
	class Property {
		#lowerbound = -Infinity;
		#upperbound = Infinity;
		#ascending = 1;
		#sortIndex;
		#parent;
		#name;
		counter = 0;
		sorted = 0;
		constructor(parent, name) {
			this.#parent = parent;
			this.#name = name;
			this.#sortIndex = parent.length;
		};
		get name() {
			return this.#name;
		};
		get ascending() {
			return this.#ascending;
		};
		set ascending(value) {
			if (value === true)
				value = 1;
			else if (value === false)
				value = -1;
			else if (value !== -1 && value !== 1)
				throw new TypeError(`The entered value "${typeof value} ${value}" is not -1 (false, descending) or 1 (true ascending)`);
			if (this.#ascending === value)
				throw new TypeError(`The ascending property is already ${value}`);
			else if (this.#ascending === 0)
				throw new TypeError(`There is no ascending or descending possible in between ${this.#lowerbound}-${this.#upperbound}`);
			this.setRange(this.#upperbound, this.#lowerbound);
		};
		get lowerbound() {
			return this.#lowerbound;
		};
		get upperbound() {
			return this.#upperbound;
		};
		setRange(lowerbound, upperbound) {
			if (typeof lowerbound !== "number")
				throw new TypeError(`The lowerbound "${lowerbound}" must be a number`);
			if (typeof upperbound !== "number")
				throw new TypeError(`The upperbound "${upperbound}" must be a number`);
			if (lowerbound === upperbound)
				return this.setValue(lowerbound);
			this.#lowerbound = lowerbound;
			this.#upperbound = upperbound;
			this.#ascending = lowerbound < upperbound ? 1 : -1;
			return this;
		};
		setValue(value) {
			if (!Number.isInteger(value))
				throw new TypeError(`This is the Util-int-y sort. The value "${value}" must be an integer`);
			this.#lowerbound = value;
			this.#upperbound = value;
			this.#ascending = 0;
		};
		get sortIndex() {
			return this.#sortIndex;
		};
		set sortIndex(index) {
			const length = this.#parent.length;
			if (index >= length)
				throw new TypeError(`Choose an index between 0-${length - 1} `);
			if (index === this.#sortIndex)
				throw new TypeError(`The sortIndex property is already ${index}`);
			const propertiesList = this.#parent.cheatList(accessKey);
			if (this.#sortIndex > index)
				for (let ix = this.#sortIndex; ix > index; ix--) {
					const nextProperty = propertiesList[ix - 1];
					propertiesList[ix] = nextProperty;
					nextProperty.cheatSortIndex(accessKey, ix);
				}
			else
				for (let ix = this.#sortIndex; ix < index; ix++) {
					const nextProperty = propertiesList[ix + 1];
					propertiesList[ix] = nextProperty;
					nextProperty.cheatSortIndex(accessKey, ix);
				}
			propertiesList[index] = this;
			this.#sortIndex = index;
		};
		cheatSortIndex(key, index) {
			if (key !== accessKey)
				throw Error("I will not let you break the code");
			this.#sortIndex = index;
		};
	};

	class Properties {
		#propertiesList = [];
		#propertiesDict = {};
		add(name) {
			if (this.#propertiesDict[name] instanceof Property === false) {
				var property = new Property(this, name);
				this.#propertiesDict[name] = property;
				this.#propertiesList.push(property);
			}
			return this.#propertiesDict[name] || property;
		};
		delete(name) {
			if (this.#propertiesDict[name] === undefined)
				return new Error(`The property with name "${name}" does not exist`);
			const propertiesList = this.#propertiesList;
			for (let ix = this.#propertiesDict[name].sortIndex + 1; ix <= propertiesList.length - 1; ix++) {
				const property = propertiesList[ix];
				property.cheatSortIndex(accessKey, ix - 1)
				propertiesList[ix - 1] = property;
			}
			delete (this.#propertiesDict[name]);
			propertiesList.pop();
		};
		get(name) {
			return this.#propertiesDict[name];
		};
		ix(index) {
			return this.#propertiesList[index];
		};
		get list() {
			const _arrPropertiesRanges = [];
			const _arrPropertiesValues = [];
			for (const property of this.#propertiesList) {
				if (_resetPropertyStatistics === true) {
					property.counter = 0;
					property.sorted = 0;
				}
				property.ascending === 0 ? _arrPropertiesValues.push(property) : _arrPropertiesRanges.push(property);
			}
			return [..._arrPropertiesValues, ..._arrPropertiesRanges];
		};
		get length() {
			return this.#propertiesList.length;
		};
		cheatList(key) {
			if (key !== accessKey)
				throw Error("I will not let you break the code");
			return this.#propertiesList;
		};
	};





	const utilintySort = (order, list, properties) => {
		const property = properties[0];
		property.counter++;
		property.sorted += list.length;
		let ascending = property.ascending;
		ascending !== 0 ? order *= ascending : ascending = 1;
		const sortedObjPlus = {};
		const sortedObjMin = {};
		const name = property.name;
		const lowerbound = property.lowerbound;
		const upperbound = property.upperbound;
		for (let ix = 0; ix < list.length; ix++) {
			const object = list[ix];
			const int = object[name];
			if ((ascending === -1 && int >= upperbound && int <= lowerbound) ||
				(ascending === 1 && int >= lowerbound && int <= upperbound) ||
				(ascending === 0 && int === lowerbound)) {
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
					sortedArrayFirst = utilintySort(ascending, sortedArrayFirst, nextprops);
				for (let i = sortedArrayFirst.length - 1; i >= 0; i--)
					sorted.push(sortedArrayFirst[i]);
			}
			for (let int in sortedObjSecond) {
				let sortedArraySecond = sortedObjSecond[int];
				if (nextprops.length > 0 && sortedArraySecond.length > 1)
					sortedArraySecond = utilintySort(ascending, sortedArraySecond, nextprops);
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
			this.list = list;
			this.properties = new Properties();
		};
		measureSort() {
			const start = performance.now();
			const sorted = this.sort();
			console.log('', performance.now() - start);
			return sorted;
		};
		sort() {
			_resetPropertyStatistics = true;
			const properties = this.properties.list;
			_resetPropertyStatistics = false;
			return utilintySort(1, this.list, properties);
		};
	};
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
utilintySort.properties.add('cash').ascending = -1; // 1st property
//*
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
//*/





// Test 1: Array-sort 1 property
//*
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
//*/





// Test 2: utilintySort 9 properties
utilintySort.properties.add('gems').ascending = -1; // 2nd property
utilintySort.properties.add('lvl'); // 3rd property
utilintySort.properties.add('stLvl'); // 4th property
utilintySort.properties.add('rankPs').ascending = -1; // 5th property
utilintySort.properties.add('age'); // 6th property
utilintySort.properties.add('length').ascending = -1; // 7th property
utilintySort.properties.add('weight'); // 8th property
utilintySort.properties.add('id'); // 9th property
//*
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
//*/




// Test 3: utilintySort 9 properties with ranges
utilintySort.properties.get('lvl').setRange(200, 300); // (ascending = 1 OR 200<=lvl<=300)
utilintySort.properties.get('cash').setRange(5000, 2500); // (ascending = -1 OR 5000<=lvl<=2500)
utilintySort.properties.get('age').setValue(26); // (ascending = 0 OR 26=age=26 AND sortIndex 6th->1st)
//*
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
//*/
utilintySort.properties.ix(7).setValue(60);
utilintySort.properties.ix(1).setRange(10, 20);



console.log(utilintySort);


