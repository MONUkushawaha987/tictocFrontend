import React, { useState } from "react";
import axios from "axios";

const API = "https://tictocbackend.onrender.com";

export default function AuthModal({ open, setOpen, mode, onAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const url =
        mode === "signup" ? `${API}/api/auth/signup` : `${API}/api/auth/login`;
      const payload =
        mode === "signup" ? { name, email, password } : { email, password };
      const { data } = await axios.post(url, payload);
      onAuth(data.user, data.token);
      setOpen(false);
    } catch (err) {
      setErr(err?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <form
        onSubmit={submit}
        className="bg-white rounded-xl p-6 w-96 shadow-md"
      >
        <h3 className="text-lg font-semibold mb-3">
          {mode === "signup" ? "Create account" : "Login"}
        </h3>
        {mode === "signup" && (
          <input
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
        )}
        <input
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        {err && <div className="text-red-500 text-sm mb-2">{err}</div>}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="px-4 py-1 rounded bg-indigo-600 text-white"
          >
            {loading ? "Please wait" : mode === "signup" ? "Sign up" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
