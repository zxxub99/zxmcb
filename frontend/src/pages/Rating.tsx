import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  TextArea,
  Card,
  Button,
  Radio,
  Toast,
  Image,
  Avatar
} from 'antd-mobile';
import {
  StarFill,
  CheckCircleFill,
  LocationOutline,
  ClockCircleOutline
} from 'antd-mobile-icons';
import styles from './Rating.module.css';

const Rating = () => {
  const navigate = useNavigate();
  const { id, type } = useParams<{ id: string; type: string }>();
  const [rating, setRating] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 模拟数据
  const dealInfo = {
    id: id || '1',
    type: type || 'idle',
    title: type === 'idle' ? '九成新自行车转让' : '水管维修服务',
    otherUser: {
      name: type === 'idle' ? '王大哥' : '李师傅',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
      level: 3
    },
    image: type === 'idle' ? 'https://picsum.photos/200/200?random=20' : undefined,
    price: type === 'idle' ? '¥280' : '¥150',
    location: '2.3km',
    time: '今天 14:30'
  };

  // 可选评价标签
  const tagOptions = [
    '态度很好',
    '准时到达',
    '物品描述准确',
    '价格实惠',
    '服务专业',
    '沟通顺畅',
    '非常满意',
    '值得推荐'
  ];

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else if (tags.length < 5) {
      setTags([...tags, tag]);
    } else {
      Toast.show('最多选择5个标签');
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Toast.show('请选择评分');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Toast.show({
        content: '评价成功，感谢您的反馈！',
        icon: 'success'
      });
      setTimeout(() => navigate(-1), 1000);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.backBtn} onClick={() => navigate(-1)}>取消</span>
        <span className={styles.title}>评价</span>
        <span className={styles.submitBtn} onClick={handleSubmit}>提交</span>
      </div>

      <div className={styles.content}>
        {/* 交易信息卡片 */}
        <Card className={styles.dealCard}>
          <div className={styles.dealInfo}>
            {dealInfo.image && (
              <Image src={dealInfo.image} className={styles.dealImage} fit="cover" />
            )}
            <div className={styles.dealDetail}>
              <div className={styles.dealTitle}>{dealInfo.title}</div>
              <div className={styles.dealPrice}>{dealInfo.price}</div>
              <div className={styles.dealMeta}>
                <span><LocationOutline /> {dealInfo.location}</span>
                <span><ClockCircleOutline /> {dealInfo.time}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* 交易对象 */}
        <Card className={styles.userCard}>
          <div className={styles.userInfo}>
            <Avatar src={dealInfo.otherUser.avatar} style={{ '--size': '48px' } as React.CSSProperties} />
            <div className={styles.userDetail}>
              <div className={styles.userName}>
                {dealInfo.otherUser.name}
                <span className={styles.userLevel}>Lv.{dealInfo.otherUser.level}</span>
              </div>
              <div className={styles.userRole}>
                {dealInfo.type === 'idle' ? '卖家' : '服务者'}
              </div>
            </div>
            <div className={styles.dealComplete}>
              <CheckCircleFill className={styles.checkIcon} />
              交易完成
            </div>
          </div>
        </Card>

        {/* 评分 */}
        <Card className={styles.ratingCard}>
          <div className={styles.ratingTitle}>服务评分</div>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={styles.starItem}
                onClick={() => setRating(star)}
              >
                {star <= rating ? (
                  <StarFill className={styles.starActive} />
                ) : (
                  <StarFill className={styles.starInactive} />
                )}
              </div>
            ))}
          </div>
          <div className={styles.ratingText}>
            {rating === 5 && '非常满意'}
            {rating === 4 && '满意'}
            {rating === 3 && '一般'}
            {rating === 2 && '不满意'}
            {rating === 1 && '非常不满意'}
          </div>
        </Card>

        {/* 评价标签 */}
        <Card className={styles.tagsCard}>
          <div className={styles.tagsTitle}>选择标签（可多选）</div>
          <div className={styles.tagsGrid}>
            {tagOptions.map((tag) => (
              <div
                key={tag}
                className={`${styles.tagItem} ${tags.includes(tag) ? styles.tagActive : ''}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </div>
            ))}
          </div>
        </Card>

        {/* 文字评价 */}
        <Card className={styles.commentCard}>
          <div className={styles.commentTitle}>写下您的评价</div>
          <TextArea
            placeholder="分享您的交易体验，帮助更多邻居了解..."
            value={comment}
            onChange={setComment}
            rows={4}
            maxLength={200}
            showCount
            className={styles.textArea}
          />
        </Card>

        {/* 匿名评价 */}
        <Card className={styles.anonymousCard}>
          <div className={styles.anonymousInfo}>
            <Radio checked={false}>匿名评价</Radio>
            <span className={styles.anonymousHint}>匿名后，对方看不到您的头像和昵称</span>
          </div>
        </Card>

        {/* 提交按钮 */}
        <div className={styles.submitSection}>
          <Button 
            block 
            color="primary" 
            size="large"
            loading={submitting}
            onClick={handleSubmit}
          >
            提交评价
          </Button>
          <p className={styles.submitHint}>评价后可获得10积分奖励</p>
        </div>
      </div>
    </div>
  );
};

export default Rating;
