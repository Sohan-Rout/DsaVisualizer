import Animation from "@/app/visualizer/sorting/mergesort/animation";
import Navbar from "@/app/components/navbarinner";

export const metadata = {
  title: 'Merge Sort Algorithm | Step-by-Step Algorithm Animation',
  description: 'Explore how Merge Sort works with interactive, step-by-step visualizations, hands-on practice, and a quiz to test your understanding. Includes code examples in JavaScript, C, Python, and Java. Ideal for beginners learning efficient divide-and-conquer sorting algorithms.',
  keywords: [
    'Merge Sort Visualizer',
    'Merge Sort Animation',
    'Merge Sort Visualization',
    'Merge Sort Algorithm',
    'Merge Sort Quiz',
    'Sorting Algorithm Quiz',
    'Divide and Conquer Sorting',
    'Sorting Algorithm Visualization',
    'Learn Merge Sort',
    'DSA Merge Sort',
    'Practice Merge Sort',
    'Interactive Merge Sort Tool',
    'Test Merge Sort Knowledge',
    'Merge Sort in JavaScript',
    'Merge Sort in C',
    'Merge Sort in Python',
    'Merge Sort in Java',
    'Merge Sort Code Examples',
  ],
  robots: "index, follow",
};

export default function Page() {
  return(
    <>
    <Navbar/>
    <Animation/>
    </>
  );
};