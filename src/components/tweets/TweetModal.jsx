import { Modal } from "@mui/material";
import React from "react";
import { useTweetContext } from "../../contexts/TweetContext";
import TweetBox from "./TweetBox";

export const TweetModal = () => {
  const { closeTweetModal, openTweetModal, handleTweetModal } =
    useTweetContext();

  return (
    <>
      <div className="mx-auto">
        <Modal open={openTweetModal} onClose={closeTweetModal}>
          <div id="exampleModal" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Tweet
                  </h5>
                  <button
                    className="close btn btn-twitter"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closeTweetModal}
                  >
                    <span className="font-weight-light" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                </div>

                <div className="container">
                  <TweetBox closeTweetModal={closeTweetModal} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
