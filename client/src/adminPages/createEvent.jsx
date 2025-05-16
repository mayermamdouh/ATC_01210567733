import { useCallback, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import InputField from "../components/InputField";
import axios from "axios";
import { Auth } from "../context/authContext";
import { useTranslation } from "react-i18next";
import { FaLeaf } from "react-icons/fa";
import Loading from "../components/Loading";

export default function CreateEvent() {
  const { t } = useTranslation();
  const { token, setMessage } = Auth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    photo: "",
    category: "",
    name: "",
    description: "",
    date: "",
    venue: "",
    price: "",
    tags: "",
  });

  const [errors, setErrors] = useState({});

  const handleFileChange = useCallback((file) => {
    setFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      //   setFormData((prev) => ({
      //     ...prev,
      //     ["photo"]: URL.createObjectURL(file),
      //   }));
    }
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
        handleFileChange(droppedFile);
      }
    },
    [handleFileChange]
  );

  const handleFileSelect = useCallback(
    (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        handleFileChange(selectedFile);
      }
    },
    [handleFileChange]
  );

  const handleRemovePhoto = useCallback(() => {
    setFile(null);
    setPreview(null);
  }, []);

  const handleInputvalue = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!preview) newErrors.photo = "You should upload a photo.";
    if (!formData.name || formData.name.trim().length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (!formData.description || formData.description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters.";
    if (!formData.category || formData.category.trim().length < 2)
      newErrors.category = "Category is required.";
    if (!formData.date || isNaN(new Date(formData.date).getTime()))
      newErrors.date = "Please enter a valid date.";
    if (!formData.venue || formData.venue.trim().length < 3)
      newErrors.venue = "Venue must be at least 3 characters.";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Price must be a positive number.";

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(validateForm()).length > 0) {
      return;
    }
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      if (file) formDataToSend.append("photo", file);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("venue", formData.venue);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("tags", formData.tags);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/events`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setFormData({
          photo: "",
          category: "",
          name: "",
          description: "",
          date: "",
          venue: "",
          price: "",
          tags: "",
        });
        setFile(null);
        setPreview(null);
        setErrors({});
        setMessage("You have successfully added the event!");
      }
    } catch (e) {
      setMessage(`${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="h-60 w-3/4 border-2 mx-auto border-dashed bgEventAdmin border-gray-400 flex items-center justify-center my-5 rounded-md shadow-lg relative"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <img
            src={preview}
            loading="lazy"
            alt="Preview"
            className="object-contain w-full h-full p-3 rounded-lg bg"
          />
        ) : (
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center cursor-pointer w-full h-full m-5"
          >
            <CiImageOn className="h-20 w-20" />
            <p className=" select-none ">{t("drag_or_click")}</p>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center justify-center mb-10">
        {errors.photo && <p className="error">{errors.photo}</p>}
        <button
          type="button"
          onClick={handleRemovePhoto}
          className="py-1 text-white bg-secondColor hover:bg-transparent border hover:border-black hover:text-black transition ease-in duration-100 text-center text-base font-semibold shadow-md rounded-lg"
        >
          {t("remove_photo")}
        </button>
      </div>
      <div className="flex flex-col border-2 bgEventAdmin rounded-md w-3/4 mx-auto border-gray-200 p-4">
        <div className="flex flex-row items-center justify-between">
          <div className="text-md w-full font-semibold text-2xl text-center">
            {t("new_event")}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mt-7 flex gap-3 flex-col">
            <div className="flex flex-row items-center gap-5">
              <div className="flex flex-col items-start justify-center gap-2 w-[45%]">
                <label htmlFor="Category" className="font-semibold">
                  Category
                </label>
                <select
                  id="Category"
                  className="bg-gray-50 border-[2px] border-gray-300 text-black text-sm rounded-lg outline-none block w-full p-2.5 cursor-pointer focus:border-[#124e66]"
                  onChange={(e) => handleInputvalue("category", e.target.value)}
                  value={formData.category}
                >
                  <option value="music">Music</option>
                  <option value="sports">Sports</option>
                  <option value="education">Education</option>
                  <option value="technology">Technology</option>
                </select>
              </div>
              <div className=" w-[45%] flex flex-col gap-2">
                <label htmlFor="date" className="font-semibold">
                  Date
                </label>

                <input
                  id="date"
                  data-datepicker="true"
                  onChange={(e) => handleInputvalue("date", e.target.value)}
                  type="datetime-local"
                  value={formData.date}
                  className="bg-gray-50 border-2 text-black focus:border-[#124e66] border-gray-300 text-sm rounded-lg w-full p-2.5 cursor-pointer outline-none"
                ></input>
              </div>
            </div>
            <InputField
              labelName="Event name"
              value={formData.name}
              onChange={(value) => handleInputvalue("name", value)}
              type="text"
              placeholder="Write event name..."
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <InputField
              labelName="Event tags"
              value={formData.tags}
              onChange={(value) => handleInputvalue("tags", value)}
              type="text"
              placeholder="Write event tags..."
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="font-semibold">
                {t("event_description")}
              </label>
              <textarea
                className="border-2 border-gray-200 text-black  rounded-2xl p-3 outline-none bg-gray-50 focus:border-[#124e66]"
                id="description"
                rows="3"
                cols="30"
                placeholder="Write event description..."
                value={formData.description}
                onChange={(e) =>
                  handleInputvalue("description", e.target.value)
                }
              ></textarea>
              {errors.description && (
                <p className="error">{errors.description}</p>
              )}
            </div>
            <InputField
              labelName="Event venue"
              value={formData.venue}
              onChange={(value) => handleInputvalue("venue", value)}
              type="text"
              placeholder="Write event venue..."
            />
            {errors.venue && <p className="error">{errors.venue}</p>}
            <InputField
              labelName="Event price"
              value={formData.price}
              onChange={(value) => handleInputvalue("price", value)}
              type="number"
              placeholder="Write event price..."
            />
            {errors.price && <p className="error">{errors.price}</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center mb-10">
        <button type="submit" className="my-5 w-1/3">
          {t("add_event")}
        </button>
      </div>
    </form>
  );
}
