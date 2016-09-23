var Parent = React.createClass({
    getInitialState: function() {
        return {
            people: []
        };
    },
    
    componentWillMount: function() {
        /*
         * This will only ever be called once because
         * the Parent component is mounted once
         * and React is smart enough to not
         * re-create this component instance.
         */
        console.log("Parent - componentWillMount");
        this.setState({
            people: generateRandomPeople(4)
        });
    },

    componentDidMount: function() {
        /*
         * Similar to componentWillMount, this is
         * called just once.
         */
        console.log("Parent - componentDidMount");
    },

    render: function() {
        /*
         * The way its currently configured, 
         * renderIntoApp gets called on every click
         * but the Parent component doesn't
         * get created every time. However,
         * a render is still executed for Parent
         * using it's state. However, state never gets
         * updated because componentWillMount
         * gets called only once. The Child component
         * will receive the state data every time
         * but since there's no change in the data,
         * nothing happens even though its
         * componentWillReceiveProps method is called.
         */
        console.log("Parent - render: state - ", this.state);
        var people = this.state.people.map(function(person) {
            return <Child person={person} key={person.name} />;
        });

        return (
            <div className="container">
                <ul className="parent">
                { people }
                </ul>
            </div>
        );
    },

    componentWillUnmount: function() {
        console.log("Parent - componentWillUnmount");
    }
});

var Child = React.createClass({
    propTypes: {
        person: React.PropTypes.object.isRequired
    },

    componentWillMount: function() {
        console.log("Child - componentWillMount");
    },

    componentDidMount: function() {
        console.log("Child - componentDidMount");
    },

    componentWillReceiveProps: function(nextProps) {
        /*
         * In the current scenario, this method
         * gets called
         */ 
        console.log("Child - componentWillReceiveProps", nextProps);
    },

    render: function() {
        return (
            <li className="child">
                <p>The persons name is: {this.props.person.name}</p>
                <p>The persons age is: {this.props.person.age}</p>
            </li>
        );
    },

    componentWillUnmount: function() {
        console.log("Child - componentWillUnmount");
    }
});

var app = document.getElementById("app");
var mount = document.getElementById("mount");
var unmount = document.getElementById("unmount");

var renderIntoApp = function() {
    /*
     * Even though a new react element is created,
     * when ReactDOM.render sees that the same
     * element type is being rendered onto the same DOM
     * element, it doesn't create a new component instance.
     * This means that the component will not mount again.
     * This is why my this.setState in the componentWillMount
     * method never gets called again even though I click
     * on the buttons.
     */
    var reactElement = <Parent />;
    return ReactDOM.render(reactElement, app);
};

var unmountReactComponentAtNode = function(domNode) {
    return ReactDOM.unmountComponentAtNode(domNode);
};

var component = null;

var generateRandomPerson = function() {
    return {
        name: Math.random().toString(36).substring(7),
        age: Math.floor(Math.random() * 100)
    };
};

var generateRandomPeople = function(numPeople) {
    var result = [];
    for (var i = 0; i < numPeople; i += 1) {
        result.push(generateRandomPerson());
    }
    return result;
};

mount.addEventListener("click", function(e) {
    component = renderIntoApp();
});

unmount.addEventListener("click", function(e) {
    var success = unmountReactComponentAtNode(app);
    console.log("unmount success: ", success);
});
