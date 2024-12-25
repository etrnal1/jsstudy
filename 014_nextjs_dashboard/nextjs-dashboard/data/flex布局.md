---
title: flex元数据
date: '2024-12-25 10:04:00'
---
以下是一些关于 CSS flexbox（弹性盒子）的知识点，分为基础和进阶内容：

## 基础知识点

	1.	Flex 容器和子项
	    设置父容器的 display: flex，子项就会变成弹性盒子子项。
	    flex 布局是一维布局，可水平或垂直排列子项。
	2.	主轴和交叉轴
		主轴：定义子项排列的方向，默认是水平从左到右。
		交叉轴：垂直于主轴。
	3.	主轴方向属性
		flex-direction：设置主轴方向。
		row（默认值）：子项水平排列。
		row-reverse：子项水平反向排列。
		column：子项垂直排列。
		column-reverse：子项垂直反向排列。
	4.	子项换行
		flex-wrap：设置是否换行。
		nowrap（默认值）：不换行。
		wrap：换行，超过父容器宽度时换到下一行。
		wrap-reverse：反向换行。
	5.	主轴对齐
	•	justify-content：子项在主轴上的对齐方式。
	•	flex-start（默认值）：子项靠主轴起点对齐。
	•	flex-end：子项靠主轴终点对齐。
	•	center：子项在主轴上居中对齐。
	•	space-between：子项两端对齐，间距平分。
	•	space-around：每个子项两侧间距相等。
	6.	交叉轴对齐
	•	align-items：设置子项在交叉轴上的对齐方式。
	•	stretch（默认值）：子项拉伸以填满容器。
	•	flex-start：子项靠交叉轴起点对齐。
	•	flex-end：子项靠交叉轴终点对齐。
	•	center：子项在交叉轴上居中对齐。
	•	baseline：子项的文本基线对齐。
	7.	多行对齐
	•	align-content：设置多行（换行后）的对齐方式，仅在 flex-wrap 为 wrap 时有效。
	•	flex-start：靠交叉轴起点对齐。
	•	flex-end：靠交叉轴终点对齐。
	•	center：在交叉轴上居中。
	•	space-between：行间间距平分。
	•	space-around：行的两侧间距相等。
	•	stretch（默认值）：行填满交叉轴。

## 进阶知识点

	1.	子项弹性分配
	•	flex：是子项的简写属性，控制子项的伸缩和初始大小。
	•	flex-grow：子项放大的比例，默认 0。
	•	flex-shrink：子项缩小的比例，默认 1。
	•	flex-basis：子项的初始大小，默认 auto。
	2.	单独调整子项对齐
	•	align-self：单独设置某个子项在交叉轴上的对齐方式（覆盖 align-items）。
	•	值与 align-items 相同。
	3.	默认排列顺序
	•	order：设置子项的排列顺序，默认值为 0，数值越小，排列越靠前。
	4.	等分布局
	•	使用 flex: 1，可以轻松实现子项的等宽（或等高）分布。
	5.	嵌套弹性盒子
	•	子项可以继续设置 display: flex，形成嵌套布局，灵活实现复杂页面结构。
	6.	兼容性注意
	•	某些旧版浏览器可能需要使用带有厂商前缀的 -webkit-flex。

## 常见用途
	1.	居中对齐

display: flex;
justify-content: center;
align-items: center;


## 	2.	响应式布局
	•	使用 flex-wrap 和 flex-basis，根据屏幕宽度自动调整子项排列。
	3.	导航条布局
	•	利用 justify-content: space-between 实现导航条两端对齐。

希望这份知识点清单能帮你快速掌握 Flexbox！