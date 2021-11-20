import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, Tooltip } from 'antd'
function randomID() {
    var d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now()
    }
    var uuid = 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
}
const treeStyles = {
    nodeLayout: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    nodeMaxWidth: {
        flex: 1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    addFormLayout: {
        display: 'flex',
        alignItems: 'flex-start',
        lineHeight: 1,
    },
}
/*********************************
 ** Module : 可编辑树形结构
 ** Desc : 基于Antd Tree组件
 ** Date : 2020-09-24
 *********************************/
export default function useEditableTree({ addConfirm, deleteConfirm, moveChange, renameConfirm, nodeIcons = {} }) {
    const [form] = Form.useForm()
    const expandedKeysRef = useRef([])
    const parentKey = useRef()
    const currentKey = useRef()
    const treeDataRef = useRef()
    const oldTitleRef = useRef()
    const [expandedKeys, setExpandedKeys] = useState()
    const [selectedKeys, setSelectedKeys] = useState()
    const [treeData, setTreeData] = useState([])
    const treeProps = {
        expandedKeys,
        selectedKeys,
        treeData,
        showLine: { showLeafIcon: false },
        className: 'treeEditMode',
        blockNode: true,
        showIcon: true,
        onExpand: (value) => {
            setExpandedKeys(value)
        },
        onSelect: (value, e) => {
            if (e.selectedNodes[0]?.isConfirm === '0000') return
            value?.length && setSelectedKeys(value)
        },
    }
    /***************************************
     ** Module: 添加节点内容 | Date: 2020-09-17
     ***************************************/
    const newNodeContent = (parentItem) => (
        <div style={treeStyles.addFormLayout}>
            <div style={{ width: '85%' }}>
                <Form size="small" form={form}>
                    <Form.Item style={{ marginBottom: 0 }} validateFirst>
                        <Form.Item name='name' noStyle validateFirst rules={[{ required: true, message: '请输入' }]}>
                            <Input placeholder="请输入" style={{ fontSize: '13px', width: '100%' }} />
                        </Form.Item>
                    </Form.Item>
                </Form>
            </div>
            <div className="confirm_btns">
                <span onClick={() => addIsConfirm(parentItem)} className={`${nodeIcons.fontFamily} ${nodeIcons.confirm}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                    {!nodeIcons.confirm && '确认'}
                </span>
                <span onClick={() => onDelete(currentKey.current)} className={`${nodeIcons.fontFamily} ${nodeIcons.cancel}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                    {!nodeIcons.cancel && '取消'}
                </span>
            </div>
        </div>
    )

    /***************************************
     ** Module: 重命名节点 | Date: 2020-09-17
     ***************************************/
    const newRenameNode = (currentItem, parentItem) => {
        return (
            <div style={treeStyles.addFormLayout}>
                <div style={{ width: '85%' }}>
                    <Input size="small" value={currentItem.titleText} onChange={(e) => onChangeName(e, currentItem.key)} placeholder="请输入" style={{ fontSize: '13px', width: '100%' }} />
                </div>
                <div className="confirm_btns">
                    <span onClick={() => renameIsConfirm(currentItem, parentItem)} className={`${nodeIcons.fontFamily} ${nodeIcons.confirm}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                        {!nodeIcons.confirm && '确认'}
                    </span>
                    <span onClick={(e) => onRecovery(e, currentItem.key, oldTitleRef.current)} className={`${nodeIcons.fontFamily} ${nodeIcons.cancel}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                        {!nodeIcons.cancel && '取消'}
                    </span>
                </div>
            </div>
        )
    }

    /***************************************
     ** Module: 节点标题内容 | Date: 2020-09-17
     ***************************************/
    const nodeTitleContent = (currentItem, parentItem) => (
        <div style={treeStyles.nodeLayout}>
            <div className="node_title" style={treeStyles.nodeMaxWidth}>
                {currentItem.titleText}
            </div>
            {currentItem.key ? (
                <div className="operation_btns">
                    {
                        addConfirm && (<Tooltip placement="top" title="新增">
                            <span onClick={(e) => onAdd(e, currentItem.key)} className={`${nodeIcons.fontFamily} ${nodeIcons.add}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                                {!nodeIcons.add && '添加'}
                            </span>
                        </Tooltip>)
                    }
                    {
                        deleteConfirm && (
                            <Tooltip placement="top" title="删除">
                                <span onClick={(e) => deleteIsConfirm(e, currentItem, parentItem)} className={`${nodeIcons.fontFamily} ${nodeIcons.delete}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                                    {!nodeIcons.delete && '删除'}
                                </span>
                            </Tooltip>
                        )
                    }
                    {
                        moveChange && (
                            <>
                                <Tooltip placement="top" title="上移">
                                    <span onClick={(e) => onMove(e, currentItem, 'up', parentItem)} className={`${nodeIcons.fontFamily} ${nodeIcons.moveUp}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                                        {!nodeIcons.moveUp && '上移'}
                                    </span>
                                </Tooltip>
                                <Tooltip placement="top" title="下移">
                                    <span onClick={(e) => onMove(e, currentItem, 'down', parentItem)} className={`${nodeIcons.fontFamily} ${nodeIcons.moveDown}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                                        {!nodeIcons.moveDown && '下移'}
                                    </span>
                                </Tooltip>
                            </>
                        )
                    }
                    {
                        renameConfirm && (
                            <Tooltip placement="top" title="重命名">
                                <span onClick={(e) => onRename(e, currentItem)} className={`${nodeIcons.fontFamily} ${nodeIcons.rename}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                                    {!nodeIcons.rename && '重命名'}
                                </span>
                            </Tooltip>
                        )
                    }
                </div>
            ) : (
                    <div className="operation_btns">
                        {
                            addConfirm && (<Tooltip placement="top" title="新增">
                                <span onClick={(e) => onAdd(e, currentItem.key)} className={`${nodeIcons.fontFamily} ${nodeIcons.add}`} style={{ fontSize: !nodeIcons.fontFamily ? '12px' : '' }}>
                                    {!nodeIcons.add && '添加'}
                                </span>
                            </Tooltip>)
                        }
                    </div>
                )}
        </div>
    )

    /***************************************
     ** Module: 重置未确认的节点输入框 | Date: 2020-09-17
     ***************************************/
    const resetNode = (data) =>
        data.map((item, index) => {
            if (item.isConfirm === '0000') {
                return data.splice(index, 1)
            } else {
                item.children?.length && resetNode(item.children)
            }
        })
    /***************************************
     ** Module: 删除节点 | Date: 2020-09-17
     ***************************************/
    const onDelete = (key) => {
        let Data = [...treeDataRef.current]
        const fn = (data, parent, parentKey) =>
            data.map((item, index) => {
                if (item.key === key) {
                    // let parentId = parentKey ? parentKey : data[index].key
                    // let parentItem = parent ? parent : []
                    // console.log(parentId, parentItem)
                    return data.splice(index, 1)
                    // parent.children=[]
                } else {
                    item.children?.length && fn(item.children, item, item.key)
                }
            })
        fn(Data)
        setTimeout(() => {
            setTreeData(Data)
        }, 100)
    }
    /***************************************
     ** Module: 重命名节点设置 | Date: 2020-09-17
     ***************************************/
    const onRename = (e, { key, titleText }) => {
        e && e.stopPropagation()
        let Data = [...treeDataRef.current]
        oldTitleRef.current = titleText
        const fn = (data, parent) =>
            data.map((item) => {
                if (item.key === key) {
                    return item.title = newRenameNode(item, parent)
                } else {
                    item.children?.length && fn(item.children, item)
                }
            })
        fn(Data)
        setTreeData(Data)
    }
    /***************************************
     ** Module: 节点恢复 | Date: 2020-09-17
     ***************************************/
    const onRecovery = (e, key, titleValue, responseKey) => {
        e && e.stopPropagation()
        let Data = [...treeDataRef.current]
        const fn = (data) =>
            data.map((item, parent) => {
                if (item.key === key) {
                    item.titleText = titleValue
                    item.title = nodeTitleContent(item, parent)
                    // 新增时，获取接口返回的新id
                    if (responseKey) {
                        item.key = responseKey
                        // 恢复后，消除flag，实现继续添加
                        if (item.isConfirm === '0000') {
                            item.isConfirm = '1111'
                        }
                    } else if (responseKey === false) {
                        console.warn('缺失新节点key')
                    }
                    return
                } else {
                    item.children?.length && fn(item.children, item)
                }
            })
        fn(Data)
        setTreeData(Data)
    }
    /***************************************
     ** Module: 重命名输入赋值操作 | Date: 2020-09-17
     ***************************************/
    const onChangeName = (e, key) => {
        const value = e.target.value
        let Data = [...treeDataRef.current]
        const fn = (key, value, data, parent) =>
            data.map((item) => {
                if (item.key === key) {
                    item.titleText = value
                    item.title = newRenameNode(item, parent)
                    return
                } else {
                    item.children?.length && fn(key, value, item.children, item)
                }
            })
        fn(key, value, Data)
        setTreeData(Data)
    }
    /***************************************
     ** Module: 移动节点 | Date: 2020-09-17
     ***************************************/
    const onMove = (e, currentItem, movePosition, parentItem) => {
        e && e.stopPropagation()
        let Data = [...treeDataRef.current]
        let isStop = false
        const fn = (data) => {
            data?.length &&
                data.map(async (item, index) => {
                    if (item.key === currentItem.key && !isStop) {
                        const total = data.length
                        const i = movePosition === 'up' ? index - 1 : index + 1
                        let beforeList = [...data]
                        let afterList = [...data]
                        if (i < 0) return
                        if (i >= total) return
                        if (!moveChange) return console.warn('缺少处理方法')
                        afterList.splice(index, 1)
                        afterList.splice(i, 0, item)
                        isStop = true
                        let result = await moveChange({ beforeList, afterList, currentItem, parentItem, movePosition })
                        if (result) {
                            // 移动成功
                            data.splice(index, 1)
                            data.splice(i, 0, item)
                            setTreeData(Data)
                        } else {
                            console.error('移动节点失败！')
                        }
                        return
                    } else {
                        item.children?.length && fn(item.children)
                    }
                })
        }
        fn(Data)
    }
    /***************************************
     ** Module: 添加新节点（输入框） | Date: 2020-09-17
     ***************************************/
    const onAdd = (e, key) => {
        e && e.stopPropagation()
        setSelectedKeys([key])
        form.setFieldsValue({
            name: ''
        })
        let Data = [...treeDataRef.current]
        const treeId = randomID()
        const setTreeNode = (data) =>
            data.map((item, index) => {
                if (item.key === key) {
                    if (!item.children?.length) item.children = [];
                    item.children.push({
                        title: () => newNodeContent(item),
                        key: treeId,
                        isConfirm: '0000',
                    })
                    // 加入定时有效改善闪烁问题（缺点：牺牲了展开动画）
                    setTimeout(() => {
                        setExpandedKeys([...expandedKeysRef.current, key])
                    }, 50)
                }
                item.children?.length && setTreeNode(item.children)
            })
        currentKey.current = treeId
        parentKey.current = key
        resetNode(Data)
        setTreeNode(Data)
        // 加入定时有效改善闪烁问题（缺点：牺牲了展开动画）
        setTimeout(() => {
            setTreeData(Data)
        }, 50)
    }
    const addIsConfirm = (parentItem) => {
        if (!addConfirm) return console.warn('缺少处理方法')
        form.validateFields().then(async (value) => {
            const result = await addConfirm({
                parentItem,
                ...value,
            })
            if (result) {
                // 新增成功
                onRecovery(null, currentKey.current, value.name, result)
            } else {
                console.error('新增失败！')
            }
        })
    }
    const deleteIsConfirm = async (e, currentItem, parentItem) => {
        e && e.stopPropagation()
        if (!deleteConfirm) return console.warn('缺少处理方法')
        const result = await deleteConfirm({ currentItem, parentItem })
        if (result) {
            // 删除成功
            onDelete(currentItem.key)
        } else {
            console.error('删除失败！')
        }
    }
    const renameIsConfirm = async (currentItem, parentItem) => {
        if (!renameConfirm) return console.warn('缺少处理方法')
        const result = await renameConfirm(currentItem, parentItem)
        console.log(result);
        if (result) {
            // 重命名成功
            onRecovery(null, currentItem.key, currentItem.titleText)
        } else {
            console.error('重命名失败！')
        }
    }

    /*********************************
     ** Module : 初始化数据结构
     ** Date : 2020-09-23
     *********************************/
    const initTreeData = (data) => {
        let tree = [...data]
        const fn = (data, parent) => {
            data.map((item, index) => {
                item.titleText = item.title
                item.title = nodeTitleContent(item, parent)
                item.children?.length && fn(item.children, item)
            })
        }
        fn(tree)
        setTreeData(tree)
        setTimeout(() => {
            setExpandedKeys([tree[0].key])
        }, 100)
    }

    useEffect(() => {
        treeDataRef.current = treeData
    }, [treeData])

    useEffect(() => {
        expandedKeysRef.current = expandedKeys
    }, [expandedKeys])

    return [treeProps, initTreeData]
}
