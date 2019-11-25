export default function getBubbleSortSequence (array) {
	// sequence elements will be of the form: ["operation", idx1, idx2]
	// where operation can be compare or swap or final_swap
	var sequence = [];

	bubbleSort(array, sequence);

	return sequence;
}



function bubbleSort (array, sequence) {
	var length = array.length;

    for (var i = 0; i < length; i++) { 
        for (var j = 0; j < (length - i - 1); j++) { 
        	sequence.push(["compare",j,j+1]);	// j and j+1 first get compared

            if(array[j] > array[j+1]) {
            	sequence.push(["swap",j,j+1]); // inside the if block - j and j+1 are swapped

                // Swap the numbers
                var tmp = array[j];
                array[j] = array[j+1];
                array[j+1] = tmp;
            }

            // Lets visualizer know that array bar has reached final position in sequence
            if(j === (length-i-2)) {
            	sequence.push(["final",j+1,-1]);
            }
        }        
    }

    // At the end of bubblesort, index 0 automatically has the lowest element
    sequence.push(["final",0,-1]);
}