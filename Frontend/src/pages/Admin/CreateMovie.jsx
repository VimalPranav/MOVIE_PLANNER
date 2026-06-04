import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    description: "",
    cast: [],
    rating: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

   const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.description ||
        !movieData.cast
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }

        await createMovie({
          ...movieData,
          image: uploadedImagePath,
        });
     }else{
        await createMovie({
            ...movieData
        })
     }

        navigate("/admin/movies_list");

        setMovieData({
          name: "",
          year: 0,
          description: "",
          cast: [],
          rating: 0,
          image: null,
          genre: "",
        });

        toast.success("Movie Added To Database");
    } catch (error) {
      console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    } 
  };

  return (
    <div className="min-h-screen bg-[#131313] text-white font-['Anton'] selection:bg-[#e50914]/30">
            
        {/* --- Top Navigation --- */}
        <nav className="fixed top-0 z-50 w-full flex justify-between items-center px-12 py-4 bg-[#131313]/90 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center gap-12">
                <div className="text-3xl font-bold tracking-tighter text-[#e50914] cursor-pointer hover:opacity-80 transition-opacity">
                    MoviePlanner
                </div>
                <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-white/60">
                    <a href="#" className="hover:text-white transition-colors">Trends</a>
                    <a href="#" className="hover:text-white transition-colors">Collections</a>
                    <a href="#" className="hover:text-white transition-colors">New Releases</a>
                </div>
            </div>
            
            <div className="flex items-center gap-6">
                <button className="material-icons text-white/60 hover:text-white transition-colors">notifications</button>
                <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl cursor-pointer">
                    <div className="w-8 h-8 rounded-full border border-[#e50914] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Admin" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </nav>

        <main className="pt-32 pb-24 px-12 max-w-7xl mx-auto flex gap-16">
            
            {/* --- Admin Sidebar --- */}
            <aside className="w-64 flex-shrink-0">
                <div className="flex items-center gap-4 mb-10 px-4">
                    <span className="material-icons text-[#e50914]">admin_panel_settings</span>
                    <h2 className="text-2xl font-bold uppercase tracking-tighter">Admin Panel</h2>
                </div>
                
            
            </aside>

            {/* --- Form Section --- */}
            <section className="flex-grow">
                <header className="mb-12">
                    <h1 className="text-7xl font-black uppercase tracking-tighter mb-3 leading-none">Create Movie</h1>
                    <p className="text-white/40 font-sans text-xl max-w-2xl">Populate the cinema database with a new premium title.</p>
                </header>

                <form className="grid grid-cols-12 gap-10" onSubmit={(e) => e.preventDefault()}>
                    {/* Left Column: Details */}
                    <div className="col-span-8 space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <label className="block">
                                Name:
                                <input
                                type="text"
                                name="name"
                                value={movieData.name}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                                />
                            </label>

                            <label className="block">
                                Year:
                                <input
                                type="number"
                                name="year"
                                value={movieData.year}
                                onChange={handleChange}
                                min="1888"
                                max={new Date().getFullYear()}
                                className="border px-2 py-1 w-full"
                                />
                            </label>

                            <label className="block">
                                Rating (0-10):
                                <input
                                type="number"
                                name="rating"
                                value={movieData.rating}
                                onChange={handleChange}
                                min="0"
                                max="10"
                                className="border px-2 py-1 w-full"
                                />
                            </label>
                        </div>

                        <div className="space-y-4">
                            <label className="block">
                                Description:
                                <textarea
                                name="description"
                                value={movieData.description}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                                ></textarea>
                            </label>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            <label className="block">
                                Cast (comma-separated):
                                <input
                                type="text"
                                name="cast"
                                value={movieData.cast.join(", ")}
                                onChange={(e) =>
                                    setMovieData({ ...movieData, cast: e.target.value.split(", ") })
                                }
                                className="border px-2 py-1 w-full"
                                />
                            </label>
                        </div>

                        <div className="pt-10">
                            <button 
                                type="button"
                                onClick={handleCreateMovie}
                                className="bg-teal-500 text-white px-4 py-2 rounded"
                                disabled={isCreatingMovie || isUploadingImage}>
                                {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Poster Upload */}
                    <div className="col-span-4 space-y-6">
                        <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Movie Poster</label>
                        
                        <div  className="mb-4 w-full h-64 border-2 border-dashed border-white/30 rounded flex items-center justify-center cursor-pointer">
                            <label
                                style={
                                !selectedImage
                                    ? {
                                        border: "1px solid #888",
                                        borderRadius: "5px",
                                        padding: "8px",
                                    }
                                    : {
                                        border: "0",
                                        borderRadius: "0",
                                        padding: "0",
                                    }
                                }
                            >
                                {!selectedImage && "Upload Image"}
                                <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: !selectedImage ? "none" : "block" }}
                                />
                            </label>
                            
                        </div>
                    </div>
                </form>
            </section>
        </main>
    </div>
    );
};

export default CreateMovie;