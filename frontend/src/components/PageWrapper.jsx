export default function PageWrapper({ children }) {
  return (
    <>
      <div>
        <div
          className={"w-full min-h-screen flex justify-between bg-[#DFDFDF] "}
        >
          {children}
        </div>
      </div>
    </>
  );
}
