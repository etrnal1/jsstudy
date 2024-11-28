# 创建空文件夹
    mkdir 013_netxtjs
# 配置next js npm 环境
    npm install react@latest react-dom@latest next@latest
## 查看package.json  安装了 next、react 和 react-dom 包，就可以开始了
    {
        "dependencies": {
            "next": "^15.0.3",
            "react": "^18.3.1",
            "react-dom": "^18.3.1"
        }
    }   

## 创建index.js     

## 创建App 文件夹

    将index.js 移动到App 文件夹内


## 将package.json 添加script 模块

## 服务端和客户端组件

    客户端是指用户设备上向服务器发送应用程序代码请求的浏览器。然后，它将从服务器接收到的响应转换为用户可以与之交互的接口。

    服务器是指数据中心中的计算机，用于存储您的应用程序代码、接收来自客户端的请求、执行一些计算并发回适当的响应。

    每个环境都有自己的一组功能和约束。例如，通过将渲染和数据提取移动到服务器，可以减少发送到客户端的代码量，从而提高应用程序的性能。但是，正如您之前所了解的，要使 UI 具有交互性，您需要在客户端上更新 DOM。

    因此，您为 Server 和 Client 端编写的代码并不总是相同的。某些操作（例如，数据获取或管理用户状态）更适合一种环境，而不是另一种环境。

正如您在上一章中学到的那样，Next.js 默认使用 Server Components - 这是为了提高应用程序的性能，并且意味着您不必采取额外的步骤来采用它们。

## next js 构建仪表盘 

    nodejs 安装18,18 ,操作系统位macOS Windows(WSL) 或Linux

    