import { Avatar, Button, Modal, TextField, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import HttpService from "../../services/HttpServices";
import SuccessMsg from "../../utils/snackBars/SuccessMsg";
import ErrorMsg from "../../utils/snackBars/ErrorMsg";

export const ProfModal = ({
  coverPicsUrl,
  errors,
  firstName,
  lastName,
  tweepHandle,
  tweepEmail,
  tweepBio,
  tweepCoverPhoto,
  tweepLocation,
  tweepWeb,
  profilePicsUrl,
  tweepProfPics,
  fullName,
  closeProfileModal,
  openModal,
  clearAllErrors,
  // closeCoverPhotoModal,
  // closeProfPicsModal,
  // handleCoverFileChange,
  // handleDetailsSubmit,
  // handleProfFileChange,
  // openCoverPhotoModal,
  // openCoverPhotoPreviewModal,
  // openProfPicsModal,
  // openProfPicsPreviewModal,
  // handleChange,
  // profPics,
  GetAuthUserData,
}) => {
  const [openProfPicsModal, setOpenProfPicsModal] = useState(false);
  const [openCoverPhotoModal, setOpenCoverPhotoModal] = useState(false);

  const [openProfSucMsg, setOpenProfSucMsg] = useState(false);
  const [openProfErrMsg, setOpenProfErrMsg] = useState(false);
  const [profPics, setProfPics] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  const [profileDetails, setProfileDetails] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    website: "",
    location: "",
    profile_picture: "",
    cover_picture: "",
  });

  useEffect(() => {
    setProfileDetails({
      ...profileDetails,
      first_name: firstName,
      last_name: lastName,
      email: tweepEmail,
      bio: tweepBio,
      website: tweepWeb,
      location: tweepLocation,
      handle: tweepHandle,
    });
  }, []);

  let sucMsg = "Profile Updated Successfully";
  let errMsg = "Oops! something went wrong. Check your details and try again.";

  const http = new HttpService();
  const token = localStorage.getItem("user-token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const handleChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.id]: e.target.value,
      // first_name: e.target.value,
    });
    clearAllErrors();
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

  const closeProfDetUpdateSucMsg = () => {
    setOpenProfSucMsg(false);
  };

  const closeProfDetUpdateErrMsg = () => {
    setOpenProfErrMsg(false);
  };

  const closeProfErrMsg = () => {
    setOpenProfErrMsg(false);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    axios
      .post(http.url + "/update-profile", profileDetails, { headers: headers })
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setOpenProfErrMsg(true);
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          setOpenProfSucMsg(true);
          closeProfileModal();
          GetAuthUserData();
        }
        return res;
      })
      .catch((err) => {
        setOpenProfErrMsg(true);
        console.error(err);
      });
  };

  const handleProfFileChange = (e) => {
    // e.preventDefault();
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
    }, 500);
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
    }, 500);
  };

  const changeProfPics = () => {
    axios
      .post(
        http.url + "/update-profile-picture",
        { profile_picture: profPics },
        { headers: headers }
      )
      .then((res) => {
        if (res.data.hasOwnProperty("success") && res.data.success === false) {
          setOpenProfErrMsg(true);
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          closeProfPicsModal();
          setOpenProfSucMsg(true);
          GetAuthUserData();
        }
        return res;
      })
      .catch((err) => {
        setOpenProfErrMsg(true);
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
          setOpenProfErrMsg(true);
        } else if (
          res.data.hasOwnProperty("success") &&
          res.data.success === true
        ) {
          closeCoverPhotoModal();
          setOpenProfSucMsg(true);
          GetAuthUserData();
        }
        return res;
      })
      .catch((err) => {
        setOpenProfErrMsg(true);
        console.error(err);
        console.log(openProfErrMsg);
      });
  };

  // open profile pics modal
  const openProfPicsPreviewModal = () => {
    handleProfFileChange();
  };

  return (
    <>
      <div className="mx-auto">
        <SuccessMsg
          openProfSucMsg={openProfSucMsg}
          closeProfDetUpdateSucMsg={closeProfDetUpdateSucMsg}
          sucMsg={sucMsg}
        />

        <ErrorMsg
          openProfErrMsg={openProfErrMsg}
          closeProfDetUpdateErrMsg={closeProfDetUpdateErrMsg}
          errMsg={errMsg}
        />
        <Modal
          open={openModal}
          onClose={closeProfileModal}
          // className="mx-auto"
          // style={{ overflowX: scroll, maxHeight: "80vh" }}
        >
          <div id="exampleModal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Profile
                  </h5>
                  <button
                    className="close btn btn-twitter"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeProfileModal}
                  >
                    <span className="font-weight-light" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                </div>
                <form onSubmit={handleDetailsSubmit}>
                  <div className="modal-body profile-modal-body">
                    <div className="position-relative min-vh-25 mb-7">
                      {/* cover photo preview modal */}
                      {openCoverPhotoModal && (
                        <Modal
                          open={openCoverPhotoModal}
                          onClose={closeCoverPhotoModal}
                          className="mt-auto"
                          // style={{ overflowY: scroll, maxHeight: "80vh" }}
                        >
                          <div role="dialog">
                            <div
                              className="modal-dialog modal-md"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">
                                    Cover Photo Preview
                                  </h5>
                                  <button
                                    className="close btn btn-twitter"
                                    type="button"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={closeCoverPhotoModal}
                                  >
                                    <span
                                      className="font-weight-light"
                                      aria-hidden="true"
                                    >
                                      &times;
                                    </span>
                                  </button>
                                </div>

                                <img
                                  src={coverPhoto}
                                  alt=""
                                  className="p-5 shadow-sm img-fluid b-radius"
                                />
                                {/* <form onSubmit={changeProfPics}> */}
                                <div className="modal-footer">
                                  <input
                                    id="cover_picture"
                                    onChange={handleCoverFileChange}
                                    className="d-none"
                                    placeholder="Optional: Enter image URL"
                                    type="file"
                                  />

                                  <button
                                    className="px-4 text-white  followBtn"
                                    type="button"
                                    onClick={changeCoverPhoto}
                                  >
                                    Save changes
                                  </button>
                                </div>
                                {/* </form> */}
                              </div>
                            </div>
                          </div>
                        </Modal>
                      )}

                      <Tooltip title="Change Cover Photo" placement="top">
                        <button
                          className="btn shadow-lg mt-4 p-4 position-absolute btn-update-cover ml-lg-7"
                          onClick={openCoverPhotoPreviewModal}
                          type="button"
                        >
                          <i className="fas fa-upload"></i>
                        </button>
                      </Tooltip>

                      <div
                        className="bg-holder rounded-soft rounded-bottom-0"
                        style={{
                          backgroundImage: `url(${
                            coverPicsUrl + tweepCoverPhoto
                          })`,
                        }}
                      ></div>
                      <div className="avatar avatar-5xl avatar-profile">
                        {/* img preview modal */}
                        {openProfPicsModal && (
                          <Modal
                            open={openProfPicsModal}
                            onClose={closeProfPicsModal}
                            // className="my-auto"
                            // sx={{ maxHeight: "30vh", overflowY: scroll }}
                          >
                            <div
                              role="dialog"
                              // style={{ maxHeight: "30vh", overflowY: scroll }}
                            >
                              <div className="modal-dialog modal-md">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      Profile Image Preview
                                    </h5>
                                    <button
                                      className="close btn btn-twitter"
                                      type="button"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                      onClick={closeProfPicsModal}
                                    >
                                      <span
                                        className="font-weight-light"
                                        aria-hidden="true"
                                      >
                                        &times;
                                      </span>
                                    </button>
                                  </div>

                                  <img
                                    src={profPics}
                                    alt=""
                                    className="p-5 shadow-sm img-fluid b-radius"
                                  />
                                  {/* <form onSubmit={changeProfPics}> */}
                                  <div className="modal-footer">
                                    <input
                                      id="profile_picture"
                                      onChange={handleProfFileChange}
                                      className="d-none"
                                      placeholder="Optional: Enter image URL"
                                      type="file"
                                    />

                                    <button
                                      className="px-4 text-white  followBtn"
                                      type="button"
                                      onClick={changeProfPics}
                                    >
                                      Save changes
                                    </button>
                                  </div>
                                  {/* </form> */}
                                </div>
                              </div>
                            </div>
                          </Modal>
                        )}
                        <div className="bg-dark shadow-lg">
                          <Tooltip
                            title="Change Profile Picture"
                            placement="top"
                          >
                            <button
                              className="btn shadow-lg mt-4 p-4 position-absolute btn-update-prof"
                              onClick={openProfPicsPreviewModal}
                              type="button"
                            >
                              <i className="fas fa-upload"></i>
                            </button>
                          </Tooltip>
                        </div>
                        <Avatar
                          alt={fullName}
                          src={profilePicsUrl + tweepProfPics}
                          className={`rounded-circle  transform-o avatar-img  img-fluid shadow-sm`}
                        ></Avatar>
                      </div>
                    </div>

                    <div className="prof-details-inp">
                      <div className="row">
                        <div className="col-lg-6">
                          <TextField
                            required
                            id="first_name"
                            label="First Name"
                            // defaultValue={firstName}
                            value={profileDetails.first_name}
                            name="first_name"
                            variant="standard"
                            onChange={handleChange}
                            helperText={
                              errors.errorMsg && errors.errorMsg.first_name
                            }
                            // error={errors.errorMsg.first_name && true}
                            fullWidth
                          />
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            required
                            id="last_name"
                            label="Last Name"
                            // defaultValue={lastName}
                            value={profileDetails.last_name}
                            name="last_name"
                            variant="standard"
                            onChange={handleChange}
                            helperText={
                              errors.errorMsg && errors.errorMsg.last_name
                            }
                            // error={errors.errorMsg.last_name && true}
                            fullWidth
                          />
                        </div>
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="handle"
                          label="Handle"
                          // defaultValue={tweepHandle && tweepHandle}
                          value={profileDetails.handle}
                          name="handle"
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg && errors.errorMsg.handle}
                          // error={errors.errorMsg.handle && true}
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="email"
                          label="Email"
                          // defaultValue={tweepEmail && tweepEmail}
                          value={profileDetails.email}
                          name="email"
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg && errors.errorMsg.email}
                          // error={errors.errorMsg.email && true}
                        />
                      </div>

                      {/* #TODO: Fix Bio */}
                      <div className="col-12 mt-3">
                        <TextField
                          id="bio"
                          label="Bio"
                          multiline
                          maxRows={4}
                          // defaultValue={tweepBio && tweepBio}
                          value={profileDetails.bio}
                          name="bio"
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg && errors.errorMsg.bio}
                          // error={errors.errorMsg.bio && true}
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="website"
                          label="Website"
                          // defaultValue={tweepWeb && tweepWeb}
                          value={profileDetails.website}
                          name="website"
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={
                            errors.errorMsg && errors.errorMsg.website
                          }
                          // error={errors.errorMsg.website && true}
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="location"
                          label="Location"
                          // defaultValue={tweepLocation && tweepLocation}
                          name="location"
                          value={profileDetails.location}
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={
                            errors.errorMsg && errors.errorMsg.location
                          }
                          // error={errors.errorMsg.location && true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    {/* <Button
                    className="btn btn-secondary btn-sm"
                    type="Button"
                    data-dismiss="modal"
                    onClick={closeProfileModal}
                    >
                    Close
                  </Button> */}
                    <Button
                      className="px-4 text-white  followBtn"
                      type="submit"
                    >
                      Save changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <Paper className={classes.paper}>hello</Paper> */}
        </Modal>
      </div>
    </>
  );
};
