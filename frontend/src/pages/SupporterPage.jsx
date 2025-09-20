import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSupportByFanId } from "../store/slices/supportSlice";

const SupporterPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { supportHistory } = useSelector((state) => state.supports);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchSupportByFanId(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="pt-[10vh] min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
            Support History
          </h3>

          {supportHistory.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500 italic">No support history yet</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {supportHistory.map((support) => (
                <li
                  key={support.id}
                  className="p-5 bg-slate-50 border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
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
                    </div>
                    <div className="text-sm text-gray-400">
                      #{support.id}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupporterPage;
