import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  specs: { name: string; options: string[] }[];
  seller: {
    name: string;
    avatar: string;
    phone: string;
  };
  category: string;
}

interface ProductDetailProps {
  product?: Product;
}

const mockProduct: Product = {
  id: '1',
  name: '钟祥石牌老豆腐 手工制作',
  price: 29.9,
  originalPrice: 39.9,
  images: [
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    'https://images.unsplash.com/photo-1510629954389-c1e0da47d414?w=400',
  ],
  description: '选用钟祥本地优质黄豆，手工石磨制作，保留了传统风味。豆腐嫩滑细腻、豆香浓郁，是长寿之乡的特色美食。',
  specs: [
    { name: '规格', options: ['500g', '1kg', '2kg'] },
    { name: '包装', options: ['简装', '礼盒装'] },
  ],
  seller: {
    name: '石牌豆腐坊',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    phone: '138****8888',
  },
  category: '特产',
};

export default function ProductDetail({ product = mockProduct }: ProductDetailProps) {
  const navigate = useNavigate();
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const handleSpecSelect = (specName: string, option: string) => {
    setSelectedSpecs(prev => ({ ...prev, [specName]: option }));
  };

  const handleAddCart = () => {
    alert('已加入购物车');
  };

  const handleBuy = () => {
    alert('即将跳转到订单确认页面');
    navigate('/');
  };

  const handleContact = () => {
    window.open(`tel:${product.seller.phone}`);
  };

  return (
    <div className={styles.container}>
      {/* 图片轮播 */}
      <div className={styles.imageSection}>
        <div className={styles.mainImage}>
          <img src={product.images[activeImage]} alt={product.name} />
        </div>
        <div className={styles.thumbnailList}>
          {product.images.map((img, index) => (
            <div
              key={index}
              className={`${styles.thumbnail} ${activeImage === index ? styles.active : ''}`}
              onClick={() => setActiveImage(index)}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* 价格和名称 */}
      <div className={styles.infoSection}>
        <div className={styles.priceRow}>
          <span className={styles.price}>¥{product.price}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>¥{product.originalPrice}</span>
          )}
        </div>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.description}>{product.description}</p>
      </div>

      {/* 规格选择 */}
      <div className={styles.specSection}>
        <h3 className={styles.sectionTitle}>选择规格</h3>
        {product.specs.map(spec => (
          <div key={spec.name} className={styles.specRow}>
            <span className={styles.specName}>{spec.name}</span>
            <div className={styles.specOptions}>
              {spec.options.map(option => (
                <span
                  key={option}
                  className={`${styles.specOption} ${selectedSpecs[spec.name] === option ? styles.selected : ''}`}
                  onClick={() => handleSpecSelect(spec.name, option)}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 数量选择 */}
      <div className={styles.quantitySection}>
        <span className={styles.sectionTitle}>购买数量</span>
        <div className={styles.quantityControl}>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      {/* 商家信息 */}
      <div className={styles.sellerSection}>
        <h3 className={styles.sectionTitle}>商家信息</h3>
        <div className={styles.sellerInfo}>
          <img src={product.seller.avatar} alt="" className={styles.sellerAvatar} />
          <div className={styles.sellerDetail}>
            <span className={styles.sellerName}>{product.seller.name}</span>
            <span className={styles.sellerPhone}>联系：{product.seller.phone}</span>
          </div>
          <button className={styles.contactBtn} onClick={handleContact}>
            联系商家
          </button>
        </div>
      </div>

      {/* 商品详情 */}
      <div className={styles.detailSection}>
        <h3 className={styles.sectionTitle}>商品详情</h3>
        <div className={styles.detailContent}>
          <p>{product.description}</p>
          <ul>
            <li>产地：湖北省钟祥市</li>
            <li>保质期：冷藏保存7天</li>
            <li>配送：同城当日达</li>
          </ul>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomLeft}>
          <button className={styles.cartBtn} onClick={handleAddCart}>
            加入购物车
          </button>
          <button className={styles.buyBtn} onClick={handleBuy}>
            立即购买
          </button>
        </div>
      </div>
    </div>
  );
}
