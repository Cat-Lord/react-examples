# React router
In this project I play around with some react router. I followed the [official tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial), so most of the notes here are just rephrased from there. 

# Routing basics
Routing is split into two parts:
- routing that redirects to elements
- Link that trigger redirection

Therefore we need to have an element that contains Links to other pages and an element that redirects based on the routes.

> Redirection
> ```jsx
> ReactDOM.render(
>   <BrowserRouter>
>     <Routes>
>       <Route path="/" element={<App />}/>
>       <Route path="cats" element={<Cats />}/>
>       <Route path="shelters" element={<Shelters />}/>
>     </Routes>
>   </BrowserRouter>,
>   document.getElementById("root")
> );
> ```

> Links
> ```jsx
> export const Navigation = () => {
>   return (
>     <React.Fragment>
>       <h2>Nav</h2>
>       <nav
>         style={{
>           borderBottom: "solid 1px",
>           paddingBottom: "1rem",
>       }}
>       >
>         <Link to="/cats">The beloved Cats</Link> |{" "}
>         <Link to="/shelters">Cat Shelters to visit</Link>
>       </nav>
>     </React.Fragment>
>   );
> }
> ```

Nesting the routes is also possible and this way we achieve a nice "redirection" effect here paths get appended. The level of nesting is arbitrary and paths get appended along the way. We can have for example three levels and our final path could look like this: `/shelters/funding/about`.

To allow correct rendering of such nested elements one should ensure that the parent element contains a simple `<Outlet />` tag. This tag represents a parent so that react router can render the child element inside of it.

In case we want to navigate to dynamic content, we can use string interpolation and create Links as needed:

```jsx
  ...
  <Link 
    to = { `cats/${catsList.id}` }
  >
  ...
```

But we have to be careful - when a page is missing, we would get an error. To avoid that, we can specify a route that navigates to an error page in case we didn't find a page.

```jsx
  ...
    <Routes>
      <Route path="/" element={<App />}>
      <Route path="cats" element={<Cats />}/>
      <Route path="shelters" element={<Shelters />}/>

      <Route path='*' element={<NavigationError />} />    // this shows the error

    </Route>
  ...
```

## Parameters
When handling parameters we have a `useParams()` hook available as well as other neat features.

### useParams
With this hook we obtain the URL parameters. We can simply use the result as an object with parameters as values. Simply having a url like `localhost:3000/cat/521` and expecting the number 521 to be represented as `catId` we can do:

```js
export function CatComponent() {
  const params = useParams();
  console.log(`Cat ID is: ${params.catId}`)
  ...
}
```

### useSearchParams
This hooks allows us to handle parameters with values (for example `?query=My%20Cat`). We can use it like `useState` hook and use arbitrary parameters as we need.

```jsx
...
  const [params, setParams] = useSearchParams();
  params.get('query')                   // getting the parameter value
  setParams({'query': 'cats are love'})  //  setting of parameters
...
```

Navigation resets the parameters with routing. To keep this information we can use `useLocation` hook that will give us the search parameters back if needed. Location has various information about the URL content. So when navigating away we can re-set the search parameters.

> Location Example:
> ```js
> {
>   pathname: "/shelters",
>   search: "?filter=sa",
>   hash: "",
>   state: null,
>   key: "ae4cz2j"
> }
```

```tsx
  export const QueryNavLink = (props: NavLinkProps & React.RefAttributes<HTMLAnchorElement>) : JSX.Element =>  {
    const { to, ...otherProps } = props
    
    const location = useLocation();   // get the search parameters

    return <NavLink to={to + location.search} { ... otherProps } />
  }
```