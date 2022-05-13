import crab from "../images/crab.jpg";

const Error404Page = () => {
  return (
    <div className="fixed top-0 left-0 flex h-screen w-full items-center justify-center">
      <label className="mx-auto block w-1/2 rounded-2xl bg-[#f6f6f6] p-6 text-center font-poppins">
        <img className="mx-auto w-1/2" src={crab} />
        Page Not Found
      </label>
    </div>
  );
};

export default Error404Page;
