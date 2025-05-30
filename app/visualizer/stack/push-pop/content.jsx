const content = () => {
  const paragraphs = [
    `Push and Pop are the two fundamental operations in stack data structure. Stack follows LIFO (Last In First Out) principle - the last element added is the first one to be removed.`,
    `Push and Pop operations are fundamental to stack functionality. While simple to implement, stacks are powerful data structures used in many algorithms and system designs.`,
  ];

  const examplePush = [
    { points : "Start with empty stack: [ ]" },
    { points : "Push 5: [5]" },
    { points : "Push 3: [3, 5]" },
    { points : "Push 7: [7, 3, 5]" },
  ];

  const pushComplexity = [
    { points : "Time Complexity: O(1)" },
    { points : "Space Complexity: O(1)" },
  ];

  const examplePop = [
    { points : "Current stack: [7, 3, 5]" },
    { points : "Pop → returns 7: [3, 5]" },
    { points : "Pop → returns 3: [5]" },
    { points : "Pop → returns 5: [ ]" },
  ];

  const popComplexity = [
    { points : "Time Complexity: O(1)" },
    { points : "Space Complexity: O(1)" },
  ];

  {/* applications */}
  const applications = [
    { points : "Function call management in programming languages (call stack)" },
    { points : "Undo/Redo operations in text editors" },
    { points : "Back/Forward navigation in web browsers" },
    { points : "Expression evaluation and syntax parsing" },
    { points : "Memory management" },
  ];

  {/* underflow and overflow */}
  const flows = [
    { title : "Stack Underflow" },
    { title : "Stack Overflow" },
  ];

  const flowsDetails = [
    { detail : "Trying to pop from an empty stack" },
    { detail : "Trying to push to a full stack (in fixed-size implementations)" },
  ];

  const combineData = flows.map((item, index) => ({
    title : item.title,
    detail : flowsDetails[index].detail,
  }));

    return (
<main className="max-w-4xl mx-auto">
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
    {/* What is Stack Push & Pop */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        What is Stack Push & Pop?
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {paragraphs[0]}
        </p>
      </div>
    </section>

    {/* Push Operation */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Push Operation
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Adds an element to the top of the stack.
        </p>
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
          Example: Pushing elements onto a stack
        </p>
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {examplePush.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ol>
        <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {pushComplexity.map((item, index) => (
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

    {/* Pop Operation */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Pop Operation
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Removes and returns the topmost element from the stack.
        </p>
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
          Example: Popping elements from a stack
        </p>
        <ol className="space-y-2 list-decimal pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {examplePop.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {item.points}
            </li>
          ))}
        </ol>
        <ul className="mt-4 space-y-2 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {popComplexity.map((item, index) => (
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

    {/* Stack Underflow & Overflow */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Stack Underflow & Overflow
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {combineData.map((item, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              <span className="font-semibold">{item.title}:</span> {item.detail}
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Real-world Applications */}
    <section className="p-6 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-1 h-6 bg-blue-500 mr-3 rounded-full"></span>
        Real-world Applications
      </h1>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="space-y-3 list-disc pl-5 marker:text-gray-500 dark:marker:text-gray-400">
          {applications.map((items, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 pl-2">
              {items.points}
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
            {paragraphs[1]}
          </p>
        </div>
      </div>
    </section>
  </article>
</main>
    );
  };
  
  export default content;