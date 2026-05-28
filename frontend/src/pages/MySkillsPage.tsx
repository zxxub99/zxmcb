import React, { useState } from 'react'
import { NavBar, Tabs, Card, Button, Modal, Input, Empty, Toast } from 'antd-mobile'
import { 
  LeftOutline,
  AddOutline,
  DeleteOutline,
  StarFill
} from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import styles from './MySkillsPage.module.css'

// 技能数据
const initialSkills = [
  {
    id: '1',
    title: '家电维修',
    category: '维修服务',
    description: '擅长维修冰箱、洗衣机、空调等家用电器，10年经验',
    price: '50元起',
    rating: 4.9,
    orders: 128,
    status: 'active',
    img: 'https://picsum.photos/200/150?random=201'
  },
  {
    id: '2',
    title: '水管安装',
    category: '安装服务',
    description: '专业水管安装、漏水维修、更换水龙头',
    price: '80元起',
    rating: 4.8,
    orders: 86,
    status: 'active',
    img: 'https://picsum.photos/200/150?random=202'
  },
]

const MySkillsPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('active')
  const [skills, setSkills] = useState(initialSkills)
  const [showModal, setShowModal] = useState(false)
  const [newSkill, setNewSkill] = useState({
    title: '',
    category: '维修服务',
    description: '',
    price: '',
  })

  const filteredSkills = skills.filter(skill => 
    activeTab === 'active' ? skill.status === 'active' : skill.status === 'paused'
  )

  const handleAddSkill = () => {
    if (!newSkill.title || !newSkill.description) {
      Toast.show('请填写完整信息')
      return
    }
    const skill = {
      id: Date.now().toString(),
      ...newSkill,
      rating: 5.0,
      orders: 0,
      status: 'active',
      img: `https://picsum.photos/200/150?random=${Date.now()}`,
    }
    setSkills([skill, ...skills])
    setShowModal(false)
    setNewSkill({ title: '', category: '维修服务', description: '', price: '' })
    Toast.show('技能发布成功')
  }

  const handleDeleteSkill = (id: string) => {
    Modal.confirm({
      content: '确定要删除这个技能吗？',
      onConfirm: () => {
        setSkills(skills.filter(s => s.id !== id))
        Toast.show('已删除')
      },
    })
  }

  const handleToggleStatus = (id: string) => {
    setSkills(skills.map(skill => 
      skill.id === id 
        ? { ...skill, status: skill.status === 'active' ? 'paused' : 'active' }
        : skill
    ))
    Toast.show('状态已更新')
  }

  return (
    <div className={styles.container}>
      <NavBar 
        className={styles.navbar}
        left={<LeftOutline onClick={() => navigate(-1)} />}
        right={<AddOutline onClick={() => setShowModal(true)} />}
        onBack={() => navigate(-1)}
      >
        我能服务
      </NavBar>

      <Tabs 
        activeKey={activeTab} 
        onChange={key => setActiveTab(key)}
        className={styles.tabs}
      >
        <Tabs.Tab title={`服务中 (${skills.filter(s => s.status === 'active').length})`} key="active">
          {filteredSkills.length === 0 ? (
            <Empty description="暂无服务中的技能" />
          ) : (
            <div className={styles.skillList}>
              {filteredSkills.map(skill => (
                <Card key={skill.id} className={styles.skillCard}>
                  <div className={styles.skillContent}>
                    <img src={skill.img} alt={skill.title} className={styles.skillImage} />
                    <div className={styles.skillInfo}>
                      <div className={styles.skillHeader}>
                        <span className={styles.skillTitle}>{skill.title}</span>
                        <span className={styles.skillCategory}>{skill.category}</span>
                      </div>
                      <p className={styles.skillDesc}>{skill.description}</p>
                      <div className={styles.skillMeta}>
                        <span className={styles.skillPrice}>{skill.price}</span>
                        <span className={styles.skillRating}>
                          <StarFill color="#ffc107" /> {skill.rating}
                        </span>
                        <span className={styles.skillOrders}>{skill.orders}单</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.skillActions}>
                    <Button 
                      size='small' 
                      color='primary'
                      onClick={() => handleToggleStatus(skill.id)}
                    >
                      暂停服务
                    </Button>
                    <Button 
                      size='small' 
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      <DeleteOutline />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Tabs.Tab>
        <Tabs.Tab title={`已暂停 (${skills.filter(s => s.status === 'paused').length})`} key="paused">
          {filteredSkills.length === 0 ? (
            <Empty description="暂无暂停的技能" />
          ) : (
            <div className={styles.skillList}>
              {filteredSkills.map(skill => (
                <Card key={skill.id} className={`${styles.skillCard} ${styles.paused}`}>
                  <div className={styles.skillContent}>
                    <img src={skill.img} alt={skill.title} className={styles.skillImage} />
                    <div className={styles.skillInfo}>
                      <div className={styles.skillHeader}>
                        <span className={styles.skillTitle}>{skill.title}</span>
                        <span className={styles.skillCategory}>{skill.category}</span>
                      </div>
                      <p className={styles.skillDesc}>{skill.description}</p>
                      <div className={styles.skillMeta}>
                        <span className={styles.skillPrice}>{skill.price}</span>
                        <span className={styles.pausedBadge}>已暂停</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.skillActions}>
                    <Button 
                      size='small' 
                      color='primary'
                      onClick={() => handleToggleStatus(skill.id)}
                    >
                      恢复服务
                    </Button>
                    <Button 
                      size='small' 
                      onClick={() => handleDeleteSkill(skill.id)}
                    >
                      <DeleteOutline />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Tabs.Tab>
      </Tabs>

      <Button 
        block 
        color='primary' 
        className={styles.addBtn}
        onClick={() => setShowModal(true)}
      >
        <AddOutline /> 发布新技能
      </Button>

      <Modal
        visible={showModal}
        title="发布新技能"
        closeOnMaskClick
        onClose={() => setShowModal(false)}
        content={
          <div className={styles.form}>
            <div className={styles.formItem}>
              <label>技能名称</label>
              <Input 
                placeholder="如：家电维修、水管安装"
                value={newSkill.title}
                onChange={val => setNewSkill({...newSkill, title: val})}
              />
            </div>
            <div className={styles.formItem}>
              <label>服务类别</label>
              <div className={styles.categoryBtns}>
                {['维修服务', '安装服务', '咨询解答', '技术帮扶', '其他服务'].map(cat => (
                  <span 
                    key={cat}
                    className={`${styles.categoryBtn} ${newSkill.category === cat ? styles.active : ''}`}
                    onClick={() => setNewSkill({...newSkill, category: cat})}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.formItem}>
              <label>技能描述</label>
              <textarea 
                className={styles.textarea}
                placeholder="描述您的技能优势和服务范围..."
                value={newSkill.description}
                onChange={e => setNewSkill({...newSkill, description: e.target.value})}
              />
            </div>
            <div className={styles.formItem}>
              <label>起步价格</label>
              <Input 
                placeholder="如：50元起"
                value={newSkill.price}
                onChange={val => setNewSkill({...newSkill, price: val})}
              />
            </div>
            <Button block color='primary' onClick={handleAddSkill}>
              确认发布
            </Button>
          </div>
        }
      />
    </div>
  )
}

export default MySkillsPage
