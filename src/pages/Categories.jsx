import { Button, Collapse, Input, List, message, Modal, PageHeader, Space, Select} from 'antd'
import React, {useState } from 'react'
import { categoriesAdd, categoriesDelete, categoriesEdit, categoriesList } from '../utilis/urls'
import slugify, { postDataF } from '../utilis/helpers'
import { useDeleteRequest, useLoad, usePostRequest, usePutRequest } from '../hooks/request';
import FullPageLoader from '../components/Main/FullPageLoader';

const { Panel } = Collapse;
const { Option } = Select;

const initilaPostData = {
  isEdit: false,
  id:null,
  name_uz:'',
  name_ru: '',
  slug: '',
  catImage: '',
  parent_id:null,
}

function Categories() { 
  const [modalOpen, setModalOpen] = useState(false)
  const [postData, setPostData] = useState(initilaPostData)
  const [confirmLoading, setConfirmLoading] = useState(true)
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const categoryLoad = useLoad({ url: categoriesList })
  const addCategoryRequest = usePostRequest({ url: categoriesAdd })
  const updateCategoryRequest = usePutRequest({ url: categoriesEdit.replace('id', postData.id), })
  const deleteCategoryRequest = useDeleteRequest({ url: categoriesDelete.replace('id', postData.id) })
  
  const { loading, response } = categoryLoad
  const categories = response && response?.categories

  // useEffect(() => {
  //    setLoading(true)
  //   $host.get(categoriesList).then((res) => {
  //     if (res.data.isOk) {
  //       setCategories(res.data.categories)
  //       setLoading(false)
  //     } else {
  //       setLoading(false)
  //       message.warning(res.data.message)
  //      }
  //   }).catch((err) => {
  //     console.log(err)
  //     setLoading(false)
  //   })
  // }, [confirmLoading, confirmDeleteLoading])
   
  function panelExtra(category) {
    return (
      <Space>
        <Button onClick={() => {
          setPostData({
            ...postData,
            id:category.id,
            isedit: true,
            name_ru: category.name_ru,
            name_uz: category.name_uz,
            slug: category.slug,
            catImage: category.catImage,
            parent_id:category.parent_id,
          })

          setModalOpen(true)
        }}>Edit</Button>
        <Button danger onClick={() => {
          setPostData({...postData, id: category.id })
          setDeleteModalOpen(true)
        }}>Delete</Button>
      </Space>
    )
  }
  
  function handleModal(bool) { 
    if (!bool) {
      setPostData(initilaPostData)
    }
      setModalOpen(bool)
  }
  
  function handleChange({target}) {
    if (target.name === 'name_uz') {
      setPostData({...postData, [target.name]: target.value, slug:slugify( target.value)})
    } else {
      setPostData({...postData, [target.name]: target.value})
    }
  }

  async function addCategoryBtn() {
    if (postData.name_uz === '') {
      message.warning('Name uz to`ldirilmagan')
    }
    else if (postData.name_ru === '') {
      message.warning('Name ru to`ldirilmagan')
    }
    else if (postData.parent_id === null) {
      message.warning('Parent id tanlanmagan')
    } else {
      setConfirmLoading(true)
      if (postData.isEdit) {
        const data = postDataF(postData, ['isEdit', 'id'])
        const { success, response } = await updateCategoryRequest.request({ data, })
        if (success) {
          setConfirmLoading(false)
          handleModal(false)
          categoryLoad.request()
          message.success('Category muvoffaqiyatli yangilandi')
        } else {
           setConfirmLoading(false)
              message.error(response.data.message)}
      } else {
        const data = postDataF(postData, ['isEdit', 'id'])
        const { success, response } = await addCategoryRequest.request({ data, })
        if (success) {
          setConfirmLoading(false)
          handleModal(false)
          categoryLoad.request()
          message.success('Category qo`shildi')
        } else {
          setConfirmLoading(false)
          message.error(response.data.message)
        }
      }
    }
  }

   async function deleteCategoryBtn() {
    setConfirmDeleteLoading(true)
     const { success, response } = await deleteCategoryRequest.request()
     if (success) {
       setConfirmDeleteLoading(false)
       setDeleteModalOpen(false)
       categoryLoad.request()
       message.success('Kategorya o`chirildi')
     } else {
        setConfirmDeleteLoading(false)
        message.error(response.data.message)
     }
  }


  return (
    <>
        <PageHeader
            className="site-page-header"
            title="Categories"
            extra={<Button onClick={()=> handleModal(true)}>Add category</Button>}
      />
       
       <Modal
        title="Add Category"
        visible={modalOpen}
        onOk={() => addCategoryBtn()}
        okText={postData.isEdit ? 'Edit': 'Ok'}
        confirmLoading={confirmLoading}
        onCancel={() => handleModal(false)}
       
      >
      <Space direction='vertical' size='middle'>

        <Input addonBefore="Name uz" name='name_uz' value={postData.name_uz}  onChange={(e)=> handleChange(e)} />

        <Input addonBefore="Name ru" name='name_ru' value={postData.name_ru} onChange={(e)=> handleChange(e)} />
          
          <Select addonBefore="Parent category" name='parent_id' value={postData.parent_id} onChange={(e) => handleChange({ target: 'parent_id', value: e })} >
             <Option value={0}>Categories</Option>
            {
              categories?.map(item => {
                return (
                  <Option key={item.id} value={item.id}>{item.name_ru}</Option>
                )
              })
            }
          </Select>    
      </Space>
      </Modal>

        <Modal title="Kategoryani o`chirishni xohlaysizmi?"
          visible={deleteModalOpen}
          onOk={deleteCategoryBtn}
          confirmLoading={confirmDeleteLoading}
          onCancel={() => {
          setPostData({ ...postData, id: null })
          setDeleteModalOpen(false)
          }}>
      </Modal>
      
      { loading ? (
          <FullPageLoader/>
        ) : (
          <Collapse >
              {
                categories?.map((category) => {
                  return (
                    <Panel
                      header={category.name_ru}
                      key={category.id}
                      extra={panelExtra(category)}
                    >
                    <List
                          bordered
                          dataSource={category.children}
                          renderItem={item => (
                              <List.Item key={item.id} actions={[panelExtra(item)]}>
                                 {item.name_ru}
                              </List.Item>
                     )}
                 /> 
                    </Panel> 
                  )
                })
               }
       </Collapse>
        )
         }
    </>
  )
}

export default Categories