// Added FINAL state logic
// RE-FACTOR AND RE-COMMENT THIS CODE

export default function getMergeSortSequence(array) {
  const sequence = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, sequence, array.length);
  return sequence;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  sequence,
  originalArrayLength,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, sequence);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, sequence);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, sequence, originalArrayLength);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  sequence,
  originalArrayLength,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  let finalMerge = (startIdx === 0) && (endIdx === originalArrayLength-1);
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    sequence.push(["compare", i, j]);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      //sequence.push([k, auxiliaryArray[i]]);
      sequence.push(["overwrite", k, auxiliaryArray[i]]);
      if (finalMerge) {sequence.push(["final", k, 1]);}
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      //sequence.push([k, auxiliaryArray[j]]);
      sequence.push(["overwrite", k, auxiliaryArray[j]]);
      if (finalMerge) {sequence.push(["final", k, 1]);}
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    sequence.push(["compare", i, i]);

    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    //sequence.push([k, auxiliaryArray[i]]);
    sequence.push(["overwrite", k, auxiliaryArray[i]]);
    if (finalMerge) {sequence.push(["final", k, 1]);}
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    sequence.push(["compare", j, j]);

    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    //sequence.push([k, auxiliaryArray[j]]);
    sequence.push(["overwrite", k, auxiliaryArray[j]]);
    if (finalMerge) {sequence.push(["final", k, 1]);}
    mainArray[k++] = auxiliaryArray[j++];
  }
}


//AUXILIARY MERGE SORT INSPIRED FROM CLEMENT MIHAELESCU
//https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/sortingAlgorithms/sortingAlgorithms.js