import { usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "sonner";

export default function MediaLibrary({ onConfirm }) {
  const { auth } = usePage().props;
  const [activeTab, setActiveTab] = useState(1);
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeUploadedFile = async (e) => {
    const file = e.target.files[0];

    if (file.size > 1024 * 1024 * 1) {
      alert("Maximum file size is 1MB");
      return;
    }
    const formData = new FormData();

    formData.append("file", file);
    formData.append("role", "admin");
    formData.append("user_id", auth?.user?.id);

    try {
      const response = await axios.post("/api/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newImages = [response.data.data, ...images];
      setImages(newImages);
      setActiveTab(2);
    } catch (error) {
      toast.error("Failed to upload media");
    }
  };

  const handleSelectedMedia = (image) => {
    setSelectedImage(image);
  };

  useEffect(() => {
    const fetchData = () => {
      axios.get("/api/media").then((res) => {
        setImages(res.data.data);
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <a
        id="media-library-opener"
        href="#mediaLibraryModal"
        className="btn fixed left-[-100%] opacity-0"
      >
        open modal
      </a>

      <div className="modal" role="dialog" id="mediaLibraryModal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex flex-col h-[500px]">
            <div role="tablist" className="tabs tabs-bordered max-w-[400px]">
              <a
                role="tab"
                className={`tab ${activeTab === 1 ? "tab-active font-bold" : ""}`}
                onClick={() => setActiveTab(1)}
              >
                Upload Media
              </a>
              <a
                role="tab"
                className={`tab ${activeTab === 2 ? "tab-active font-bold" : ""}`}
                onClick={() => setActiveTab(2)}
              >
                Media Library
              </a>
            </div>
            {activeTab === 1 && (
              <div className="modal-content h-full flex justify-center items-center">
                <div>
                  <button
                    className="btn btn-outline "
                    onClick={handleFileUpload}
                  >
                    <MdOutlineFileUpload className="w-5 h-5" />
                    Upload Media
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleChangeUploadedFile}
                  />
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="modal-content ">
                <div className="grid grid-cols-4 mt-4 gap-4">
                  {images.length > 0 &&
                    images.map((image, index) => (
                      <button
                        key={index}
                        className={`w-full rounded-xl overflow-hidden ${
                          selectedImage?.id === image.id
                            ? "border-2 border-blue-600"
                            : "border-2 border-transparent"
                        }`}
                        onClick={() => handleSelectedMedia(image)}
                      >
                        <img
                          src={image.url}
                          alt="Media"
                          className="h-[150px] w-full object-cover"
                        />
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div className="modal-action">
            <a href="#" className="btn">
              Close
            </a>
            <a
              href="#"
              className="btn btn-primary"
              onClick={() => {
                if (onConfirm) {
                  onConfirm(selectedImage);
                }
              }}
              disabled={!selectedImage}
            >
              Select Media
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
