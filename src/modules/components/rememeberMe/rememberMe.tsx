interface IRememberMe {
  remember: boolean;
  setRemember: (remember: boolean) => void;
}

const RememberMe = (props: IRememberMe) => {
  const { remember, setRemember } = props;
  return (
    <div className="login__rememberMe">
      Remember me
      <div
        className="login__rememberMe__checkbox"
        onClick={() => setRemember(!remember)}
        style={remember ? { background: "lightgreen" } : { backgroundColor: "lightgray" }}
      >
        <div
          className="login__rememberMe_checkbox__slider"
          style={remember ? { backgroundColor: "darkgreen", left: "21px" } : { backgroundColor: "#2e2e38", left: "0" }}
        ></div>
      </div>
    </div>
  );
};

export default RememberMe;
