import { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { createNote } from "../../store/actions/listAction";
import "./index.scss";

const InputBar = ({ _createNote }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = () => {
    if (!value.trim()) {
      setValue("");

      return;
    }

    const data = {
      id: Date.now().toString(),
      value: value.trim(),
      isDone: false,
    };

    _createNote(data);
    setValue("");
  };

  return (
    <div className="inputBar">
      <input value={value} onChange={onChange} />
      <button onClick={onSubmit}>{t("common.submit")}</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  _createNote: (data) => dispatch(createNote(data)),
});

export default connect(null, mapDispatchToProps)(InputBar);
