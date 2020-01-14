export function getInsertionSortAnimations(array) {
  const animations = [];
  var nextPos = 1;
  var temp = 0;

  for (let i = 1; i < array.length; i++) {
    nextPos = i;
    while(nextPos > 0 && array[nextPos-1] > array[nextPos]) {
      animations.push([nextPos-1, array[nextPos-1]]);
      animations.push([nextPos, array[nextPos]]);
      temp = array[nextPos];
      array[nextPos] = array[nextPos-1];
      array[(nextPos--)-1] = temp;
    }
  }

  return animations;
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  var sorted = false;
  var temp = 0;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < (array.length-1); i++) {
      if (array[i+1] < array[i]) {
        sorted = false;
        animations.push([i, array[i]]);
        animations.push([i+1, array[i+1]]);
        temp = array[i];
        array[i] = array[i+1];
        array[i+1] = temp;
      }
    }
  }

  return animations;
}

export function getSelectionSortAnimations(array) {
  const animations = [];
  var min, minIdx;

  for (let i = 0; i < array.length; i++) {
    min = array[i];
    minIdx = i;
    for(let j = i; j < array.length; j++) {
      if (array[j] < min) {
        min = array[j];
        minIdx = j;
      }
    }

    animations.push([i, array[i]]);
    animations.push([minIdx, min]);    
    array[minIdx] = array[i];
    array[i] = min;
  }

  return animations;
}

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);
    
    return animations;
}

function mergeSort(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {

      animations.push([i, i]);

      animations.push([i, i]);
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}