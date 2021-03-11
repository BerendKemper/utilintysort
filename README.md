# utilintySort
An alternative sorting algorithm.
<br>
This was my first real software development project and my own initiative to become a sotware developer and it really did help me to learn JavaScript, functional programming and object oriënted programming.
<br>
<h2>Class UtilintySort</h2>
<h3>new UtilintySort(list)</h3>
<ul>
	<details>
		<summary>
			<code>list</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">&lt;Array&gt;</a> <b>Required!</b>
		</summary>
		The array must contain items of the type <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object">&lt;Object&gt;</a>. Those can be instances from a class or raw objects.
	</details>
	<li>Returns <code>utilintySort</code></li>
</ul>
<h3>utilintySort.sort()</h3>
<ul>
	<details>
		<summary>
			Returns <code>list</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">&lt;Array&gt;</a>
		</summary>
		Returns the sorted <code>list</code>. 
	</details>
	The method sorts the <code>list</code>. Throws an error if there are no <code>properties</code>. The sort slices the first <code>property</code> off the <code>properties.list</code> and in each recursion sorts the sliced first <code>property</code> untill there are no more <code>properties</code>.
</ul>
<h3>utilintySort.list</h3>
<ul>
	<details>
		<summary>
			Returns <code>list</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">&lt;Array&gt;</a>
		</summary>
		Returns initial unsorted list.
	</details>
	Readable and writable property that contains the <code>list</code> that was passed over as parameter during construction.
</ul>
<h3>utilintySort.properties</h3>
<ul>
	<details>
		<summary>
			Returns <code>properties</code>
		</summary>
		An instance of the class <code>Properties</code>. Developers can manage how <code>properties</code> are to be sorted.
	</details>
	Readable property.
</ul>
<h2>class Properties</h2>
<h3>properties.add(name)</h3>
<ul>
	<code>name</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
	<details>
		<summary>
			Returns property
		</summary>
		Allows chaining operations on the property after being created.
	</details>
</ul>
<h3>properties.delete(name)</h3>
<ul>
	<li>
		<code>name</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
	</li>
</ul>
<h3>properties.get(name)</h3>
<h3>properties.ix(index)</h3>
<h3>properties.get(name)</h3>
<h3>properties.list</h3>
<h3>properties.length</h3>
<h2>class Property</h2>
<h3>property.setRange(lowerbound, upperbound)</h3>
<h2>property.setValue(integer)</h2>
<h2>property.name</h2>
<h2>property.ascending</h2>
<h2>property.lowerbound</h2>
<h2>property.upperbound</h2>
<h2>property.sortIndex</h2>
It sorts integers only and suprisingly beats all other sorts in performance.<br>
There is a Properties class and Property class.<br>
The class Properties has methods to add, delete and get a Property by name or the method ix to get a property by sortIndex.<br>
The class Property has methods set ascending to true (1) or false (-1), to set the range to a lower- and upperbound which to sort in between and integers outside of the range to be excluded from the result, to set the sortIndex which property to sort first, second, third, etc. The UtilintySort will sort the list according to how the Properties have been configured. Setting range or value of the Property objects will increase the performance because excluded items from the list will not be passed down into further recursive callbacks from the sort. 

_______________________________________________________________________________________________________________________
The image down here shows the performance test from <b>utilintysort.js</b> and compares it to the Array.sort((a, b) => a-b) method
_______________________________________________________________________________________________________________________
![alt text](https://pbs.twimg.com/media/EwKUN0iXYAMw2Ev?format=png&name=large)

