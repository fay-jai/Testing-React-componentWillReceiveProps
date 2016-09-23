var Parent = React.createClass({
    propTypes: {
        people: React.PropTypes.array.isRequired
    },

    getDefaultProps: function() {
        console.log("Parent - getDefaultProps");
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
    },

    componentDidMount: function() {
        /*
         * Similar to componentWillMount, this is
         * called just once.
         */
        console.log("Parent - componentDidMount");
    },

    componentWillReceiveProps: function(nextProps) {
        /*
         * This will be called every time.
         */
        console.log("Parent - componentWillReceiveProps", nextProps);
    },

    render: function() {
        var people = this.props.people.map(function(person) {
            /*
             * Because the Child component is not the one being
             * mounted onto the DOM by ReactDOM, it will re-create
             * a new Child component each time the Parent render
             * is called.
             */
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
         * This componentWillReceiveProps never gets called
         * because this component always gets re-created
         * from the Parent render function.
         * By definition, componentWillReceiveProps
         * never gets called on the first render (and
         * the way its currently set up, each render
         * is the first render of Child).
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

var renderIntoApp = function(people) {
    var reactElement = <Parent people={people} />;
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
    var randomPeople = generateRandomPeople(4);
    component = renderIntoApp(randomPeople);
});

unmount.addEventListener("click", function(e) {
    var success = unmountReactComponentAtNode(app);
    console.log("unmount success: ", success);
});
