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

// Returns Euclidean Distance between 2 vectors
export function euclideanDistance(a: number[], b: number[]) {
  let sum = 0;
  for (let n = 0; n < a.length; n++) {
    sum += Math.pow(a[n] - b[n], 2);
  }
  return Math.sqrt(sum);
}

// returns dot product
// assumes a and b are same length
export function dotProduct(a: number[], b: number[]) {
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * a[i];
  }
  return dot
}

// document split
export function splitString(str: string, size: number) {
  // Split the string into an array of words
  const words = str.split(" ");

  // Initialize an empty array to store the split strings
  const splitStrings = [];

  // Iterate through the words array in steps of 20
  for (let i = 0; i < words.length; i += size) {
      // Join the words from the current index to the next 20 words
      const splitString = words.slice(i, i + size).join(" ");

      // Append the split string to the splitStrings array
      splitStrings.push(splitString);
  }

  // Return the splitStrings array
  return splitStrings;
}

export function findIndexOfLargestNumber(numbers: number[]): number {
  let largestNumber = numbers[0];
  let largestNumberIndex = 0;

  for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] > largestNumber) {
          largestNumber = numbers[i];
          largestNumberIndex = i;
      }
  }

  return largestNumberIndex;
}

export default function generateQuery(query: string, context: string) {
  const prompt = 
   `You are a helpful and informative bot that answers questions using text from the reference document included below. \
    Be sure to respond in a complete sentence, being comprehensive, including all relevant background information. \
    However, you are talking to a non-technical audience, so be sure to break down complicated concepts and \
    strike a friendly and converstional tone. \
    If the document is irrelevant to the answer, you may ignore it.
    QUESTION: ${query}
    DOCUMENT: ${context}
    ANSWER:`

  return prompt
}

// Prints chunks of generated text to the console as they become available
// eg: const result = await model.generateContentStream([prompt, ...imageParts]);
//     await streamToStdout(result.stream);
export async function streamToStdout(stream: any) {
  console.log("Streaming...\n");
  for await (const chunk of stream) {
    // Get first candidate's current text chunk
    const chunkText = chunk.text();
    // Print to console without adding line breaks
    process.stdout.write(chunkText);
  }
  // Print blank line
  console.log("\n");
}