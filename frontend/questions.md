1.  What is the difference between `Component` and `PureComponent`? Give
    an example where it might break my app.

    The difference is that a pure component implements the `shouldComponentUpdate` by default. The _`shouldComponentUpdate`_ helps to avoid unnecessary re-renders by shallow comparing if the props changed, which in turn can help with performance.

    In this way, a Component will re-render independently if its props have changed. In `PureComponent`, if there are no differences in the props, it will not re-render.

    I think `PureComponent` can cause problems when working with objects and other data structures. The function _`shouldComponentUpdate`_ performs a shallow comparison, so if the data in the object is still the same but the reference changed, it the component will re-render;

    I put together an example bellow (CodeSanbox [link](https://codesandbox.io/s/purecomponent-vs-component-4zofvj?file=/src/App.js))

        ```jsx
        import React, { PureComponent } from "react";

        class PersonName extends PureComponent {
          render() {
            return (
              <>
                <div>Rendering PersonName {Date.now()}</div>
                <div>{this.props.name}</div>
              </>
            );
          }
        }

        class Person extends PureComponent {
          render() {
            return (
              <>
                <div>Rendering Person {Date.now()}</div>
                <div>{this.props.name}</div>
              </>
            );
          }
        }

        // In the parent component
        class ParentComponent extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              person: { name: "Peter Parker" }
            };
          }

          componentDidMount() {
            setInterval(() => {
              // Modifying the person object
              const updatedPerson = { ...this.state.person };
              updatedPerson.name = "Peter Parker";

              this.setState({ person: updatedPerson });
            }, 2000);
          }

          render() {
            return (
              <>
                <div>App rendered at {Date.now()}</div>
        				 //re-renders on every interval even though the content is the same
                 //but the object refernce changed
                <PersonName person={this.state.person} />
        				 // won't re-render because the value is the same
                <Person name={this.state.person.name} />
              </>
            );
          }
        }

        export default function App() {
          return (
            <div className="App">
              <ParentComponent />
            </div>
          );
        }
        ```

2.  Context + ShouldComponentUpdate might be dangerous. Why is that?

    Because updates in the context can trigger a re-render, even thought the _`shouldComponentUpdate`_ returns `false`.

3.  Describe 3 ways to pass information from a component to its PARENT.

    1. Saving the information in a context provider which both parent and child share
    2. Passing the state setter to the children as a prop
    3. Not sure about the third way and I’m curious about it 🤔

4.  Give 2 ways to prevent components from re-rendering.

    You could:

    1. Memoize it using `React.memo()` . It’ll re-render only if the props changed. You can also implement a custom check;
    2. Move the state inside the component (_Colocation,_ the opposite of lifting state to the common parent). Only the component with a new state will re-render instead of all the sibling components if the new state was lifted to the common parent.

    **Bonus**: Let's say you have multiple components using the same context provider, but one only cares about the values there, while the other is solely responsible for updating the context. In that case, you can split the context provider into separate setter and getter components. Something like this:

    ```jsx
    const StateContext = React.createContext();
    const SetterContext = React.createContext();

    function ContextProvider({ children }) {
      const [state, setState] = React.useState();

      return (
        <StateContext.Provider value={state}>
          <SetterContext.Provider value={setState}>
            {children}
          </SetterContext.Provider>
        </StateContext.Provider>
      );
    }

    function useStateContext() {
      return React.useContext(StateContext);
    }

    function useSetterContext() {
      return React.useContext(SetterContext);
    }

    // doesn't re-render when value in context changes
    function Comp1() {
      const setState = useSetterContext();
      //	...
    }

    // re-renders
    // the re-render happens due to consuming the context,
    // and not because the component is a child <Context.Provider>
    function Comp2() {
      const state = useStateContext();
      //	...
    }
    ```

5.  What is a fragment and why do we need it? Give an example where it might
    break my app.

    It let us group components without needing a wrapper component. I'm not entirely sure how it could cause issues in the app. Maybe if you want to add a key prop to a fragment using the shorthand `<></>` syntax?

    Let's take an example where you have a list of items, each wrapped by `<></>`. In that case, if you plan to sort or reorder those components in the UI, you'd need a key prop. But don't worry! To tackle this, you can use `<Fragment />`, which conveniently allows you to specify the key prop.

6.  Give 3 examples of the HOC pattern.

    We could use HOC to enhance a component’s functionality and add things like:

    **Logger**: logs events for a given component

    ```jsx
    function withLogger(Component) {
      return class extends React.Component {
        componentDidMount() {
          console.log("I'm mounted");
        }
        render() {
          <Component {...this.props} />;
        }
      };
    }
    ```

    **Authentication**: The component conditionally renders content based on the user's authentication status

    ```jsx
    function withAuthentication(Component) {
      return class extends React.Component {
        render() {
          if (isAuthenticated) {
            return <Component {...this.props} />;
          }
          return <span>Please log in to see this component</span>;
        }
      };
    }
    ```

    **Styling**: applies styles

    ```jsx
    function withStyles(WrappedComponent) {
      return class extends React.Component {
        return <WrappedComponent {...this.props} className={`my-style ${this.props}`} />;
      };
    }
    ```

7.  What's the difference in handling exceptions in promises, callbacks
    and async...await?

    The main difference is the syntax and how the error is propagated.

    - Promises make us use then() and catch() to deal with things.
    - Callbacks make us handle the success and error right inside the callback.
    - But with async...await, we simply wrap the promise call in a try/catch block and catch the error in the catch section.

8.  How many arguments does setState take and why is it async.

    The _`setState`_ has 2 parameters:

    - The first one can be either an object or a function. If it's an object, React will use it right away as the new value. If it's a function, React will call that function and pass the previous state as a parameter. Whatever the function returns will become the new state.
    - The second parameter is optional and acts as a callback that gets executed after the state has been changed.

9.  List the steps needed to migrate a Class to Function Component.

    I honestly never had to do that but here’s what I would do:

    1. Create the function component;
    2. Copy the render function from the class to the function;
    3. Assess what is the state and the event handlers in the class component and migrate them properly;
    4. Replace all the lifecycles methods since they don’t work with function components and use the correct hook for that;

10. List a few ways styles can be used with components.

    The ways I’ve worked with were:

    - Inline styles: we pass the CSS properties directly to the `style` property of a node as an object. The catch here is that CSS properties with kebab case will need to be replaced to camel case;

      ```jsx
      function MyComponent() {
        const styles = {
          fontSize: "16px",
        };

        return <div style={styles}></div>;
      }
      ```

    - CSS modules: we import the styles from a separated CSS file and use the CSS classes in it.

      ```jsx
      import styles from "path-to-css-module";

      function Component() {
        return <h1 className={styles.header}>I'm a header</h1>;
      }
      ```

    I know there are other ways like CSS-in-JS libraries, but never had the chance to work with them.

11. How to render an HTML string coming from the server.

    Honestly, I've never had to use it in a project, but I can imagine it could be a bit sketchy from a security perspective. If I ever find myself in that situation, I'd probably first check if React has some handy built-in function to handle it and sanitize the string. Only after ensuring it's safe, I'd apply it to the `innerHTML` property of a node.

It was fun answering these questions 😊 I've noticed that most of the questions were about Class components. Are you in the process of switching from class components to functional components?
