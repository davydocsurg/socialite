import React, { forwardRef } from "react";

const AuthUserTweetPhoto = forwardRef(({ tweetImage, username }, ref) => {
  return (
    <div className="tweet_photo container" ref={ref}>
      <div className="row">
        <div className="card-group">
          <div
            class="card bg-dark text-white"
            //  style={{ maxWidth: "30rem" }}
          >
            <div class="card-img-top">
              <img
                class="img-fluid"
                src={tweetImage}
                alt={username + " 's media"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AuthUserTweetPhoto;
// {
//   <div
//   class="card bg-dark text-white"
//   //  style={{ maxWidth: "30rem" }}
// >
//   <div class="card-img-top">
//     <img
//       class="img-fluid"
//       src={tweetImage}
//       alt={username + " 's media"}
//     />
//   </div>
// </div>

// <div
//   class="card bg-dark text-white"
//   //  style={{ maxWidth: "30rem" }}
// >
//   <div class="card-img-top">
//     <img
//       class="img-fluid"
//       src={tweetImage}
//       alt={username + " 's media"}
//     />
//   </div>
// </div>
// </div>
// <div className="card-group">
// <div
//   class="card bg-dark text-white"
//   //  style={{ maxWidth: "30rem" }}
// >
//   <div class="card-img-top">
//     <img
//       class="img-fluid"
//       src={tweetImage}
//       alt={username + " 's media"}
//     />
//   </div>
// </div>

// <div
//   class="card bg-dark text-white"
//   //  style={{ maxWidth: "30rem" }}
// >
//   <div class="card-img-top">
//     <img
//       class="img-fluid"
//       src={tweetImage}
//       alt={username + " 's media"}
//     />
//   </div>
// </div>

// <div
//   class="card bg-dark text-white"
//   //  style={{ maxWidth: "30rem" }}
// >
//   <div class="card-img-top">
//     <img
//       class="img-fluid"
//       src={tweetImage}
//       alt={username + " 's media"}
//     />
//   </div>
// </div>
// </div>
// }
