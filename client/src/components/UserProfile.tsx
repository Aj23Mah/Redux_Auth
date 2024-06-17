import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { useState } from "react";
import EditUserDetails from "./EditUserDetails";

const UserProfile = () => {
  const user = useSelector((state) => state?.user);
  // console.log("User Details", user);

  const [editUserOpen, setEditUserOpen] = useState(false);

  return (
    <div className="bg-white w-[500px] max-w-[500px] h-[300px] max-h-[300px] flex flex-col justify-center items-center">
      <div className="p-2 mb-2">
        <Avatar
          name={user?.name}
          profile_pic={`http://localhost:3333/uploads/${user?.profile_pic}`}
          userId={user?._id}
        />
      </div>

      <p className="text-lg font-semibold">{user?.name}</p>
      <p className="text-lg font-normal">{user?.email}</p>

      <button onClick={() => setEditUserOpen(true)} className="px-8 py-2 bg-sky-500 text-white text-md font-semibold mt-4 cursor-pointer hover:bg-sky-600">Edit</button>

      {/* edit user details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}
    </div>
  );
};

export default UserProfile;
