import React, { useState, useEffect } from "react";
import axios from "axios";

function SubscribeButton({ channelId }) {
  const [subscribed, setsubscribed] = useState(false);
  const [count, setcount] = useState(0);

  const fetchstatus = async () => {
    try {
      const res = await axios.get(`/subscriptions/status/${channelId}`, {
        withCredentials: true,
      });
      setsubscribed(res.data.subscriber);
    } catch (error) {
      console.log(error, "error at fetching subs count");
      setsubscribed(false);
    }
  };

  const fetchcount = async () => {
    try {
      const res = await axios.get(`/subscriptions/count/${channelId}`, {
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
          withCredentials: true,
        });
        setsubscribed(false);
      } else {
        await axios.post(`/subscriptions/channel/${channelId}`, {}, {
          withCredentials: true,
        });
        setsubscribed(true);
      }
      fetchcount();
    } catch (error) {
      console.log(error, "fail to toggle sub");
    }
  };

  useEffect(() => {
    fetchstatus();
    fetchcount();
  }, [channelId]);

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={togglesub}
        className={`px-4 py-1 rounded-md text-white transition ${
          subscribed
            ? "bg-gray-500 dark:bg-gray-600"
            : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
        }`}
      >
        {subscribed ? "Subscribed" : "Subscribe"}
      </button>

      <span className="text-sm text-gray-600 dark:text-gray-300">
        {count} subscribers
      </span>
    </div>
  );
}

export default SubscribeButton;
