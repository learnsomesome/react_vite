import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { deleteNote, toggleNote } from "../../store/actions/listAction";
import { Done, UnDone, Delete } from "@/assets/svg";
import "./index.scss";

const ListArea = ({ title, list, _toggleNote, _deleteNote }) => {
  const { t } = useTranslation();

  return (
    <div className="listArea">
      <header>{title}</header>
      <section>
        {list.length > 0 ? (
          list.map((item) => (
            <div key={item.id}>
              <div className="itemContent">{item.value}</div>
              <div className="itemOperate">
                <div
                  onClick={() => _toggleNote(item.id)}
                  title={item.isDone ? t("undone") : t("done")}
                >
                  {item.isDone ? <UnDone /> : <Done />}
                </div>
                <div onClick={() => _deleteNote(item.id)} title={t("common.delete")}>
                  <Delete />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="none">{t("common.none")}</div>
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
