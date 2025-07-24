import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Card.tsx";
import styles from "./Card.module.css";

describe("Card component", () => {
  it("should render with a given title", () => {
    render(<Card type="event" title="My Custom Event" />);
    expect(screen.getByText("My Custom Event")).toBeInTheDocument();
  });

  it("should render with a default title (uppercase type) if no title is provided", () => {
    render(<Card type="command" />);
    expect(screen.getByText("COMMAND")).toBeInTheDocument();
  });

  it("should render with a given sub title when provided", () => {
    render(
      <Card type="event" title="My Custom Event" subTitle="Some Domain" />
    );
    expect(screen.getByText("Some Domain")).toBeInTheDocument();
  });

  it("should render the comment when provided", () => {
    const commentText = "This is a test comment.";
    render(<Card type="process" comment={commentText} />);
    expect(screen.getByText(commentText)).toBeInTheDocument();
  });

  it("should not render the comment element if no comment is provided", () => {
    const { container } = render(<Card type="projection" />);

    // The title should be present
    expect(screen.getByText("PROJECTION")).toBeInTheDocument();

    // The comment div should not exist in the DOM
    const commentElement = container.querySelector(`.${styles.comment}`);
    expect(commentElement).not.toBeInTheDocument();
  });

  it("should apply the correct CSS classes for the given type", () => {
    const { container } = render(<Card type="aggregate" />);
    const cardElement = container.firstChild;

    expect(cardElement).toHaveClass(styles.card);
    expect(cardElement).toHaveClass(styles.aggregate);
  });

  it("should render with both a title and a comment", () => {
    const titleText = "My Aggregate";
    const commentText = "This is another test comment.";
    render(<Card type="aggregate" title={titleText} comment={commentText} />);

    expect(screen.getByText(titleText)).toBeInTheDocument();
    expect(screen.getByText(commentText)).toBeInTheDocument();
  });
});
