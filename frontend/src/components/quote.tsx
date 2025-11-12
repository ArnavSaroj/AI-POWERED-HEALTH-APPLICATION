import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quote = () => {
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const resp = await fetch("http://localhost:3000/api/PostQuote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        let text: string;
        if (!resp.ok) {
          text =
            (await resp.text()) || resp.statusText || "Quote not available.";
        } else {
          const data = await resp.json();
          const candidate =
            (data &&
              (data.quote || data.message || data.text || data.content)) ||
            data;
          text =
            typeof candidate === "string"
              ? candidate
              : JSON.stringify(candidate);
        }
        if (!cancelled) {
          toast.dismiss("qotd");
          toast.info(text, {
            toastId: "qotd",
            position: "top-right",
            autoClose: false,
            closeOnClick: true,
            draggable: false,
          });
        }
      } catch {
        if (!cancelled) {
          toast.dismiss("qotd");
          toast.info("Quote of the day is unavailable right now.", {
            toastId: "qotd",
            position: "top-right",
            autoClose: false,
          });
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return <ToastContainer position="top-right" newestOnTop theme="light" />;
};

export default Quote;
