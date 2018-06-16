import React, { Component } from 'react';

export default function AsyncLoader(options: {
  loader: () => Promise<React.Component>;
  loading: React.Component;
}) {
  if (!options.loading) {
    throw new Error('AsyncLoader requires a `loading` component');
  }

  const opts = Object.assign(
    {
      loader: null,
      loading: null
    },
    options
  );

  return class Loadable extends Component<any, any> {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        component: null,
        error: null
      };
    }

    componentDidMount() {
      this._loader();
    }

    render() {
      const { loading, component, error } = this.state;

      if (loading || error) {
        return React.createElement(opts.loading, {
          error,
          isLoading: loading
        });
      } else if (component) {
        return React.createElement(component, this.props);
      } else {
        return null;
      }
    }

    /**
     * 处理import()返回的promise
     */
    _loader = async () => {
      try {
        const component = await opts.loader();
        this.setState({
          loading: false,
          component: component.default || component
        });
      } catch (error) {
        this.setState({
          error,
          loading: false
        });
        throw error;
      }
    };
  };
}
