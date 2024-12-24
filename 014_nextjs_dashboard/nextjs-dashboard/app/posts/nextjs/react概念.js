//components 组件
//prop 道具
// state


// 用户界面分解为更小的构建块，简称wield组件

// 构建自包含 可重用的代码片段，称为乐高积木
// react 中,组件是函数

// 返回UI 元素的函数
<script type="text/jsx">
    const app = document.getElementById("app")

    function header(){
        
    }
    const root = ReactDOM.createRoot(app)

    {/* // 要将此组件渲染到 DOM，请将其作为 root.render（） 方法中的第一个参数传递： */}
    root.render(<h1>Develop. Preview. Ship.</h1>);

</script>

// 组件应该大写

function Header(){
    return <h1>Hello Dev</h1>
}
const root =ReactDOM.createRoot(app);
root.render(<Header />);
