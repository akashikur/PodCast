import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Components/common/Button";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Header from "../Components/common/Header";
import PodcastCard from "../Components/Podcasts/PodcastsCard.js";
import { collection, onSnapshot, query } from "firebase/firestore";
import { setPodcasts } from "../Slices/podcastSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const [myPodcasts, setMyPodcasts] = useState([]);
  const user = useSelector((state) => state.user.user);

  const podcasts = useSelector((state) => state.podcast.podcasts);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });

        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    const items = podcasts.filter((i) => user.uid === i.createdBy);
    setMyPodcasts(items);
  }, [podcasts]);

  if (!user) {
    return <div>Loading</div>;
  }
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("User LogOut");
      })
      .catch((error) => {
        toast.success(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Profile</h1>
        <img src={user.profilePic} alt="imag" className="profile-image" />
        <p>{user.name}</p>
        <p>{user.email}</p>
        <Button
          text={"log out"}
          onClick={handleLogOut}
          style={{ width: "100px" }}
        />

        <h1 style={{ marginBottom: "2rem" }}>My Podcasts</h1>
        <div className="prodcast-flex">
          {myPodcasts.length === 0 ? (
            <p>You Have Zero Podcasts</p>
          ) : (
            myPodcasts.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
