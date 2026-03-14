import { BeatLoader } from "react-spinners";

export default function FullPageLoader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BeatLoader size={60} />
    </div>
  );
}