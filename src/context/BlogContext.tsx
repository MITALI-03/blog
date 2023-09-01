import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import jsonServer from "../api/jsonServer";

interface BlogPost {
  title: string;
  id: number;
  content: string;
}

interface BlogContextState {
  blogPosts: BlogPost[];
}

interface BlogContextActions {
  addBlogPost: (title: string, content: string) => void;
  deleteBlogPost: (id: number) => void;
  editBlogPost: (id: number, title: string, content: string) => void;
  getBlogPosts: () => Promise<void>;
}

type Action = { type: string; payload?: any };

const initialState: BlogContextState = {
  blogPosts: [],
};

const BlogContext = createContext<{
  state: BlogContextState;
  actions: BlogContextActions;
}>({
  state: initialState,
  actions: {
    addBlogPost: () => {},
    deleteBlogPost: () => {},
    editBlogPost: () => {},
    getBlogPosts: () => Promise.resolve(),
  },
});

const blogReducer = (
  state: BlogContextState,
  action: Action
): BlogContextState => {
  switch (action.type) {
    case "delete_blogpost":
      const updatedBlogPosts = state.blogPosts.filter(
        (blogPost) => blogPost.id !== action.payload.id
      );
      return {
        ...state,
        blogPosts: updatedBlogPosts,
      };
    case "edit_blogpost":
      return {
        ...state,
        blogPosts: state.blogPosts.map((blogPost) => {
          if (blogPost.id === action.payload.id) {
            return {
              ...blogPost,
              title: action.payload.title,
              content: action.payload.content,
            };
          }
          return blogPost;
        }),
      };
    case "get_blogpost":
      return {
        ...state,
        blogPosts: action.payload,
      };
    default:
      return state;
  }
};

const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  const actions: BlogContextActions = {
    addBlogPost: async (title, content) => {
      try {
        await jsonServer.post("/blogpost", { title, content });
      } catch (error) {
        console.log("error saving post:", error);
      }
    },
    deleteBlogPost: async(id) => {
      try {
        await jsonServer.delete(`/blogpost/${id}`,);
        dispatch({ type: "delete_blogpost", payload: { id } });
      } catch (error) {
        console.log("error saving post:", error);
      }
    },
    editBlogPost: async(id, title, content) => {
      try {
        await jsonServer.put(`/blogpost/${id}`,{title,content});
        dispatch({ type: "edit_blogpost", payload: { id, title, content } });
      } catch (error) {
        console.log("error saving post:", error);
      }
    },
    getBlogPosts: async () => {
      try {
        const response = await jsonServer.get("/blogpost");
        dispatch({ type: "get_blogpost", payload: response.data });
      } catch (error) {
        console.log("Error fetching blog posts:", error);
      }
    },
  };

  useEffect(() => {
    actions.getBlogPosts();
  }, []);

  return (
    <BlogContext.Provider value={{ state, actions }}>
      {children}
    </BlogContext.Provider>
  );
};

const useBlogContext = () => useContext(BlogContext);

export { BlogProvider, useBlogContext };
