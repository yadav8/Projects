export default function getQuickSortSequence (array) {
	// Sequence elements will be of the form: ["operation", idx1, idx2]
	// Where operation can be compare, swap, pivot or final
	var sequence = [];
	quickSort(array, sequence, 0, array.length-1);
	return sequence;
}


function quickSort(array, sequence, leftIdx, rightIdx) {
	if (array.length > 1) {
		// Final index of pivot element returned from partition
		var pivotIdx = partition(array, sequence, leftIdx, rightIdx);

		// Only one element on the left side of the pivot. Already in it's final position.
		if (pivotIdx - 1 === leftIdx) {sequence.push(["final", leftIdx, 1]);}

		// Only one element on the right side of the pivot. Already in it's final position.
		if (pivotIdx + 1 === rightIdx) {sequence.push(["final", rightIdx, 1]);}
		
		// More than one element on the left side of the pivot
		if (leftIdx < pivotIdx - 1) { 
		    quickSort(array, sequence, leftIdx, pivotIdx - 1);
		}

		// More than one element on the right side of the pivot
		if (pivotIdx + 1 < rightIdx) {
		    quickSort(array, sequence, pivotIdx + 1, rightIdx);
		}
		
	}

	return array;
}

function partition(array, sequence, leftIdx, rightIdx) {
	var pivotIdx = Math.floor((rightIdx+leftIdx)/2);
	var pivot = array[pivotIdx];

	// -1 means just add pivot animation to given index
	sequence.push(["pivot", pivotIdx, -1]);

	while (leftIdx <= rightIdx) {		
		while (array[leftIdx] < pivot) {
			// Only add animation if its two different indices being compared
			if(leftIdx !== rightIdx) {sequence.push(["compare", leftIdx, rightIdx]);}
			// Left index moves anyways
            leftIdx++;
        }
        while (array[rightIdx] > pivot) {
        	// Same concept as left index
        	if(leftIdx !== rightIdx) {sequence.push(["compare", leftIdx, rightIdx]);}
            rightIdx--;
        }
        if (leftIdx <= rightIdx) {
            // Swapping left and right indices
            if(leftIdx !== rightIdx) {
            	sequence.push(["compare", leftIdx, rightIdx]);
            	sequence.push(["swap", leftIdx, rightIdx]);
            	swap(array, leftIdx, rightIdx);
            
            	// This means pivot is getting swapped. Thus keeping pivotIdx updated.
            	// Also update animation
	            if(pivotIdx === leftIdx) {
	            	// Pivot gets swapped from leftIdx to rightIdx
	            	pivotIdx = movePivot(sequence, pivotIdx, rightIdx);

	            	// If pivot is getting swapped, we don't want to lose its pointer yet because it
	            	// may need further swapping if there are elements in between leftIdx & rightIdx
	            	// This just counteracts thr rightIdx-- at the end of the outer 'if' Block	            	
	            	if((rightIdx - leftIdx) > 1) {rightIdx++;}
	            }
	            else if(pivotIdx === rightIdx) {
	            	// Same as above, but when pivot is getting swapped from right to left
	            	pivotIdx = movePivot(sequence, pivotIdx, leftIdx);	
	            	if((rightIdx - leftIdx) > 1) {leftIdx--;}
	            }

	        }
            
            leftIdx++;
            rightIdx--;
        }
	}

	// -2 means just remove pivot animation to given index
	sequence.push(["pivot", pivotIdx, -2]);

	// Per quicksort definition, when partition is done, pivot index element is in its FINAL position
	sequence.push(["final", pivotIdx, 1]);

	return pivotIdx;
}

// Swaps elements at two indices of a given array
function swap(array, i, j) {
	var swapper = array[i];
	array[i] = array[j];
	array[j] = swapper;
	return;
}


function movePivot(sequence, oldPivotIdx, newPivotIdx) {
	sequence.push(["pivot", oldPivotIdx, newPivotIdx]);
	return newPivotIdx
}