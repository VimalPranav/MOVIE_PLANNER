import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
  useSearchTMDBMoviesMutation,
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
    genre: "",
    imdbRating: 0,
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
        !movieData.genre ||
        !movieData.imdbRating
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

        navigate("/movies");

        setMovieData({
          name: "",
          year: 0,
          description: "",
          cast: [],
          rating: 0,
          image: null,
          genre: "",
          imdbRating: 0,
        });

        toast.success("Movie Added To Database");
    } catch (error) {
      console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    } 
  };

  const [tmdbQuery, setTmdbQuery] = useState("");
  const [tmdbResults, setTmdbResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTMDBMovies] = useSearchTMDBMoviesMutation();

  const handleTMDBSearch = async () => {
    try {
        setIsSearching(true);

        const result = await searchTMDBMovies(
        tmdbQuery
        ).unwrap();

        setTmdbResults(result);
    } catch (error) {
        console.log(error);

        toast.error(
            error?.data?.message ||
            error?.error ||
            "Search failed"
        );
    } finally {
        setIsSearching(false);
    }
  };

  const importTMDBMovie = (movie) => {
    setMovieData({
        name: movie.title,
        year: Number(
        movie.release_date?.slice(0, 4)
        ),
        description: movie.overview,
        imdbRating: movie.vote_average,
        cast: [],
        genre: movie.genre_ids || [],
        image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
    });

    toast.success(
        "Movie data imported. Review and save."
    );
  };

  return (
    <div className="min-h-screen bg-[#131313] text-white font-['Anton'] selection:bg-[#e50914]/30">
            
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

                {/* import directly from TMDB */}
                <div className="mb-10 bg-white/5 border border-white/10 rounded-2xl p-6">

                    <h3 className="text-2xl font-bold mb-4">
                        Import From TMDB
                    </h3>

                    <div className="flex gap-4">

                        <input
                        type="text"
                        value={tmdbQuery}
                        onChange={(e) =>
                            setTmdbQuery(e.target.value)
                        }
                        placeholder="Search movie..."
                        className="flex-1 bg-black/30 border border-white/10 px-4 py-3 rounded-xl"
                        />

                        <button
                        onClick={handleTMDBSearch}
                        className="bg-[#e50914] px-6 py-3 rounded-xl"
                        >
                        Search
                        </button>

                    </div>

                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                {tmdbResults.map((movie) => (
                    <div
                    key={movie.id}
                    className="bg-white/5 rounded-xl overflow-hidden"
                    >
                    <img
                        src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/500x750"
                        }
                        alt={movie.title}
                        className="h-72 w-full object-cover"
                    />

                    <div className="p-4">
                        <h4 className="font-bold">
                        {movie.title}
                        </h4>

                        <p className="text-sm text-white/50">
                        {movie.release_date?.slice(0, 4)}
                        </p>

                        <button
                        onClick={() => importTMDBMovie(movie)}
                        className="mt-4 w-full bg-[#e50914] py-2 rounded-lg"
                        >
                        Import
                        </button>
                    </div>
                    </div>
                ))}
                </div>

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
                                ImdbRating (0-10):
                                <input
                                type="number"
                                name="rating"
                                value={movieData.imdbRating}
                                onChange={handleChange}
                                min="0"
                                max="10"
                                className="border px-2 py-1 w-full"
                                />
                            </label>

                            <label className="block">
                                Genre:
                                <textarea
                                name="genre"
                                value={movieData.genre}
                                onChange={handleChange}
                                className="border px-2 py-1 w-full"
                                ></textarea>
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