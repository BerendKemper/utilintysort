# utilintySort
An alternative sorting algorithm (by Berend Kemper).<br>
This is my first real project and helped me to learn JavaScript.<br> 
Now this repository is used for my documentations purpose.<br>
The core-function from the <b>utilintysort.js</b> is made of a lot of code and therefore excels when used on large Arrays primarily at a hundred sized- and especially up to a million sized Array. Also Object-keys have another unclear disadvantage demonstrated in <b>learnthis.js</b><br><br>

<b>Files</b>
- <b>learnthis.js</b>
  - The function utilintySort sorts an Array of integers (only).
  - Can sort ascending (true) or descending (false).
  - This file is an example of the core-mechanics from the <b>utilintysort.js</b>.
  - Contains performance-tests and when the utilintySort works <b>very fast</b> and when <b>very slow</b>.
- <b>utilintysort.js:</b> 
  - Takes in an Array of Objects and sorts Object-keys of integer-properties-only. 
  - Can sort in multiple property depth. 
  - Properties can be given a range to search for and sort in between. 
  - Properties can be given a value to search for. 
  - Properties have an ascending-attribute and can be switched 1 (true) and -1 (false).
  - Properties have an sortIndex-attribute to determine which property will be sorted first, can be set manually.
  - Contains performance-tests and examples on how to sort multiple properties.

_______________________________________________________________________________________________________________________
The image down here shows the performance test from <b>utilintysort.js</b> and compares it to the Array.sort((a, b) => a-b) method
_______________________________________________________________________________________________________________________
![alt text](https://pbs.twimg.com/media/ESlEopbWkAAawso?format=png&name=medium)

