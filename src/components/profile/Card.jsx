import { Avatar, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { Button } from "bootstrap";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { ProfModal } from "./ProfModal";

export const Card = ({ profilePicsUrl, coverPicsUrl }) => {
  const { credentials, authUserTweetsCount, GetAuthUserData } =
    useAuthContext();

  let firstName = credentials.first_name;
  let lastName = credentials.last_name;
  let tweepCoverPhoto = credentials.cover_picture;
  let tweepProfPics = credentials.profile_picture;
  let tweepHandle = credentials.handle;
  let tweepId = credentials.id;
  let tweepBio = credentials.bio;
  let tweepLocation = credentials.location;
  let tweepWeb = credentials.website;
  let tweepEmail = credentials.email;

  useEffect(() => {
    GetAuthUserData();
    console.log(coverPicsUrl + tweepCoverPhoto);
  }, []);

  let fullName = firstName + " " + lastName + " ";

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
      firstName: firstName,
      lastName: lastName,
      tweepBio: tweepBio,
      tweepWeb: tweepWeb,
      tweepLocation: tweepLocation,
      tweepHandle: tweepHandle,
      tweepProfPics: tweepProfPics,
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

  // open profile pics modal
  const openProfPicsPreviewModal = () => {
    handleProfFileChange();
    // document.getElementById("profile_picture").click();
    // setOpenProfPicsModal(true);
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
      <ProfModal
        openModal={openModal}
        errors={errors}
        closeProfPicsModal={closeProfPicsModal}
        handleDetailsSubmit={handleDetailsSubmit}
        firstName={firstName}
        lastName={lastName}
        tweepHandle={tweepHandle}
        tweepBio={tweepBio}
        tweepCoverPhoto={tweepCoverPhoto}
        tweepLocation={tweepLocation}
        tweepWeb={tweepWeb}
        profilePicsUrl={profilePicsUrl}
        tweepProfPics={tweepProfPics}
        fullName={fullName}
        closeCoverPhotoModal={closeCoverPhotoModal}
        closeProfileModal={closeProfileModal}
        handleCoverFileChange={handleCoverFileChange}
        handleProfFileChange={handleProfFileChange}
        openCoverPhotoModal={openCoverPhotoModal}
        openCoverPhotoPreviewModal={openCoverPhotoPreviewModal}
        openProfPicsModal={openProfPicsModal}
        openProfPicsPreviewModal={openProfPicsPreviewModal}
        handleChange={handleChange}
        coverPicsUrl={coverPicsUrl}
        tweepEmail={tweepEmail}
      />

      <div className="card mb-3">
        <div className="card-header position-relative min-vh-25 mb-7">
          <div
            className={"bg-holder rounded-soft rounded-bottom-0"}
            style={{
              backgroundImage: `url(${coverPicsUrl + tweepCoverPhoto})`,
            }}
          ></div>
          <div className="avatar avatar-5xl avatar-profile">
            <Avatar
              alt={fullName}
              src={profilePicsUrl + tweepProfPics}
              className={`rounded-circle  transform-o avatar-img  img-fluid shadow-sm`}
            />
          </div>
        </div>
        <div className="card-body mt-3">
          <div className="row">
            <div className="col-8">
              <h4 className="mb-1 mt-5">
                {fullName}
                {credentials.is_verified ? (
                  <small
                    className="fas fa-check-circle text-twitter-color ml-5"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="Verified"
                    data-fa-transform="shrink-4 down-2"
                  ></small>
                ) : null}
              </h4>
              <b className="text-muted">@{tweepHandle}</b>
              <br />
            </div>

            <div className="col-4  pl-2 pl-lg-3">
              <div className="row">
                {tweepId && (
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

                {!tweepId && (
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
              {tweepBio && <Typography variant="body2"> {tweepBio}</Typography>}
            </div>
            <div className="row mr-auto">
              {tweepLocation && (
                <div className="col-lg-3 col-md-4 col-sm-6">
                  <p className="text-500">
                    <>
                      {/* <LocationOn color="primary" /> */}
                      <i className="fas fa-map-marker-alt profile-icons"> </i>
                      {" " + tweepLocation}
                    </>
                  </p>
                </div>
              )}
              {tweepWeb && (
                <div className="col-lg-5 col-md-7 col-sm-6">
                  <>
                    {/* <LinkIcon></LinkIcon> */}
                    <div className="d-flex">
                      <i className="fas fa-link profile-icons"> </i>
                      <a
                        href={tweepWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=""
                      >
                        {" "}
                        {tweepWeb}
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
                  Joined {moment(credentials.created_at).format("MMMM YYYY")}
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
    </>
  );
};
