import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { deleteNote, toggleNote } from "../../../store/actions/listAction";
import { Done, UnDone, Delete, ExpandDown, FoldUp } from "@/assets/svg";
import { ITodoItem } from "@/store/reducers/listReducer";
import classes from "./index.module.scss";

const ListArea = ({ title, list }: { title: string; list: ITodoItem[] }) => {
  const contentRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
    <div className={classes.listArea}>
      <header onClick={() => list.length !== 0 && setFold(!fold)}>
        {title}
        {list.length !== 0 && (fold ? <ExpandDown /> : <FoldUp />)}
      </header>
      <section ref={contentRef}>
        {list.length > 0 ? (
          list.map((item) => (
            <div key={item.id}>
              <div className={classes.itemContent}>{item.value}</div>
              <div className={classes.itemOperate}>
                <div
                  onClick={() => dispatch(toggleNote(item.id))}
                  title={item.isDone ? t("undone") : t("done")}
                >
                  {item.isDone ? <UnDone /> : <Done />}
                </div>
                <div
                  onClick={() => dispatch(deleteNote(item.id))}
                  title={t("common.delete")}
                >
                  <Delete color="#e84749" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.none}>{t("common.none")}</div>
        )}
      </section>
    </div>
  );
};

export default ListArea;
