"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function AsyncLoader(options) {
    const opts = Object.assign({
        component: null,
        loading: null
    }, options);
    return class Loadable extends React.Component {
        constructor(props) {
            super(props);
            /**
             * 处理import()
             */
            this._loader = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const c = yield opts.component();
                    this.setState({
                        loading: false,
                        component: c.default || c
                    });
                }
                catch (error) {
                    this.setState({
                        error,
                        loading: false
                    });
                    throw error;
                }
            });
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
            }
            else if (component) {
                //normal
                return React.createElement(component, this.props);
            }
            return null;
        }
    };
}
exports.default = AsyncLoader;
