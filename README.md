# utilintySort
An alternative sorting algorithm (by Berend Kemper).<br>
This was my first real project and helped me to learn JavaScript.<br> 
It sorts integers only and suprisingly beats all other sorts in performance.<br>
There is a Properties class and Property class.<br>
The class Properties has methods to add, delete and get a Property by name or the method ix to get a property by sortIndex.<br>
The class Property has methods set ascending to true (1) or false (-1), to set the range to a lower- and upperbound which to sort in between and integers outside of the range to be excluded from the result, to set the sortIndex which property to sort first, second, third, etc. The UtilintySort will sort the list according to how the Properties have been configured. Setting range or value of the Property objects will increase the performance because excluded items from the list will not be passed down into further recursive callbacks from the sort. 

_______________________________________________________________________________________________________________________
The image down here shows the performance test from <b>utilintysort.js</b> and compares it to the Array.sort((a, b) => a-b) method
_______________________________________________________________________________________________________________________
![alt text](https://pbs.twimg.com/media/EwKTkN8WQAAvMNF?format=png&name=large)

