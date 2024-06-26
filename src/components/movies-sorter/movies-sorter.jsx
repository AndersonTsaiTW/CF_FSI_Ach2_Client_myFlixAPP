import { setSortKey } from "../../redux/reducers/movies";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";

export const MoviesSorter = () => {
  const dispatch = useDispatch();

  // If the selector is default, don't set the sort value
  const handleSortChange = (key) => {
    if (key !== "default") {
      dispatch(setSortKey(key));
    }
  };

  return (
    <Form>
      <Form.Group controlId="sortMovies">
        <Form.Control 
        as="select" 
        onChange={(e) => handleSortChange(e.target.value)} 
        defaultValue="default"
        className="sort-select">
          <option value="default" disabled>Click here to sort</option>
          <option value="title">Title</option>
          <option value="releaseYear">Release Year</option>
          <option value="genre.Name">Genre</option>
          <option value="director.Name">Director</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
}