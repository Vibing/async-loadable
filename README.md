> 使用一个简单的方式来获取动态导入的组件

对于一个 React 项目来说，代码拆分（Code Splitting）非常重要，绝大多数项目使用**基于路由**的动态拆分，但这样会造成一个问题：**代码浪费**

比如一个 Tab 切换功能，如果用户只看第一个 Tab 里的内容，没有去点击其他 Tab，则会造成代码浪费，而我们的项目中，类似这样的情况非常多。

## 介绍

我们在使用 React 开发项目时，使用 webpack 的`import()`方法做代码拆分（Code Splitting）来提高项目性能。

但`import()`方法获取组件并不方便，我们更想要一种简单的方式来获取组件，比如：

```js
const MyComponent = getComponent('./my-component');

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
  loading: Loading
});

export default class Home extends Component {
  render() {
    return <MyComponent />;
  }
}
```

`Loading`是在组件加载完毕之前的一个过渡组件。

如果加载的组件过多，建议可以封装成一个简单方法来解决这个问题：

```js
import AsyncLoadable from 'async-loadable';
import Loading from './loding-component';

const getComponent = path =>
  AsyncLoadable({
    loader: () => import(`${path}`),
    loading: Loading
  });

const Component1 = getComponent('./component1');
const Component2 = getComponent('./component2');
const Component3 = getComponent('./component3');
```
