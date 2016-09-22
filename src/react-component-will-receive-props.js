var GLOBAL_EVENT_BUS = _.extend({}, Backbone.Events);

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

    getInitialState: function() {
        return {
            people: this.props.people
        };
    },
    
    componentWillMount: function() {
        /*
         * Will have access to props and state here
         * Can also set up hooks for event listener
         * to execute a callback
         */
        console.log("Parent - componentWillMount");

        GLOBAL_EVENT_BUS.on("receive:new:data", this.receiveNewData, this);
    },

    componentDidMount: function() {
        // will have access to dom element now
        console.log("Parent - componentDidMount");
    },

    componentWillReceiveProps: function(nextProps) {
        console.log("Parent - componentWillReceiveProps");
        console.log("current props: ", this.props);
        console.log("next props: ", nextProps);
    },

    render: function() {
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
        GLOBAL_EVENT_BUS.off("receive:new:data");
    },

    receiveNewData: function(data) {
        console.log("Receiving new data: ", data);
        this.setState({
            people: data
        });
    }
});

var Child = React.createClass({
    propTypes: {
        person: React.PropTypes.object.isRequired
    },

    render: function() {
        return (
            <li className="child">
                <p>The persons name is: {this.props.person.name}</p>
                <p>The persons age is: {this.props.person.age}</p>
            </li>
        );
    }
});

var app = document.getElementById("app");
// var mount1 = document.getElementById("mount1");
// var mount2 = document.getElementById("mount2");
var update = document.getElementById("update");
var unmount = document.getElementById("unmount");

var renderIntoApp = function(people) {
    var reactElement = <Parent people={people} />;
    return ReactDOM.render(reactElement, app);
};

var unmountReactComponentAtNode = function(domNode) {
    return ReactDOM.unmountComponentAtNode(domNode);
};

var component = null;
// var props1 = [
//     { name: "Dennis", age: 32 },
//     { name: "Willson", age: 31 }
// ];
// var props2 = [
//     { name: "Edwin", age: 30 },
//     { name: "Cheryl", age: 29 }
// ];

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

// mount1.addEventListener("click", function(e) {
//     var randomPeople = generateRandomPeople(4);
//     component = renderIntoApp(randomPeople);
// });
// 
// mount2.addEventListener("click", function(e) {
//     var randomPeople = generateRandomPeople(4);
//     component = renderIntoApp(randomPeople);
// });

unmount.addEventListener("click", function(e) {
    var success = unmountReactComponentAtNode(app);
    console.log("unmount success: ", success);

    component = null;
    initialUpdate = true;
});

var initialUpdate = true;

update.addEventListener("click", function(e) {
    if (initialUpdate) {
        var randomPeople = generateRandomPeople(4);
        component = renderIntoApp(randomPeople);
        initialUpdate = false;
    } else {
        var updateRandomPeople = generateRandomPeople(5);
        GLOBAL_EVENT_BUS.trigger("receive:new:data", updateRandomPeople);
    }
});
