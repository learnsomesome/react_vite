import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InputBar from "@/components/TodoList/InputBar";
import ListArea from "@/components/TodoList/ListArea";
import classes from "./index.module.scss";
import { IRootState } from "@/store";
import { ITodoList } from "@/store/reducers/listReducer";

const TodoListPage = () => {
  const { t } = useTranslation();
  const list = useSelector<IRootState>((state) => state.listReducer.list ?? {});

  return (
    <div className={classes.todoList}>
      <InputBar />
      <section className={classes.content}>
        <ListArea
          title={t("undone")}
          list={Object.values(list as ITodoList).filter((item) => !item.isDone)}
        />
        <ListArea
          title={t("done")}
          list={Object.values(list as ITodoList).filter((item) => item.isDone)}
        />
      </section>
    </div>
  );
};

export default TodoListPage;
