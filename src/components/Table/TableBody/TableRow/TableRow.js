import React, { memo, useState } from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { formatDateTime } from '../../../../services/date'
import { events, types } from '../../../../utils/enums'
import { getCellWidth } from '../../utlis'
import { Menu } from '../../../Menu'
import { IconButton } from '../../../IconButton'
import { ReactComponent as OptionsIcon } from '../../../../assets/svg/Options.svg'
import { Checkbox } from '../../../Checkbox'
import { SkeletonLoader } from '../../../SkeletonLoader'
import styles from './TableRow.module.scss'

const TableRow = ({
  row,
  rowActions,
  rowHeight,
  isLoading,
  onRowClick,
  isSelected,
  isActive,
  columns,
  toggleSelectedItem,
  columnManagement
}) => {
  const [actionsAnchorElement, setActionsAnchorElement] = useState(null)
  const [isHover, setIsHover] = useState(false)
  const handleActionsClose = () => {
    setActionsAnchorElement(null)
  }

  const handleMenuItemClick = (e, row, onClick) => {
    e.stopPropagation()
    handleActionsClose()
    onClick(row)
  }

  const handleActionsClick = event => {
    setActionsAnchorElement(actionsAnchorElement ? null : event.currentTarget)
  }

  const renderActions = row => {
    if(!rowActions) return
    return (
      <>
        <Menu
          anchorElement={ actionsAnchorElement }
          isOpen={ !!actionsAnchorElement }
          preferOpenDirection="down-start"
          onClose={ handleActionsClose }
        >
          {
            rowActions.map(({ label, icon, onClick }, index) => (
              <Menu.Item
                leadingComponent={ icon }
                key={ index }
                onClick={ e => handleMenuItemClick(e, row, onClick) }
              >
                { label }
              </Menu.Item>
            ))
          }
        </Menu>
        <div
          role="cell"
          className={ styles.actionsCell }
          onClick={ e => e.stopPropagation() }
        >
          <IconButton
            className={ styles.actionButton }
            variant="ghost"
            onClick={ handleActionsClick }
          >
            <OptionsIcon/>
          </IconButton>
        </div>
      </>
    )
  }



  const renderSelection = (row, isSelected) => {
    if(!isActive) return
    return (
      <div
        role="cell"
        className={ styles.selectionCell }
      >
        <Checkbox
          onClick={ e => e.stopPropagation() }
          onChange={ () => toggleSelectedItem(row, isSelected) }
          checked={ isSelected }/>
      </div>
    )
  }

  const renderCell = (row, field, columnRender, columnRenderHover, type) => {
    if(isHover && columnRenderHover) {
      return columnRenderHover(row[field], row)
    } else if (columnRender) {
      return columnRender(row[field], row)
    } else if(type === types.DATE) {
      return formatDateTime(row[field])
    }
    return row[field]
  }

  const mouseHoverHandler = ({ type }) => {
    const isHover = type === events.MOUSE_ENTER
    setIsHover(isHover)
  }

  const renderPlaceholder = () => {
    return (columnManagement && !rowActions) && (
      <div role={ 'cell' } className={ styles.actionsCell }/>
    )
  }

  const handleRowClick = row => {
    onRowClick(row)
  }

  const renderDataRow = () => {
    const tableRowClassNames = classNames(styles.tableRow, { [styles.clickable]: onRowClick }, { [styles.selectedRow]: isSelected })
    return (
      <div
        role="row"
        style={ { height: rowHeight } }
        className={ tableRowClassNames }
        onMouseEnter={ mouseHoverHandler }
        onMouseLeave={ mouseHoverHandler }
        onClick={ () => handleRowClick(row) }
      >
        { renderSelection(row, isSelected) }
        { columns.map(({
          field, columnRender, columnRenderHover, hide, width, type
        }) => {
          if (hide) {
            return null
          }
          const style = getCellWidth(width)
          return (
            <div role="cell" style={ style } className={ styles.tableCell } key={ field }>
              { renderCell(row, field, columnRender, columnRenderHover, type) }
            </div>
          )
        }) }
        { renderPlaceholder() }
        { renderActions(row) }
      </div>
    )
  }

  const renderLoadingRow = () => (
    <div
      role={ 'row' }
      className={ styles.tableRow }
    >
      <div
        role="cell"
        className={ styles.selectionCell }
      >
        <SkeletonLoader className={ styles.circleSkeleton }/>
      </div>
      {
        columns.map(({
          field, hide, width
        }) => {
          if (hide) {
            return null
          }
          const style = getCellWidth(width)
          return (
            <div role="cell" style={ style } className={ styles.tableCell } key={ field }>
              <SkeletonLoader className={ styles.lineSkeleton }/>
            </div>
          )
        })
      }
      <div className={ styles.actionsCell }/>
    </div>
  )

  return (
    <>
      { isLoading ? renderLoadingRow(): renderDataRow() }
    </>
  )
}

TableRow.defaultProps = {
  onRowClick: () => {}
}

TableRow.propTypes = {
  row: propTypes.object,
  rowActions: propTypes.array,
  rowHeight: propTypes.string,
  isLoading: propTypes.bool,
  onRowClick: propTypes.func,
}

export default memo(TableRow)
