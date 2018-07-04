> 使用一个简单的方式来获取动态导入的组件

对于一个 React 项目来说，代码拆分（Code Splitting）非常重要，绝大多数项目使用**基于路由**的动态拆分，但这样会造成一个问题：**代码浪费**

例如 Tab 切换，如果用户只看第一个 Tab 里的内容，没有去点击其他 Tab，则会造成代码浪费，而我们的项目中，类似这样的情况非常多。

我们想通过一种简单的方式来解决这个问题，所以就有了`async-loadable`

## Introduction

我们在使用 React 开发项目时，使用 webpack 的`import()`方法做代码拆分（Code Splitting）来提高项目性能。

但`import()`方法获取组件并不方便，我们更想要一种简单的方式来获取组件，比如：

```js
const MyComponent = getComponent({
    component: import('./my-component')
});

render() {
    return <MyComponent/>
}
```

## Install

```shell
npm install async-loadable
#或
yarn add async-loadable
```

## Usage

```js
import AsyncLoadable from 'async-loadable';
import Loading from './loding-component';

const MyComponent = AsyncLoadable({
  loader: () => import(`./my-component`),
  loading: props => <Loading {...props} />
});

export default class Home extends Component {
  render() {
    return <MyComponent />;
  }
}
```

async-loadable 建议提供一个 loading 组件来过渡，它是一个方法，参数 `props`中包含 error 和 loading 状态。

所有通过用户操作展现的 UI（例如弹框、Tab 切换）都应该按需加载。
