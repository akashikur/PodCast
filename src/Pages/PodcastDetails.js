import React, { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../Components/common/Button";
import Episodes from "../Components/Podcasts/EpisodesDetails";
import AudioPlay from "../Components/Podcasts/AudioPlayer";
import { hover } from "@testing-library/user-event/dist/hover";

const PodcastDetails = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [podcast, setPodcasts] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPodcasts({ id: id, ...docSnap.data() });
      } else {
        console.log("error");
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    // fetching a data
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="prodcast-wrapper" style={{ marginTop: "2rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                className="banner-wrapper"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, -0.3),rgba(0, 0, 0, 6.9)), url(${podcast.bannerImage})`,
                }}
              >
                <div className="inside-bg">
                  <h1 className="podcast-title-heading">{podcast.title}</h1>
                  {podcast.createdBy === auth.currentUser.uid && (
                    <Button
                      style={{ width: "200px" }}
                      text="create episodes"
                      onClick={() => {
                        navigate(`/podcast/${id}/create-episode`);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-episode-heading">Episodes</h1>

            {episodes.length > 0 ? (
              <div className="episodes">
                {episodes.map((episode, index) => (
                  <Episodes
                    key={index}
                    index={index + 1}
                    title={episode.title}
                    description={episode.description}
                    audioFile={episode.audioFile}
                    onClick={(file) => setPlayingFile(file)}
                  />
                ))}
              </div>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>

      {playingFile && (
        <AudioPlay audioSrc={playingFile} image={podcast.displayImage} />
      )}
    </div>
  );
};

export default PodcastDetails;
