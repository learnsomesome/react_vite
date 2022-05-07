import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import InputBar from "@/components/InputBar";
import ListArea from "@/components/ListArea";
import { TodoItem, TodoList } from "@/store/reducers/listReducer";
import "./index.scss";

const TodoListPage = ({ unDone, done }: Record<string, TodoItem[]>) => {
  const { t } = useTranslation();

  return (
    <div className="todoList">
      <InputBar />
      <section className="content">
        <ListArea title={t("undone")} list={unDone} />
        <ListArea title={t("done")} list={done} />
      </section>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const unDone: TodoItem[] = [];
  const done: TodoItem[] = [];

  Object.values((state.listReducer.list ?? {}) as TodoList).forEach((item) => {
    item.isDone ? done.push(item) : unDone.push(item);
  });

  return {
    unDone,
    done,
  };
};

export default connect(mapStateToProps)(TodoListPage);
