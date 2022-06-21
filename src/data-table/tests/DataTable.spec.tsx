import { h, HTMLAttributes, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { DataTableInst, NDataTable } from '../index'
import type { DataTableColumns } from '../index'
import { NButton } from '../../button'
import { NButtonGroup } from '../../button-group'

describe('n-data-table', () => {
  it('should work with import on demand', () => {
    mount(NDataTable)
  })
  it('show custom empty', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={[]}>
        {{
          empty: () => <div class="empty-info">empty</div>
        }}
      </NDataTable>
    ))
    expect(wrapper.find('.empty-info').exists()).toEqual(true)
  })
  it('should work with `itemCount` without `remote`', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const pagination = {
      page: 1,
      pageCount: 1,
      pageSize: 10,
      itemCount: 0,
      prefix ({ itemCount }: { itemCount: number | undefined }) {
        return itemCount
      }
    }
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} pagination={pagination} />
    ))
    expect(wrapper.find('.n-pagination-prefix').text()).toEqual('978')
  })

  it('should work with `itemCount` with `remote`', async () => {
    const onPageChange = vi.fn((page: number): void => {
      setTimeout(() => {
        pagination.page = page
        pagination.itemCount = data.length
        data = data.slice(
          (page - 1) * pagination.pageSize,
          page * pagination.pageSize
        )
      }, 1000)
    })
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    let data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const pagination = {
      page: 1,
      pageSize: 10,
      itemCount: 978,
      prefix ({ itemCount }: { itemCount: number | undefined }) {
        return itemCount
      }
    }
    const wrapper = mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        pagination={pagination}
        remote
        onUpdatePage={onPageChange}
      />
    ))
    await void wrapper.findAll('.n-pagination-item')[2].trigger('click')
    await nextTick()
    expect(onPageChange).toHaveBeenCalled()
    expect(wrapper.find('.n-pagination-prefix').text()).toEqual('978')
  })

  it('should work with `bordered` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('.n-data-table').classes()).toContain(
      'n-data-table--bordered'
    )

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} bordered={false} />
    ))
    expect(wrapper.find('.n-data-table').classes()).not.toContain(
      'n-data-table--bordered'
    )
  })

  it('should work with `bottom-bordered` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => (
      <NDataTable columns={columns} data={data} bordered={false} />
    ))
    expect(wrapper.find('.n-data-table').classes()).toContain(
      'n-data-table--bottom-bordered'
    )

    wrapper = mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        bordered={false}
        bottom-bordered={false}
      />
    ))
    expect(wrapper.find('.n-data-table').classes()).not.toContain(
      'n-data-table--bottom-bordered'
    )
  })

  it('should work with `loading` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('.n-base-loading').exists()).not.toBe(true)

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} loading={true} />
    ))
    expect(wrapper.find('.n-base-loading').exists()).toBe(true)
  })

  it('should work with `flex-height` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('.n-data-table').classes()).not.toContain(
      'n-data-table--flex-height'
    )

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} flexHeight={true} />
    ))
    expect(wrapper.find('.n-data-table').classes()).toContain(
      'n-data-table--flex-height'
    )
  })

  it('should work with `row-class-name` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const getRowClassName = (rowData: any, index: number): string => {
      return `${index}-test`
    }
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('tbody .n-data-table-tr').classes()).not.toContain(
      'test'
    )

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} rowClassName="test" />
    ))
    expect(wrapper.find('tbody .n-data-table-tr').classes()).toContain('test')

    wrapper = mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        rowClassName={getRowClassName}
      />
    ))
    expect(wrapper.find('tbody .n-data-table-tr').classes()).toContain('0-test')
  })

  describe('should work with multiple sorter', () => {
    interface UserData {
      name: string
      age: number
      address: string
      chinese: number
      math: number
      english: number
    }
    const columns: DataTableColumns<UserData> = [
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: () => h('span', { id: 'age-title' }, 'Age'),
        className: 'age-col',
        key: 'age',
        sorter: (a, b) => a.age - b.age
      },
      {
        title: () => <span id="chinese-title">Chinese Score</span>,
        key: 'chinese',
        defaultSortOrder: false,
        className: 'chinese-col',
        sorter: {
          compare: (a, b) => a.chinese - b.chinese,
          multiple: 3
        }
      },
      {
        title: () => <span id="math-title">Math Score</span>,
        defaultSortOrder: false,
        className: 'math-col',
        key: 'math',
        sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2
        }
      },
      {
        title: () => <span id="english-title">English Score</span>,
        className: 'english-col',
        defaultSortOrder: false,
        key: 'english',
        sorter: {
          compare: (a, b) => a.english - b.english,
          multiple: 1
        }
      },
      {
        title: 'Address',
        key: 'address',
        filterOptions: [
          {
            label: 'London',
            value: 'London'
          },
          {
            label: 'New York',
            value: 'New York'
          },
          {
            label: 'Sidney',
            value: 'Sidney'
          }
        ],
        filter (value: any, row) {
          return row.address.includes(value)
        }
      }
    ]

    const data = [
      {
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        chinese: 98,
        math: 60,
        english: 70
      },
      {
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        chinese: 98,
        math: 66,
        english: 89
      },
      {
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        chinese: 98,
        math: 66,
        english: 89
      },
      {
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
        chinese: 88,
        math: 99,
        english: 89
      }
    ]
    const tableRef = ref<DataTableInst | null>(null)
    const wrapper = mount(
      () => <NDataTable ref={tableRef} columns={columns} data={data} />,
      {
        attachTo: document.body
      }
    )
    const checkIsMatched = async (
      colClassName: string,
      target: number[]
    ): Promise<boolean> => {
      const cols = await wrapper.findAll(colClassName)
      const colNums = cols.slice(1).map((item) => Number(item.text()))
      const matchResult = String(colNums) === String(target)
      if (!matchResult) {
        console.log(colClassName, String(colNums), String(target))
      }
      return String(colNums) === String(target)
    }
    const checkScoreIsMatched = async (
      targets: [number[], number[], number[]]
    ): Promise<boolean> => {
      const matchResult =
        (await checkIsMatched('.chinese-col', targets[0])) &&
        (await checkIsMatched('.math-col', targets[1])) &&
        (await checkIsMatched('.english-col', targets[2]))

      return matchResult
    }
    const chineseDom: HTMLElement | null =
      document.querySelector('#chinese-title')
    const mathDom: HTMLElement | null = document.querySelector('#math-title')
    const englishDom: HTMLElement | null =
      document.querySelector('#english-title')
    const ageDom: HTMLElement | null = document.querySelector('#age-title')

    it('chinese: descend, math: false, english: false', async () => {
      await chineseDom?.click()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [60, 66, 66, 99],
          [70, 89, 89, 89]
        ])
      ).toEqual(true)
    })
    it('chinese: descend, math: descend, english: false', async () => {
      await mathDom?.click()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [66, 66, 60, 99],
          [89, 89, 70, 89]
        ])
      ).toEqual(true)
    })

    it('chinese: descend, math: descend, english: descend', async () => {
      await englishDom?.click()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [66, 66, 60, 99],
          [89, 89, 70, 89]
        ])
      ).toEqual(true)
    })

    it('chinese: ascend, math: descend, english: descend', async () => {
      await chineseDom?.click()
      expect(
        await checkScoreIsMatched([
          [88, 98, 98, 98],
          [99, 66, 66, 60],
          [89, 89, 89, 70]
        ])
      ).toEqual(true)
    })

    it('chinese: false, math: descend, english: descend', async () => {
      await chineseDom?.click()
      expect(
        await checkScoreIsMatched([
          [88, 98, 98, 98],
          [99, 66, 66, 60],
          [89, 89, 89, 70]
        ])
      ).toEqual(true)
    })

    it('chinese: false, math: ascend, english: descend', async () => {
      await mathDom?.click()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [60, 66, 66, 99],
          [70, 89, 89, 89]
        ])
      ).toEqual(true)
    })

    it('chinese: false, math: false, english: descend', async () => {
      await mathDom?.click()
      expect(
        await checkScoreIsMatched([
          [98, 98, 88, 98],
          [66, 66, 99, 60],
          [89, 89, 89, 70]
        ])
      ).toEqual(true)
    })

    it('chinese: descend, math: false, english: descend', async () => {
      await chineseDom?.click()
      expect(
        await checkScoreIsMatched([
          [98, 98, 98, 88],
          [66, 66, 60, 99],
          [89, 89, 70, 89]
        ])
      ).toEqual(true)
    })

    it('filter: Sidney and New York', async () => {
      if (tableRef.value) {
        tableRef.value.filter({
          address: ['Sidney', 'New York']
        })
      }
      await nextTick()
      const result = await checkScoreIsMatched([
        [98, 98],
        [66, 60],
        [89, 70]
      ])
      expect(result).toEqual(true)
      if (tableRef.value) {
        tableRef.value.filter(null)
      }
    })

    it('age: descend', async () => {
      await ageDom?.click()
      const result =
        (await checkIsMatched('.age-col', [42, 32, 32, 32])) &&
        (await checkScoreIsMatched([
          [98, 98, 98, 88],
          [66, 60, 66, 99],
          [89, 70, 89, 89]
        ]))
      expect(result).toEqual(true)
    })
  })

  it('should work with `indent` prop', async () => {
    const columns = [
      {
        title: 'name',
        key: 'name'
      },
      {
        title: 'index',
        key: 'index'
      }
    ]
    const data = [
      {
        name: '07akioni',
        index: '07',
        children: [
          {
            name: '08akioni',
            index: '08',
            children: [
              {
                name: '09akioni',
                index: '09'
              },
              {
                name: '10akioni',
                index: '10'
              }
            ]
          }
        ]
      }
    ]
    const rowKey = (row: any): number => row.index
    let wrapper = mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        row-key={rowKey}
        default-expanded-row-keys={['07']}
      />
    ))
    expect(wrapper.find('.n-data-table-indent').attributes('style')).toContain(
      'width: 16px'
    )

    wrapper = mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        row-key={rowKey}
        default-expanded-row-keys={['07']}
        indent={20}
      />
    ))
    expect(wrapper.find('.n-data-table-indent').attributes('style')).toContain(
      'width: 20px'
    )
  })

  it('should work with `row-props` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const rowProps = (): any => ({
      style: 'cursor: pointer;'
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('tbody .n-data-table-tr').attributes('style')).toBe(
      undefined
    )

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} row-props={rowProps} />
    ))
    expect(
      wrapper.find('tbody .n-data-table-tr').attributes('style')
    ).toContain('cursor: pointer')
  })

  it('should work with `scroll-x` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(
      wrapper.find('.n-scrollbar-content').attributes('style')
    ).not.toContain('min-width: 1800px')

    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} scroll-x={1800} />
    ))
    expect(wrapper.find('.n-scrollbar-content').attributes('style')).toContain(
      'min-width: 1800px'
    )
  })

  it('should work with `single-column` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('.n-data-table').classes()).not.toContain(
      'n-data-table--single-column'
    )
    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} single-column={true} />
    ))
    expect(wrapper.find('.n-data-table').classes()).toContain(
      'n-data-table--single-column'
    )
  })

  it('should work with `single-line` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('.n-data-table').classes()).toContain(
      'n-data-table--single-line'
    )
    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} single-line={false} />
    ))
    expect(wrapper.find('.n-data-table').classes()).not.toContain(
      'n-data-table--single-line'
    )
  })

  it('should work with `size` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(() => (
        <NDataTable columns={columns} data={data} size={size} />
      ))
      expect(
        wrapper.find('.n-data-table').attributes('style')
      ).toMatchSnapshot()
    })
  })

  it('should work with `summary` prop', async () => {
    interface Data {
      name: number
      age: number
    }
    const columns = [
      {
        title: 'Name',
        key: 'name'
      },
      {
        title: 'Age',
        key: 'age'
      }
    ]
    const data = new Array(10).fill(0).map((_, index) => {
      return {
        name: index,
        age: index
      }
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const summary = (pageData: Data[]) => {
      return {
        name: {
          value: pageData.reduce((prevValue, row) => prevValue + row.age, 0),
          colSpan: 1,
          rowSpan: 2
        },
        age: {
          value: pageData.reduce((prevValue, row) => prevValue + row.age, 0),
          colSpan: 2,
          rowSpan: 1
        }
      }
    }
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} summary={summary} />
    ))
    expect(
      wrapper.findAll('.n-data-table-td--summary')[0].attributes('data-col-key')
    ).toBe('name')
    expect(
      wrapper.findAll('.n-data-table-td--summary')[0].attributes('colspan')
    ).toBe('1')
    expect(
      wrapper.findAll('.n-data-table-td--summary')[0].attributes('rowspan')
    ).toBe('2')
    expect(wrapper.findAll('.n-data-table-td--summary')[0].text()).toBe('45')

    expect(
      wrapper.findAll('.n-data-table-td--summary')[1].attributes('data-col-key')
    ).toBe('age')
    expect(
      wrapper.findAll('.n-data-table-td--summary')[1].attributes('colspan')
    ).toBe('2')
    expect(
      wrapper.findAll('.n-data-table-td--summary')[1].attributes('rowspan')
    ).toBe('1')
    expect(wrapper.findAll('.n-data-table-td--summary')[1].text()).toBe('45')
  })

  it('should work with `table-layout` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('table').attributes('style')).toContain(
      'table-layout: auto'
    )
    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} table-layout="fixed" />
    ))
    expect(wrapper.find('table').attributes('style')).toContain(
      'table-layout: fixed'
    )
  })

  it('should work with `virtual-scroll` prop', async () => {
    const columns = [
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(978).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    let wrapper = mount(() => <NDataTable columns={columns} data={data} />)
    expect(wrapper.find('tbody').element.children.length).not.toBe(0)
    wrapper = mount(() => (
      <NDataTable columns={columns} data={data} virtual-scroll={true} />
    ))
    expect(wrapper.find('tbody').element.children.length).toBe(0)
  })

  it('should work with `on-update:checked-row-keys` prop', async () => {
    const handleCheck = vi.fn()
    const columns: DataTableColumns = [
      {
        type: 'selection'
      },
      {
        title: 'Name',
        key: 'name'
      }
    ]
    const data = new Array(2).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const rowKey = (row: any): number => row.name
    const wrapper = mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        row-key={rowKey}
        onUpdateCheckedRowKeys={handleCheck}
      />
    ))
    await wrapper.find('.n-checkbox').trigger('click')
    expect(handleCheck).toHaveBeenCalled()
  })
})

