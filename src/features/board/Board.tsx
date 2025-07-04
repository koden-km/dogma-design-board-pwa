import { useComment, useTitle } from "./hooks";

export default function Board() {
  const title = useTitle();
  const comment = useComment();

  return (
    <div>
      <h1>{title}</h1>
      {comment && <p>{comment}</p>}
    </div>
  );
}
