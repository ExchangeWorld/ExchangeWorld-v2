#Exwd-React
[![Travis][build-badge]][build]

Developement
-------------
####Install Modules
```
$ npm install
```

### Hot loading Server
```bash
$ npm start
```

### E2E Testing
```bash
$ npm install -g nightwatch
$ nightwatch #or
$ npm test
```

### Build
```bash
$ npm build
```
---

Coding Style
-----------
* [Using ES6 as best as you can.](https://github.com/airbnb/javascript)
* Use class extends React.Component unless you have a very good reason to __use mixins__.

	```javascript
	// bad
	const Listing = React.createClass({
	  render() {
	    return <div />;
	  }
	});
	
	// good
	class Listing extends React.Component {
	  render() {
	    return <div />;
	  }
	}	
	```

* Variable Naming
	
	```javascript
	// bad
	const reservationCard = require('./ReservationCard');
	
	// good
	const ReservationCard = require('./ReservationCard');
	
	// bad
	const ReservationItem = <ReservationCard />;
	
	// good
	const reservationItem = <ReservationCard />;
	```

* Always use double quotes (`"`) for JSX attributes, but single quotes for all other JS.
	
	```javascript
	// bad
	<Foo bar='bar' />
	
	// good
	<Foo bar="bar" />
	```
    
* Always use camelCase for prop names

    ```javascript
    // bad
    <Foo
      UserName="hello"
      phone_number={12345678}
    />

    // good
    <Foo
      userName="hello"
      phoneNumber={12345678}
    />
    ```
    
* Wrap JSX tags in parentheses when they span more than one line:
* 
	```javascript
    /// bad
    render() {
      return <MyComponent className="long body" foo="bar">
               <MyChild />
             </MyComponent>;
    }

    // good
    render() {
      return (
        <MyComponent className="long body" foo="bar">
          <MyChild />
        </MyComponent>
      );
    }

    // good, when single line
    render() {
      const body = <div>hello</div>;
      return <MyComponent>{body}</MyComponent>;
    }
    ```

* Always self-close tags that have no children.

	```javascript
    // bad
    <Foo className="stuff"></Foo>

    // good
    <Foo className="stuff" />
    ```

[build-badge]: https://travis-ci.com/seal789ie/ExchangeWorld-v2.svg?token=qCAo2Lko7uDx6pvX6Ha1&branch=develop&style=flat-square
[build]: https://travis-ci.com/seal789ie/ExchangeWorld-v2