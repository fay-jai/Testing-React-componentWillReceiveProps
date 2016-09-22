var Parent = React.createClass({
    propTypes: {
        people: React.PropTypes.array.isRequired
    },
    
    componentWillReceiveProps: function(nextProps) {
        console.log("current props: ", this.props);
        console.log("next props: ", nextProps);
    },

    render: function() {
        var people = this.props.people.map(function(person) {
            return <Child person={person} key={person.name} />;
        });

        return (
            <div className="container">
                <ul className="parent">
                { people }
                </ul>
            </div>
        );
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
var mount1 = document.getElementById("mount1");
var mount2 = document.getElementById("mount2");
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

mount1.addEventListener("click", function(e) {
    var randomPeople = generateRandomPeople(4);
    component = renderIntoApp(randomPeople);
});

mount2.addEventListener("click", function(e) {
    var randomPeople = generateRandomPeople(4);
    component = renderIntoApp(randomPeople);
});

unmount.addEventListener("click", function(e) {
    var success = unmountReactComponentAtNode(app);
    console.log("unmount success: ", success);
});
