import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Input } from "antd";
import { createNote } from "../../../store/actions/listAction";

const InputBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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

    dispatch(createNote(data));
    setValue("");
  };

  return (
    <div className="inputBar">
      <Input
        enterKeyHint="done"
        placeholder={t("todo_enter_placeholder")}
        value={value}
        onChange={onChange}
        onPressEnter={onSubmit}
      />
    </div>
  );
};

export default InputBar;
