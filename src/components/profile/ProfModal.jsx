import { Avatar, Button, Modal, TextField, Tooltip } from "@mui/material";
import React from "react";

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
  openModal,
  closeCoverPhotoModal,
  closeProfPicsModal,
  closeProfileModal,
  handleCoverFileChange,
  handleDetailsSubmit,
  handleProfFileChange,
  openCoverPhotoModal,
  openCoverPhotoPreviewModal,
  openProfPicsModal,
  openProfPicsPreviewModal,
  handleChange,
}) => {
  return (
    <>
      <div className="mx-auto">
        <Modal open={openModal} onClose={closeProfileModal} className="">
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
                                  src={tweepCoverPhoto}
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
                            className="mt-auto"
                          >
                            <div role="dialog">
                              <div
                                className="modal-dialog modal-md"
                                role="document"
                              >
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
                            defaultValue={firstName}
                            // value={profileDetails.first_name}
                            variant="standard"
                            onChange={handleChange}
                            helperText={
                              errors.errorMsg && errors.errorMsg.first_name
                            }
                            error={
                              errors.errorMsg && errors.errorMsg.first_name
                                ? true
                                : false
                            }
                            fullWidth
                          />
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            required
                            id="last_name"
                            label="Last Name"
                            defaultValue={lastName}
                            // value={profileDetails.last_name}
                            variant="standard"
                            onChange={handleChange}
                            helperText={
                              errors.errorMsg && errors.errorMsg.last_name
                            }
                            error={
                              errors.errorMsg && errors.errorMsg.last_name
                                ? true
                                : false
                            }
                            fullWidth
                          />
                        </div>
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="handle"
                          label="Handle"
                          defaultValue={tweepHandle && tweepHandle}
                          // value={profileDetails.handle}
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg && errors.errorMsg.handle}
                          error={
                            errors.errorMsg && errors.errorMsg.handle
                              ? true
                              : false
                          }
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="email"
                          label="Email"
                          defaultValue={tweepEmail && tweepEmail}
                          // value={profileDetails.email}
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg && errors.errorMsg.email}
                          error={
                            errors.errorMsg && errors.errorMsg.email
                              ? true
                              : false
                          }
                        />
                      </div>

                      {/* #TODO: Fix Bio */}
                      <div className="col-12 mt-3">
                        <TextField
                          id="bio"
                          label="Bio"
                          multiline
                          maxRows={4}
                          defaultValue={tweepBio && tweepBio}
                          // value={profileDetails.bio}
                          fullWidth
                          onChange={handleChange}
                          helperText={errors.errorMsg && errors.errorMsg.bio}
                          error={
                            errors.errorMsg && errors.errorMsg.bio
                              ? true
                              : false
                          }
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="website"
                          label="Website"
                          defaultValue={tweepWeb && tweepWeb}
                          // value={profileDetails.website}
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={
                            errors.errorMsg && errors.errorMsg.website
                          }
                          error={
                            errors.errorMsg && errors.errorMsg.website
                              ? true
                              : false
                          }
                        />
                      </div>

                      <div className="col-12 mt-3">
                        <TextField
                          id="location"
                          label="Location"
                          defaultValue={tweepLocation && tweepLocation}
                          // value={profileDetails.location}
                          variant="standard"
                          fullWidth
                          onChange={handleChange}
                          helperText={
                            errors.errorMsg && errors.errorMsg.location
                          }
                          error={
                            errors.errorMsg && errors.errorMsg.location
                              ? true
                              : false
                          }
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
