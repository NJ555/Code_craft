import { useAuth } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Star } from "lucide-react";

function StarButton({
  snippetId,
  starredByUser,
  starCount,
}: {
  snippetId: Id<"snippets">;
  starredByUser: boolean;
  starCount: number;
}) {
  const { isSignedIn } = useAuth();
  const star = useMutation(api.snippets.starSnippet);

  const handleStar = async () => {
    if (!isSignedIn) return;
    await star({ snippetId });
  };

  return (
    <button
      className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
    transition-all duration-200 ${
      starredByUser
        ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
        : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
    }`}
      onClick={handleStar}
    >
      <Star
        className={`w-4 h-4 ${
          starredByUser
            ? "fill-yellow-500"
            : "fill-none group-hover:fill-gray-400"
        }`}
      />
      <span
        className={`text-xs font-medium ${
          starredByUser ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        {starCount}
      </span>
    </button>
  );
}

export default StarButton;




// import { useAuth } from "@clerk/nextjs";
// import { Id } from "../../convex/_generated/dataModel";
// import { useMutation, useQuery } from "convex/react";
// import { api } from "../../convex/_generated/api";
// import { Star } from "lucide-react";

// function StarButton({ snippetId }: { snippetId: Id<"snippets"> }) {
//   const { isSignedIn } = useAuth();

//   // These queries should return results only for the logged-in user
//   const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
//   const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });

//   const starSnippet = useMutation(api.snippets.starSnippet);
//   const unstarSnippet = useMutation(api.snippets.unstarSnippet);

//   const handleStar = async () => {
//     if (!isSignedIn) return;

//     if (isStarred) {
//       // Removes only current user's star
//       await unstarSnippet({ snippetId });
//     } else {
//       await starSnippet({ snippetId });
//     }
//   };

//   if (isStarred === undefined || starCount === undefined) {
//     return null; // or loading spinner
//   }

//   return (
//     <button
//       className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg 
//         transition-all duration-200 ${
//           isStarred
//             ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
//             : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
//         }`}
//       onClick={handleStar}
//     >
//       <Star
//         className={`w-4 h-4 ${
//           isStarred ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"
//         }`}
//       />
//       <span
//         className={`text-xs font-medium ${
//           isStarred ? "text-yellow-500" : "text-gray-400"
//         }`}
//       >
//         {starCount}
//       </span>
//     </button>
//   );
// }

// export default StarButton;
