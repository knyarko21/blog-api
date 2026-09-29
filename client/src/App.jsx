
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Posts from "./pages/Posts.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import EditPost from "./pages/EditPost.jsx";
import PostDetails from "./pages/PostDetails.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
    return (
        <Routes>

            {/* LOGIN */}

            <Route
                path="/login"
                element={<Login />}
            />

            {/* REGISTER */}

            <Route
                path="/register"
                element={<Register />}
            />

            {/* DASHBOARD */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            {/* ALL POSTS */}

            <Route
                path="/posts"
                element={
                    <ProtectedRoute>
                        <Posts />
                    </ProtectedRoute>
                }
            />

            {/* MY POSTS */}

            <Route
                path="/my-posts"
                element={
                    <ProtectedRoute>
                        <MyPosts />
                    </ProtectedRoute>
                }
            />

            {/* POST DETAILS */}

            <Route
                path="/posts/:id"
                element={
                    <ProtectedRoute>
                        <PostDetails />
                    </ProtectedRoute>
                }
            />

            {/* CREATE POST */}

            <Route
                path="/create-post"
                element={
                    <ProtectedRoute>
                        <CreatePost />
                    </ProtectedRoute>
                }
            />

            {/* EDIT POST */}

            <Route
                path="/edit-post/:id"
                element={
                    <ProtectedRoute>
                        <EditPost />
                    </ProtectedRoute>
                }
            />

            {/* ROOT */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

            {/* UNKNOWN ROUTES */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/posts"
                        replace
                    />
                }
            />

        </Routes>
    );
}

export default App;