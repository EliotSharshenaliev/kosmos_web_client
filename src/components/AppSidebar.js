import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {CNavGroup, CNavItem, CNavTitle, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {AppSidebarNav} from './AppSidebarNav'
import {logoNegative} from 'src/assets/brand/logo-negative'
import {sygnet} from 'src/assets/brand/sygnet'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import {cilDrop, cilPuzzle, cilSpeedometer} from "@coreui/icons";

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [navs, setNavs] = React.useState([])


  React.useEffect(() => {
    setNavs(
      [
        {
          component: CNavItem,
          name: 'Рабочий стол',
          to: '/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon"/>,
          badge: {
            color: 'info',
            text: 'Событие',
          },
        },
        {
          component: CNavTitle,
          name: 'Справочники',
        },
        {
          component: CNavItem,
          name: 'Цвета',
          to: '/theme/colors',
          icon: <CIcon icon={cilDrop} customClassName="nav-icon"/>,
        },
        {
          component: CNavGroup,
          name: 'Общие',
          to: '/base',
          icon: <CIcon icon={cilPuzzle} customClassName="nav-icon"/>,
          items: [
            {
              component: CNavItem,
              name: 'Accordion',
              to: '/base/accordion',
            },
            {
              component: CNavItem,
              name: 'Breadcrumb',
              to: '/base/breadcrumbs',
            }
          ],
        },
      ]
    )
  }, [])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({type: 'set', sidebarShow: visible})
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35}/>
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35}/>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navs}/>
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({type: 'set', sidebarUnfoldable: !unfoldable})}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
