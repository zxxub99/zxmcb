import { useState } from 'react'
import { LeftOutline, PhonebookOutline } from 'antd-mobile-icons'
import { NavBar, Tabs, Card, Tag, SearchBar, Button, Empty } from 'antd-mobile'
import { LocationOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom'
import styles from './AccommodationPage.module.css'

// 住宿数据
const accommodations = [
  { id: 1, name: '莫愁湖大酒店', type: '星级酒店', address: '钟祥市郢中镇莫愁湖路1号', phone: '0724-4228888', price: '288-688', rating: 4.8, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400', tags: ['免费WiFi', '停车场', '早餐'] },
  { id: 2, name: '明显陵度假山庄', type: '度假酒店', address: '钟祥市显陵路88号', phone: '0724-4236666', price: '198-458', rating: 4.6, img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400', tags: ['景区内', '园林景观', '亲子'] },
  { id: 3, name: '钟祥国际大酒店', type: '星级酒店', address: '钟祥市王府大道888号', phone: '0724-4218888', price: '358-888', rating: 4.9, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400', tags: ['健身房', '游泳池', '会议厅'] },
  { id: 4, name: '莫愁村民宿客栈', type: '民宿', address: '钟祥市莫愁村景区内', phone: '0724-4231888', price: '128-288', rating: 4.7, img: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=400', tags: ['民俗体验', '农家菜', '采摘'] },
  { id: 5, name: '黄仙洞驿站', type: '客栈', address: '钟祥市客店镇黄仙洞景区', phone: '0724-4245888', price: '98-198', rating: 4.5, img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400', tags: ['山景房', '农家菜', '向导'] },
  { id: 6, name: '彭墩乡村酒店', type: '农家乐', address: '钟祥市石牌镇彭墩村', phone: '0724-4256888', price: '88-168', rating: 4.6, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400', tags: ['农家乐', '垂钓', '采摘'] },
]

// 餐饮数据
const restaurants = [
  { id: 1, name: '莫愁湖鱼馆', type: '特色餐厅', address: '钟祥市郢中镇美食街', phone: '0724-4226888', price: '50-100/人', rating: 4.8, img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', tags: ['鱼宴', '本地菜', '停车'] },
  { id: 2, name: '明显陵农家菜馆', type: '农家菜', address: '钟祥市显陵路66号', phone: '0724-4233888', price: '40-80/人', rating: 4.6, img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', tags: ['农家菜', '土鸡', '野菜'] },
  { id: 3, name: '钟祥豆腐坊', type: '特色小吃', address: '钟祥市古城景区', phone: '0724-4241888', price: '20-50/人', rating: 4.7, img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', tags: ['豆腐宴', '小吃', '手工'] },
  { id: 4, name: '客店土菜馆', type: '农家菜', address: '钟祥市客店镇主街', phone: '0724-4246888', price: '40-70/人', rating: 4.5, img: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400', tags: ['土菜', '腊肉', '笋干'] },
  { id: 5, name: '长寿宴农家乐', type: '农家乐', address: '钟祥市文集镇', phone: '0724-4251888', price: '60-100/人', rating: 4.8, img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', tags: ['长寿菜', '养生', '采摘'] },
]

export default function AccommodationPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('hotel')
  const [searchValue, setSearchValue] = useState('')

  const currentList = activeTab === 'hotel' ? accommodations : restaurants
  const filteredList = currentList.filter(item => 
    item.name.includes(searchValue) || item.address.includes(searchValue)
  )

  return (
    <div className={styles.container}>
      <NavBar
        left={<LeftOutline />}
        onBack={() => navigate(-1)}
      >
        食宿项目
      </NavBar>

      <div className={styles.searchWrapper}>
        <SearchBar
          placeholder="搜索食宿商家"
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>

      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <Tabs.Tab title="住宿推荐" key="hotel">
          <div className={styles.listContainer}>
            {filteredList.length > 0 ? (
              filteredList.map(item => (
                <Card key={item.id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <img src={item.img} alt={item.name} className={styles.cardImage} />
                    <div className={styles.cardInfo}>
                      <div className={styles.cardTitle}>{item.name}</div>
                      <div className={styles.cardType}>
                        <Tag color="primary" fill="outline">{item.type}</Tag>
                        <span className={styles.rating}>评分 {item.rating}</span>
                      </div>
                      <div className={styles.cardDetail}>
                        <LocationOutline /> {item.address}
                      </div>
                      <div className={styles.cardDetail}>
                        <PhonebookOutline /> {item.phone}
                      </div>
                      <div className={styles.cardTags}>
                        {item.tags.map(tag => (
                          <Tag key={tag} color="success" fill="outline">{tag}</Tag>
                        ))}
                      </div>
                      <div className={styles.cardFooter}>
                        <span className={styles.price}>¥{item.price}</span>
                        <Button size='small' color='primary'>联系商家</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Empty description="暂无相关商家" />
            )}
          </div>
        </Tabs.Tab>
        <Tabs.Tab title="餐饮推荐" key="restaurant">
          <div className={styles.listContainer}>
            {filteredList.length > 0 ? (
              filteredList.map(item => (
                <Card key={item.id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <img src={item.img} alt={item.name} className={styles.cardImage} />
                    <div className={styles.cardInfo}>
                      <div className={styles.cardTitle}>{item.name}</div>
                      <div className={styles.cardType}>
                        <Tag color="warning" fill="outline">{item.type}</Tag>
                        <span className={styles.rating}>评分 {item.rating}</span>
                      </div>
                      <div className={styles.cardDetail}>
                        <LocationOutline /> {item.address}
                      </div>
                      <div className={styles.cardDetail}>
                        <PhonebookOutline /> {item.phone}
                      </div>
                      <div className={styles.cardTags}>
                        {item.tags.map(tag => (
                          <Tag key={tag} color="success" fill="outline">{tag}</Tag>
                        ))}
                      </div>
                      <div className={styles.cardFooter}>
                        <span className={styles.price}>¥{item.price}</span>
                        <Button size='small' color='warning'>联系商家</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Empty description="暂无相关商家" />
            )}
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}
