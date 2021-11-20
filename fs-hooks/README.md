# Some React Hooks！

> 在使用fs-hooks之前，请确保`react >= v16.8`，并且已配置好Antd UI

在日常业务开发中，提取并封装了一些实用hooks，用于提高工作效率。

### How to use

```js
npm install -g nrm //先安装源管理器，用于切换npm源
nrm add [repository alias] http://npm.dev.ft/  //添加公司内部npm源
nrm use [your repository alias]
cd your workspace...
yarn add fs-hooks //开始安装吧！
```



目前有如下hooks：

## usePagination

> 基于Antd.Table扩展的分页封装，以实现一行代码便完成分页

### 如何使用

```js
import React, { useEffect } from 'react'
import { Table } from 'antd'
import { usePagination } from 'fs-hooks'
import { infoPriceList } from '@/api'

const MyComponents = () => {
  const [initTable, pagingProps, setTableData] = usePagination(infoPriceList, { current: 'startPage', pageSize: 'pageSize' })
   const columns = [
       {
            title: '材料',
            dataIndex: 'Material',
            align: 'center',
       }
	     ...
  ]
   const searchParams = () => {
        return {
            Industry: '',
            ...
        }
  }
  const initLoad = () => {
      initTable(searchParams())
  }
  useEffect(() => {
      initLoad()
  }, [])

  return (
    ...
    <Table {...pagingProps} columns={columns} />
  )
}
export default MyComponents

```

只需声明此hooks，传入请求体，这里为了可以实现自定义分页字段（考虑到分页字段不能统一原因），提供了第二个参数，可根据自己的情况，配置相应的分页字段，**注意** ：若不传，则默认`current/pageSize`

关于请求体是什么？这是我定义的管理Api请求的方式，大致如下：

```js
export async function infoPriceList(params) {
    const res = await axios.get('MaterialSelectionPrice/InfoPriceTermManage/GetPagedList', { params })
    return res.data
}
...
```

那么如何完成初始化操作呢？从`usePagination`中提取了三个参数，分别有如下作用：

| Param        | Description                                                  | Type     |
| ------------ | ------------------------------------------------------------ | -------- |
| initTable    | 考虑到不同应用场景，将触发权交给开发者，只需调用传入参数即可，注意：每次调用，页数会重置为1（考虑到查询场景） | function |
| pagingProps  | 分页配置集合，实现切换分页、自定义跳转、改变页数等功能，包含了：loading、onChange、dataSource，pagination配置，可从中提取（pagingProps.loading） | function |
| setTableData | 有时也会考虑额外情况，提供出设置表格数据的方法               | function |



----



## useInterval

> 事件轮循，方便的控制轮循，提供一个灵活的轮循hooks，实现开始和暂停

### 如何使用

```js
import React, { useState } from 'react'
import { useInterval } from 'fs-hooks'

const MyComponents= () => {
   const [openInterval, setOpenInterval] = useState(false)
   const [deley, setDelay] = useState(1000)
    useInterval(
        ()=>{
            console.log('轮循中...');
        },
        openInterval ? deley : null
     )
}
export default MyComponents
```

如此我们就实现了一个灵活的interval，非常适合执行轮询任务，可通过控制变量实现：暂停、动态调整间隔时间。

无需担心事件销毁，useInterval会在组件卸载时自动clear。



---



## useEditableTree

> 基于Antd.Tree组件扩展的可编辑树，Tree组件本身不提供树操作，网上也没找到符合要求的组件，为了满足业务需求，扩展此功能，可以进行：无限级新增节点、删除节点、移动节点、重命名节点。

### 示例

