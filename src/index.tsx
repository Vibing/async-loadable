import * as React from 'react';

interface IOptions {
  component: () => Promise<any>;
  loading?: (props: any) => React.ComponentElement<any, any>;
}
export default function AsyncLoader(options: IOptions) {
  const opts = {
    ...{
      component: null,
      loading: null
    },
    ...options
  };

  return class Loadable extends React.Component<any, any> {
    constructor(props: any) {
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

      if ((loading || error) && opts.loading) {
        //loading component
        return React.createElement(opts.loading, {
          error,
          isLoading: loading
        });
      } else if (component) {
        //normal
        return React.createElement(component, this.props);
      }
      return null;
    }

    /**
     * 处理import()
     */
    _loader = async () => {
      try {
        const c = await opts.component();
        this.setState({
          loading: false,
          component: c.default || c
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
