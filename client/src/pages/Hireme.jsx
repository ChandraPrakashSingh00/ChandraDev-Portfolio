import { useState } from "react";
import { FaCode, FaLaptopCode, FaRocket, FaCheckCircle } from "react-icons/fa";
import { sendHire } from "../services/api";

const HireMe = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectDetails: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await sendHire(form);
      setSuccess(true); // 🔥 popup open
      setForm({ name: "", email: "", projectDetails: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= MAIN SECTION ================= */}
      <section className="relative w-full min-h-screen bg-[#0b0f19] pt-32 pb-24 px-4 overflow-hidden">
        {/* BLOBS */}
        <div className="absolute top-40 left-20 w-48 h-48 bg-cyan-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-40 right-20 w-60 h-60 bg-cyan-400/20 blur-3xl rounded-full" />

        <div className="max-w-6xl mx-auto text-white">
          {/* HEADER */}
          <div className="text-center mb-16">
            <p className="text-gray-400">Let’s Work Together</p>
            <h1 className="text-4xl font-bold">Hire Me</h1>
            <p className="text-gray-400 mt-4">
              Available for freelance & full-time projects.
            </p>
          </div>

          {/* SERVICES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[FaCode, FaLaptopCode, FaRocket].map((Icon, i) => (
              <div
                key={i}
                className="bg-[#151a25] p-6 rounded-2xl border border-cyan-400/20 text-center"
              >
                <Icon className="text-cyan-400 mx-auto mb-4" size={26} />
                <h3 className="font-semibold text-lg">Professional Service</h3>
                <p className="text-gray-400 text-sm mt-2">
                  Modern & scalable development
                </p>
              </div>
            ))}
          </div>

          {/* FORM */}
          <form
            onSubmit={submitHandler}
            className="max-w-3xl mx-auto bg-[#151a25] p-10 rounded-3xl space-y-5"
          >
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 rounded-xl outline-none text-white"
            />

            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Your Email"
              className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 rounded-xl outline-none text-white"
            />

            <textarea
              required
              rows="5"
              value={form.projectDetails}
              onChange={(e) =>
                setForm({ ...form, projectDetails: e.target.value })
              }
              placeholder="Tell me about your project"
              className="w-full bg-transparent border border-cyan-400/30 px-4 py-3 rounded-xl resize-none outline-none text-white"
            />

            <button
              disabled={loading}
              className="w-full py-3 bg-cyan-400 text-black rounded-full font-semibold shadow-[0_0_20px_#00f6ff] hover:scale-105 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </form>
        </div>
      </section>

      {/* ================= SUCCESS POPUP ================= */}
      {success && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#151a25] text-white max-w-md w-full rounded-3xl p-8 text-center border border-cyan-400/30 animate-scaleIn">
            <FaCheckCircle
              className="text-cyan-400 mx-auto mb-4"
              size={48}
            />
            <h2 className="text-2xl font-bold mb-2">
              Request Sent Successfully 🚀
            </h2>
            <p className="text-gray-400 mb-6">
              Thanks for reaching out! I’ll contact you shortly.
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2 bg-cyan-400 text-black rounded-full font-semibold hover:scale-105 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HireMe;
