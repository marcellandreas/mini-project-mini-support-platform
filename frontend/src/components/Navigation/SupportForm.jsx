import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendSupport } from "../../store/slices/supportSlice";
import { useNavigate } from "react-router-dom";

const SupportForm = ({ creatorId, nameCreator }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, currentSupport } = useSelector((state) => state.supports);
   const { user, isAuthenticated } = useSelector((state) => state.auth);


  const [name, setName] = useState("");
  const [amount, setAmount] = useState(10000);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
 if (!isAuthenticated) {
      navigate("/login"); 
      return;
    }
   
    setPaymentStatus("pending");

    try {
      await dispatch(
        sendSupport({
          fan_id: user.id,
          name: name || user?.name || "Anonymous",
          amount,
          creator_id: creatorId,
        })
      ).unwrap();

      // Simulate payment gateway process
      setTimeout(() => {
        setPaymentStatus("success");
      }, 3000);
    } catch (err) {
      console.error(err);
      setPaymentStatus("failed");
    }
  };

  if (paymentStatus === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-500 text-5xl mb-4">✓</div>
        <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
        <p className="mb-4">Thank you for supporting this creator.</p>
        <button
          onClick={() => setPaymentStatus(null)}
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
        >
          Support Again
        </button>
      </div>
    );
  }

  if (paymentStatus === "pending") {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
        <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
        <p>Please wait while we process your payment...</p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-emerald-500 h-2.5 rounded-full w-1/2 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-500 text-5xl mb-4">✗</div>
        <h3 className="text-xl font-bold mb-2">Payment Failed</h3>
        <p className="mb-4">There was an error processing your payment.</p>
        <button
          onClick={() => setPaymentStatus(null)}
          className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 space-y-4 w-full max-w-md"
    >
      <h3 className="text-xl font-semibold mb-2 text-center">
        Support this Creator
      </h3>
      <input
        type="text"
        placeholder="Your name"
        className="w-full p-2 border rounded"
        value={ nameCreator ||name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <label className="block mb-1">Amount (Rp)</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          min="10000"
          step="10000"
        />
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Processing..." : "Support Creator"}
        </button>
      </div>
      <p className="text-xs text-gray-500 text-center">
        Secure payment via Sandbox Gateway
      </p>
    </form>
  );
};

SupportForm.defaultProps = {
  creatorId: 1, // Default creator ID if none provided
};

export default SupportForm;
