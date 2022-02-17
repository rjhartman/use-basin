import { useState } from 'react';
import React = require('react');

interface BasinState {
  submitted: boolean;
  pending: boolean;
  error: boolean;
}

/**
 * React hook to submit to Basin forms via AJAX.
 *
 *
 * @param id       The Basin form ID
 * @returns        The state of the form, and the submit function.
 *
 * @example
 * import useBasin from 'use-basin'
 * const [state, submit] = useBasin("<basin form id>");
 * return (
 *   <form
 *     onSubmit={(e) => {
 *       e.preventDefault();
 *       submit(e);
 *     }}
 *   ></form>
 * );
 */
function useBasin(id: string): [BasinState, React.FormEventHandler<HTMLFormElement>] {
  if (!id) throw new Error(`Argument 'id' is required. Please provide a Basin Forms ID.`);

  const [state, setState] = useState<BasinState>({
    submitted: false,
    pending: false,
    error: false,
  });

  const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setState({
      submitted: false,
      pending: true,
      error: false,
    });

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const headers = new Headers({
      Accept: 'application/json',
    });

    const options = {
      method: 'POST',
      body: data,
      headers,
    };

    const response = await fetch('https://usebasin.com/f/' + id, options);

    setState({
      submitted: response.ok,
      error: !response.ok,
      pending: false,
    });

    return !response.ok;
  };

  return [state, submit];
}

export default useBasin;
