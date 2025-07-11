import React, { useState, useEffect } from "react";
import axios from "../axios";
// import axios from "axios"

import toast, { Toaster } from "react-hot-toast";

function SubscribeButton({ channelId }) {
  const [subscribed, setsubscribed] = useState(false);
  const [count, setcount] = useState(0);

  const fetchstatus = async () => {
    try {
      const res = await axios.get(`/subscriptions/status/${channelId}`, {
      // const res = await axios.get(`/api/v1/subscriptions/status/${channelId}`, {
        withCredentials: true,
      });
      setsubscribed(res.data.subscriber);
    } catch (error) {
      console.log(error, "error at fetching sub status");
      setsubscribed(false);
    }
  };

  const fetchcount = async () => {
    try {
      const res = await axios.get(`/subscriptions/count/${channelId}`, {
      // const res = await axios.get(`/api/v1/subscriptions/count/${channelId}`, {
        withCredentials: true,
      });
      setcount(res.data.subsciberCount);
    } catch (error) {
      console.log(error, "error at fetching subs count");
      setcount(0);
    }
  };

  const togglesub = async () => {
    try {
      if (subscribed) {
        await axios.delete(`/subscriptions/channel/${channelId}`, {
        // await axios.delete(`/api/v1/subscriptions/channel/${channelId}`, {
          withCredentials: true,
        });
        setsubscribed(false);
        toast.success("Unsubscribed");
      } else {
        await axios.post(`/subscriptions/channel/${channelId}`, {}, {
        // await axios.post(`/api/v1/subscriptions/channel/${channelId}`, {}, {
          withCredentials: true,
        });
        setsubscribed(true);
        toast.success("Subscribed");
      }
      fetchcount();
    } catch (error) {
      console.log(error, "fail to toggle sub");
      toast.error("Failed to update subscription");
    }
  };

  useEffect(() => {
    fetchstatus();
    fetchcount();
  }, [channelId]);

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={togglesub}
        className={`px-5 py-2 rounded-full font-medium text-sm transition duration-200 ${
          subscribed
            ? "bg-gray-300 text-black hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            : "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
        }`}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>

      <span className="text-sm text-gray-600 dark:text-gray-300">
        {count.toLocaleString()} subscribers
      </span>

      <Toaster position="top-right" />
    </div>
  );
}

export default SubscribeButton;
