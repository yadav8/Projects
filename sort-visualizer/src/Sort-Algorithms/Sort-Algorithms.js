export function bubbleSort (array) {
	var length = array.length;
    //Number of passes
    for (var i = 0; i < length; i++) { 
        //Notice that j < (length - i)
        for (var j = 0; j < (length - i - 1); j++) { 
            //Compare the adjacent positions
            if(array[j] > array[j+1]) {
                //Swap the numbers
                var tmp = array[j];  //Temporary variable to hold the current number
                array[j] = array[j+1]; //Replace current number with adjacent number
                array[j+1] = tmp; //Replace adjacent number with current number
            }
        }        
    }

    //return array;
}