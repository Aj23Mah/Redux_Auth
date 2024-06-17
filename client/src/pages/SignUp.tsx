import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    // profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState<File | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setUploadPhoto(file);
  };

  console.log("uploadPhoto", uploadPhoto);

  const handleClearUploadPhoto = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (uploadPhoto) {
      formData.append("profile_pic", uploadPhoto);
    }

    try {
      const response = await axios.post(
        "http://localhost:3333/api/register",
        formData, // Send data as JSON
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Register successful", response.data);
      toast.success("sign up was successful");
      navigate("/login");
    } catch (error) {
      console.error("Error registering", error);
      toast.error("Something went wrong with the registration");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-1 bg-slate-100">
      <div className="bg-white w-full max-w-md rounded overflow-hidden px-4 py-10 mx-auto shadow-lg">
        <h3 className="text-center md:text-2xl text-lg font-bold">
          Welcome to chat app!
        </h3>

        <form className="grid gap-3 mt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="bg-slate-100 px-2 py-1 focus:outline-sky-500"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="bg-slate-100 px-2 py-1 focus:outline-sky-500"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-2 py-1 focus:outline-sky-500"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Photo :
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-sky-500">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto
                    ? uploadPhoto?.name
                    : "Upload profile photo"}
                </p>
                {uploadPhoto && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-sky-500 hidden"
              onChange={handleUploadPhoto}
            />
          </div>
          <button className="bg-sky-500 px-4 py-1 hover:bg-sky-600 text-white rounded m-2 font-bold leading-relaxed tracking-wide">
            Register
          </button>
        </form>
        <p className="my-3 text-center">
          Already have an account?
          <Link to={"/login"} className="hover:text-sky-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
