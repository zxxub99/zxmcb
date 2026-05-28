import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  ImageUploader,
  Toast,
  Divider,
  Radio,
  NavBar,
} from 'antd-mobile';
import { 
  CameraOutline,
  CheckCircleFill,
} from 'antd-mobile-icons';
import type { ImageUploadItem } from 'antd-mobile';
import styles from './Verification.module.css';

// 模拟上传函数
const mockUpload = async (file: File): Promise<ImageUploadItem> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        resolve({
          url: reader.result as string,
          extra: { id: Date.now().toString() }
        });
      }, 500);
    };
    reader.readAsDataURL(file);
  });
};

export default function Verification() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [frontImages, setFrontImages] = useState<ImageUploadItem[]>([]);
  const [backImages, setBackImages] = useState<ImageUploadItem[]>([]);
  const [faceImages, setFaceImages] = useState<ImageUploadItem[]>([]);

  // 模拟认证状态：0-未认证，1-认证中，2-已认证，3-认证失败
  const [verifyStatus, setVerifyStatus] = useState(0);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      
      if (frontImages.length === 0) {
        Toast.show('请上传身份证人像面');
        return;
      }
      if (backImages.length === 0) {
        Toast.show('请上传身份证国徽面');
        return;
      }
      if (faceImages.length === 0) {
        Toast.show('请上传人脸照片');
        return;
      }

      setLoading(true);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Toast.show('提交成功，请等待审核');
      setVerifyStatus(1);
      setLoading(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 模拟实名认证状态
  if (verifyStatus === 2) {
    return (
      <div className={styles.container}>
        <NavBar onBack={() => navigate(-1)}>实名认证</NavBar>
        <div className={styles.successContainer}>
          <CheckCircleFill className={styles.successIcon} />
          <h2>实名认证已通过</h2>
          <p>您已完成实名认证，可以享受更多服务</p>
          <Button color='primary' onClick={() => navigate('/my')}>
            返回个人中心
          </Button>
        </div>
      </div>
    );
  }

  if (verifyStatus === 1) {
    return (
      <div className={styles.container}>
        <NavBar onBack={() => navigate(-1)}>实名认证</NavBar>
        <div className={styles.pendingContainer}>
          <div className={styles.loadingIcon} />
          <h2>认证审核中</h2>
          <p>我们将在1-3个工作日内完成审核</p>
          <p className={styles.tip}>请保持手机畅通，如有疑问请联系客服</p>
          <Button onClick={() => setVerifyStatus(0)}>取消</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <NavBar onBack={() => navigate(-1)}>实名认证</NavBar>
      
      <div className={styles.notice}>
        <p>根据国家相关规定，请完成实名认证以使用完整服务</p>
      </div>

      <Form form={form} layout='vertical' className={styles.form}>
        <Form.Item
          name='realName'
          label='真实姓名'
          rules={[{ required: true, message: '请输入真实姓名' }]}
        >
          <Input placeholder='请输入您的真实姓名' maxLength={20} />
        </Form.Item>

        <Form.Item
          name='idCard'
          label='身份证号码'
          rules={[
            { required: true, message: '请输入身份证号码' },
            { pattern: /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/, message: '请输入正确的身份证号码' },
          ]}
        >
          <Input placeholder='请输入18位身份证号码' maxLength={18} />
        </Form.Item>

        <Divider>证件照片</Divider>

        <div className={styles.uploadSection}>
          <div className={styles.uploadItem}>
            <p className={styles.uploadLabel}>身份证人像面</p>
            <ImageUploader
              value={frontImages}
              onChange={setFrontImages}
              upload={mockUpload}
              maxCount={1}
              accept='image/*'
            >
              <div className={styles.uploadBox}>
                <CameraOutline />
                <span>点击上传</span>
              </div>
            </ImageUploader>
          </div>

          <div className={styles.uploadItem}>
            <p className={styles.uploadLabel}>身份证国徽面</p>
            <ImageUploader
              value={backImages}
              onChange={setBackImages}
              upload={mockUpload}
              maxCount={1}
              accept='image/*'
            >
              <div className={styles.uploadBox}>
                <CameraOutline />
                <span>点击上传</span>
              </div>
            </ImageUploader>
          </div>
        </div>

        <Divider>人脸核身</Divider>

        <div className={styles.uploadSection}>
          <div className={styles.uploadItem}>
            <p className={styles.uploadLabel}>本人照片</p>
            <ImageUploader
              value={faceImages}
              onChange={setFaceImages}
              upload={mockUpload}
              maxCount={1}
              accept='image/*'
            >
              <div className={styles.uploadBox}>
                <CameraOutline />
                <span>点击上传</span>
              </div>
            </ImageUploader>
          </div>
        </div>

        <p className={styles.tip}>请确保照片清晰，信息可辨认</p>
      </Form>

      <div className={styles.agreement}>
        <Radio>我已阅读并同意</Radio>
        <a onClick={() => Toast.show('实名认证服务协议')}>《实名认证服务协议》</a>
      </div>

      <div className={styles.submitArea}>
        <Button
          block
          color='primary'
          size='large'
          loading={loading}
          onClick={handleSubmit}
        >
          提交认证
        </Button>
      </div>
    </div>
  );
}
