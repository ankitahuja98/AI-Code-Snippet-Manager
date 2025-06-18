type SnippetProps = {
  id: number;
  title: string;
  description: string;
  language: string;
};

const SnippetCard = ({ id, title, description, language }: SnippetProps) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span className="text-xs mt-2 inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded">
        {language}
      </span>
    </div>
  );
};

export default SnippetCard;
