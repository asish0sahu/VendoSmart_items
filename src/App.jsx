import React, { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";

const item = {
  id: v4(),
  name: "Lenovo Yoga 7 Slim Pro",
  desc: "Lenovo Yoga 7 Slim Pro is a Windows 11 laptop with a 16.00-inch display. It is powered by a Ryzen 7 processor and it comes with 16GB of RAM",
  startDate: "2022-05-25",
  endDate: "2023-10-23",
  time: "11:20",
};

const item2 = {
  id: v4(),
  name: "Gopro HERO11Black",
  desc: "Get incredible highlight videos sent to your phone automatically with the HERO11 Black",
  startDate: "2022-04-02",
  endDate: "2023-08-26",
  time: "9:20",
};

function App() {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState({
    todo: {
      title: "Task Assigning",
      items: [item, item2],
    },
    "in-progress": {
      title: "In Progress",
      items: [],
    },
    done: {
      title: "Completed",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };

      prev[source.droppableId].items.splice(source.index, 1);

      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const addItem = () => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "Task Assigning",
          items: [
            {
              id: v4(),
              name: text,
              desc: description,
              startDate: date,
              endDate: endDate,
              time: time,
            },
            ...prev.todo.items,
          ],
        },
      };
    });

    setText("");
  };

  return (
    <div className="api-bg-container">
      <div className="App">
        <div>
          <div className="flex">
            <h2>Add New Item Here</h2>
            <li>
              <label>Item Name</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </li>
            <li>
              {" "}
              <label>Attachment</label>
              <input type="file" />
            </li>
            <li>
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </li>
            <h4>Defaut Section</h4>
            <li>
              <label>Status</label>
              <select>
                <option>Task Assign</option>
                <option>In Progress</option>
                <option>Completed</option>

              </select>
            </li>
            <li>
              <label>Start Date</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"
              />
            </li>
            <li>
              <label>End Date</label>
              <input
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
              />
            </li>
            <li>
              <label>Duration</label>
              <input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type="time"
              />
            </li>
            <button className="botn" onClick={addItem}>
              Add item
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <h3>{data.title}</h3>

                <Droppable droppableId={key}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                console.log(snapshot);
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                    <p className="desc">{el.desc}</p>
                                    <p className="date">
                                      Start-Date: {el.startDate} <br />{" "}
                                      End-Date:
                                      {el.endDate}
                                    </p>
                                    <p>Duration : {el.time} </p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <footer className="footer">
        <p className="footerText">
          Made by{" "}
          <a
            href="https://github.com/asish0sahu"
            rel="noopener noreferrer"
            target="_blank"
          >
            Asish kumar sahu{" "}
          </a>{" "}
          as an assignment given by Vendosmart.
        </p>
      </footer>
    </div>
  );
}

export default App;
