# Basin React Hook

A simple React hook for handling Basin AJAX forms.

## Installation

Install the package:

```sh
npm i -D @esquiredigital/use-basin
```

**Note**: a React version above 16.8.3 must be installed as a peer dependency.

## Usage

Create a form that will submit to Basin using AJAX:

```js
import useBasin from '@esquiredigital/use-basin';

const Form = () => {
  const [state, submit] = useBasin('<form-id>');
  return <form onSubmit={submit}>{/*  inputs... */}</form>;
};
```

You can also create your own onSubmit handlers for custom error checking or other functionality:

```js
const onSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  console.log(data.get('name'));
  // Be sure to call the submit function to actually
  // submit the form.
  submit(e);
};
```

You can also use the returned state object for loaders and error handling:

```js
import useBasin from '@esquiredigital/use-basin';

const Form = () => {
  const [{ pending, error, submitted }, submit] = useBasin('<form-id>');
  if (pending) return <div>Submitting...</div>;
  if (error) return <div>Something went wrong =(</div>;
  if (submitted) return <div>Thanks for submitting our form!</div>;
  return;
  <form onSubmit={submit}>{/*  inputs... */}</form>;
};
```

## State Variables

The following variables are returned in an object as the first value in the array:

| Name      | Description                                                          | Type      |
| --------- | -------------------------------------------------------------------- | --------- |
| Submitted | A flag indicating whether or not the form has been submitted.        | `boolean` |
| Pending   | A flag indicating that a POST request has started but not completed. | `boolean` |
| Error     | A flag that the most recent POST request failed.                     | `boolean` |
