import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreators,
  fetchCreatorPosts,
  setCurrentCreator,
} from "../store/slices/creatorSlice";
import SupportForm from "../components/Navigation/SupportForm";

const CreatorPage = () => {
  const dispatch = useDispatch();
  const { creators, currentCreator, posts, loading } = useSelector(
    (state) => state.creators
  );
  
  const [selectedCreatorId, setSelectedCreatorId] = useState(null);

  useEffect(() => {
    dispatch(fetchCreators());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCreatorId) {
      dispatch(fetchCreatorPosts(selectedCreatorId));
    }
  }, [selectedCreatorId, dispatch]);

  const handleSelectCreator = (creator) => {
    setSelectedCreatorId(creator.id);
    dispatch(setCurrentCreator(creator));
  };

  return (
    <div className="pt-[10vh] min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Creator Page
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 animate-pulse">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Creator List */}
            <div className="col-span-1 bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Creators
              </h3>
              <div className="space-y-4">
                {creators.map((creator) => (
                  <div
                    key={creator.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedCreatorId === creator.id
                        ? "bg-emerald-50 border-2 border-emerald-400 shadow-sm"
                        : "bg-slate-50 hover:bg-slate-100 shadow"
                    }`}
                    onClick={() => handleSelectCreator(creator)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-300 to-emerald-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-sm">
                        {creator.name?.charAt(0) || "?"}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {creator.name}
                        </h4>
                        <p className="text-sm text-gray-500">{creator.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-1 md:col-span-2">
              {currentCreator ? (
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  {/* Creator Profile */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-28 h-28 bg-gradient-to-br from-emerald-300 to-emerald-500 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-md mb-4">
                      {currentCreator.name?.charAt(0) || "?"}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {currentCreator.name}
                    </h2>
                    <p className="mb-6 text-gray-600 text-center">
                      {currentCreator.bio || "No bio available"}
                    </p>

                    <SupportForm
                      creatorId={currentCreator.id}
                      nameCreator={currentCreator.name}
                    />
                  </div>

                  {/* Creator Posts */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Posts
                    </h3>
                    {posts.length === 0 ? (
                      <p className="text-gray-500">No posts yet</p>
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
              ) : (
                <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-center h-64">
                  <p className="text-gray-500 italic">
                    Select a creator to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorPage;
