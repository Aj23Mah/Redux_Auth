import React, { useEffect, useState, useRef } from "react";
import Avatar from "./Avatar";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from "axios";

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || "",
  });
  const uploadPhotoRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      name: user?.name || prev.name,
      profile_pic: user?.profile_pic || prev.profile_pic,
    }));
  }, [user]);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPhoto = (e: any) => {
    const file = e.target.files[0];
    setData((prev) => ({
      ...prev,
      profile_pic: file,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const formData = new FormData();
  formData.append('name', data.name);
  if (data.profile_pic) {
    formData.append('profile_pic', data.profile_pic);
  }

    try {
      const response = await axios.post(
        'http://localhost:3333/api/update-user',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        }
      );

      toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser(response?.data?.data));
        onClose(); // Close the modal after successful submission
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="h-screen w-full fixed top-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
      <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-blue-700 border"
            />
          </div>

          <div>Photo: </div>
          <div className="my-1 flex items-center gap-3">
            <Avatar
              name={data?.name}
              profile_pic={
                data.profile_pic instanceof File
                  ? URL.createObjectURL(data.profile_pic)
                  : `http://localhost:3333/uploads/${data.profile_pic}`
              }
            />
            <button
              type="button"
              onClick={() => uploadPhotoRef.current.click()}
              className="font-semibold"
            >
              Change Photo
            </button>
            <input
              id="profile_pic"
              type="file"
              className="hidden"
              ref={uploadPhotoRef}
              onChange={handleUploadPhoto}
            />
          </div>

          <div className="border border-gray-500"></div>

          <div className="flex gap-2 w-fit ml-auto mt-3">
            <button
              type="button"
              onClick={onClose}
              className="border-blue-500 border text-blue-500 px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-blue-500 bg-blue-500 border text-white px-4 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);




// import React, { useEffect, useRef, useState } from "react";
// import Avatar from "./Avatar";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setUser } from "../redux/userSlice";
// import axios from "axios";

// const EditUserDetails = ({ onClose, user }) => {
//   const [data, setData] = useState({
//     name: user?.user || "",
//     profile_pic: user?.profile_pic || "",
//   });
//   const uploadPhotoRef = useRef();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setData((prev) => ({
//       ...prev,
//       name: user?.name || prev.name,
//       profile_pic: user?.profile_pic || prev.profile_pic,
//     }));
//   }, [user]);

  

//   //   console.log("user edit", user);

//   const handleOnChange = (e: any) => {
//     const { name, value } = e.target;
//     setData((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const handleUploadPhoto = (e: any) => {
//     const file = e.target.files[0];
//     setData((prev) => ({
//       ...prev,
//       profile_pic: file,
//     }));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", data.name);
//     if (data.profile_pic) {
//       formData.append("profile_pic", data.profile_pic);
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:3333/api/update-user",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       toast.success(response?.data?.message);

      

//       if (response.data.success) {
//         dispatch(setUser(response?.data?.data));
//         onClose(); // Close the modal after successful submission
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   };

//   return (
//     <div className="h-screen w-full fixed top-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10">
//       <div className="bg-white p-4 py-6 m-1 rounded w-full max-w-sm">
//         <h2 className="font-semibold">Profile Details</h2>
//         <p className="text-sm">Edit user details</p>

//         <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
//           <div className="flex flex-col gap-1">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={data.name}
//               onChange={handleOnChange}
//               className="w-full py-1 px-2 focus:outline-blue-700 border"
//             />
//           </div>


//           <div>Photo: </div>
//           <div className="my-1 flex items-center gap-3">
//             <Avatar
//               name={data?.name}
//               profile_pic={
//                 data.profile_pic instanceof File
//                   ? URL.createObjectURL(data.profile_pic)
//                   : `http://localhost:3333/uploads/${data.profile_pic}`
//               }
//             />

//             <button
//               className="font-semibold"
//               type="button"
//               onClick={() => uploadPhotoRef.current.click()}
//             >
//               Change Photo
//             </button>
//             <input
//               id="profile_pic"
//               type="file"
//               className="hidden"
//               ref={uploadPhotoRef}
//               onChange={handleUploadPhoto}
//             />
//           </div>

//           {/* Divider  */}
//           <div className="border border-gray-500"></div>

//           <div className="flex gap-2 w-fit ml-auto mt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="border-blue-500 border text-blue-500 px-4 py-1 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="border-blue-500 bg-blue-500 border text-white px-4 py-1 rounded"
//             >
//               save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default React.memo(EditUserDetails);