describe('props.columns', () => {
  it('has correct type', () => {
    interface Data {
      collegeID: number
      collegeName: string
    }
    const data: Data[] = [
      {
        collegeID: 1,
        collegeName: 'Peking University'
      }
    ]
    const createRowKey = (row: Data): number => row.collegeID
    const createRowClassName = (row: Data): string => 'star kirby'
    const createRowProps = (row: Data): HTMLAttributes => ({
      style: { color: 'red' }
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const createSummary = (pageData: Data[]) => {
      return {
        collegeID: {
          value: pageData.reduce(
            (prevValue, row) => prevValue + row.collegeID,
            0
          ),
          colSpan: 3
        }
      }
    }
    const columns: DataTableColumns<Data> = [
      {
        title: 'collegeID',
        key: 'collegeID',
        align: 'center',
        sorter: (row1, row2) => row1.collegeID - row2.collegeID
      },
      {
        title: 'collegeName',
        key: 'collegeName',
        align: 'center',
        defaultSortOrder: 'ascend'
      },
      {
        title: '操作',
        key: 'actions',
        render (row) {
          return (
            <NButtonGroup>
              {{
                default: () => {
                  return (
                    [
                      {
                        text: '修改',
                        type: 'warning'
                      },
                      {
                        text: '删除',
                        type: 'error'
                      }
                    ] as const
                  ).map(({ type, text }) => (
                    <NButton type={type} round dashed>
                      {{ default: () => text }}
                    </NButton>
                  ))
                }
              }}
            </NButtonGroup>
          )
        }
      }
    ]
    mount(() => (
      <NDataTable
        columns={columns}
        data={data}
        rowKey={createRowKey}
        rowClassName={createRowClassName}
        rowProps={createRowProps}
        summary={createSummary}
      />
    )).unmount()
  })

  it('should work with `align` prop', async () => {
    const data = new Array(5).fill(0).map((_, index) => {
      return {
        name: index,
        age: index + 1
      }
    })
    const rowKey = (row: any): number => row.name
    ;(['left', 'right', 'center'] as const).forEach((align) => {
      const columns: DataTableColumns = [
        {
          title: 'Name',
          key: 'name',
          align: align
        },
        {
          title: 'Age',
          key: 'age'
        }
      ]
      const wrapper = mount(() => (
        <NDataTable columns={columns} data={data} row-key={rowKey} />
      ))
      expect(wrapper.find('tbody .n-data-table-td').classes()).toContain(
        `n-data-table-td--${align}-align`
      )
      expect(
        wrapper.find('tbody .n-data-table-td').attributes('style')
      ).toContain(`text-align: ${align}`)
    })
  })

  it('should work with `rowSpan` `colSpan` prop', async () => {
    const columns: DataTableColumns = [
      {
        title: 'Name',
        key: 'name',
        rowSpan: (rowData, rowIndex) => (rowIndex === 0 ? 2 : 1),
        colSpan: (rowData, rowIndex) => (rowIndex === 0 ? 3 : 1)
      },
      {
        title: 'Age',
        key: 'age'
      }
    ]
    const data = new Array(5).fill(0).map((_, index) => {
      return {
        name: index,
        age: index + 1
      }
    })
    const rowKey = (row: any): number => row.name
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} row-key={rowKey} />
    ))
    expect(wrapper.find('tbody .n-data-table-td').attributes('colspan')).toBe(
      '3'
    )
    expect(wrapper.find('tbody .n-data-table-td').attributes('rowspan')).toBe(
      '2'
    )
  })

  it('should work with `ellipsis` prop', async () => {
    const columns: DataTableColumns = [
      {
        title: 'Name',
        key: 'name',
        width: 100,
        ellipsis: true
      },
      {
        title: 'Age',
        key: 'age',
        width: 100,
        ellipsis: {
          tooltip: true
        }
      }
    ]
    const data = new Array(5).fill(0).map((_, index) => {
      return {
        name: `testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest${index}`,
        age: `testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest${index}`
      }
    })
    const rowKey = (row: any): number => row.name
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} row-key={rowKey} />
    ))
    expect(wrapper.find('tbody .n-data-table-td--ellipsis').exists()).toBe(true)
    expect(wrapper.find('tbody .n-ellipsis').exists()).toBe(true)
    expect(wrapper.find('tbody .n-ellipsis').attributes('style')).toContain(
      'text-overflow: ellipsis'
    )
  })

  it('should work with `children` prop', async () => {
    const columns: DataTableColumns = [
      {
        title: 'Name',
        key: 'name',
        width: 100
      },
      {
        title: 'Age',
        key: 'age',
        width: 100,
        children: [
          {
            title: 'test1',
            key: 'test1'
          },
          {
            title: 'test2',
            key: 'test2'
          }
        ]
      }
    ]
    const data = new Array(5).fill(0).map((_, index) => {
      return {
        name: index,
        age: index,
        test1: index,
        test2: index
      }
    })
    const rowKey = (row: any): number => row.name
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} row-key={rowKey} />
    ))
    expect(
      wrapper.find('thead [data-col-key="name"]').attributes('colspan')
    ).toBe('1')
    expect(
      wrapper.find('thead [data-col-key="name"]').attributes('rowspan')
    ).toBe('2')
    expect(
      wrapper.find('thead [data-col-key="age"]').attributes('colspan')
    ).toBe('2')
    expect(
      wrapper.find('thead [data-col-key="age"]').attributes('rowspan')
    ).toBe('1')
    expect(
      wrapper.find('thead [data-col-key="test1"]').attributes('colspan')
    ).toBe('1')
    expect(
      wrapper.find('thead [data-col-key="test1"]').attributes('rowspan')
    ).toBe('1')
    expect(
      wrapper.find('thead [data-col-key="test2"]').attributes('colspan')
    ).toBe('1')
    expect(
      wrapper.find('thead [data-col-key="test2"]').attributes('rowspan')
    ).toBe('1')
  })

  it('should work with `className` prop', async () => {
    const columns: DataTableColumns = [
      {
        title: 'Name',
        key: 'name',
        className: 'test-name'
      },
      {
        title: 'Age',
        key: 'age',
        className: 'test-age'
      }
    ]
    const data = new Array(5).fill(0).map((_, index) => {
      return {
        name: index,
        age: index
      }
    })
    const rowKey = (row: any): number => row.name
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} row-key={rowKey} />
    ))
    expect(wrapper.find('thead [data-col-key="name"]').classes()).toContain(
      'test-name'
    )
    expect(wrapper.find('thead [data-col-key="age"]').classes()).toContain(
      'test-age'
    )
  })

  it('should work with `render` prop', async () => {
    const columns: DataTableColumns = [
      {
        title: 'Name',
        key: 'name',
        render (rowData: any, rowIndex: number) {
          return `${String(rowData.name)}-${rowIndex}`
        }
      }
    ]
    const data = new Array(5).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const rowKey = (row: any): number => row.name
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} row-key={rowKey} />
    ))
    expect(wrapper.find('tbody [data-col-key="name"]').text()).toContain('0-0')
  })

  it('should work with `renderExpand` `expandable` prop', async () => {
    const columns: DataTableColumns = [
      {
        type: 'expand',
        expandable: (rowData) => rowData.name === 0,
        renderExpand: (rowData: any) => {
          return `${String(rowData.name)} is a good guy.`
        }
      },
      {
        title: 'Name',
        key: 'name',
        render (rowData: any, rowIndex: number) {
          return `${String(rowData.name)}-${rowIndex}`
        }
      }
    ]
    const data = new Array(5).fill(0).map((_, index) => {
      return {
        name: index
      }
    })
    const rowKey = (row: any): number => row.name
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} row-key={rowKey} />
    ))
    expect(wrapper.findAll('tbody .n-data-table-td--expand').length).toBe(5)
    expect(wrapper.findAll('tbody td')[0].attributes('data-col-key')).toContain(
      '__n_expand__'
    )
    expect(wrapper.findAll('tbody td')[0].attributes('class')).toContain(
      'n-data-table-td--expand'
    )
    await void wrapper
      .findAll('tbody .n-data-table-expand-trigger')[0]
      .trigger('click')
    await nextTick()
    expect(wrapper.findAll('tbody tr').length).toBe(6)
    expect(wrapper.find('tbody [colspan="2"]').text()).toContain(
      '0 is a good guy.'
    )
  })

  it('should work with `children` prop', async () => {
    const columns: DataTableColumns = [
      {
        title: 'Name',
        key: 'name',
        width: 100
      },
      {
        title: 'Age',
        key: 'age',
        width: 200
      }
    ]
    const data = new Array(5).fill(0).map((_, index) => {
      return {
        name: index,
        age: index
      }
    })
    const rowKey = (row: any): number => row.name
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} row-key={rowKey} />
    ))
    expect(wrapper.findAll('colgroup col')[0].attributes('style')).toContain(
      'width: 100px; min-width: 100px'
    )
    expect(wrapper.findAll('colgroup col')[1].attributes('style')).toContain(
      'width: 200px; min-width: 200px'
    )
  })

  it('should work with `striped` prop', async () => {
    const columns: DataTableColumns = [
      {
        title: 'Name',
        key: 'name',
        width: 100
      },
      {
        title: 'Age',
        key: 'age',
        width: 200
      }
    ]
    const data = new Array(5).fill(0).map((_, index) => {
      return {
        name: index,
        age: index
      }
    })
    const wrapper = mount(() => (
      <NDataTable columns={columns} data={data} striped />
    ))

    const trList = wrapper.find('tbody').findAll('.n-data-table-tr')
    expect(trList[1].attributes('class')).toContain('n-data-table-tr--striped')
    expect(trList[0].attributes('class')).not.toContain(
      'n-data-table-tr--striped'
    )
    expect(trList[2].attributes('class')).not.toContain(
      'n-data-table-tr--striped'
    )
  })
})
