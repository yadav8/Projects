// Re-comment code
// Need to get Pivot color and Final color working
export default function getQuickSortSequence (array) {
	// sequence elements will be of the form: ["operation", idx1, idx2]
	// where operation can be compare or swap or final_swap
	var sequence = [];
	quickSort(array, sequence, 0, array.length-1);
	return sequence;
}


function quickSort(array, sequence, leftIdx, rightIdx) {
	if (array.length > 1) {
		var index = partition(array, sequence, leftIdx, rightIdx); //index returned from partition

		if (leftIdx < index - 1) { //more elements on the left side of the pivot
		    quickSort(array, sequence, leftIdx, index - 1);
		}
		if (index < rightIdx) { //more elements on the right side of the pivot
		    quickSort(array, sequence, index, rightIdx);
		}
	}

	return array;
}

function partition(array, sequence, leftIdx, rightIdx) {
	var pivotIdx = Math.floor((rightIdx+leftIdx)/2);
	var pivot = array[pivotIdx];
	console.log(pivot, array);
	//sequence.push(["pivot", pivotIdx, -1]);

	while (leftIdx <= rightIdx) {		
		while (array[leftIdx] < pivot) {
			if(leftIdx !== rightIdx) {sequence.push(["compare", leftIdx, rightIdx]);}
            leftIdx++;
        }
        while (array[rightIdx] > pivot) {
        	if(leftIdx !== rightIdx) {sequence.push(["compare", leftIdx, rightIdx]);}
            rightIdx--;
        }
        if (leftIdx <= rightIdx) {
            // Swapping two elements
            // Make separate swap function
            if(leftIdx !== rightIdx) {sequence.push(["swap", leftIdx, rightIdx]);            }
            var tmp = array[leftIdx];
            array[leftIdx] = array[rightIdx];
            array[rightIdx] = tmp;
            leftIdx++;
            rightIdx--;
        }
	}

	return leftIdx;
}



