import { useForm } from "react-hook-form";
import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  status: z.string().nonempty("Status is required"),
  role: z.string().nonempty("Role is required"),
  email: z.string().email("Invalid email"),
  teams: z.array(z.string()).min(1, "At least one team is required"),
  image: z.string().optional(), 
});

const AddMemberForm = ({ onAdd, onClose }) => {
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      status: "",
      teams: [],
      image: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    if (imageFile) {
      // Handle image file upload
      const reader = new FileReader();
      reader.onloadend = () => {
        data.image = reader.result;
        onAdd(data); 
      };
      reader.readAsDataURL(imageFile);
    } else {
      data.image = image;
      onAdd(data); 
    }
    onClose();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    setImageFile(null);
    setValue("image", ""); 
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-1/3"
      >
        <h2 className="text-lg font-bold mb-4">Add Member</h2>
        <div className="mb-4 text-center">
          <img
            src={image || "default-image-url"} 
            alt="User"
            className="w-24 h-24 rounded-full mx-auto mb-2"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block mb-2"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="text-red-500"
            >
              Remove Image
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register("name")}
            placeholder="Name"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Role</label>
            <input
              {...register("role")}
              placeholder="Role"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.role && (
              <p className="text-red-500 text-xs">{errors.role.message}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Status</label>
            <input
              {...register("status")}
              placeholder="Status"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.status && (
              <p className="text-red-500 text-xs">{errors.status.message}</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Teams</label>
          <input
            {...register("teams")}
            placeholder="Teams"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.teams && (
            <p className="text-red-500 text-xs">{errors.teams.message}</p>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberForm;
