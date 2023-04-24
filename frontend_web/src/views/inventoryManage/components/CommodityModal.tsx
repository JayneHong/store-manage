import { FC, useEffect, useState, useRef } from 'react'
import { Button, Input, Modal, Form, Upload, message, Image } from 'antd'
import { useMutation, useQuery } from 'react-query'
import {
  getGoodsListApi,
  addGoodsApi,
  updateGoodsApi,
} from '@/_bak/api/modules/goods'
import { PlusOutlined } from '@ant-design/icons'
import styles from './CommodityModal.module.scss'

interface CommodityModalProps {
  echoData?: any
  visible: boolean
  inventory?: boolean
  onClose: (isQuery?: boolean) => void
}

const CommodityModal: FC<CommodityModalProps> = (props) => {
  const { echoData, visible, onClose } = props
  const [isLoading, setLoading] = useState(false)
  const [modifyImage, setModifyImage] = useState(false)
  const [form] = Form.useForm()
  const uploadRef = useRef()

  const { data, refetch: refetchGetGoodsList } = useQuery(
    'getGoodsList',
    getGoodsListApi,
    { enabled: false }
  )

  const { mutate } = useMutation(
    (params) => (echoData ? updateGoodsApi(params) : addGoodsApi(params)),
    {
      onMutate: () => {
        setLoading(true)
      },
      onSuccess: (data) => {
        message.success(data.msg)
        onClose?.(true)
      },
      onSettled: () => {
        setLoading(false)
      },
    }
  )

  const handleAdd = () => {
    form.submit()
  }

  const handleClose = () => {
    onClose?.()
  }

  const onSubmit = async (values: any) => {
    const thumbUrl = (uploadRef.current as any)?.fileList?.[0]?.thumbUrl
    const params = { ...values, goodsImage: thumbUrl }
    console.log('submit', values, params)
    if (echoData) {
      mutate({ ...params, id: echoData['_id'] } as any)
    } else {
      mutate({ ...params })
    }
  }

  useEffect(() => {
    if (!visible) {
      form.resetFields()
      setModifyImage(false)
    } else {
      if (echoData) {
        form.setFieldsValue({
          ...echoData,
        })
      }
    }
  }, [visible, echoData])

  useEffect(() => {
    refetchGetGoodsList()
  }, [])

  return (
    <div style={{ height: '100%' }}>
      <Modal
        className={styles.commodity}
        title={
          props.inventory ? '添加库存' : `${echoData ? '编辑' : '添加'}商品`
        }
        width="760px"
        open={visible}
        onCancel={handleClose}
        bodyStyle={{ padding: '20px 10px 5px' }}
        footer={[
          <Button type="default" onClick={handleClose} key="cancel">
            取消
          </Button>,
          <Button
            type="primary"
            onClick={handleAdd}
            key="ok"
            loading={isLoading}
          >
            确定
          </Button>,
        ]}
      >
        {props.inventory ? (
          <Form layout="inline" autoComplete="off" onFinish={onSubmit}>
            <Form.Item
              label="库存"
              name="inventory"
              rules={[{ required: true, message: '请输入库存量' }]}
            >
              <Input type="number" style={{ width: 180 }} />
            </Form.Item>
          </Form>
        ) : (
          <Form
            form={form}
            layout="inline"
            autoComplete="off"
            onFinish={onSubmit}
          >
            <Form.Item
              label="商品名称"
              name="goodsName"
              rules={[{ required: true, message: '请输入商品名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ width: '100%' }}
              label="商品图片"
              name="goodsImage"
              valuePropName="goodsImage"
            >
              {!modifyImage && echoData?.goodsImage ? (
                <>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      border: '1px solid #d9d9d9',
                    }}
                    src={echoData?.goodsImage}
                  />
                  <Button
                    type="link"
                    size="small"
                    onClick={() => setModifyImage(true)}
                  >
                    重新上传
                  </Button>
                </>
              ) : (
                <Upload
                  ref={uploadRef}
                  beforeUpload={() => {
                    return false
                  }}
                  listType="picture-card"
                  maxCount={1}
                  style={{ display: 'flex', width: 300 }}
                >
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>点击上传</div>
                  </div>
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="产地"
              name="yieldly"
              rules={[{ required: true, message: '请输入产地' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="包装"
              name="packaging"
              rules={[{ required: true, message: '请输入包装' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="规格"
              name="specification"
              rules={[{ required: true, message: '请输入规格' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="库存"
              name="inventory"
              rules={[{ required: true, message: '请输入库存量' }]}
            >
              <Input type="number" style={{ width: 180 }} />
            </Form.Item>
            <Form.Item
              label="销售价格"
              name="salePrice"
              rules={[{ required: true, message: '请输入销售价格' }]}
            >
              <Input
                type="number"
                style={{ width: 180 }}
                suffix={<span>¥</span>}
              />
            </Form.Item>
            <Form.Item
              label="进货价格"
              name="costPrice"
              rules={[{ required: true, message: '请输入进货价格' }]}
            >
              <Input
                type="number"
                style={{ width: 180 }}
                suffix={<span>¥</span>}
              />
            </Form.Item>
            <Form.Item
              style={{ width: '92%' }}
              label="商品描述"
              name="goodsDesc"
            >
              <Input.TextArea rows={4} showCount maxLength={300} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  )
}

export default CommodityModal
