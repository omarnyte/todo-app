import { AppWrapper, H1, HeadingWrapper } from './styles';
import ToDoList from '../ToDoList';

const App = () => {
  return (
    <AppWrapper className="App">
      <HeadingWrapper>
        <H1>Todo App</H1>
      </HeadingWrapper>

      <ToDoList />
    </AppWrapper>
  );
}

export default App;
