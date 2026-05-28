import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MerchantRegister.module.css';

type MerchantType = 'specialty' | 'homestay' | 'restaurant' | 'attraction' | 'guide';

interface FormData {
  type: MerchantType;
  name: string;
  contact: string;
  phone: string;
  address: string;
  description: string;
  license: string;
}

export default function MerchantRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    type: 'specialty',
    name: '',
    contact: '',
    phone: '',
    address: '',
    description: '',
    license: '',
  });

  const merchantTypes: { value: MerchantType; label: string; icon: string }[] = [
    { value: 'specialty', label: '特产商家', icon: '🥜' },
    { value: 'homestay', label: '民宿农家乐', icon: '🏡' },
    { value: 'restaurant', label: '餐饮商家', icon: '🍜' },
    { value: 'attraction', label: '景点门票', icon: '🎫' },
    { value: 'guide', label: '导游服务', icon: '🎒' },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    alert('提交成功！我们将在1-3个工作日内审核您的申请，请保持电话畅通。');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      {/* 步骤指示器 */}
      <div className={styles.steps}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
          <span className={styles.stepNum}>1</span>
          <span className={styles.stepText}>选择类型</span>
        </div>
        <div className={styles.stepLine} />
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
          <span className={styles.stepNum}>2</span>
          <span className={styles.stepText}>填写信息</span>
        </div>
        <div className={styles.stepLine} />
        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
          <span className={styles.stepNum}>3</span>
          <span className={styles.stepText}>提交审核</span>
        </div>
      </div>

      {step === 1 && (
        <div className={styles.stepContent}>
          <h2 className={styles.stepTitle}>选择入驻类型</h2>
          <div className={styles.typeGrid}>
            {merchantTypes.map(type => (
              <div
                key={type.value}
                className={`${styles.typeCard} ${formData.type === type.value ? styles.selected : ''}`}
                onClick={() => handleInputChange('type', type.value)}
              >
                <span className={styles.typeIcon}>{type.icon}</span>
                <span className={styles.typeLabel}>{type.label}</span>
              </div>
            ))}
          </div>
          <button className={styles.nextBtn} onClick={() => setStep(2)}>
            下一步
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.stepContent}>
          <h2 className={styles.stepTitle}>填写商家信息</h2>
          <div className={styles.form}>
            <div className={styles.formItem}>
              <label>店铺名称</label>
              <input
                type="text"
                placeholder="请输入店铺名称"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label>联系人</label>
              <input
                type="text"
                placeholder="请输入联系人姓名"
                value={formData.contact}
                onChange={e => handleInputChange('contact', e.target.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label>联系电话</label>
              <input
                type="tel"
                placeholder="请输入联系电话"
                value={formData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label>店铺地址</label>
              <input
                type="text"
                placeholder="请输入详细地址"
                value={formData.address}
                onChange={e => handleInputChange('address', e.target.value)}
              />
            </div>
            <div className={styles.formItem}>
              <label>店铺简介</label>
              <textarea
                placeholder="请简单描述您的店铺特色"
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                rows={4}
              />
            </div>
            <div className={styles.formItem}>
              <label>营业执照（选填）</label>
              <div className={styles.uploadArea}>
                <span className={styles.uploadIcon}>📷</span>
                <span className={styles.uploadText}>上传营业执照</span>
              </div>
            </div>
          </div>
          <div className={styles.btnGroup}>
            <button className={styles.backBtn} onClick={() => setStep(1)}>
              上一步
            </button>
            <button className={styles.nextBtn} onClick={() => setStep(3)}>
              下一步
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={styles.stepContent}>
          <h2 className={styles.stepTitle}>确认入驻信息</h2>
          <div className={styles.confirmCard}>
            <div className={styles.confirmRow}>
              <span className={styles.confirmLabel}>入驻类型</span>
              <span className={styles.confirmValue}>
                {merchantTypes.find(t => t.value === formData.type)?.label}
              </span>
            </div>
            <div className={styles.confirmRow}>
              <span className={styles.confirmLabel}>店铺名称</span>
              <span className={styles.confirmValue}>{formData.name}</span>
            </div>
            <div className={styles.confirmRow}>
              <span className={styles.confirmLabel}>联系人</span>
              <span className={styles.confirmValue}>{formData.contact}</span>
            </div>
            <div className={styles.confirmRow}>
              <span className={styles.confirmLabel}>联系电话</span>
              <span className={styles.confirmValue}>{formData.phone}</span>
            </div>
            <div className={styles.confirmRow}>
              <span className={styles.confirmLabel}>店铺地址</span>
              <span className={styles.confirmValue}>{formData.address}</span>
            </div>
            <div className={styles.confirmRow}>
              <span className={styles.confirmLabel}>店铺简介</span>
              <span className={styles.confirmValue}>{formData.description}</span>
            </div>
          </div>

          <div className={styles.agreement}>
            <p>入驻即表示同意《商家入驻协议》和《平台交易规则》</p>
          </div>

          <div className={styles.btnGroup}>
            <button className={styles.backBtn} onClick={() => setStep(2)}>
              返回修改
            </button>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              提交申请
            </button>
          </div>
        </div>
      )}

      {/* 优势说明 */}
      <div className={styles.benefits}>
        <h3 className={styles.benefitsTitle}>入驻优势</h3>
        <div className={styles.benefitsList}>
          <div className={styles.benefitItem}>
            <span className={styles.benefitIcon}>💰</span>
            <div>
              <strong>零入驻费</strong>
              <p>永久免费入驻，无任何费用</p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <span className={styles.benefitIcon}>📱</span>
            <div>
              <strong>流量扶持</strong>
              <p>平台持续推广，增加曝光</p>
            </div>
          </div>
          <div className={styles.benefitItem}>
            <span className={styles.benefitIcon}>💳</span>
            <div>
              <strong>快速结算</strong>
              <p>订单完成后即时结算</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
