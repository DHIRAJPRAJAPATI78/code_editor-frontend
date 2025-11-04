import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLiveContests } from "../../features/contest/contestSlice";
import { Flame, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function LiveContests() {
  const dispatch = useDispatch();
  const { liveContests, loading } = useSelector((state) => state.contest);

  useEffect(() => {
    if(!liveContests || liveContests.length===0)
    dispatch(fetchLiveContests());
  }, [dispatch]);

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-gray-200 p-6">
      {loading ? (
        <div className="flex justify-center items-center h-80 text-yellow-400">
          <Loader2 className="animate-spin w-8 h-8" /> Loading...
        </div>
      ) : liveContests.length === 0 ? (
        <p className="text-gray-400 text-center">No live contests right now ⚡</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveContests.map((contest) => (
            <div
              key={contest._id}
              className="bg-[#111827] border border-gray-700 rounded-2xl p-5 shadow-lg"
            >
              <h2 className="text-lg font-semibold text-yellow-400 mb-2">
                {contest.title}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                {contest.description || "No description"}
              </p>
              <Link
                to={`/contests/${contest._id}`}
                className="block w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-lg font-semibold"
              >
                Join Contest
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


// import { useEffect, useState } from "react";
// import { Flame, Loader2, Trophy, Timer, Users, ListChecks } from "lucide-react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// export default function LiveContests() {
//   const [liveContests, setLiveContests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🧠 Mock data simulating live contest API response
//   const mockData = [
//     {
//       _id: "68eb471a091b0a7cf0aa5899",
//       title: "CodeSprint 2025",
//       description:
//         "An intense 3-hour coding battle focusing on algorithms and problem-solving speed.",
//       startTime: "2025-11-02T10:00:00.000Z",
//       endTime: "2025-11-02T13:00:00.000Z",
//       status: "live",
//       totalProblems: 4,
//       totalUsers: 152,
//       createdBy: { firstName: "Aarav", email: "aarav@example.com" },
//     },
//     {
//       _id: "68eb471a091b0a7cf0aa5900",
//       title: "HackRush 2025",
//       description:
//         "Solve real-world programming problems with a competitive edge!",
//       startTime: "2025-11-02T11:00:00.000Z",
//       endTime: "2025-11-02T14:00:00.000Z",
//       status: "live",
//       totalProblems: 3,
//       totalUsers: 98,
//       createdBy: { firstName: "Riya", email: "riya@example.com" },
//     },
//   ];

//   // ⏳ Simulate API call
//   useEffect(() => {
//     setTimeout(() => {
//       setLiveContests(mockData);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   return (
//     <div className="bg-[#0a0a0f] min-h-screen text-gray-200 w-full">
//       {/* 🔄 Loading State */}
//       {loading ? (
//         <div className="flex justify-center items-center h-80 text-yellow-400">
//           <Loader2 className="animate-spin w-8 h-8 mr-2" /> Loading...
//         </div>
//       ) : liveContests.length === 0 ? (
//         <p className="text-gray-400 text-center text-lg mt-10">
//           No live contests right now ⚡
//         </p>
//       ) : (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {liveContests.map((contest) => (
//             <motion.div
//               key={contest._id}
//               whileHover={{ scale: 1.03 }}
//               transition={{ type: "spring", stiffness: 200 }}
//               className="bg-[#111827] border border-gray-700 rounded-2xl p-5 shadow-md hover:shadow-yellow-500/20 transition-all flex flex-col justify-between"
//             >
//               {/* 🏆 Header */}
//               <div>
//                 <div className="flex items-center gap-3 mb-3">
//                   <Trophy className="text-yellow-400 w-6 h-6" />
//                   <h2 className="text-lg font-semibold">{contest.title}</h2>
//                 </div>

//                 {/* 📝 Description */}
//                 <p className="text-sm text-gray-400 mb-3 line-clamp-2">
//                   {contest.description}
//                 </p>

//                 {/* 🕓 Timing */}
//                 <div className="text-xs text-gray-400 mb-3 space-y-1">
//                   <p>
//                     <Timer className="inline w-4 h-4 mr-1 text-yellow-400" />
//                     <span className="font-medium text-gray-300">Start:</span>{" "}
//                     {new Date(contest.startTime).toLocaleString()}
//                   </p>
//                   <p>
//                     <Timer className="inline w-4 h-4 mr-1 text-yellow-400" />
//                     <span className="font-medium text-gray-300">End:</span>{" "}
//                     {new Date(contest.endTime).toLocaleString()}
//                   </p>
//                 </div>

//                 {/* 🧩 Stats */}
//                 <div className="flex justify-between text-xs text-gray-500 mb-4">
//                   <span className="flex items-center gap-1">
//                     <ListChecks className="w-4 h-4 text-yellow-500" />
//                     {contest.totalProblems} Problems
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Users className="w-4 h-4 text-yellow-500" />
//                     {contest.totalUsers} Participants
//                   </span>
//                 </div>

//                 {/* 🔥 Status */}
//                 <div className="text-sm font-semibold mb-4">
//                   <span className="capitalize px-3 py-1 rounded-full bg-green-500/20 text-green-400">
//                     {contest.status}
//                   </span>
//                 </div>
//               </div>

//               {/* 🚀 Join Button */}
//               <Link
//                 to={`/contest/${contest._id}`}
//                 className="mt-auto block text-center bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-lg font-semibold transition"
//               >
//                 Register Contest
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
