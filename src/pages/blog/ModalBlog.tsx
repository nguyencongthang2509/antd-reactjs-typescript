import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { BlogAPI } from "../../apis/blog.api";
import { CategoryBlogAPI } from "../../apis/categoryBlog.api";
import { ContainerAPI } from "../../apis/container.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { PutBlog } from "../../app/reducers/Blog/Blog.reducer";
import {
  GetCategoryBlog,
  SetCategoryBlog,
} from "../../app/reducers/CategoryBlog/CategoryBlog.reducer";
import { AppConfig } from "../../AppConfig";
import productPNG from "../../assets/images/product.png";
import { GetFile } from "../../helper/getFile.helper";
import { tinyConfig } from "../../helper/tiniConfig.helper";
import { IBlog } from "../../interface/Blog.interface";
import { ICategoryBlog } from "../../interface/CategoryBlog.interface";
import "./index.css";

const { Text } = Typography;

const { Option } = Select;

interface IModalBlogProps {
  modalOpen: boolean;
  setModalOpen: (el: boolean) => void;
  blog?: IBlog;
}

interface IFormValue {
  title?: string;
  metaDescription?: string;
  content?: string;
  photoURL?: string;
  categoryBlogId?: number;
}
export default function ModalBlog(props: IModalBlogProps) {
  const { modalOpen, setModalOpen, blog } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const categoryBlog = useAppSelector(GetCategoryBlog);
  const [formValue, setFormValue] = useState<IFormValue>({
    title: blog?.title,
    metaDescription: blog?.metaDescription,
    content: blog?.content,
    photoURL: blog?.photoURL,
    categoryBlogId: blog?.categoryBlogId,
  });

  useEffect(() => {
    CategoryBlogAPI.fetchAll()
      .then((result) => {
        dispatch(SetCategoryBlog(result.data));
      })
      .catch((err) => console.log("err", err));
  }, [dispatch]);
  useEffect(() => {
    setFormValue((fValues) => ({
      ...fValues,
      title: blog?.title,
      metaDescription: blog?.metaDescription,
      content: blog?.content,
      photoURL: blog?.photoURL,
      categoryBlogId: blog?.categoryBlogId
        ? blog.categoryBlogId
        : categoryBlog[0]?.id,
    }));

    form.setFieldsValue({
      ...form.getFieldsValue(),
      title: blog?.title,
      metaDescription: blog?.metaDescription,
      content: blog?.content,
      photoURL: blog?.photoURL,
      categoryBlogId: blog?.categoryBlogId
        ? blog.categoryBlogId
        : categoryBlog[0]?.id,
    });
  }, [blog, form, categoryBlog]);

  const onValuesChange = () => {
    const getFieldsValue = form.getFieldsValue();
    console.log("getFieldsValue", getFieldsValue);

    setFormValue(getFieldsValue);
  };

  const onFinish = () => {
    // call api
    BlogAPI.put(blog?.id ? { ...formValue, id: blog.id } : formValue)
      .then((result) => {
        dispatch(PutBlog(result.data));
        message.success("Success!");
        setModalOpen(false);
      })
      .catch((err) => {
        message.error("Error", err);
      });
  };

  const onFinishFailed = () => {
    message.error("Error!");
  };

  const beforeUpload = (file: RcFile) => {
    // Access file content here and do something with it
    ContainerAPI.upload(file as File).then((result) => {
      const photoURL = GetFile(result.data);
      setFormValue((f) => ({ ...f, photoURL }));
    });
    // Prevent upload
    return false;
  };

  return (
    <>
      <Modal
        destroyOnClose={true}
        title={`${blog ? "Chỉnh sửa Blog" : "Thêm Blog"}`}
        style={{ top: 20 }}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={null}
        forceRender
      >
        <Form
          form={form}
          initialValues={formValue}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
          colon={false}
          autoComplete="off"
        >
          <Text>Title</Text>
          <Form.Item name="title" required label="">
            <Input />
          </Form.Item>
          <Text>Danh mục Blog</Text>
          <Form.Item name="categoryBlogId" required label="">
            <Select style={{ width: 180 }}>
              {categoryBlog.length > 0 &&
                categoryBlog.map((el: ICategoryBlog, index: number) => {
                  return (
                    <Option key={index} value={el.id}>
                      {el.title} {el.id}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Text>MetaDescription</Text>
          <Form.Item name="metaDescription" required label="">
            <Input />
          </Form.Item>
          <Text>Image</Text>
          <Row>
            <Image
              src={formValue?.photoURL ? formValue.photoURL : productPNG}
              height={150}
            />
            <Upload
              beforeUpload={beforeUpload}
              customRequest={(options) => {
                if (options.onSuccess) {
                  options.onSuccess("ok");
                }
              }}
              maxCount={1}
              showUploadList={false}
              className="cursor-pointer ml-4"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Row>
          <Text>Content</Text>
          <Editor
            apiKey={AppConfig.tiniKey}
            init={tinyConfig}
            value={formValue.content}
            onEditorChange={(e) => setFormValue((f) => ({ ...f, content: e }))}
          />
          <Row className="justify-end">
            <Button className="mr-4" onClick={() => setModalOpen(false)}>
              Đóng
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
