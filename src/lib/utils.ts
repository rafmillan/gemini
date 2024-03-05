"use client"
export function selectRandomStrings(list: string[], num: number) {
  // Shuffle the input array using Fisher-Yates algorithm (Durstenfeld shuffle).
  const arrLength = list.length;
  if (!num ) throw new Error('Please provide valid number of elements');
  else if (arrLength < num) return [];

  let currentIndex = arrLength - 1;
  while (currentIndex > 0) {
      const randIndex = Math.floor((Math.random() * currentIndex));
      
      // Swap values at current index and randomly selected index
      const tempValue = list[randIndex];
      list[randIndex] = list[currentIndex];
      list[currentIndex] = tempValue;
      
      currentIndex--;
  }
  
  // Return first n elements after shuffling
  return list.slice(0, num);
}