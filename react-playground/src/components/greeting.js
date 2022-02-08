// Conditional rendering

function UserGreeting() {
    return <h2>Welcome, user !</h2>
}

function GuestGreeting() {
    return <h2>Hi, Annonymous.</h2>
}

export default function Greeting(props) {
    if (props.loggedIn)
        return <UserGreeting />;
        
    return <GuestGreeting />;
}