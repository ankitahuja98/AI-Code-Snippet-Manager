import SnippetCard from "./SnippetCard";

const dummySnippets = [
  {
    id: 1,
    title: "Debounce",
    language: "javascript",
    code: "",
    summaryAndSuggestion:
      "This debounce function limits how often a given function executes by ensuring it only runs after a specified delay since the last call. It’s commonly used to optimize performance in high-frequency events like window resizing, keystrokes in search inputs, or scroll events. By delaying execution, it reduces unnecessary function calls and improves efficiency.",
    optimiseCode: "",
    tags: ["JS", "rate-limiting", "performance", "es6"],
    optimisationRequired: false,
  },
  {
    id: 2,
    title: "Throttle",
    language: "javascript",
    code: "",
    summaryAndSuggestion:
      "Throttle ensures a function is called at most once in a specified time interval, no matter how many times it's triggered. It’s ideal for rate-limiting functions like scroll handlers or mouse move events.",
    optimiseCode: "",
    tags: ["JS", "throttle", "performance", "event-handling"],
    optimisationRequired: true,
  },
  {
    id: 3,
    title: "useDebounce Hook",
    language: "react",
    code: "",
    summaryAndSuggestion:
      "The custom useDebounce React hook delays updating a value until after a delay period has passed, useful for optimizing input-based operations like search filtering.",
    optimiseCode: "",
    tags: ["React", "hooks", "debounce", "custom-hooks"],
    optimisationRequired: false,
  },
  {
    id: 4,
    title: "useEffect with Cleanup",
    language: "react",
    code: "",
    summaryAndSuggestion:
      "Using useEffect with a cleanup function prevents memory leaks and unintended side effects when a component unmounts or when dependencies change. It’s crucial for setting up and tearing down subscriptions, timers, or event listeners.",
    optimiseCode: "",
    tags: ["React", "hooks", "lifecycle", "useEffect"],
    optimisationRequired: true,
  },
  {
    id: 5,
    title: "Controlled Input",
    language: "react",
    code: "",
    summaryAndSuggestion:
      "A controlled input in React binds the value of the input element to component state. This enables real-time validation, formatting, and conditional UI behavior.",
    optimiseCode: "",
    tags: ["React", "forms", "controlled-component", "input"],
    optimisationRequired: false,
  },
  {
    id: 6,
    title: "Memoization with useMemo",
    language: "react",
    code: "",
    summaryAndSuggestion:
      "useMemo caches the result of expensive computations between renders unless dependencies change. It’s useful for improving performance in components with heavy calculations or derived data.",
    optimiseCode: "",
    tags: ["React", "useMemo", "performance", "optimization"],
    optimisationRequired: true,
  },
  {
    id: 7,
    title: "React Lazy Loading",
    language: "react",
    code: "",
    summaryAndSuggestion:
      "React’s lazy function allows dynamic imports of components, reducing the initial load size by splitting code. Combine it with Suspense to display fallbacks during load.",
    optimiseCode: "",
    tags: ["React", "lazy", "suspense", "code-splitting", "performance"],
    optimisationRequired: false,
  },
  {
    id: 8,
    title: "useRef for DOM Access",
    language: "react",
    code: "",
    summaryAndSuggestion:
      "useRef allows you to persist values across renders without triggering re-renders. It's particularly useful for directly accessing DOM elements or storing mutable variables.",
    optimiseCode: "",
    tags: ["React", "useRef", "DOM", "refs"],
    optimisationRequired: true,
  },
];

const SnippetList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummySnippets.map((val, ind) => (
        <SnippetCard key={val.id} {...val} />
      ))}
    </div>
  );
};

export default SnippetList;
