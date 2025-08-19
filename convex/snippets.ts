// import { mutation, query } from "./_generated/server";
// import { ConvexError, v } from "convex/values";

// function normalizeLanguage(lang: string): string {
//   const l = (lang || "").toLowerCase();
//   if (l === "c++" || l === "cpp") return "cpp";
//   // you could map more aliases here if needed
//   return l;
// }

// function isCpp(lang: string): boolean {
//   return normalizeLanguage(lang) === "cpp";
// }

// async function requireIdentity(ctx: any) {
//   const identity = await ctx.auth.getUserIdentity();
//   if (!identity) throw new ConvexError("Not authenticated");
//   return identity;
// }

// async function getUserByIdentity(ctx: any, subject: string) {
//   const user = await ctx.db
//     .query("users")
//     .withIndex("by_user_id")
//     .filter((q: any) => q.eq(q.field("userId"), subject))
//     .first();
//   if (!user) throw new ConvexError("User not found");
//   return user;
// }

// export const createSnippet = mutation({
//   args: {
//     title: v.string(),
//     language: v.string(),
//     code: v.string(),
//   },

//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not Authenticated");

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_user_id")
//       .filter((q) => q.eq(q.field("userId"), identity.subject))
//       .first();

//     if (!user) throw new Error("User not found");

//     const snippetId = await ctx.db.insert("snippets", {
//       userId: identity.subject,
//       userName: user.name,
//       title: args.title,
//       language: args.language,
//       code: args.code,
//     });
//     return snippetId;
//   },
// });

// export const unstarSnippet = mutation({
//   args: {
//     snippetId: v.id("snippets"),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not Authenticated");

//     // Check if star exists for this user + snippet
//     const star = await ctx.db
//       .query("stars")
//       .withIndex("by_user_id_and_snippet_id")
//       .filter((q) =>
//         q.and(
//           q.eq(q.field("userId"), identity.subject),
//           q.eq(q.field("snippetId"), args.snippetId)
//         )
//       )
//       .first();

//     if (!star) {
//       throw new Error("You haven't starred this snippet");
//     }

//     // Delete only THIS user's star, not others
//     await ctx.db.delete(star._id);
//   },
// });


// export const deleteSnippet = mutation({
//   args: {
//     snippetId: v.id("snippets"),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not Authenticated");

//     const snippet = await ctx.db.get(args.snippetId);
//     if (!snippet) throw new Error("Snippet not found");

//     if (snippet.userId != identity.subject) {
//       throw new Error("Not Autherized to delete this snippet");
//     }

//     const comments = await ctx.db
//       .query("snippetComment")
//       .withIndex("by_snippet_id")
//       .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
//       .collect();

//     for (const comment of comments) {
//       await ctx.db.delete(comment._id);
//     }

//     const stars = await ctx.db
//       .query("stars")
//       .withIndex("by_snippet_id")
//       .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
//       .collect();

//     for (const star of stars) {
//       await ctx.db.delete(star._id);
//     }

//     await ctx.db.delete(args.snippetId);
//   },
// });

// export const starSnippet = mutation({
//   args: {
//     snippetId: v.id("snippets"),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not Authenticated");

//     const existing = await ctx.db
//     .query("stars")
//     .withIndex("by_user_id_and_snippet_id")
//     .filter((q)=>q.eq(q.field("userId"),identity.subject) && q.eq(q.field("snippetId"),args.snippetId))
//     .first();

   

//     if (existing) {
//       await ctx.db.delete(existing._id);
//     } else {
//       await ctx.db.insert("stars", {
//         userId: identity.subject,
//         snippetId: args.snippetId,
//       });
//     }
//   },
// });

// export const getSnippets = query({
//   handler: async (ctx) => {
//     const snippets = await ctx.db.query("snippets").order("desc").collect();
//     return snippets;
//   },
// });

// export const addComment = mutation({
//   args: {
//     snippetId: v.id("snippets"),
//     content: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not Authenticated");

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_user_id")
//       .filter((q) => q.eq(q.field("userId"), identity.subject))
//       .first();

//     if (!user) throw new Error("User Not found");

//     return await ctx.db.insert("snippetComment", {
//       snippetId: args.snippetId,
//       userId: identity.subject,
//       username: user.name,
//       content: args.content,
//     });
//   },
// });

// export const deleteComment = mutation({
//   args: { commentId: v.id("snippetComment") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not Authenticated");

//     const comment = await ctx.db.get(args.commentId);
//     if (!comment) throw new Error("Comment not found");

//     //check if the user is the comment author
//     if (comment.userId !== identity.subject) {
//       throw new Error("Not authorized to delete this comment");
//     }
//     await ctx.db.delete(args.commentId);
//   },
// });

// export const getSnippetById = query({
//   args: { snippetId: v.id("snippets") },
//   handler: async (ctx, args) => {
//     const snippet = await ctx.db.get(args.snippetId);
//     if (!snippet) throw new Error("Snippets not found");
//     return snippet;
//   },
// });

// export const getComments = query({
//   args: { snippetId: v.id("snippets") },
//   handler: async (ctx, args) => {
//     const comments = await ctx.db
//       .query("snippetComment")
//       .withIndex("by_snippet_id")
//       .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
//       .order("desc")
//       .collect();
//     return comments;
//   },
// });

// export const isSnippetStarred = query({
//   args: {
//     snippetId: v.id("snippets"),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) return false;

//     const star = await ctx.db
//       .query("stars")
//       .withIndex("by_user_id_and_snippet_id")
//       .filter(
//         (q) =>
//           q.eq(q.field("userId"), identity.subject) &&
//           q.eq(q.field("snippetId"), args.snippetId)
//       )
//       .first();
//     return !!star;
//   },
// });

