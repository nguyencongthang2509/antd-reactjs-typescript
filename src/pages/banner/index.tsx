import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Image,
  Popconfirm,
  Row,
  Table,
  Typography,
  Upload,
} from "antd";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { useEffect } from "react";
import { BannerAPI } from "../../apis/banner.api";
import { ContainerAPI } from "../../apis/container.api";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  AddBanner,
  DeleteBanner,
  GetBanner,
  SetBanner,
  UpdateBanner,
} from "../../app/reducers/Banner/Banner.reducer";
import productPNG from "../../assets/images/product.png";
import { EditableCell } from "../../components/edit-table-cell";
import { GetFile } from "../../helper/getFile.helper";
import { IBanner } from "../../interface/Banner.interface";
import { ICategoryBlog } from "../../interface/CategoryBlog.interface";

const { Title } = Typography;

export default function Banner() {
  const data = useAppSelector(GetBanner);
  const dispatch = useAppDispatch();
  useEffect(() => {
    BannerAPI.fetchAll().then((result: any) => {
      dispatch(SetBanner(result.data));
    });
  }, [dispatch]);

  const remove = (record: Partial<IBanner>) => {
    if (record.id) {
      BannerAPI.delete(record.id).then(() => {
        dispatch(DeleteBanner(record));
      });
    }
  };
  const upload = (record: IBanner, info: UploadChangeParam) => {
    ContainerAPI.upload(info.file.originFileObj as File).then((result) => {
      const photoURL = GetFile(result.data);
      if (record.id) {
        BannerAPI.update(record.id, { ...record, photoURL }).then((result) => {
          dispatch(UpdateBanner(result.data));
        });
      }
    });
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (_: null, record: ICategoryBlog) => {
        const idx = data.findIndex((el: ICategoryBlog) => el.id === record.id);
        return <Typography.Title level={5}>{idx + 1}</Typography.Title>;
      },
    },
    {
      title: "Ảnh",
      dataIndex: "Background",
      width: "40%",
      render: (_: null, record: IBanner) => {
        return (
          <Row className="flex-col">
            <Image
              src={record.photoURL ? record.photoURL : productPNG}
              height={150}
            />
            <Upload
              customRequest={(options) => {
                if (options.onSuccess) {
                  options.onSuccess("ok");
                }
              }}
              onChange={(e) => upload(record, e)}
              maxCount={1}
              showUploadList={false}
              className="cursor-pointer mt-4"
            >
              <Button type="default" icon={<UploadOutlined />} className="mr-4">
                Thay đổi
              </Button>
            </Upload>
          </Row>
        );
      },
    },
    {
      title: "Thiết lập",
      render: (_: null, record: IBanner) => {
        return (
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa không?"
            onConfirm={() => {
              remove(record);
            }}
          >
            <Typography.Link className="mr-4">
              <DeleteOutlined style={{ fontSize: "130%" }} />
            </Typography.Link>
          </Popconfirm>
        );
      },
    },
  ];

  const beforeUpload = (file: RcFile) => {
    // Access file content here and do something with it
    ContainerAPI.upload(file as File).then((result) => {
      const photoURL = GetFile(result.data);
      if (photoURL) {
        BannerAPI.create({ photoURL }).then((result) => {
          dispatch(AddBanner(result.data));
        });
      }
    });
    // Prevent upload
    return false;
  };

  return (
    <>
      <Row>
        <Title level={3}>Ảnh bìa khuyến mãi</Title>
      </Row>
      <Row className="mb-4">
        <Upload
          customRequest={(options) => {
            if (options.onSuccess) {
              options.onSuccess("ok");
            }
          }}
          maxCount={1}
          showUploadList={false}
          className="cursor-pointer"
          beforeUpload={beforeUpload}
        >
          <Button type="primary" icon={<PlusOutlined />} className="mr-4">
            Thêm mới
          </Button>
        </Upload>
      </Row>
      <Table
        columns={columns}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        bordered
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}
