import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "../api/api";
import {
  fetchBalance,
  fetchSupportByFanId,
} from "../store/slices/supportSlice";
import { fetchCreatorPosts } from "../store/slices/creatorSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { supportHistory, balance } = useSelector((state) => state.supports);
  const { notifications } = useSelector((state) => state.socket);
  const { posts } = useSelector((state) => state.creators);

  const [caption, setCaption] = useState("");
  const [postText, setPostText] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchSupportByFanId(user.id));
      dispatch(fetchBalance(user.id));
      if (user.role === "creator") {
        dispatch(fetchCreatorPosts(user.id)); 
      }
    }
  }, [dispatch, user?.id, user?.role]);

  // tampilkan toast ketika ada notifikasi baru
  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[notifications.length - 1];
      toast.info(latest, { position: "top-right" });
    }
  }, [notifications]);

  const handleGenerateCaption = async () => {
    setLoading(true);
    try {
      const res = await API.get("/ai/caption");
      setCaption(res.data.caption);
      setPostText(res.data.caption);
      toast.success("Caption generated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate caption");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", {
        creator_id: user?.id,
        text: postText,
        media_url: mediaUrl,
      });
      setPostText("");
      setMediaUrl("");
      toast.success("Post created successfully!");
      dispatch(fetchCreatorPosts(user.id)); // refresh list post setelah bikin baru
    } catch (err) {
      console.error("Create post error:", err.response?.data || err.message);
      toast.error(
        "Error creating post: " + (err.response?.data?.error || err.message)
      );
    }
  };

  return (
    <div className="pt-[12vh] min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-3">
          Dashboard
        </h2>

        {/* Creator Only Section */}
        {user?.role === "creator" && (
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">

            {/* Balance */}
            <div className="mb-8">
              <p className="text-lg font-medium text-gray-600">Your Balance</p>
              <p className="text-4xl font-extrabold text-emerald-600 mt-2">
                Rp {balance}
              </p>
            </div>

            {/* Create Post */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3 text-gray-700">
                Create New Post
              </h4>
              <form onSubmit={handleCreatePost} className="space-y-5">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-600">
                    Post Text
                  </label>
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-600">
                    Media URL (optional)
                  </label>
                  <input
                    type="text"
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleGenerateCaption}
                    className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-60"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "AI Caption Helper"}
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-500 text-white px-5 py-2 rounded-lg hover:bg-emerald-600 transition"
                  >
                    Create Post
                  </button>
                </div>
              </form>
            </div>

            {caption && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-sm mb-8">
                <p className="font-medium text-gray-700">Generated Caption:</p>
                <p className="italic text-gray-600 mt-1">"{caption}"</p>
              </div>
            )}

            {/* Creator Posts */}
            <div>
              <h4 className="text-xl font-semibold text-gray-700 mb-4">
                Your Posts
              </h4>
              {posts.length === 0 ? (
                <p className="text-gray-500 italic">No posts yet</p>
              ) : (
                <div className="space-y-5">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                      <p className="mb-3 text-gray-700">{post.text}</p>
                      {post.media_url && (
                        <img
                          src={post.media_url}
                          alt="Post media"
                          className="w-full h-56 object-cover rounded-lg shadow-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Support History */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700">
            Support History
          </h3>
          {supportHistory.length === 0 ? (
            <p className="text-gray-500 italic">No support history yet</p>
          ) : (
            <ul className="space-y-4">
              {supportHistory.map((support) => (
                <li
                  key={support.id}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <p className="text-gray-800">
                    <span className="font-semibold text-emerald-600">
                      {support.name}
                    </span>{" "}
                    supported{" "}
                    <span className="font-semibold text-gray-700">
                      Rp {support.amount}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Status:{" "}
                    <span
                      className={`font-medium ${
                        support.status === "success"
                          ? "text-emerald-600"
                          : support.status === "pending"
                          ? "text-amber-500"
                          : "text-red-500"
                      }`}
                    >
                      {support.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
