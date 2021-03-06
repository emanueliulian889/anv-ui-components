import React from 'react'
import classNames from 'classnames'
import propTypes from 'prop-types'
import { ErrorCircleOutlined } from '@anyvision/anv-icons'
import { Warning } from '@anyvision/anv-icons'
import { CheckCircleOutlined } from '@anyvision/anv-icons'
import { MailShiled } from '@anyvision/anv-icons'
import styles from './Banner.module.scss'

const iconsMapper = {
  error: <ErrorCircleOutlined />,
  warning: <Warning />,
  success: <CheckCircleOutlined />,
  info: <MailShiled />,
}

const Banner = ({
  leadingIcon,
  className,
  children,
  trailingComponent,
  isOpen,
  type,
}) => {
  const classes = classNames(
    styles.banner,
    className,
    { [styles[type]]: !!type },
    { [styles.open]: isOpen },
  )

  const icon = leadingIcon || iconsMapper[type]

  return (
    <div className={classes}>
      {icon && <span className={styles.leadingIcon}>{icon}</span>}
      <div className={styles.mainContent}>{children}</div>
      {trailingComponent}
    </div>
  )
}

Banner.defaultProps = {
  isOpen: false,
  type: 'info',
}

Banner.propTypes = {
  /** Icon before the children. */
  leadingIcon: propTypes.element,
  /** Component after the children. */
  trailingComponent: propTypes.element,
  /** For css customization. */
  className: propTypes.string,
  /** The component content. */
  children: propTypes.node.isRequired,
  /** Should the banner appear on screen or not */
  isOpen: propTypes.bool,
  /** The type of the banner */
  type: propTypes.oneOf(['info', 'warning', 'error', 'success']),
}

export default Banner
