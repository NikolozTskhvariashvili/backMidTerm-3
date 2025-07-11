import React from "react";

const ArrowDown = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="11"
      height="6"
      viewBox="0 0 11 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.72656 5.85938L1.10156 1.26562C0.945312 1.14062 0.945312 0.890625 1.10156 0.734375L1.72656 0.140625C1.88281 -0.015625 2.10156 -0.015625 2.25781 0.140625L6.00781 3.82812L9.72656 0.140625C9.88281 -0.015625 10.1328 -0.015625 10.2578 0.140625L10.8828 0.734375C11.0391 0.890625 11.0391 1.14062 10.8828 1.26562L6.25781 5.85938C6.10156 6.01562 5.88281 6.01562 5.72656 5.85938Z"
        fill="#21214D"
      />
    </svg>
  );
};

export default ArrowDown;
