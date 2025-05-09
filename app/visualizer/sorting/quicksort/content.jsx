const content = () => {
  { /* Pivot Strategy Array */}
  const strategies = [
    { strategy : "Last element" },
    { strategy : "First element" },
    { strategy : "Random element" },
    { strategy : "Median-of-three" },
    { strategy : "Middle element" },
  ]

  const strategiesDetails = [
    { details : "Simple but can lead to worst-case on sorted arrays" },
    { details : "Similar issues as last element" },
    { details : "Reduces chance of worst-case scenarios" },
    { details : "Takes median of first, middle, last elements" },
    { details : "Often provides good balance" },
  ]

  const CombinedDeatils = strategies.map((item, index) => ({
    strategy : item.strategy,
    details : strategiesDetails[index].details,
  }))

  { /* Advantages */}
  const advantages = [
    { points : "Fastest general-purpose in-memory sorting algorithm in practice" },
    { points : "In-place algorithm (requires minimal additional memory)" },
    { points : "Cache-efficient due to sequential memory access" },
    { points : "Can be easily parallelized for better performance" },
  ]

  { /* Disadvantages */}
  const disadvantages = [
    { points : "Not stable (relative order of equal elements may change)" },
    { points : "Worst-case O(n²) performance (though rare with proper pivot selection)" },
    { points : "Performance depends heavily on pivot selection strategy" },
    { points : "Not ideal for linked lists (works best with arrays)" },
  ]

    return (
      <main>
        <section className="shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-8 mb-8 p-2">
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              What is Quick Sort
            </h1>
            <p className="ml-4 dark:text-gray-300 text-black">
              Quick Sort is an efficient, comparison-based sorting algorithm that follows the <span className="dark:text-amber-500 text-purple-600">divide-and-conquer</span> approach.
              It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot.
              The sub-arrays are then recursively sorted.
            </p>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              How Does It Work
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Consider this unsorted array: 
              <span className="dark:text-amber-500 text-purple-600">[10, 80, 30, 90, 40, 50, 70]</span>
              <br /><br />
              
              <span className="font-semibold text-purple-600 dark:text-amber-500">Partitioning Phase:</span>
              <ol className="list-decimal ml-8 pl-3">
                <li>Choose last element as pivot (70)</li>
                <li>Rearrange: elements &lt; pivot on left, &gt; pivot on right
                  <br />→ [10, 30, 40, 50] [70] [80, 90]</li>
              </ol>
              
              <span className="font-semibold text-purple-600 dark:text-amber-500">Recursive Phase:</span>
              <ol className="list-decimal ml-8 pl-3">
                <li>Apply same process to left sub-array [10, 30, 40, 50]</li>
                <li>Apply same process to right sub-array [80, 90]</li>
                <li>Combine results: [10, 30, 40, 50, 70, 80, 90]</li>
              </ol>
              
              <div className="mt-4 bg-gray-100 dark:bg-gray-900 p-0 pb-2 rounded">
                <pre className="text-sm font-mono">{`
  Original: 
  [10, 80, 30, 90, 40, 50, 70]
  
  First Partition (pivot=70):
  [10, 30, 40, 50][70][80, 90]
  
  Left Partition (pivot=50):
  [10, 30, 40][50]
  → already sorted
  
  Right Partition (pivot=90):
  [80][90]
  → already sorted
  
  Final:    
  [10, 30, 40, 50, 70, 80, 90]`}
                </pre>
              </div>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Algorithm Steps
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-decimal ml-8 pl-2">
                <li>
                  <p className="dark:text-amber-500 text-purple-600">Choose Pivot:</p>
                  <ul className="list-disc ml-6">
                    <li>Select an element as pivot <span className="dark:text-amber-500 text-purple-600">(commonly last/first/random element)</span></li>
                  </ul>
                </li>
                <li>
                  <p className="dark:text-amber-500 text-purple-600">Partition:</p>
                  <ul className="list-disc ml-6">
                    <li>Reorder array so elements <span className="dark:text-amber-500 text-purple-600">&lt;</span> pivot come before it</li>
                    <li>Elements <span className="dark:text-amber-500 text-purple-600">&gt;</span> pivot come after it</li>
                    <li>Pivot is now in its final sorted position</li>
                  </ul>
                </li>
                <li>
                  <p className="dark:text-amber-500 text-purple-600">Recurse:</p>
                  <ul className="list-disc ml-6">
                    <li>Apply quick sort to left sub-array (elements &lt; pivot)</li>
                    <li>Apply quick sort to right sub-array (elements &gt; pivot)</li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Time Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ol className="list-disc ml-8 pl-2">
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Best Case</span>: 
                  <span className="dark:text-amber-500 text-purple-600"> O(n log n)</span> (balanced partitions)
                </li>
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Average Case</span>: 
                  <span className="dark:text-amber-500 text-purple-600"> O(n log n)</span>
                </li>
                <li>
                  <span className="dark:text-amber-500 text-purple-600">Worst Case</span>: 
                  <span className="dark:text-amber-500 text-purple-600"> O(n²)</span> (unbalanced partitions)
                </li>
              </ol>
              <p className="mt-2 ml-4">
                The log n factor comes from the division steps when partitions are balanced.
                The n² occurs when the pivot selection consistently creates unbalanced partitions.
              </p>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Space Complexity
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              Quick Sort is <span className="dark:text-amber-500 text-purple-600">O(log n)</span> space complexity for the call stack in the average case,
              but can degrade to <span className="dark:text-amber-500 text-purple-600">O(n)</span> in the worst case with unbalanced partitions.
              It is generally considered an in-place algorithm as it doesn't require significant additional space.
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Advantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                {advantages.map((item, index)=> (
                  <li key={index}>{item.points}</li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Disadvantages
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                {disadvantages.map((item, index) => (
                  <li key={index}>{item.points}</li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <h1 className="text-2xl mb-2 underline decoration-blue-500 underline-offset-4">
              Pivot Selection Strategies
            </h1>
            <div className="ml-4 dark:text-gray-300 text-black">
              <ul className="list-disc ml-8 pl-2">
                {CombinedDeatils.map((item, index) => (
                  <li key={index}><strong className="text-purple-600 dark:text-amber-500">{item.strategy} :</strong> {item.details}</li>
                ))}
              </ul>
            </div>
          </div>
  
          <div className="mt-4 mb-4 ml-4 mr-4">
            <p className="ml-4 dark:text-gray-300 text-black">
              Quick Sort is the algorithm of choice for most standard library sorting implementations
              (like C's qsort, Java's Arrays.sort for primitives) due to its excellent average-case performance.
              It's particularly effective for large datasets that fit in memory.
            </p>
          </div>
        </section>
      </main>
    );
  };
  
  export default content;