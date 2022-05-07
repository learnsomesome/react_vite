import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { deleteNote, toggleNote } from "../../store/actions/listAction";
import { Done, UnDone, Delete, ExpandDown, FoldUp } from "@/assets/svg";
import { TodoItem } from "@/store/reducers/listReducer";
import "./index.scss";

const ListArea = ({
  title,
  list,
  _toggleNote,
  _deleteNote,
}: {
  title: string;
  list: TodoItem[];
  _toggleNote: (id: string) => {
    type: string;
    payload: {
      id: string;
    };
  };
  _deleteNote: (id: string) => {
    type: string;
    payload: {
      id: string;
    };
  };
}) => {
  const contentRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const [fold, setFold] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;

    if (list.length === 0) {
      contentRef.current.style.height = "72px";
    } else {
      contentRef.current.style.height = fold
        ? "16px"
        : `${list.length * 56 + 16}px`;
    }
  }, [list, fold]);

  return (
    <div className="listArea">
      <header onClick={() => list.length !== 0 && setFold(!fold)}>
        {title}
        {list.length !== 0 && (fold ? <ExpandDown /> : <FoldUp />)}
      </header>
      <section ref={contentRef}>
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
                <div
                  onClick={() => _deleteNote(item.id)}
                  title={t("common.delete")}
                >
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

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  _toggleNote: (id: string) => dispatch(toggleNote(id)),
  _deleteNote: (id: string) => dispatch(deleteNote(id)),
});

export default connect(null, mapDispatchToProps)(ListArea);
