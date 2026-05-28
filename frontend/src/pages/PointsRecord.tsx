import { useState } from 'react'
import { NavBar, Tabs } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import { 
  generateMockPointsData, 
  LEVEL_CONFIG, 
  getLevelProgressConfig,
  getNextLevelProgress,
  POINTS_RULES 
} from '../services/points'
import styles from './PointsRecord.module.css'

export default function PointsRecord() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('record')
  const [records] = useState(generateMockPointsData())
  
  // 模拟用户积分数据
  const userPoints = {
    total: 120,
    creditScore: 156,
    starLevel: 3,
    level: 'excellent' as const,
    transactionCount: 5,
    helpCount: 3,
    goodReviewRate: 0.95,
    responseRate: 0.9,
    activeDays: 45,
  }

  const levelProgress = getNextLevelProgress(userPoints.creditScore)
  const levelConfig = getLevelProgressConfig(userPoints.level)

  const earnRules = Object.entries(POINTS_RULES.earn).map(([key, value]) => ({
    key,
    ...value
  }))

  const deductRules = Object.entries(POINTS_RULES.deduct).map(([key, value]) => ({
    key,
    ...value
  }))

  return (
    <div className={styles.container}>
      <NavBar onBack={() => navigate(-1)}>积分中心</NavBar>

      {/* 积分卡片 */}
      <div className={styles.pointsCard}>
        <div className={styles.pointsHeader}>
          <div className={styles.pointsValue}>
            <span className={styles.pointsNumber}>{userPoints.total}</span>
            <span className={styles.pointsLabel}>可用积分</span>
          </div>
          <div className={styles.levelInfo}>
            <span className={styles.levelIcon}>{LEVEL_CONFIG[userPoints.level].icon}</span>
            <span className={styles.levelName}>{LEVEL_CONFIG[userPoints.level].name}</span>
          </div>
        </div>
        
        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span>距离升级还差 {levelProgress.target - levelProgress.current} 积分</span>
            <span>{levelProgress.progress}%</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ 
                width: `${levelProgress.progress}%`,
                backgroundColor: levelConfig.color 
              }}
            />
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{userPoints.transactionCount}</span>
            <span className={styles.statLabel}>交易次数</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{userPoints.helpCount}</span>
            <span className={styles.statLabel}>互助次数</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>{Math.round(userPoints.goodReviewRate * 100)}%</span>
            <span className={styles.statLabel}>好评率</span>
          </div>
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <Tabs.Tab title='积分记录' key='record'>
          <div className={styles.recordList}>
            {records.map(record => (
              <div key={record.id} className={styles.recordItem}>
                <div className={styles.recordLeft}>
                  <span className={styles.recordDesc}>{record.desc}</span>
                  <span className={styles.recordTime}>{record.createdAt}</span>
                </div>
                <span className={`${styles.recordPoints} ${record.points > 0 ? styles.positive : styles.negative}`}>
                  {record.points > 0 ? '+' : ''}{record.points}
                </span>
              </div>
            ))}
          </div>
        </Tabs.Tab>
        
        <Tabs.Tab title='赚积分' key='earn'>
          <div className={styles.rulesList}>
            <div className={styles.rulesTitle}>做任务赚积分</div>
            {earnRules.map(rule => (
              <div key={rule.key} className={styles.ruleItem}>
                <span className={styles.ruleDesc}>{rule.desc}</span>
                <span className={styles.rulePoints}>+{rule.points}</span>
              </div>
            ))}
          </div>
        </Tabs.Tab>
        
        <Tabs.Tab title='扣积分' key='deduct'>
          <div className={styles.rulesList}>
            <div className={styles.rulesTitle}>违规行为会扣积分</div>
            {deductRules.map(rule => (
              <div key={rule.key} className={styles.ruleItem}>
                <span className={styles.ruleDesc}>{rule.desc}</span>
                <span className={`${styles.rulePoints} ${styles.negative}`}>{rule.points}</span>
              </div>
            ))}
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  )
}
