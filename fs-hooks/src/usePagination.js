import { useState, useCallback, useRef, useEffect } from 'react'
/*********************************
 ** Module : 自定义antd分页hooks
 ** Date : 2020-04-01
 *********************************/
export default function usePagination(Api, Pages = { current: 'current', pageSize: 'pageSize' }) {
    const isMounted = useRef(false)
    const setValueFlag = useRef(0)
    const [page, setPage] = useState(() => ({
        current: 1,
        pageSize: 20,
    }))
    const [newParams, setNewParams] = useState({})
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [total, setTotal] = useState(0)
    const onChange = useCallback((pagination) => {
        setPage({
            current: pagination.current,
            pageSize: pagination.pageSize,
        })
    }, [])
    const fetchData = useCallback(
        async (searchParams = {}) => {
            setLoading(true)
            const currentCount = setValueFlag.current
            const { current, pageSize } = Pages
            const params = { [current]: page.current, [pageSize]: page.pageSize, ...searchParams }
            const result = await Api(params)
            // 竞态处理
            if (setValueFlag.current != currentCount) {
                return
            }
            setLoading(false)
            setTotal(result.data.RowCount)
            setDataSource(result.data.Data)
        },
        [page]
    )
    const initTable = useCallback(
        (params) => {
            setNewParams(params)
            setPage({
                current: 1,
                pageSize: page.pageSize,
            })
        },
        [page]
    )
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true
        } else {
            fetchData(newParams)
            return () => {
                setValueFlag.current += 1
            }
        }
    }, [page])

    const pagingProps = {
        loading,
        onChange,
        dataSource,
        pagination: {
            ...page,
            total,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [20, 40, 80, 100],
            size: 'middle',
            showTotal: (total) => `总共 ${total}条 记录`,
        },
    }
    return [initTable, pagingProps, setDataSource]
}
