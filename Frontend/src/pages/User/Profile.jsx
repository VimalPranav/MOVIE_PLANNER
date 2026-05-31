import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../component/Loader";
import { useProfileMutation } from "../../redux/api/users";
import { setCredentials } from "../../redux/features/auth/auth_slice";

const Profile = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { userInfo } = useSelector((state) => state.auth);

    const [updateProfile, { isLoading: loadingUpdateProfile }] =
        useProfileMutation();

    useEffect(() => {
        setUsername(userInfo.username);
        setEmail(userInfo.email);
    }, [userInfo.email, userInfo.username]);

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    username,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Profile updated successfully");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#131313] text-white font-['Anton'] selection:bg-[#e50914]/30"> 
                    
            <main className="pt-32 pb-20 px-12 max-w-7xl mx-auto flex gap-12"> 
                {/* Sidebar Navigation */} 
                <aside className="w-64 flex-shrink-0"> 
                    <div className="flex items-center gap-3 mb-8 px-4"> 
                        <span className="material-icons text-[#e50914]">settings</span> 
                        <h2 className="text-2xl font-bold uppercase tracking-tighter">Settings</h2> 
                    </div> 
                    <nav className="space-y-2"> 
                        <a href="#" className="flex items-center gap-4 px-4 py-4 bg-white/5 text-white rounded-xl border border-white/10 transition-all"> 
                            <span className="material-icons">person</span> 
                            <span className="uppercase tracking-widest text-sm font-bold">Profile</span> 
                        </a> 
                        <a href="#" className="flex items-center gap-4 px-4 py-4 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all group"> 
                            <span className="material-icons group-hover:text-[#e50914] transition-colors">security</span> 
                            <span className="uppercase tracking-widest text-sm font-bold">Security</span> 
                        </a> 
                        <a href="#" className="flex items-center gap-4 px-4 py-4 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all group"> 
                            <span className="material-icons group-hover:text-[#e50914] transition-colors">payments</span> 
                            <span className="uppercase tracking-widest text-sm font-bold">Subscriptions</span> 
                        </a> 
                        <a href="#" className="flex items-center gap-4 px-4 py-4 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all group"> 
                            <span className="material-icons group-hover:text-[#e50914] transition-colors">notifications_none</span> 
                            <span className="uppercase tracking-widest text-sm font-bold">Notifications</span> 
                        </a> 
                    </nav> 
                    
                    {/* Pro Plan Card */} 
                    <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[#1c1b1b] to-[#0e0e0e] border border-white/5 relative overflow-hidden group"> 
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#e50914]/10 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-[#e50914]/20 transition-all"></div> 
                        <span className="text-[10px] text-[#e50914] font-bold tracking-[0.2em] uppercase mb-2 block">Pro Plan</span> 
                        <p className="text-lg font-bold leading-tight mb-4 uppercase tracking-tight">Unlimited Previews & Exclusive Premieres</p> 
                        <button className="w-full py-2 bg-[#e50914]/10 hover:bg-[#e50914] text-[#e50914] hover:text-white border border-[#e50914]/50 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"> Manage Plan </button> 
                    </div> 
                </aside> 
                
                {/* Form Content */} 
                <section className="flex-grow"> 
                    <header className="mb-10"> 
                        <h1 className="text-6xl font-black uppercase tracking-tighter mb-2">Profile Settings</h1> 
                        <p className="text-white/50 font-sans text-lg">Manage your cinematic identity and account preferences.</p> 
                    </header>                     
                    <div className="bg-[#1c1b1b]/50 backdrop-blur-md border border-white/10 rounded-3xl p-10"> 
                    
                    {/* Avatar Section */} 
                    <div className="flex items-center gap-8 mb-12 pb-12 border-b border-white/5"> 
                        <div className="relative group"> 
                            <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-[#e50914]/30 group-hover:border-[#e50914] transition-all"> 
                                <img src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=200" alt="Avatar" className="w-full h-full object-cover" /> 
                            </div> 
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl cursor-pointer"> 
                                <span className="material-icons text-3xl">photo_camera</span> 
                            </div> 
                        </div> 
                        <div> 
                            <h3 className="text-xl font-bold uppercase tracking-tight mb-1">Change Avatar</h3> 
                            <p className="text-white/40 text-xs font-sans mb-4 uppercase tracking-widest">JPG, GIF or PNG. Max size of 2MB.</p> 
                            <div className="flex gap-4"> 
                                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">Upload New</button> 
                                <button className="px-6 py-2 text-white/40 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all">Remove</button> 
                            </div> 
                        </div> 
                    </div> 
                    
                    {/* Profile Form */} 
                    <form onSubmit={submitHandler} className="space-y-8"> 
                        <div className="grid grid-cols-2 gap-8"> 
                            <div className="space-y-3"> 
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-1">Username</label> 
                                <input 
                                    type="text" 
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#e50914] transition-all font-sans text-white/90" /> 
                            </div> 
                            <div className="space-y-3"> 
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-1">Email Address</label> 
                                <input type="email" 
                                    defaultValue="alex.premier@cineplan.com" 
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#e50914] transition-all font-sans text-white/90" /> 
                            </div> 
                        </div> 
                        <div className="grid grid-cols-2 gap-8"> 
                            <div className="space-y-3"> 
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-1">Password</label> 
                                <div className="relative"> 
                                    <input 
                                        type="password" 
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#e50914] transition-all font-sans text-white/90" /> 
                                    
                                    </div> 
                                </div> 
                                <div className="space-y-3"> 
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 ml-1">Confirm Password</label> 
                                    <div className="relative"> 
                                        <input 
                                            type="password"  
                                            placeholder="Confirm password" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-[#e50914] transition-all font-sans text-white/90" /> 
                                    </div> 
                                </div> 
                            </div> 
                            
                            <div className="pt-6 flex items-center justify-between border-t border-white/5"> 
                                <label className="flex items-center gap-3 cursor-pointer group"> 
                                    <div className="w-5 h-5 border-2 border-white/10 rounded group-hover:border-[#e50914] transition-all flex items-center justify-center"> 
                                        <div className="w-2 h-2 bg-[#e50914] rounded-sm opacity-0 group-hover:opacity-40 transition-opacity"></div> 
                                    </div> 
                                    <span className="text-xs text-white/50 font-sans group-hover:text-white transition-colors">Notify me about exclusive cinematic events and premieres.</span> 
                                </label> 
                                <button type="submit" className="px-10 py-4 bg-[#e50914] hover:bg-[#b20710] rounded-xl text-sm font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(229,9,20,0.3)] transition-all active:scale-95" > 
                                    Update Profile 
                                </button>

                                {loadingUpdateProfile && <Loader />} 
                            </div> 
                        </form> 
                    </div> 
                    
                    {/* Danger Zone */} 
                    <div className="mt-12 p-8 border border-white/5 bg-white/[0.02] rounded-3xl flex items-center justify-between"> 
                        <div> 
                            <h4 className="text-xl font-bold uppercase tracking-tight mb-1">Deactivate Account</h4> 
                            <p className="text-white/40 text-sm font-sans">This will permanently delete your movie watchlists and reviews.</p> 
                        </div> 
                        <button className="px-6 py-3 border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"> Delete Account </button> 
                    </div> 
                </section> 
            </main> 
        </div>
    );
};

export default Profile;