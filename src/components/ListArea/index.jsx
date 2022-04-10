import { connect } from "react-redux";
import { deleteNote, toggleNote } from "../../store/actions/listAction";
import "./index.scss";

const ListArea = ({ title, list, _toggleNote, _deleteNote }) => {
  return (
    <div className="listArea">
      <header>{title}</header>
      <section>
        {list.length > 0 ? (
          list.map((item) => (
            <div key={item.id}>
              <div className="itemContent">{item.value}</div>
              <div className="itemOperate">
                <div onClick={() => _toggleNote(item.id)}>{item.isDone ? "UnDone" : "Done"}</div>
                <div onClick={() => _deleteNote(item.id)}>Delete</div>
              </div>
            </div>
          ))
        ) : (
          <div className="none">None</div>
        )}
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  _toggleNote: (id) => dispatch(toggleNote(id)),
  _deleteNote: (id) => dispatch(deleteNote(id)),
});

export default connect(null, mapDispatchToProps)(ListArea);
