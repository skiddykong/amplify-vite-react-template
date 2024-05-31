import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { TextAreaField } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

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
      <Authenticator socialProviders={['amazon', 'apple', 'facebook', 'google']}>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user?.username} Here are the todos</h1>
            <button onClick={createTodo}>+ new</button>
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
              <TextAreaField
                descriptiveText="Enter a valid last name"
                label="Last name"
                name="last_name"
                placeholder="Baggins"
                rows={3} />
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
