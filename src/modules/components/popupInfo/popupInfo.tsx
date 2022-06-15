type Text = {
  text: string;
  className: string;
};

const PopupInfo = (props: Text) => {
  const { text, className } = props;
  return (
    <div className={className}>
      total
      <div className="configurationDetails__header__price__wrapper">
        <div
          className={"configurationDetails__header__price__info__popup"}
          style={className === "summary__popup" ? { marginTop: "-57px" } : { marginTop: "17px" }}
        >
          {text}
        </div>
        <span
          className="material-symbols-outlined configurationDetails__header__price__info"
          style={{ fontSize: "15px", fontVariationSettings: "1" }}
        >
          info
        </span>
      </div>
    </div>
  );
};
export default PopupInfo;
