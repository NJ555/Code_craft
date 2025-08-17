// // "use client";
// // import { ChevronDown, ChevronUp } from "lucide-react";
// // import { useState } from "react";
// // import SyntaxHighlighter from "react-syntax-highlighter";
// // import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// // interface CodeBlockProps {
// //   code: string;
// //   language: string;
// // }

// // const CodeBlock = ({ code, language }: CodeBlockProps) => {
// //   const [isExpanded, setIsExpanded] = useState(false);
// //   const lines = code.split("\n");
// //   const displayCode = isExpanded ? code : lines.slice(0, 6).join("\n");

// //   return (
// //     <div className="relative">
// //       <SyntaxHighlighter
// //         language={language.toLowerCase()}
// //         style={atomOneDark}
// //         customStyle={{
// //           padding: "1rem",
// //           borderRadius: "0.5rem",
// //           background: "rgba(0, 0, 0, 0.4)",
// //           margin: 0,
// //         }}
// //       >
// //         {displayCode}
// //       </SyntaxHighlighter>

// //       {lines.length > 6 && (
// //         <button
// //           onClick={() => setIsExpanded(!isExpanded)}
// //           className="absolute bottom-2 right-2 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs flex items-center 
// //           gap-1 hover:bg-blue-500/30 transition-colors"
// //         >
// //           {isExpanded ? (
// //             <>
// //               Show Less <ChevronUp className="w-3 h-3" />
// //             </>
// //           ) : (
// //             <>
// //               Show More <ChevronDown className="w-3 h-3" />
// //             </>
// //           )}
// //         </button>
// //       )}
// //     </div>
// //   );
// // };

// // export default CodeBlock;




// "use client";

// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useState } from "react";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// interface CodeBlockProps {
//   code: string;
//   language: string;
// }

// function normalizeLanguage(lang: string): string {
//   const l = lang.toLowerCase();
//   if (l === "c++" || l === "cpp") return "cpp"; // normalize
//   return l;
// }

// const CodeBlock = ({ code, language }: CodeBlockProps) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const lines = code.split("\n");
//   const displayCode = isExpanded ? code : lines.slice(0, 6).join("\n");

//   return (
//     <div className="relative">
//       <SyntaxHighlighter
//         language={normalizeLanguage(language)}
//         style={atomOneDark}
//         customStyle={{
//           padding: "1rem",
//           borderRadius: "0.5rem",
//           background: "rgba(0, 0, 0, 0.4)",
//           margin: 0,
//         }}
//       >
//         {displayCode}
//       </SyntaxHighlighter>

//       {lines.length > 6 && (
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="absolute bottom-2 right-2 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs flex items-center 
//           gap-1 hover:bg-blue-500/30 transition-colors"
//         >
//           {isExpanded ? (
//             <>
//               Show Less <ChevronUp className="w-3 h-3" />
//             </>
//           ) : (
//             <>
//               Show More <ChevronDown className="w-3 h-3" />
//             </>
//           )}
//         </button>
//       )}
//     </div>
//   );
// };

// export default CodeBlock;








"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  code: string;
  language: string;
}

// ✅ Robust normalization function
function normalizeLanguage(lang: string): string {
  const l = lang.trim().toLowerCase();
  if (l === "c++" || l === "cpp" || l === "c") return "cpp"; // all treated as cpp
  return l;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = code.split("\n");
  const displayCode = isExpanded ? code : lines.slice(0, 6).join("\n");

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={normalizeLanguage(language)}
        style={atomOneDark}
        customStyle={{
          padding: "1rem",
          borderRadius: "0.5rem",
          background: "rgba(0, 0, 0, 0.4)",
          margin: 0,
        }}
      >
        {displayCode}
      </SyntaxHighlighter>

      {lines.length > 6 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-2 right-2 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs flex items-center 
          gap-1 hover:bg-blue-500/30 transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CodeBlock;
