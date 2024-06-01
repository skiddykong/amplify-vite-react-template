import { Authenticator, Fieldset, Flex, ThemeProvider } from '@aws-amplify/ui-react'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { TextAreaField } from '@aws-amplify/ui-react';
import { Menu, MenuItem, View, Divider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'
import Gallery from './gallery'

const client = generateClient<Schema>();

export const MenuItemsExample = () => {
  return (
    <View width="4rem">
      <Menu>
        <MenuItem onClick={() => alert('Download')}>Download</MenuItem>
        <MenuItem onClick={() => alert('Create a Copy')}>
          Create a Copy
        </MenuItem>
        <Divider />
        <MenuItem isDisabled onClick={() => alert('Delete')}>
          Delete
        </MenuItem>
      </Menu>
    </View>
  );
};

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <ThemeProvider>
      <Authenticator socialProviders={['google']}>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user?.username} Here are the todos</h1>
            <button onClick={createTodo}>+ new</button>
            <Gallery/>
            <ul>
              {todos.map((todo) => (
                <li
                  onClick={() => deleteTodo(todo.id)}
                  key={todo.id}>
                  {todo.content}
                </li>
              ))}
            </ul>
              <div>
                <Fieldset legend="Kitchen design">
                  <Flex direction="column">
                <TextAreaField
                  descriptiveText="Please enter a prompt for the kitchen you would like to see"
                  label="AI Prompt"
                  name="gen_ai_prompt"
                  placeholder="I would like a kitchen in the style of a modern farmhouse with a large island and a double oven."
                  rows={3} />
                <MenuItemsExample/>
                </Flex>
                </Fieldset>
              </div>
              <button onClick={signOut}>Sign out</button>
            </main>
          )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;

// userA   carpT1ckler
