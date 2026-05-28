import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeftOutline } from 'antd-mobile-icons'
import styles from './RulesPage.module.css'

const ruleSections = [
  {
    id: 'idle',
    title: '二手交易规范',
    icon: '🔄',
    rules: [
      '禁止发布违禁品、假货、仿品',
      '商品描述必须真实，禁止夸大或误导',
      '价格必须合理，禁止恶意抬高或压低',
      '线下交易需注意人身和财产安全',
      '交易完成后请及时确认收货',
      '如遇纠纷可联系平台客服协助处理',
    ],
  },
  {
    id: 'merchant',
    title: '商家入驻说明',
    icon: '🏪',
    rules: [
      '商家需提供真实有效的营业执照或资质证明',
      '商品必须符合国家相关质量标准',
      '严禁销售假冒伪劣、三无产品',
      '需遵守平台统一的价格体系和服务标准',
      '商家需保证售后服务及时响应',
      '违规将被下架店铺并追究相关责任',
    ],
  },
  {
    id: 'product',
    title: '特产售后说明',
    icon: '🎁',
    rules: [
      '收到商品请在24小时内检查，如有问题请拍照留证',
      '食品类商品一经拆封不支持无理由退换',
      '因物流造成的破损可申请退款或补发',
      '支持7天无理由退换（定制商品除外）',
      '退换货需保持商品原包装及附件完整',
      '售后服务由商家负责，平台协助监督',
    ],
  },
  {
    id: 'community',
    title: '社区发言规范',
    icon: '💬',
    rules: [
      '禁止发布广告、垃圾信息、刷屏内容',
      '禁止人身攻击、辱骂、诽谤他人',
      '禁止传播虚假信息、谣言',
      '禁止发布涉及政治敏感话题',
      '禁止传播淫秽色情、暴力恐怖内容',
      '违规内容将被删除，严重者将被禁言或封号',
    ],
  },
  {
    id: 'safety',
    title: '安全交易提示',
    icon: '🛡️',
    rules: [
      '建议使用平台担保交易，勿私下转账',
      '面交请选择公共场所，注意人身安全',
      '警惕价格明显低于市场价的商品',
      '不要向陌生人透露个人敏感信息',
      '遇到诈骗请立即报警并联系平台',
      '平台仅提供信息撮合服务，交易风险自担',
    ],
  },
]

export default function RulesPage() {
  const navigate = useNavigate()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id)
  }

  return (
    <div className={styles.container}>
      {/* 顶部导航 */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.backBtn} onClick={() => navigate(-1)}>
            <LeftOutline /> 返回
          </div>
          <div className={styles.headerTitle}>平台规则</div>
          <div className={styles.headerRight}></div>
        </div>
      </div>

      {/* 规则列表 */}
      <div className={styles.content}>
        {ruleSections.map((section) => (
          <div key={section.id} className={styles.section}>
            <div 
              className={styles.sectionHeader}
              onClick={() => toggleSection(section.id)}
            >
              <div className={styles.sectionLeft}>
                <span className={styles.sectionIcon}>{section.icon}</span>
                <span className={styles.sectionTitle}>{section.title}</span>
              </div>
              <span className={styles.sectionArrow}>
                {expandedSection === section.id ? '▲' : '▼'}
              </span>
            </div>
            {expandedSection === section.id && (
              <div className={styles.sectionContent}>
                <ul className={styles.ruleList}>
                  {section.rules.map((rule, idx) => (
                    <li key={idx} className={styles.ruleItem}>
                      <span className={styles.ruleNumber}>{idx + 1}</span>
                      <span className={styles.ruleText}>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部声明 */}
      <div className={styles.footer}>
        <div className={styles.footerTitle}>免责声明</div>
        <div className={styles.footerText}>
          钟祥莫愁帮仅提供信息展示和交易撮合服务，不对交易过程中的任何损失承担责任。
          用户需自行核实信息真实性，并承担交易风险。如有疑问请联系平台客服。
        </div>
        <div className={styles.footerContact}>
          客服热线：400-XXX-XXXX
        </div>
      </div>
    </div>
  )
}
