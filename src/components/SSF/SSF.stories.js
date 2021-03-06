import React from 'react'
import { action } from '@storybook/addon-actions'
import SmartFilter from './SSF'
import { centerDecorator } from '../../utils/storybook/decorators'
import { ReactComponent as EyeEnabled } from '../../assets/svg/EyeEnabled.svg'
import { ReactComponent as ArrowSolidRight } from '../../assets/svg/ArrowSolidRight.svg'
import styles from '../../storybook/index.module.scss'

export default {
  title: 'User Inputs/SSF',
  component: SmartFilter,
  decorators: [centerDecorator],
}

export const Default = () => {
  const fields = [
    {
      field: 'subjectName',
      label: 'Subject Name',
      type: 'string',
    },
    {
      field: 'age',
      type: 'number',
      label: 'Age',
      icon: <ArrowSolidRight />,
    },
    {
      field: 'subjectDescription',
      label: 'Description',
      type: 'string',
      icon: <EyeEnabled />,
    },
  ]
  return (
    <div className={styles.marginFlexContainer}>
      <SmartFilter fields={fields} onChange={action('Result')} />
    </div>
  )
}

export const WithoutMenuFields = () => (
  <div className={styles.marginFlexContainer}>
    <SmartFilter onChange={action('Result')} />
  </div>
)
