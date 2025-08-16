
import CodeBlock from "./CodeBlock";

function CommentContent({ content }: { content: string }) {
  //regex
  //     In development, regex (short for regular expression) is a special sequence of characters used to define a search pattern for matching, finding, replacing, or validating text.

  // Think of it as a super-powered search tool — instead of looking for an exact word, regex can find text based on flexible rules.
  const parts = content.split(/(```[\w-]*\n[\s\S]*?\n```)/g);

  return (
    <div className="max-w-none text-white">
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          // ```c++```
          // const name = "NJ"
          // ```
          const match = part.match(/```([\w-]*)\n([\s\S]*?)\n```/);
          if (match) {
            const [, language, code] = match;
            return <CodeBlock language={language} code={code} key={index} />;
          }
        }
        return part.split("\n").map((line,lineIdx)=>(
            <p key={lineIdx} className="mb-4 text-gray-300 last:mb-0">
                {line}
            </p>
        ));
      })}
    </div>
  );
}
export default CommentContent;
