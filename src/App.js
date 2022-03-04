import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Header-Footer/Footer";
import Header from "./Header-Footer/Header";
import HomePage from "./Main/HomePage";
import "./index.css";
import { useEffect, useState } from "react";
import Signup_Login from "./Header-Footer/Signup_Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import ProfilePage from "./Main/ProfilePage";
import Error404 from "./Main/Error404";
import LatestPost from "./Main/LatestPost";
import TrendingPost from "./Main/TrendingPost";
import AllPostsPage from "./Main/AllPostsPage";
import AddCategory from "./Main/AddCategory";
import CategoryPage from "./Main/CategoryComponents/CategoryPage";
import AboutUs from "./Main/AboutUs";
import ContactUs from "./Main/ContactUs";
import Donate from "./Main/Donate";
import SharedPost from "./Main/SharedPost";

export const PostsComments = () => {
  const [comments, setComments] = useState([]);
  useEffect(async () => {
    onSnapshot(collection(db, "postComments"), (snapshot) => {
      const allCommentsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setComments(allCommentsData);
    });
  }, []);
  return comments;
};

export const PostReports = () => {
  const [reports, setReports] = useState([]);
  useEffect(async () => {
    onSnapshot(collection(db, "reportPosts"), (snapshot) => {
      const allReportPostData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReports(allReportPostData);
    });
  }, []);
  return reports;
};

export const CurrentUser = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user !== null) {
        const userRef = collection(db, "users");
        const allUsers = await getDocs(userRef);
        const allUsersData = allUsers.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const theUser = allUsersData
          .filter((data) => data.uid === user.uid)
          .map((doc) => doc);
        setUser(theUser[0]);
      }
    });
  }, []);
  return user;
};

export const AllPosts = () => {
  const [posts, setAllposts] = useState([]);
  useEffect(async () => {
    onSnapshot(collection(db, "posts"), (snapshot) => {
      const allpostsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllposts(allpostsData);
    });
  }, []);
  return posts;
};

export const AllCategories = () => {
  const [category, setAllCategories] = useState([]);
  useEffect(async () => {
    onSnapshot(collection(db, "category"), (snapshot) => {
      const allData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllCategories(allData);
    });
  }, []);
  return category;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <>
          <Routes>
            {/* Homa Page */}
            <Route exact path="/" element={<HomePage />} />

            {/* Login Signup */}
            <Route exact path="/user/signup_login" element={<Signup_Login />} />
            <Route exact path="/user/:userId" element={<ProfilePage />} />

            {/* Content Filter Navigation */}
            <Route exact path="/:category/posts" element={<CategoryPage />} />
            <Route exact path="/posts/latest" element={<LatestPost />} />
            <Route exact path="/posts/all" element={<AllPostsPage />} />
            <Route exact path="/posts/add-category" element={<AddCategory />} />
            <Route exact path="/posts/trending" element={<TrendingPost />} />
            <Route exact path="/shared/:PostId" element={<SharedPost />} />

            {/* Menu Navigation */}
            <Route exact path="/About-Us/" element={<AboutUs />} />
            <Route exact path="/Contact-Us/" element={<ContactUs />} />
            <Route exact path="/donate/" element={<Donate />} />

            {/* 404 Error Page */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
