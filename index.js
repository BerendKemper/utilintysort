'use strict';
const UtilintySort = function () {
    class Property {
        #propertiesList = null;
        #lowerbound = -Infinity;
        #upperbound = Infinity;
        #ascending = 1;
        #sortIndex = null;
        #name = null;
        counter = 0;
        sorted = 0;
        constructor(name, list) {
            this.#name = name.slice(1);
            this.#propertiesList = list;
            this.#propertiesList[name] = this;
            this.#propertiesList.push(this);
            this.#sortIndex = list.length;
        }
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
        }
        setValue(integer) {
            if (!Number.isInteger(integer))
                throw new TypeError(`This is the Util-int-y sort. The value "${integer}" must be an integer`);
            this.#lowerbound = integer;
            this.#upperbound = integer;
            this.#ascending = 0;
        }
        get name() {
            return this.#name;
        }
        get ascending() {
            return this.#ascending;
        }
        set ascending(value) {
            if (this.#ascending === 0)
                throw new TypeError(`There is no ascending or descending possible in between ${this.#lowerbound}-${this.#upperbound}`);
            if (value === true)
                value = 1;
            else if (value === false)
                value = -1;
            else if (value !== -1 && value !== 1)
                throw new TypeError(`The entered ${typeof value} value "${value}" is not -1 / false (descending) or 1 / true (ascending)`);
            this.#ascending = value;
            value = this.#upperbound;
            this.#lowerbound = this.#upperbound;
            this.#upperbound = value;
        }
        get lowerbound() {
            return this.#lowerbound;
        }
        get upperbound() {
            return this.#upperbound;
        }
        get sortIndex() {
            return this.#sortIndex;
        }
        set sortIndex(index) {
            const length = this.#propertiesList.length;
            if (index >= length)
                throw new TypeError(`Choose an index between 0-${length - 1} `);
            if (index === this.#sortIndex)
                throw new TypeError(`The sortIndex property is already ${index}`);
            if (this.#sortIndex > index)
                for (let ix = this.#sortIndex; ix > index; ix--) {
                    const nextProperty = this.#propertiesList[ix - 1];
                    this.#propertiesList[ix] = nextProperty;
                    nextProperty.#sortIndex = ix;
                }
            else
                for (let ix = this.#sortIndex; ix < index; ix++) {
                    const nextProperty = this.#propertiesList[ix + 1];
                    this.#propertiesList[ix] = nextProperty;
                    nextProperty.#sortIndex = ix;
                }
            this.#propertiesList[index] = this;
            this.#sortIndex = index;
        }
        delete() {
            if (this.#propertiesList.length === 0)
                return this.#destroy();
            for (let ix = this.#sortIndex + 1; ix <= this.#propertiesList.length - 1; ix++) {
                const property = this.#propertiesList[ix];
                property.#sortIndex = ix - 1;
                this.#propertiesList[this.#sortIndex] = property;
            }
            delete (this.#propertiesList["." + this.#name]);
            this.#propertiesList.pop();
            this.#propertiesList = null;
        }
        #destroy() {
            delete (this.#propertiesList["." + this.#name]);
            return this.#propertiesList = null;
        }
    };
    class Properties {
        #parent;
        #propertiesList = [];
        constructor(parent) {
            this.#parent = parent;
        }
        add(name) {
            console.log(this, name);
            name = "." + name;
            return this.#propertiesList[name] instanceof Property ? this.#propertiesList[name] : new Property(name, this.#propertiesList);
        }
        get(id) {
            if (typeof id === "string")
                id = "." + id;
            return this.#propertiesList[id];
        }
        delete(id) {
            var name = typeof id === "string" ? "." + id : id;
            if (this.#propertiesList[name] === undefined)
                return new Error(`The property with name "${id}" does not exist`);
            this.#propertiesList[name].delete();
        }
        destroy() {
            this.#propertiesList.length = 0;
            for (const name in this.#propertiesList)
                this.#propertiesList[name].delete()
            this.#propertiesList.this.#propertiesList.forEach(property => property.delete());
        }
        get list() {
            const _arrPropertiesRanges = [];
            const _arrPropertiesValues = [];
            const resetPropertiesStatistics = this.#parent.resetPropertiesStatistics;
            for (const property of this.#propertiesList) {
                if (resetPropertiesStatistics === true) {
                    property.counter = 0;
                    property.sorted = 0;
                }
                property.ascending === 0 ? _arrPropertiesValues.push(property) : _arrPropertiesRanges.push(property);
            }
            return [..._arrPropertiesValues, ..._arrPropertiesRanges];
        }
        get length() {
            return this.#propertiesList.length;
        }
    }
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
        #list;
        #properties;
        #resetPropertiesStatistics = false
        constructor(list) {
            this.list = list;
            this.#properties = new Properties(this);
        };
        sort() {
            if (this.#properties.length === 0)
                throw new Error("Configure properties how to sort");
            this.#resetPropertiesStatistics = true;
            const properties = this.#properties.list;
            this.#resetPropertiesStatistics = false;
            return utilintySort(1, this.#list, properties);
        };
        measureSort(label = "Measuring utilintySort time") {
            console.time(label);
            const sorted = this.sort();
            console.timeEnd(label);
            return sorted;
        };
        get list() {
            return this.#list;
        };
        set list(list) {
            if (!Array.isArray(list))
                throw new TypeError('list must be an Array');
            this.#list = list;
        };
        get properties() {
            return this.#properties;
        };
        get resetPropertiesStatistics() {
            return this.#resetPropertiesStatistics;
        };
    };
    return UtilintySort;
}();