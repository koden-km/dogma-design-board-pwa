import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, type Mock } from "vitest";
import * as boardHooks from "@/features/board/hooks";
import cardStyles from "@/features/card/Card.module.css";
import ToolButton from "./ToolButton";
import styles from "../Toolbar.module.css";

// Mock the hooks module
vi.mock("@/features/board/hooks");

const useSwitchToolMock = boardHooks.useSwitchTool as Mock;
const useIsCurrentToolMock = boardHooks.useIsCurrentTool as Mock;

const switchToolFn = vi.fn();

describe("ToolButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default mock implementations for the hooks
    useSwitchToolMock.mockReturnValue(switchToolFn);
    useIsCurrentToolMock.mockReturnValue(false);
  });

  it("should render a button with the tool name in uppercase", () => {
    render(<ToolButton tool="pointer" />);
    const button = screen.getByRole("button", { name: "POINTER" });
    expect(button).toBeInTheDocument();
  });

  it("should render children when provided", () => {
    render(
      <ToolButton tool="pointer">
        <span>Child Content</span>
      </ToolButton>
    );
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("should call switchTool when the button is clicked", () => {
    render(<ToolButton tool="pointer" />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(switchToolFn).toHaveBeenCalledTimes(1);
  });

  it("should apply currentTool class when it is the current tool", () => {
    useIsCurrentToolMock.mockReturnValue(true);
    render(<ToolButton tool="pointer" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(styles.currentTool);
  });

  it("should not apply currentTool class when it is not the current tool", () => {
    render(<ToolButton tool="pointer" />);
    const button = screen.getByRole("button");
    expect(button).not.toHaveClass(styles.currentTool);
  });

  it("should apply card-specific style and not generic style when isCard is true", () => {
    const tool = "event";
    render(<ToolButton tool={tool} isCard />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(cardStyles[tool]);
    expect(button).not.toHaveClass(styles.isGenericTool);
  });

  it("should apply generic style when isCard is not provided", () => {
    render(<ToolButton tool="pointer" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(styles.isGenericTool);
  });
});
