import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { sendContact } from "../services/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    try {
      setLoading(true);
      await sendContact(form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= MAIN SECTION ================= */}
      <section
        className="relative min-h-screen bg-[#0b0f19]
        flex items-center justify-center px-4
        pt-28 md:pt-36 lg:pt-40 pb-24 overflow-hidden"
      >
        {/* BLOBS */}
        <div className="absolute top-10 left-10 w-40 h-40 sm:w-56 sm:h-56 bg-cyan-400/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-64 sm:h-64 bg-cyan-400/20 blur-3xl rounded-full" />

        {/* CARD */}
        <div
          className="relative w-full max-w-6xl bg-[#151a25]/90 backdrop-blur
          rounded-3xl shadow-[0_0_60px_#00f6ff40]
          p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* LEFT INFO */}
          <div className="text-white text-center lg:text-left flex flex-col justify-center">
            <p className="text-gray-400 mb-2">Get In Touch</p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Contact Me
            </h1>

            <p className="text-gray-400 mb-8 max-w-md mx-auto lg:mx-0">
              Feel free to reach out for collaborations, freelance work,
              or project ideas.
            </p>

            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <FaEnvelope className="text-cyan-400 shrink-0" />
                <span className="text-gray-300 break-all">
                  chandraprakashsingh281@email.com
                </span>
              </div>

              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <FaPhoneAlt className="text-cyan-400 shrink-0" />
                <span className="text-gray-300">
                  +91 8810503029
                </span>
              </div>

              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <FaMapMarkerAlt className="text-cyan-400 shrink-0" />
                <span className="text-gray-300">
                  Greater Noida, India
                </span>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={submitHandler}
            className="w-full space-y-5 bg-[#0b0f19]/50
            p-5 sm:p-8 rounded-2xl border border-cyan-400/20"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">
              Send a Message
            </h2>

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="w-full bg-transparent border border-cyan-400/30
              rounded-xl px-4 py-3 text-white outline-none
              focus:border-cyan-400 transition"
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Your Email"
              className="w-full bg-transparent border border-cyan-400/30
              rounded-xl px-4 py-3 text-white outline-none
              focus:border-cyan-400 transition"
            />

            <textarea
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your Message"
              className="w-full bg-transparent border border-cyan-400/30
              rounded-xl px-4 py-3 text-white resize-none
              outline-none focus:border-cyan-400 transition"
            />

            <button
              disabled={loading}
              className="w-full py-3 bg-cyan-400 text-black
              rounded-full font-semibold shadow-[0_0_25px_#00f6ff]
              hover:scale-105 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* ================= SUCCESS POPUP ================= */}
      {success && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#151a25] text-white max-w-sm w-full rounded-3xl p-8 text-center border border-cyan-400/30 animate-scaleIn">
            <FaCheckCircle
              className="text-cyan-400 mx-auto mb-4"
              size={46}
            />
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Message Sent Successfully
            </h2>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              Thanks for contacting me! I’ll reply very soon.
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2 bg-cyan-400 text-black
              rounded-full font-semibold hover:scale-105 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
