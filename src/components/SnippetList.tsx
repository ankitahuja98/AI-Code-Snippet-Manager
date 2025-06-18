import SnippetCard from "./SnippetCard";

const dummySnippets = [
  {
    id: 0,
    title: "Debounce Hook",
    description: "Custom React hook for debouncing values",
    language: "TypeScript",
  },
  {
    id: 1,
    title: "Fetch Wrapper",
    description: "Reusable fetch utility with error handling",
    language: "JavaScript",
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
