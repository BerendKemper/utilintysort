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
	<details>
		<summary>
			Returns <code>utilintySort</code>
		</summary>
	</details>
</ul>
<h3>utilintySort.sort()</h3>
<ul>
	<details>
		<summary>
			Returns <code>list</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">&lt;Array&gt;</a>
		</summary>
	</details>
</ul>
The method sorts the <code>list</code>. Throws an error if there are no <code>properties</code>. The sort slices the first <code>property</code> (at the lowest <code>property.sortIndex</code>) off the <code>properties.list</code> and in each recursion sorts the sliced first <code>property</code> untill there are no more <code>properties</code>.
<h3>utilintySort.list</h3>
<ul>
	Getter:
	<details>
		<summary>
			Returns <code>list</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">&lt;Array&gt;</a>
		</summary>
		Returns initial unsorted list.
	</details>
	Setter:
	<details>
		<summary>
			<code>list</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">&lt;Array&gt;</a>
		</summary>
		If not an array an error is thrown.
	</details>
</ul>
<h3>utilintySort.properties</h3>
<ul>
	Getter:
	<details>
		<summary>
			Returns <code>properties</code>
		</summary>
		An instance of the class <code>Properties</code>. Developers can manage how <code>properties</code> are to be sorted.
	</details>
</ul>
<h2>class Properties</h2>
<h3>properties.add(name)</h3>
<ul>
	<details>
		<summary>
			<code>name</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
		</summary>
	</details>
	<details>
		<summary>
			Returns <code>property</code>
		</summary>
		Allows chaining operations on the property after being created.
	</details>
</ul>
<h3>properties.delete(name)</h3>
<ul>
	<details>
		<summary>
			<code>name</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
		</summary>
	</details>
</ul>
<h3>properties.get(name)</h3>
<ul>
	<details>
		<summary>
			<code>name</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
		</summary>
	</details>
	<details>
		<summary>
			Returns <code>property</code>
		</summary>
		Allows chaining operations on the property after being created.
	</details>
</ul>
<h3>properties.ix(index)</h3>
<ul>
	<details>
		<summary>
			<code>index</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a>
		</summary>
	</details>
	<details>
		<summary>
			Returns <code>property</code>
		</summary>
		Allows chaining operations on the property after being created.
	</details>
</ul>
<h3>properties.list</h3>
<ul>
	Getter:
	<details>
		<summary>
			Returns <code>list</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array">&lt;Array&gt;</a>
		</summary>
		The list of <code>properties</code> is ordered by <code>property.sortIndex</code> from low to high. However when <code>property</code>'s <code>ascending</code> is <code>0</code> (e.g. have their value set instead of range), it is returned before <code>property</code>'s with <code>ascending</code> on <code>true</code> (1) or <code>false</code> (-1) as it will boost performance and the result is no different.
	</details>
</ul>
<h3>properties.length</h3>
<ul>
	Getter:
	<details>
		<summary>
			Returns <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a>
		</summary>
	</details>
</ul>
<h2>class Property</h2>
<h3>property.setRange(lowerbound, upperbound)</h3>
<ul>
	<details>
		<summary>
			<code>lowerbound</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a>
		</summary>
		When <code>lowerbound</code> smaller than <code>upperbound</code> the <code>ascending</code> is set to 1 <code>true</code>. When <code>lowerbound</code> equals <code>upperbound</code> the <code>ascending</code> is set to 0. When <code>lowerbound</code> greater than <code>upperbound</code> the <code>ascending</code> is set to -1 <code>false</code>.
	</details>
	<details>
		<summary>
			<code>upperbound</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a>
		</summary>
		When <code>upperbound</code> greater than <code>lowerbound</code> the <code>ascending</code> is set to 1 <code>true</code>. When <code>upperbound</code> equals <code>lowerbound</code> the <code>ascending</code> is set to 0. When <code>upperbound</code> smaller than <code>lowerbound</code> the <code>ascending</code> is set to -1 <code>false</code>.
	</details>
	<details>
		<summary>
			Returns <code>property</code>
		</summary>
		Allows chaining operations on the property after being setting range.
	</details>
</ul>
<h2>property.setValue(integer)</h2>
<ul>
	<details>
		<summary>
			<code>integer</code>  &lt;integer&gt;
		</summary>
		Sets the <code>ascending</code> to 0.
	</details>
	<details>
		<summary>
			Returns <code>property</code>
		</summary>
		Allows chaining operations on the property after being setting range.
	</details>
</ul>
<h2>property.name</h2>
<ul>
	Getter:
	<details>
		<summary>
			Returns <code>name</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type">&lt;string&gt;</a>
		</summary>
	</details>
</ul>
<h2>property.ascending</h2>
<ul>
	Getter:
	<details>
		<summary>
			Returns <code>ascending</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a>
		</summary>
	</details>
	Setter:
	<details>
		<summary>
			<code>ascending</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a> | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#boolean_type">&lt;boolean&gt;</a>
		</summary>
		If set to <code>true</code> / <code>false</code> actualy sets value to 1 / -1. If ascending was reversed, e.g. 1 set to -1 or -1 set to 1, the <code>lowerbound</code> and <code>upperbound</code> are also reversed.
	</details>
</ul>
<h2>property.lowerbound</h2>
<ul>
	Getter:
	<details>
		<summary>
			Returns <code>lowerbound</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a>
		</summary>
	</details>
</ul>
<h2>property.upperbound</h2>
<ul>
	Getter:
	<details>
		<summary>
			Returns <code>upperbound</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a>
		</summary>
	</details>
</ul>
<h2>property.sortIndex</h2>
<ul>
	Getter:
	<details>
		<summary>
			Returns <code>sortIndex</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a>
		</summary>
	</details>
	Setter:
	<details>
		<summary>
			<code>index</code> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type">&lt;number&gt;</a>
		</summary>
		Setting the property's <code>sortIndex</code> will move it up or down the <code>properties.list</code>. The sort slices the first <code>property</code> (at the lowest <code>sortIndex</code>) off the <code>properties.list</code> and in each recursion sorts the sliced first <code>property</code> untill there are no more <code>properties</code>.
	</details>
</ul>

_______________________________________________________________________________________________________________________
The image down here shows the performance test from <b>utilintysort.js</b> and compares it to the Array.sort((a, b) => a-b) method
_______________________________________________________________________________________________________________________
![alt text](https://pbs.twimg.com/media/EwKUN0iXYAMw2Ev?format=png&name=large)

