import { render, screen } from "@testing-library/react";
import TaskBlock from "./TaskBlock";
import { Task } from "./fixture";

const task = Task;

describe("TaskBlock", () => {
  test("TaskBlockにタスクID、タスク名、タスクの経過時間、期限が表示されていること", () => {
    render(<TaskBlock task={task} />);
    expect(screen.getByText("TaskId:1")).toBeInTheDocument();
    expect(screen.getByText("TaskName:Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("経過時間：00:00:00")).toBeInTheDocument();
    expect(screen.getByText("期限：なし")).toBeInTheDocument();
  });
});