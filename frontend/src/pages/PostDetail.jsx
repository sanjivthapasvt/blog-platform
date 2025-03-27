import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/posts/${id}/`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {post && (
        <div className="max-w-2xl mx-auto bg-gray-900 text-white p-6 rounded-lg">
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-gray-400">By <span className="text-blue-400">{post.author || "Unknown"}</span> on {new Date(post.created_at).toDateString()}</p>
          {post.img && <img src={post.img} alt={post.title} className="w-full mt-4 rounded-md" />}
          <p className="mt-4 text-gray-300">{post.content}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
