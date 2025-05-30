import { time } from "framer-motion";

const content = () => {
  const paragraph = [
    `Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It works similarly to how you might sort playing cards in your hands - you take each new card and insert it into its proper position among the already sorted cards.`,
    `The algorithm maintains a "sorted sublist" that grows with each iteration.`,
    `Like Bubble Sort, Insertion Sort is in-place and requires only O(1) additional space.`,
    `Insertion Sort is often used when the data is nearly sorted (where it approaches O(n) time) or when the dataset is small. Some hybrid algorithms like TimSort use Insertion Sort for small subarrays due to its low overhead.`,
  ];

  const working = [
    { points : "First Element (7):", 
      subpoints : [
        "Already \"sorted\" as the first item",
        "→ [7, 3, 5, 2, 1]",
      ],
    },
    { points : "Second Element (3):", 
      subpoints : [
        "Insert before 7",
        "→ [3, 7, 5, 2, 1]",
      ],
    },
    { points : "Third Element (5):", 
      subpoints : [
        "Insert between 3 and 7",
        "→ [3, 5, 7, 2, 1]",
      ],
    },
    { points : "Fourth Element (2):", 
      subpoints : [
        "Insert at beginning",
        "→ [2, 3, 5, 7, 1]",
      ],
    },
    { points : "Fifth Element (1):", 
      subpoints : [
        "Insert at beginning",
        "→ [1, 2, 3, 5, 7]",
      ],
    },
  ];

  const algorithm = [
    { steps : "Start with the second element (consider first element as sorted)" },
    { steps : "Pick the next element (key) from the unsorted portion" },
    { steps : "Compare the key with elements in the sorted portion:",
      points : [
        "Shift elements greater than the key one position right",
        "Stop when you find an element ≤ the key",
      ],
     },
    { steps : "Insert the key in its correct position" },
    { steps : "Repeat until all elements are processed" },
  ];

  const timeComplexity = [
    { points : "Best Case: Already sorted array → O(n) (only comparisons, no shifts)." },
    { points : "Average Case: Randomly ordered array → O(n²)." },
    { points : "Worst Case: Reverse sorted array → O(n²) (maximum comparisons and shifts)." },
  ];

  const advantages = [
    { points : "Efficient for small datasets (often faster than more complex algorithms for n ≤ 10)" },
    { points : "Stable (doesn't change relative order of equal elements)" },
    { points : "Adaptive (performs well with partially sorted data)" },
    { points : "Online (can sort as it receives input)" },
  ];

    return (
      <main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is Insertion Sort */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is Insertion Sort?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[0]}
        </p>
      </div>
    </section>

    {/* How Does It Work */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        How Does It Work?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Consider this unsorted array: [7, 3, 5, 2, 1]
        </p>
        
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {working.map((items, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-semibold">{items.points}</span>
              {items.subpoints && (
                <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500 font-normal">
                  {items.subpoints.map((subitems, subindex) => (
                    <li key={subindex} className="text-gray-600 dark:text-gray-400">
                      {subitems}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        
        <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
          {paragraph[1]}
        </p>
      </div>
    </section>

    {/* Algorithm Steps */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Algorithm Steps
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ol className="space-y-3 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {algorithm.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.steps}
              {item.points && (
                <ul className="mt-2 space-y-2 list-disc pl-5 marker:text-gray-400 dark:marker:text-gray-500">
                  {item.points.map((subitem, subindex) => (
                    <li key={subindex} className="text-gray-600 dark:text-gray-400">
                      {subitem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Time Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Time Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {timeComplexity.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                {item.points.split(':')[0]}:
              </span>
              <span className="ml-2">{item.points.split(':')[1]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Space Complexity */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Space Complexity
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraph[2]}
        </p>
      </div>
    </section>

    {/* Advantages */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Advantages
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {advantages.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Additional Info */}
    <section className="p-6">
      <div className="prose dark:prose-invert max-w-none">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {paragraph[3]}
          </p>
        </div>
      </div>
    </section>
  </article>
</main>
    );
  };
  
  export default content;