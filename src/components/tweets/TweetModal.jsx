import { Modal } from "@material-ui/core";
import React from "react";
import TweetBox from "../TweetBox";

export const TweetModal = ({ openTweetModal, closeTweetBox }) => {
  return (
    <>
      <div className="mx-auto">
        <Modal open={openTweetModal} onClose={closeTweetBox}>
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
                    onClick={closeTweetBox}
                  >
                    <span className="font-weight-light" aria-hidden="true">
                      &times;
                    </span>
                  </button>
                </div>

                <div className="container profile-modal-body">
                  <TweetBox closeTweetBox={closeTweetBox} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
