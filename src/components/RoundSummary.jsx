import React from "react";

export default function RoundSummary({ result, points }) {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow">
      <div className="text-lg font-semibold">Round result: {result}</div>
      <div className="text-sm text-gray-600">Points earned : {result == "draw" ? 0 : points}</div>
    </div>
  );
}