![2020-12-03 15.16.03](https://tva1.sinaimg.cn/large/0081Kckwgy1glapclv5zig30na0q5u1d.gif)

### 约定说明

#### Tree数据结构

请按照以下形式组织数据：

```js
const treeData=[
  key:'1',
  title:'父菜单',
  children:[
  	key:'11',
  	title:'子菜单',
    children:[]
  ],
]
```

其实也就是`Antd.Tree组件`的约定格式，注意是区分大小写的。



#### 定义树样式

`useEditableTree`会向`Tree组件`内注入自定义内容，因此需配合样式：

```css
/*********************************
** Module : 自定义Tree可编辑
*********************************/
.treeEditMode {

    // 确认取消按钮（重命名、新增节点）
    .confirm_btns {
        display: flex;
        align-items: center;
        height: 24px;

        span {
            margin: 0 0px 0 10px;
            font-size: 22px;
            cursor: pointer;
            transition: color .2s;

            &:hover {
                color: #49C098
            }
        }
    }

    // 操作按钮
    .operation_btns {
        display: flex;
        align-items: center;
        height: 24px;

        span {
            font-size: 22px;
            margin: 0 6px;
            cursor: pointer;
        }
    }

    // 节点文字过长处理
    .ant-tree-node-content-wrapper {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: default;

        .node_title {
            transition: color .2s;
            cursor: pointer;
        }

        .operation_btns {
            display: none !important;

            span:hover {
                color: #49C098
            }
        }
    }

    // 选中节点时
    .ant-tree-node-content-wrapper.ant-tree-node-selected {
        background-color: transparent;

        .node_title {
            color: #49C098
        }

        .operation_btns {
            display: block !important;
        }
    }

    // 悬浮节点时
    .ant-tree-node-content-wrapper:hover {
        background-color: transparent;

        .node_title {
            color: #49C098
        }

        .operation_btns {
            display: block !important;
        }
    }
}
```

将此样式放入全局样式中，以达到覆盖Tree组件默认样式，同时你也可以改动这些样式以配合业务需求。



### 如何使用

> 这是一个完整示例，为了尽可能阐述清楚，代码会有点多

```js

import React, { useEffect } from 'react'
import { Tree,Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { addNewItem,deleteItem,renameItem,sortItem } from '@/api'
import { useEditableTree } from 'fs-hooks'

const MyComponents = () => {
    // 配置可编辑树
    const [treeProps, initTreeData] = useEditableTree({
        addConfirm,
        deleteConfirm,
        moveChange,
        renameConfirm,
        nodeIcons: {
            fontFamily: 'iconFont',  //字体图标的名字
            add: 'fcm-del',
            delete: 'fcm-shanchu',
            rename: 'fcm-zhongmingming',
            moveUp: 'fcm-sy',
            moveDown: 'fcm-xy',
            confirm: 'fcm-zhengque',
            cancel: 'fcm-cuowu1'
        },
    })
    //添加节点方法
    function addConfirm({ parentItem, name }) {
        return new Promise(async (resolve) => {
            const res = await addNewItem({
                Id: parentItem.key,
                Name: name
            })
            if (res.success) {
                //添加成功时，需返回新增的节点ID，如此才能形成良性循环，继续添加下一级
                resolve(res.data.Id) 
            }
        })
   }
  //删除节点方法
  function deleteConfirm({ currentItem }) {
        return new Promise(async (resolve) => {
            Modal.confirm({
                title: '确认要删除该节点吗',
                content: currentItem.titleText,
                icon: <ExclamationCircleOutlined style={{ color: '#e63032' }} />,
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk: async () => {
                    const params = {
                        Id: currentItem.key,
                    }
                    const res = await deleteItem(params)
                    if (res.success) {
                        //移动成功时，抛出true以让树继续操作
                        resolve(true)
                    }
                },
            })
        })
    }
	 //重命名节点方法
   function renameConfirm(currentItem) {
        return new Promise(async (resolve) => {
            const params = {
                Id: currentItem.key,
                Name: currentItem.titleText,
            }
            const res = await renameItem(params)
            if (res.success) {
                //移动成功时，抛出true以让树继续操作
                resolve(true)
            }
        })
    }
	 //移动节点方法
   function moveChange({afterList, parentItem}) {
        return new Promise(async (resolve) => {
            const childIds = afterList?.length ? afterList.map((i) => i.key) : []
            const params = {
                Id: parentItem.key,
                Ids: childIds, //变动后的数组ID集合
            }
            const res = await sortItem(params)
            if (res.success) {
                //移动成功时，抛出true以让树继续操作
                resolve(true)
            }
        })
    }
  const initLoad = () => {
    	const treeData = [
        {
          
        }
      ]
      initTreeData(treeData)
  }
  useEffect(() => {
      initLoad()
  }, [])

  return (
 		<Tree {...treeProps} />
  )
}
export default MyComponents

```

只需要简单配置相关的API，便可实现了树操作，无缝切换。

以上的回调方法处理仅供参考，具体请结合自己的请求处理方式，但有一点可以确定的是，`resolve(true)`若不返回，操作将会停止，useEditableTree会以这个结果来进行判断是否完成操作。



### API说明

从`useEditableTree`中提取了两个参数，作用分别如下：

| Param        | Description                                    | Type     |
| ------------ | ---------------------------------------------- | -------- |
| treeProps    | 树配置集合，包含了：树数据、展开配置、树配置等 | object   |
| initTreeData | 初始化Tree组件，传入数据                       | function |

调用时，需要传入你自己的处理方法，分别如下：

> PS：事件回调方法若不传，默认不显示任何操作按钮！

| Callback      | Description                                           | Type                                                         | Require |
| ------------- | ----------------------------------------------------- | ------------------------------------------------------------ | ------- |
| addConfirm    | 添加节点事件回调，<br />resolve(true)时添加成功       | function( { parentItem,name } )                              | false   |
| deleteConfirm | 删除节点事件回调，<br />resolve(true)时添加成功       | function( { currentItem,parentItem } )                       | false   |
| moveChange    | 上移、下移节点事件回调，<br />resolve(true)时添加成功 | function( { beforeList,afterList,currentItem,<br />parentItem,movePosition } ) | false   |
| renameConfirm | 重命名节点事件回调，<br />resolve(true)时添加成功     | function( currentItem, parentItem )                          | false   |
| nodeIcons     | 节点图标配置集合                                      | object({fontFamily,add,delete,rename,<br />moveUp,moveDown,confirm,cancel}) | false   |



### FAQ



##### 我只需要新增、删除、重命名怎么办？

操作按钮按方法的传入即可展示，所以不传入相关的方法，自然就不显示



##### 不配置icons，会怎么样？

如果不配置，默认以文字形式代替按钮：”添加、删除、上移、下移、重命名“，以及”确认“、”取消“



##### 回调方法使用函数表达式不起作用

这是因为函数表达式只有在运行时才被赋值，而hook声明在方法前面，所以不起作用。

而声明式函数存在函数提升，在一个作用域内全局有效。



##### 取消新增节点时，表单为什么会往左偏才会消失

这个目前考虑的是Antd的处理机制问题，从数据层上看，此节点在JSON中已被移除，但在触发Tree组件在数据更新时，Antd先是取消了层级关系，造成了结构塌陷，然后React对比差异，移除了节点，所以造成了偏移一下才会消失，此问题后续有待优化。