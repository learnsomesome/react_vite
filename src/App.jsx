import { connect } from 'react-redux';
import InputBar from './components/InputBar';
import ListArea from './components/ListArea';
import './App.scss';

function App({ unDone, done }) {
  return (
      <main className="app">
        <InputBar />
        <section className="content">
          <ListArea title="UnDone" list={unDone} />
          <ListArea title="Done" list={done} />
        </section>
      </main>
  )
}

const mapStateToProps = (state) => {
  const unDone = [];
  const done = [];

  Object.values(state.listReducer.list ?? {}).forEach((item) => {
    item.isDone ? done.push(item) : unDone.push(item);
  });

  return {
    unDone,
    done,
  };
};

export default connect(mapStateToProps)(App);
