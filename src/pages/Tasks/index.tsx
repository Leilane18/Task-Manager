import { useState } from "react";
import { ModalTaskDetails } from "../../components/ModalTaskDetails";
import { Pagination } from "../../components/Pagination";
import { TaskCard, TaskDataTypes } from "../../components/TaskCard";
import { useQueryTask } from "../../hooks/useQueryTask";
import { Container } from "./styles";

export function Tasks() {
  const [showModal, setShowModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState<TaskDataTypes>({} as TaskDataTypes);

  function toggleModal() {
    setShowModal((prevValue) => (prevValue == true ? false : true));
  }

  function addTaskDetails(task: TaskDataTypes) {
    setTaskDetails(task);
    toggleModal();
  }

  const { data, changeLimit, page, changePage, totalPages, prevPage, nextPage } =
    useQueryTask();

  if (totalPages > 0 && page > totalPages) {
    changePage(totalPages);
  }

  return (
    <Container>
      <div className="headPageTasks">
        <h2>Lista</h2>

        <div className="paginationDesktop">
          <Pagination
            page={page}
            step={5}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            changeLimit={changeLimit}
          />
        </div>
      </div>

      <div className="tasksContainer">
        {data?.length == 0 ? (
          <p className="loading">Sem terefas para mostrar</p>
        ) : (
          data?.map((task) => {
            return (
              <TaskCard data={task} key={task.id} onClick={() => addTaskDetails(task)} />
            );
          })
        )}
      </div>

      <div className="paginationMobile">
        <Pagination
          page={page}
          step={5}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          changeLimit={changeLimit}
        />
      </div>

      {showModal && <ModalTaskDetails toggleModal={toggleModal} task={taskDetails} />}
    </Container>
  );
}
