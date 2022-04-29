import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Action, Dispatch } from "redux";
import { connect } from "react-redux";
import { Input, Button } from "antd";
import { createNote } from "../../store/actions/listAction";
import { TodoItem } from "../../store/reducers/listReducer";
import "./index.scss";

const InputBar = ({
  _createNote,
}: {
  _createNote: (data: TodoItem) => {
    type: string;
    payload: {
      note: TodoItem;
    };
  };
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  _createNote: (data: TodoItem) => dispatch(createNote(data)),
});

export default connect(null, mapDispatchToProps)(InputBar);
