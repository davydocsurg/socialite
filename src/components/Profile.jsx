import { Avatar, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { GoBack } from "../utils/baseIcons/ProfileIcons";

const Profile = () => {
  const { credentials, authUserTweetsCount, GetAuthUserData } =
    useAuthContext();

  useEffect(() => {
    GetAuthUserData();
  }, []);

  const profilePicsUrl = "http://localhost:8000/profile/photos/";
  const coverPicsUrl = "http://localhost:8000/profile/photos/";

  let fullName = credentials.first_name + " " + credentials.last_name + " ";

  const [openModal, setOpenModal] = useState(false);
  const [openProfPicsModal, setOpenProfPicsModal] = useState(false);
  const [openCoverPhotoModal, setOpenCoverPhotoModal] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    website: "",
    location: "",
    profile_picture: "",
    cover_picture: "",
  });

  const [profPics, setProfPics] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [transition, setSetTransition] = useState(undefined);

  const [errors, setErrors] = useState({
    errorMsg: {
      first_name: "",
      last_name: "",
      bio: "",
      website: "",
      location: "",
      profile_picture: "",
      handle: "",
    },
  });

  const openProfileModal = () => {
    // setErrors("");
    console.log("====================================");
    console.log(errors);
    console.log("====================================");
    setProfileDetails({
      ...profileDetails,
      first_name: first_name,
      last_name: last_name,
      bio: bio,
      website: website,
      location: location,
      handle: handle,
      profile_picture: profile_picture,
    });
    setOpenModal(true);
  };

  const closeProfileModal = () => {
    setOpenModal(false);
    setErrors("");
    setProfileDetails({
      ...profileDetails,
    });
  };

  const handleChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.id]: e.target.value,
    });
    clearAllErrors();
  };

  const handleProfFileChange = (e) => {
    setOpenProfPicsModal(true);
    setTimeout(() => {
      document.getElementById("profile_picture").click();

      let file = e.target.files[0];
      let reader = new FileReader();

      let limit = 1024 * 1024 * 2;
      if (file["size"] > limit) {
        setProfPics({
          ...profPics,
          profPics: "",
        });
        alert("File is too large! It must be less than 2MB.");

        return false;
      }

      reader.onloadend = (file) => {
        setProfPics(reader.result);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const handleCoverFileChange = (e) => {
    setOpenCoverPhotoModal(true);
    setTimeout(() => {
      document.getElementById("cover_picture").click();

      let file = e.target.files[0];
      let reader = new FileReader();

      let limit = 1024 * 1024 * 2;
      if (file["size"] > limit) {
        setCoverPhoto({
          ...coverPhoto,
          coverPhoto: "",
        });
        alert("File is too large! It must be less than 2MB.");

        return false;
      }

      reader.onloadend = (file) => {
        setCoverPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const changeProfPics = () => {
    axios
      .post(
        "http://localhost:8000/api/update-profile-picture",
        { profile_picture: profPics },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setOpenProfileUpdateErrorMessage(true);
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          closeProfPicsModal();
          setOpenProfilePicsUpdateSuccessMessage(true);
          dispatch(getUserData());
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const changeCoverPhoto = () => {
    axios
      .post(
        "http://localhost:8000/api/update-cover-picture",
        { cover_picture: coverPhoto },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setOpenProfileUpdateErrorMessage(true);
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          closeCoverPhotoModal();
          setOpenCoverPhotoUpdateSuccessMessage(true);
          dispatch(getUserData());
        }
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // close profile pics modal
  const closeProfPicsModal = () => {
    setProfPics("");
    setOpenProfPicsModal(false);
  };

  // close cover photo modal
  const closeCoverPhotoModal = () => {
    setCoverPhoto("");
    setOpenCoverPhotoModal(false);
  };

  // open cover photo modal
  const openCoverPhotoPreviewModal = () => {
    handleCoverFileChange();
  };

  const closeProfileDetailsUpdateSuccessMessage = () => {
    setOpenProfileDetailsUpdateSuccessMessage(false);
  };

  const closeProfilePicsUpdateSuccessMessage = () => {
    setOpenProfilePicsUpdateSuccessMessage(false);
  };

  const closeCoverPhotoUpdateSuccessMessage = () => {
    setOpenCoverPhotoUpdateSuccessMessage(false);
  };

  const closeProfileUpdateErrorMessage = () => {
    setOpenProfileUpdateErrorMessage(false);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  const clearAllErrors = () => {
    setErrors({
      ...errors,
      errorMsg: {},
    });
  };

  return (
    <>
      <div className="profile">
        <div className="text-left profile__header">
          <div className=" row">
            <div className="col-1">
              <GoBack></GoBack>
            </div>
            {"  "}
            <div className="col-4">
              <h2 className="ml-4">{fullName}</h2>
              <em className="font-weight-lighter">
                {authUserTweetsCount < 1 ? "No" : authUserTweetsCount}{" "}
                {authUserTweetsCount > 1 ? "Tweets" : "Tweet"}
              </em>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header position-relative min-vh-25 mb-7">
            <div
              className={"bg-holder rounded-soft rounded-bottom-0"}
              style={{
                backgroundImage: `url(${
                  coverPicsUrl + credentials.cover_picture
                })`,
              }}
            ></div>
            <div className="avatar avatar-5xl avatar-profile">
              <Avatar
                alt={fullName}
                src={profilePicsUrl + credentials.profile_picture}
                className={
                  // classes.large +
                  `rounded-circle  transform-o avatar-img  img-fluid shadow-sm`
                }
              />
              {/* <img
                className="rounded-circle fit-block transform-o img-thumbnail img-fluid shadow-sm"
                src={
                  "http://localhost:8000/storage/users/profile/" +
                  profile_picture
                }
                alt={first_name + last_name + `'s profile picture`}
                width="200"
              /> */}
            </div>
          </div>
          <div className="card-body mt-3">
            <div className="row">
              <div className="col-8">
                <h4 className="mb-1 mt-5">
                  {fullName}
                  {is_verified ? (
                    <small
                      className="fas fa-check-circle text-twitter-color ml-5"
                      data-toggle="tooltip"
                      data-placement="right"
                      title="Verified"
                      data-fa-transform="shrink-4 down-2"
                    ></small>
                  ) : null}
                </h4>
                <b className="text-muted">@{credentials.handle}</b>
                <br />
              </div>

              <div className="col-4  pl-2 pl-lg-3">
                <div className="row">
                  {id && (
                    <>
                      <div className="col-4"></div>
                      <div className="col-8">
                        <button
                          className="btn btn-falcon-default followBtn text-white btn-sm px-3  ml-auto"
                          type="button"
                          onClick={openProfileModal}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </>
                  )}

                  {!credentials.id && (
                    <>
                      <div className="col-6">
                        <button
                          className="btn btn-falcon-default btn-sm px-3 ml-2"
                          type="button"
                        >
                          Message
                        </button>
                      </div>

                      <div className="col-6">
                        <button
                          className="btn btn-falcon-primary btn-sm px-3"
                          type="button"
                        >
                          Following
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <hr className="border-dashed my-4 d-md-none d-lg-none" />
              </div>
              <div className="col-10 my-3">
                {credentials.bio && (
                  <Typography variant="body2"> {credentials.bio}</Typography>
                )}
              </div>
              <div className="row mr-auto">
                {location && (
                  <div className="col-lg-3 col-md-4 col-sm-6">
                    <p className="text-500">
                      <>
                        {/* <LocationOn color="primary" /> */}
                        <i className="fas fa-map-marker-alt profile-icons"> </i>
                        {" " + credentials.location}
                      </>
                    </p>
                  </div>
                )}
                {credentials.website && (
                  <div className="col-lg-5 col-md-7 col-sm-6">
                    <>
                      {/* <LinkIcon></LinkIcon> */}
                      <div className="d-flex">
                        <i className="fas fa-link profile-icons"> </i>
                        <a
                          href={credentials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=""
                        >
                          {" "}
                          {credentials.website}
                        </a>
                      </div>
                    </>
                  </div>
                )}

                <div className="col-lg-4 col-md-6 col-sm-6 text-muted">
                  {/* <CalendarToday className="mb-2"></CalendarToday>{" "} */}
                  <i className="far fa-calendar-alt profile-icons"></i>
                  <b className="mt-">
                    {" "}
                    Joined {moment(created_at).format("MMMM YYYY")}
                  </b>
                </div>
              </div>

              <div className="row mr-auto mt-4">
                <div className="col-3">
                  <p className="text-black">1k following</p>
                </div>

                <div className="col-3">
                  <p className="text-black">230k followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* loading UI */}
        {/* {UI.loading && (
          <div className="mb-auto mt-5 text-center mx-auto text-twitter-color">
            <i className="spinner-border spinner-border-md "></i>
          </div>
        )} */}

        {/* <FlipMove>
          {authUserTweets.length > 0 ? (
            authUserTweets.map((authUserTweet) => (
              <AuthUserTweet
                key={authUserTweet.slug}
                slug={authUserTweet.slug}
                tweepName={first_name + " " + last_name}
                username={handle}
                verified={true}
                text={authUserTweet.tweet_text}
                tweetTime={authUserTweet.created_at}
                avatar={profilePicsUrl + profile_picture}
                tweetImage={
                  authUserTweet.tweet_photo
                    ? "http://localhost:8000/tweets/photos/" +
                      authUserTweet.tweet_photo
                    : null
                }
                likesCount={authUserTweet.likes.length}
                authUserId={id}
                tweepLikeId={authUserTweet.likes.map((l) => l.user_id)}
              ></AuthUserTweet>
            ))
          ) : (
            <div className="text-center text-black mt-5 mx-auto">
              <h2>No Tweets Found</h2>
            </div>
          )}
        </FlipMove> */}
      </div>
    </>
  );
};

export default Profile;
