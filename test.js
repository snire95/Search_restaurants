//**************************************************************** */
/**Given head which is a reference node to a singly-linked list. The value of each node in the linked list is either 0 or 1. The linked list holds the binary representation of a number.

Return the decimal value of the number in the linked list.

 

Example 1:


Input: head = [1,0,1]
Output: 5
Explanation: (101) in base 2 = (5) in base 10 */


// function roughScale(x, base) {
//     const parsed = parseInt(x, base);
//     if (isNaN(parsed)) { return 0; }
//     return parsed ;
//   }
  
// function getDecimalValue(head) {
//       var str = "";
//       var x = head[0];
//       var y = head[1];
//       console.log(head);
//       console.log(head[0]);
//       console.log(head[1]);
//       console.log(head[2]);
  
//       for(i=0;i<head.length;i++){
//           str = str + head[i];
//       }
      
//       str = parseInt(str, 2)
//        if (isNaN(str)) { 
//            str = 0; 
//        }else str = str ;
//       // str = roughScale(str, 2);
//       //console.log(str);      
//   };
 
//   getDecimalValue([1,0,1]);


//**************************************************************** */


//**************************************************************** */

/*Sort a linked list using insertion sort.


A graphical example of insertion sort. The partial sorted list (black) initially contains only the first element in the list.
With each iteration one element (red) is removed from the input data and inserted in-place into the sorted list
 

Algorithm of Insertion Sort:

Insertion sort iterates, consuming one input element each repetition, and growing a sorted output list.
At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there.
It repeats until no input elements remain.*/



// insertionSortList = (head) =>  {
//     for(let i = 0 ;i < head.length ; i++){
//         for(let j = 0 ;j < head.length ;j++){
//             if (head[i] < head[j]){
//                 let x = head[j];
//                 head[j] = head[i];
//                 head[i] = x
//             }
//         }

//     }
//     console.log(head);      

// };

// insertionSortList([5,2,1,3,7,54,8,100,23,65,12,4])

//**************************************************************** */

// var getDecimalValue = function(head) {
//     let exponent = getLengthOfLL(head)-1;
//     console.log(exponent)
//     let number = 0;
//     while (head !== null) {
//         number += head.val * 2**exponent;
//         head = head.next;
//         exponent--;
//     }
//     return number;
//     // Time Complexity: O(n)
//     // Space Complexity: O(1)
// }

// function getLengthOfLL(head) {
//     let len = 0;
//     while (head !== null) {
//         head = head.next;
//         len++;
//     }
//     return len;
// }