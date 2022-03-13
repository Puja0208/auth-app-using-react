import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    //add validation
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkKp8ZNjjaYl7MDPi-1oSJL2GHX8vHRDk",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      history.replace("/");
    } else {
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
