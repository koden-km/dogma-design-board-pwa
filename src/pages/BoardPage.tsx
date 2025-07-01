import Card from "../features/card/Card.tsx";
import Toolbar from "../features/toolbar/Toolbar.tsx";

export default function BoardPage() {
  return (
    <div>
      <div>Board Page</div>

      <div>
        <Card type="event" comment="Some event comment" />
        <Card type="command" />
        <Card type="aggregate" title="Thing" comment="Some event comment" />
        <Card
          type="process"
          title="Some Process"
          comment="What happens when the comment is extra long, because sometimes that will be useful for adding context to the card. The long comment could have multiple sentences and just be king of chunky in general."
        />
        <Card
          type="process"
          title="Some Other Process With A Longer Name and Long Comment"
          comment="What happens when the comment is extra long, because sometimes that will be useful for adding context to the card. The long comment could have multiple sentences and just be king of chunky in general."
        />
        <Card
          type="projection"
          title="A Projection With a Really Long Name For Testing Purposes"
          comment="Some event comment"
        />

        <Toolbar />
      </div>
    </div>
  );
}
