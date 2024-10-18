import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const JoinedQueues = () => {
  const [queues, setQueues] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { userId } = useParams();

  useEffect(() => {
    fetchJoinedQueues();
  }, []);

  const fetchJoinedQueues = async () => {
    try {
      const response = await axios.get(`https://queue-management-system-khaki.vercel.app/joined-queues/${userId}`);
      setQueues(response.data.joinedQueues);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while fetching queues."
      );
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h2 className="text-2xl font-bold mb-5">Your Joined Queues</h2>

      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}

      {queues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {queues.map((queue, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
              <h3 className="text-xl font-semibold mb-2">{queue.queue_name}</h3>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong> {queue.queue_description}
              </p>
              {/* <p className="text-gray-700 mb-2">
                <strong>Status:</strong> {queue.status}
              </p>
              <p className="text-gray-700">
                <strong>Queue Number:</strong> <span className=" rounded-full  amoled">{queue.queue_number}</span>
              </p> */}
              <div className="flex justify-between">
                <div className="space-y-4">
                  <div className="amoled rounded-full w-[100px] h-[100px] flex items-center justify-center">
                    <p className="text-xl font-bold">{queue.status}</p>
                  </div>
                  <p className="font-semibold text-center">status</p>
                </div>

                <div className="space-y-4">
                  <div className="amoled rounded-full w-[100px] h-[100px] flex items-center justify-center">
                    <p className="text-xl font-bold">{queue.queue_number}</p>
                  </div>
                  <p className="font-semibold">people ahead</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No queues joined yet.</p>
      )}
    </div>
  );
};

export default JoinedQueues;
