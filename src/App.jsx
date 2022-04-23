import { connect } from "react-redux";
import Header from "./components/Header";
import InputBar from "./components/InputBar";
import ListArea from "./components/ListArea";
import { useTranslation } from "react-i18next";
import "./App.scss";

function App({ unDone, done }) {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="app">
        <InputBar />
        <section className="content">
          <ListArea title={t("undone")} list={unDone} />
          <ListArea title={t("done")} list={done} />
        </section>
      </main>
    </>
  );
}

const mapStateToProps = (state) => {
  const unDone = [];
  const done = [];

  Object.values(state.listReducer.list ?? {}).forEach((item) => {
    item.isDone ? done.push(item) : unDone.push(item);
  });

  console.log(state.listReducer.list);

  return {
    unDone,
    done,
  };
};

export default connect(mapStateToProps)(App);
