import { Avatar, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { Button } from "bootstrap";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { Calendar, LinkIcon } from "../../utils/baseIcons/ProfileIcons";
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

  const [coverPhoto, setCoverPhoto] = useState("");
  const [transition, setSetTransition] = useState(undefined);

  const [openModal, setOpenModal] = useState(false);

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
    setOpenModal(true);
  };

  const closeProfileModal = () => {
    setOpenModal(false);
    setErrors("");
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
        // closeProfPicsModal={closeProfPicsModal}
        // handleDetailsSubmit={handleDetailsSubmit}
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
        closeProfileModal={closeProfileModal}
        clearAllErrors={clearAllErrors}
        // closeCoverPhotoModal={closeCoverPhotoModal}
        // handleCoverFileChange={handleCoverFileChange}
        // handleProfFileChange={handleProfFileChange}
        // openCoverPhotoModal={openCoverPhotoModal}
        // openCoverPhotoPreviewModal={openCoverPhotoPreviewModal}
        // openProfPicsModal={openProfPicsModal}
        // openProfPicsPreviewModal={openProfPicsPreviewModal}
        // handleChange={handleChange}
        coverPicsUrl={coverPicsUrl}
        tweepEmail={tweepEmail}
        GetAuthUserData={GetAuthUserData}
        // profPics={profPics}
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
                    <div className="d-flex">
                      <LinkIcon />{" "}
                      <a
                        href={tweepWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-3 font-weight-bold"
                      >
                        {tweepWeb}
                      </a>
                    </div>
                  </>
                </div>
              )}

              <div className="col-lg-4 col-md-6 col-sm-6 text-muted">
                <Calendar className="mb-2" />{" "}
                {/* <i className="far fa-calendar-alt profile-icons"></i> */}
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
