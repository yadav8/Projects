//RE-FACTOR AND RE-COMMENT THIS CODE

export default function getMergeSortSequence(array) {
  const sequence = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, sequence);
  return sequence;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  sequence,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, sequence);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, sequence);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, sequence);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  sequence,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    sequence.push(["compare", i, j]);

    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      //sequence.push([k, auxiliaryArray[i]]);
      sequence.push(["overwrite", k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      //sequence.push([k, auxiliaryArray[j]]);
      sequence.push(["overwrite", k, auxiliaryArray[j]]);
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
    mainArray[k++] = auxiliaryArray[j++];
  }
}