// export const getSnippetStarCount = query({
//   args: { snippetId: v.id("snippets") },
//   handler: async (ctx, args) => {
//     const stars = await ctx.db
//       .query("stars")
//       .withIndex("by_snippet_id")
//       .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
//       .collect();

//     return stars.length;
//   },
// });

// export const getStarredSnippets = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) return [];

//     const stars = await ctx.db
//       .query("stars")
//       .withIndex("by_user_id")
//       .filter((q) => q.eq(q.field("userId"), identity.subject))
//       .collect();

//     const snippets = await Promise.all(
//       stars.map((star) => ctx.db.get(star.snippetId))
//     );

//     return snippets.filter((snippet) => snippet !== null);
//   },
// });









import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    language: v.string(),
    code: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    const snippetId = await ctx.db.insert("snippets", {
      userId: identity.subject,
      userName: user.name,
      title: args.title,
      language: args.language,
      code: args.code,
    });

    return snippetId;
  },
});

export const deleteSnippet = mutation({
  args: {
    snippetId: v.id("snippets"),
  },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) throw new Error("Snippet not found");

    if (snippet.userId !== identity.subject) {
      throw new Error("Not authorized to delete this snippet");
    }

    const comments = await ctx.db
      .query("snippetComment")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    const stars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    for (const star of stars) {
      await ctx.db.delete(star._id);
    }

    await ctx.db.delete(args.snippetId);
  },
});

// export const starSnippet = mutation({
//   args: {
//     snippetId: v.id("snippets"),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not authenticated");

//     const existing = await ctx.db
//       .query("stars")
//       .withIndex("by_user_id_and_snippet_id")
//       .filter(
//         (q) =>
//           q.eq(q.field("userId"), identity.subject) && q.eq(q.field("snippetId"), args.snippetId)
//       )
//       .first();

//     if (existing) {
//       await ctx.db.delete(existing._id);
//     } else {
//       await ctx.db.insert("stars", {
//         userId: identity.subject,
//         snippetId: args.snippetId,
//       });
//     }
//   },
// });


export const starSnippet = mutation({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Get the snippet to check ownership
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) throw new Error("Snippet not found");

    // 🚫 Prevent owner from starring their own snippet
    // if (snippet.userId === identity.subject) {
    //   throw new Error("You cannot star your own snippet");
    // }

    // Check if already starred
    const existing = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id", (q) =>
        q.eq("userId", identity.subject).eq("snippetId", args.snippetId)
      )
      .unique();

    if (existing) {
      // Unstar instead of inserting again
      await ctx.db.delete(existing._id);
      return;
    }

    // Insert star
    await ctx.db.insert("stars", {
      userId: identity.subject,
      snippetId: args.snippetId,
    });
  },
});


export const addComment = mutation({
  args: {
    snippetId: v.id("snippets"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) throw new Error("User not found");

    return await ctx.db.insert("snippetComment", {
      snippetId: args.snippetId,
      userId: identity.subject,
      username: user.name,
      content: args.content,
    });
  },
});

export const deleteComment = mutation({
  args: { commentId: v.id("snippetComment") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const comment = await ctx.db.get(args.commentId);
    if (!comment) throw new Error("Comment not found");

    // Check if the user is the comment author
    if (comment.userId !== identity.subject) {
      throw new Error("Not authorized to delete this comment");
    }

    await ctx.db.delete(args.commentId);
  },
});

// export const getSnippets = query({
//   handler: async (ctx) => {
//     const snippets = await ctx.db.query("snippets").order("desc").collect();
//     return snippets;
//   },
// });

export const getSnippets = query({
  args: {},
  handler: async (ctx) => {
    // ✅ get current logged-in user
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;

    // ✅ fetch all snippets
    const snippets = await ctx.db.query("snippets").collect();

    // ✅ attach starCount and starredByUser to each snippet
    return await Promise.all(
      snippets.map(async (snippet) => {
        const stars = await ctx.db
          .query("stars")
          .withIndex("by_snippet_id", (q) => q.eq("snippetId", snippet._id))
          .collect();

        return {
          ...snippet,
          starCount: stars.length,                         // ⭐ total stars
          starredByUser: !!userId && stars.some((s) => s.userId === userId), // ✅ true if this user starred
        };
      })
    );
  },
});


export const getSnippetById = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const snippet = await ctx.db.get(args.snippetId);
    if (!snippet) throw new Error("Snippet not found");

    return snippet;
  },
});

export const getComments = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("snippetComment")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .order("desc")
      .collect();

    return comments;
  },
});

export const isSnippetStarred = query({
  args: {
    snippetId: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const star = await ctx.db
      .query("stars")
      .withIndex("by_user_id_and_snippet_id")
      .filter(
        (q) =>
          q.eq(q.field("userId"), identity.subject) && q.eq(q.field("snippetId"), args.snippetId)
      )
      .first();

    return !!star;
  },
});

export const getSnippetStarCount = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, args) => {
    const stars = await ctx.db
      .query("stars")
      .withIndex("by_snippet_id")
      .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
      .collect();

    return stars.length;
  },
});

export const getStarredSnippets = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const stars = await ctx.db
      .query("stars")
      .withIndex("by_user_id")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();

    const snippets = await Promise.all(stars.map((star) => ctx.db.get(star.snippetId)));

    return snippets.filter((snippet) => snippet !== null);
  },
});



// export const unstarSnippet = mutation({
//   args: { snippetId: v.id("snippets") },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not authenticated");

//     const star = await ctx.db
//       .query("stars")
//       .withIndex("by_user_id_and_snippet_id", (q) =>
//         q.eq("userId", identity.subject).eq("snippetId", args.snippetId)
//       )
//       .unique();

//     if (!star) return; // Nothing to unstar

//     await ctx.db.delete(star._id);
//   },
// });
