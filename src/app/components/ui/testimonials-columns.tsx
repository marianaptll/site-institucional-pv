"use client";
import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className} style={{ overflow: "hidden" }}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "24px" }}
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                style={{
                  padding: "28px",
                  borderRadius: "20px",
                  border: "1px solid #E5E7EB",
                  background: "#fff",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  maxWidth: "320px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", gap: "2px", marginBottom: "14px" }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 16 16" fill="#FBBF24">
                      <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
                  "{text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #F3F4F6" }}>
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "13px", color: "#111827", lineHeight: 1.3 }}>{name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B7280", lineHeight: 1.4 }}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};
