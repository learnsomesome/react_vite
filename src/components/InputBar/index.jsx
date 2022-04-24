import { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Input, Button } from "antd";
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
      <Input placeholder={t("todo_enter_placeholder")} value={value} onChange={onChange} />
      <Button onClick={onSubmit}>{t("common.submit")}</Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  _createNote: (data) => dispatch(createNote(data)),
});

export default connect(null, mapDispatchToProps)(InputBar);
